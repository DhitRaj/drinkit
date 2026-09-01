import { Router, Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/payment.service';

const router = Router();

/**
 * POST /api/v1/payments/razorpay/create-order
 */
router.post('/razorpay/create-order', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount, receipt = 'rcpt_order_1' } = req.body;
    const rzpOrder = await PaymentService.createRazorpayOrder({ amount, receipt });

    res.json({
      success: true,
      order: rzpOrder,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/payments/upi/intent
 */
router.post('/upi/intent', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount, orderId = `DK-${Date.now().toString().slice(-4)}` } = req.body;
    const upiDetails = PaymentService.generateUpiIntent(amount, orderId);

    res.json({
      success: true,
      orderId,
      amount,
      ...upiDetails,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/payments/verify
 */
router.post('/verify', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

    const isValid = PaymentService.verifyPaymentSignature(
      razorpayOrderId || orderId,
      razorpayPaymentId || 'pay_test',
      razorpaySignature || 'mock_sig'
    );

    if (!isValid) {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
      return;
    }

    res.json({
      success: true,
      message: 'Payment verified successfully! ⚡ Dark store notified.',
      status: 'SUCCESS',
      paymentId: razorpayPaymentId || 'pay_mock_123',
    });
  } catch (err) {
    next(err);
  }
});

export default router;

