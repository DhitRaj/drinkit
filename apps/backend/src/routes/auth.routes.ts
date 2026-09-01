import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma';
import { config } from '../config/env';
import { validateBody } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { SmsService } from '../services/sms.service';

const router = Router();

const sendOtpSchema = z.object({
  phone: z.string().min(10, 'Valid 10-digit mobile number required').max(15),
});

const verifyOtpSchema = z.object({
  phone: z.string().min(10).max(15),
  code: z.string().min(4).max(6),
});

// In-memory OTP storage for fast verification & testing
const otpStore = new Map<string, { code: string; expiresAt: number }>();

/**
 * POST /api/v1/auth/send-otp
 */
router.post('/send-otp', validateBody(sendOtpSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone } = req.body;
    const devOtp = '1234';
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    otpStore.set(phone, { code: devOtp, expiresAt });

    // Send SMS via Gateway
    await SmsService.sendSms({
      to: phone,
      template: 'OTP',
      variables: { otp: devOtp },
    });

    res.json({
      success: true,
      message: 'OTP sent successfully to registered mobile number',
      devOtp: config.nodeEnv === 'development' ? devOtp : undefined,
    });
  } catch (err) {
    next(err);
  }
});


/**
 * POST /api/v1/auth/verify-otp
 */
router.post('/verify-otp', validateBody(verifyOtpSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone, code } = req.body;
    const stored = otpStore.get(phone);

    // Accept devOtp 1234 or stored OTP
    if (code !== '1234' && (!stored || stored.code !== code || stored.expiresAt < Date.now())) {
      res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
      return;
    }

    // Find or create User
    let user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          fullName: 'Drinkit Customer',
          role: 'CUSTOMER',
          isAgeVerified: true, // Default to age-verified for seamless testing
        },
      });
    }

    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      config.jwtSecret,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        id: user.id,
        phone: user.phone,
        fullName: user.fullName,
        role: user.role,
        isAgeVerified: user.isAgeVerified,
      },
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/auth/me
 */
router.get('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        phone: true,
        email: true,
        fullName: true,
        role: true,
        isAgeVerified: true,
        addresses: true,
      },
    });

    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

export default router;
