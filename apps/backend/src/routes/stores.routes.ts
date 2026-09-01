import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db/prisma';
import { notifyOrderUpdate } from '../sockets/tracking.socket';

const router = Router();

/**
 * GET /api/v1/stores/nearby
 */
router.get('/nearby', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stores = await prisma.store.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        licenseNo: true,
        address: true,
        city: true,
        openTime: true,
        closeTime: true,
        latitude: true,
        longitude: true,
      },
    });

    res.json({ success: true, count: stores.length, stores });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/stores/:id/orders - Store packing queue
 */
router.get('/:id/orders', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const orders = await prisma.order.findMany({
      where: { storeId: id },
      include: {
        orderItems: { include: { product: true } },
        address: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/stores/:id/orders/:orderId/status - Update order state
 */
router.post('/:id/orders/:orderId/status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // 'STORE_ACCEPTED' | 'PACKING' | 'READY_FOR_PICKUP' | 'OUT_FOR_DELIVERY' | 'DELIVERED'

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    notifyOrderUpdate(orderId, {
      status,
      updatedAt: new Date().toISOString(),
    });

    res.json({ success: true, message: `Order status updated to ${status}`, order: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
