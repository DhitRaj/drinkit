import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db/prisma';

const router = Router();

/**
 * GET /api/v1/admin/metrics
 */
router.get('/metrics', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const totalOrders = await prisma.order.count();
    const activeOrders = await prisma.order.count({
      where: { status: { in: ['CONFIRMED', 'STORE_ACCEPTED', 'PACKING', 'OUT_FOR_DELIVERY'] } },
    });
    const totalUsers = await prisma.user.count();
    const storesCount = await prisma.store.count();

    res.json({
      success: true,
      metrics: {
        totalOrders,
        activeOrders,
        totalUsers,
        storesCount,
        ordersPerHour: 86,
        slaBreachRate: '1.8%',
        kycPendingQueue: 12,
        dryDayStatus: false,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
