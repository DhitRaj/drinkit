const http = require('http');

const BASE_URL = 'http://localhost:4000';

function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting Automated Backend Verification Tests...\n');
  let passed = 0;
  let total = 0;

  async function test(name, fn) {
    total++;
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}:`, err.message);
    }
  }

  // 1. Health
  await test('GET /health returns 200 OK', async () => {
    const res = await makeRequest('GET', '/health');
    if (res.status !== 200 || res.data.status !== 'ok') throw new Error(`Status ${res.status}`);
  });

  // 2. Auth Send OTP
  await test('POST /api/v1/auth/send-otp sends 4-digit OTP', async () => {
    const res = await makeRequest('POST', '/api/v1/auth/send-otp', { phone: '9876543210' });
    if (res.status !== 200 || !res.data.success) throw new Error(`Failed OTP send`);
  });

  // 3. Auth Verify OTP
  let userToken = '';
  await test('POST /api/v1/auth/verify-otp returns JWT token', async () => {
    const res = await makeRequest('POST', '/api/v1/auth/verify-otp', { phone: '9876543210', code: '1234' });
    if (res.status !== 200 || !res.data.accessToken) throw new Error(`Missing token`);
    userToken = res.data.accessToken;
  });

  // 4. Catalog Categories
  await test('GET /api/v1/catalog/categories returns alcohol categories', async () => {
    const res = await makeRequest('GET', '/api/v1/catalog/categories');
    if (res.status !== 200 || res.data.categories.length === 0) throw new Error(`Categories empty`);
  });

  // 5. Catalog Products
  let sampleProductId = '';
  await test('GET /api/v1/catalog/products returns 20 seeded products', async () => {
    const res = await makeRequest('GET', '/api/v1/catalog/products');
    if (res.status !== 200 || res.data.products.length < 10) throw new Error(`Products count too low: ${res.data.products?.length}`);
    sampleProductId = res.data.products[0].id;
  });

  // 6. Cart Calculation
  await test('POST /api/v1/cart/calculate calculates bill correctly', async () => {
    const res = await makeRequest('POST', '/api/v1/cart/calculate', {
      items: [{ productId: sampleProductId, quantity: 2 }],
    });
    if (res.status !== 200 || res.data.calculation.grandTotal <= 0) throw new Error(`Calculation failed`);
  });

  // 7. Create Order
  let sampleOrderId = '';
  let sampleStoreId = '';
  let sampleOrderOtp = '';
  await test('POST /api/v1/orders creates 10-minute order with delivery OTP', async () => {
    const res = await makeRequest(
      'POST',
      '/api/v1/orders',
      {
        items: [{ productId: sampleProductId, quantity: 2 }],
        address: { addressLine1: 'Flat 402, 5th Block, Koramangala' },
        paymentMethod: 'UPI',
      },
      { Authorization: `Bearer ${userToken}` }
    );
    if (res.status !== 200 || !res.data.order?.orderNumber) throw new Error(`Order creation failed: ${JSON.stringify(res.data)}`);
    sampleOrderId = res.data.order.id;
    sampleOrderOtp = res.data.order.otp;
  });

  // 8. Stores Nearby
  await test('GET /api/v1/stores/nearby returns Koramangala dark store', async () => {
    const res = await makeRequest('GET', '/api/v1/stores/nearby');
    if (res.status !== 200 || res.data.stores.length === 0) throw new Error(`Stores empty`);
    sampleStoreId = res.data.stores[0].id;
  });


  // 9. Admin Metrics
  await test('GET /api/v1/admin/metrics returns ops dashboard data', async () => {
    const res = await makeRequest('GET', '/api/v1/admin/metrics');
    if (res.status !== 200 || typeof res.data.metrics.totalOrders !== 'number') throw new Error(`Metrics failed`);
  });

  // 10. Phase 3: Razorpay Create Order
  let rzpOrderId = '';
  await test('POST /api/v1/payments/razorpay/create-order creates order', async () => {
    const res = await makeRequest('POST', '/api/v1/payments/razorpay/create-order', {
      amount: 1450,
      receipt: 'rcpt_test_101',
    });
    if (res.status !== 200 || !res.data.order?.id) throw new Error(`Razorpay order creation failed`);
    rzpOrderId = res.data.order.id;
  });

  // 11. Phase 3: UPI Intent Deep Linking
  await test('POST /api/v1/payments/upi/intent generates GPay/PhonePe links', async () => {
    const res = await makeRequest('POST', '/api/v1/payments/upi/intent', {
      amount: 850,
      orderId: 'DK-2041',
    });
    if (res.status !== 200 || !res.data.upiString?.startsWith('upi://pay')) throw new Error(`UPI intent generation failed`);
  });

  // 12. Phase 3: Payment Signature Verification
  await test('POST /api/v1/payments/verify validates signature', async () => {
    const res = await makeRequest('POST', '/api/v1/payments/verify', {
      razorpayOrderId: rzpOrderId,
      razorpayPaymentId: 'pay_test_999',
      razorpaySignature: 'mock_sig_valid',
    });
    if (res.status !== 200 || res.data.status !== 'SUCCESS') throw new Error(`Payment verification failed`);
  });

  // 13. Phase 4: Store Order Packing Workflow
  await test('POST /api/v1/stores/:id/orders/:orderId/status updates order to PACKING', async () => {
    const res = await makeRequest('POST', `/api/v1/stores/${sampleStoreId}/orders/${sampleOrderId}/status`, {
      status: 'PACKING',
    });
    if (res.status !== 200) throw new Error(`Store status update failed`);
  });

  // 14. Phase 4: Delivery Rider Duty Toggle
  await test('POST /api/v1/delivery/duty toggles online status', async () => {
    const res = await makeRequest('POST', '/api/v1/delivery/duty', { status: 'ONLINE' });
    if (res.status !== 200 || res.data.status !== 'ONLINE') throw new Error(`Duty toggle failed`);
  });

  // 15. Phase 4: Delivery Rider Available Offers
  await test('GET /api/v1/delivery/offers returns active trips', async () => {
    const res = await makeRequest('GET', '/api/v1/delivery/offers');
    if (res.status !== 200 || !Array.isArray(res.data.offers)) throw new Error(`Rider offers failed`);
  });

  // 16. Phase 4: Rider GPS Location Broadcast
  await test('POST /api/v1/delivery/location broadcasts coordinates', async () => {
    const res = await makeRequest('POST', '/api/v1/delivery/location', {
      orderId: sampleOrderId,
      latitude: 12.9352,
      longitude: 77.6245,
    });
    if (res.status !== 200 || !res.data.success) throw new Error(`GPS broadcast failed`);
  });

  // 17. Phase 4: Doorstep OTP Verification & Delivery Complete
  await test('POST /api/v1/delivery/complete marks order DELIVERED with OTP', async () => {
    const res = await makeRequest('POST', '/api/v1/delivery/complete', {
      orderId: sampleOrderId,
      otp: sampleOrderOtp || '4921',
    });
    if (res.status !== 200 || res.data.order?.status !== 'DELIVERED') throw new Error(`Delivery complete failed`);
  });




  console.log(`\n========================================`);
  console.log(`🎯 Test Summary: ${passed} / ${total} passed (${Math.round((passed / total) * 100)}%)`);
  console.log(`========================================\n`);
}

runTests().catch(console.error);
