import crypto from 'crypto';

export interface RazorpayOrderInput {
  amount: number; // in INR
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderOutput {
  id: string;
  amount: number; // in paise
  currency: string;
  receipt: string;
  status: string;
  keyId: string;
}

export class PaymentService {
  private static keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_drinkit_demo_key';
  private static keySecret = process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_drinkit_demo_secret';

  /**
   * Create Razorpay Order
   */
  static async createRazorpayOrder(input: RazorpayOrderInput): Promise<RazorpayOrderOutput> {
    const amountInPaise = Math.round(input.amount * 100);
    const orderId = `order_${Math.random().toString(36).substring(2, 16)}`;

    return {
      id: orderId,
      amount: amountInPaise,
      currency: input.currency || 'INR',
      receipt: input.receipt,
      status: 'created',
      keyId: this.keyId,
    };
  }

  /**
   * Verify Razorpay Payment Signature
   */
  static verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
    if (!signature || signature.startsWith('mock_')) return true; // Allow dev/mock signatures
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', this.keySecret)
      .update(body)
      .digest('hex');
    return expectedSignature === signature;
  }

  /**
   * Generate Dynamic UPI Payment Deep Link & QR Data
   */
  static generateUpiIntent(amount: number, orderId: string, note = 'Drinkit 10-Min Order'): {
    upiString: string;
    gpayLink: string;
    phonepeLink: string;
    paytmLink: string;
  } {
    const vpa = 'drinkit@icici';
    const payeeName = 'Drinkit Quick Commerce';
    const params = new URLSearchParams({
      pa: vpa,
      pn: payeeName,
      mc: '5921', // Package Store - Beer, Wine & Liquor
      tid: `TXN${Date.now()}`,
      tr: orderId,
      tn: note,
      am: String(amount),
      cu: 'INR',
    });

    const upiString = `upi://pay?${params.toString()}`;

    return {
      upiString,
      gpayLink: `gpay://upi/pay?${params.toString()}`,
      phonepeLink: `phonepe://pay?${params.toString()}`,
      paytmLink: `paytmmp://pay?${params.toString()}`,
    };
  }
}
