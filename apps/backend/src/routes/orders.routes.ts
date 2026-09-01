import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../db/prisma';
import { validateBody } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { notifyOrderUpdate } from '../sockets/tracking.socket';
import { GeoService } from '../services/geo.service';
import { SmsService } from '../services/sms.service';

const router = Router();

const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
    })
  ).min(1, 'Cart cannot be empty'),
  address: z.object({
    addressLine1: z.string(),
    city: z.string().default('Bengaluru'),
    state: z.string().default('Karnataka'),
    pincode: z.string().default('560095'),
    latitude: z.number().default(12.9352),
    longitude: z.number().default(77.6245),
  }),
  paymentMethod: z.enum(['UPI', 'CARD', 'NET_BANKING', 'WALLET']).default('UPI'),
});

/**
 * POST /api/v1/orders - Place 10-minute instant delivery order
 */
router.post('/', authenticate, validateBody(createOrderSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items, address: addrInput, paymentMethod } = req.body;
    const userId = req.user!.id;
    const userPhone = req.user!.phone;

    // Find nearest store
    const store = await prisma.store.findFirst({
      where: { isActive: true },
    });

    if (!store) {
      res.status(400).json({ success: false, message: 'No licensed dark stores available in your delivery zone.' });
      return;
    }

    // SLA Distance calculation
    const sla = GeoService.estimateSla(
      { latitude: store.latitude, longitude: store.longitude },
      { latitude: addrInput.latitude, longitude: addrInput.longitude }
    );

    if (!sla.isServiceable) {
      res.status(400).json({
        success: false,
        message: `Delivery location is ${sla.distanceKm} km away, which exceeds our 5 km express service radius.`,
      });
      return;
    }

    // Save or find address
    let address = await prisma.address.findFirst({ where: { userId } });
    if (!address) {
      address = await prisma.address.create({
        data: {
          userId,
          addressLine1: addrInput.addressLine1,
          city: addrInput.city,
          state: addrInput.state,
          pincode: addrInput.pincode,
          latitude: addrInput.latitude,
          longitude: addrInput.longitude,
          isDefault: true,
        },
      });
    }

    // Calculate totals
    const productIds = items.map((i: any) => i.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
    const productMap = new Map(products.map((p) => [p.id, p]));

    let itemTotal = 0;
    const orderItemsData = [];

    for (const item of items) {
      const p = productMap.get(item.productId);
      if (p) {
        const sub = p.mrp * item.quantity;
        itemTotal += sub;
        orderItemsData.push({
          productId: p.id,
          quantity: item.quantity,
          unitPrice: p.mrp,
          totalPrice: sub,
        });
      }
    }

    const deliveryFee = itemTotal >= 499 ? 0 : 25;
    const taxes = Math.round(itemTotal * 0.05);
    const grandTotal = itemTotal + deliveryFee + taxes;

    const orderNumber = `DK-${Math.floor(1000 + Math.random() * 9000)}`;
    const deliveryOtp = String(Math.floor(1000 + Math.random() * 9000));

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        storeId: store.id,
        addressId: address.id,
        status: 'CONFIRMED',
        itemTotal,
        deliveryFee,
        taxes,
        discount: 0,
        grandTotal,
        otp: deliveryOtp,
        orderItems: { create: orderItemsData },
        payments: {
          create: {
            amount: grandTotal,
            method: paymentMethod,
            status: 'SUCCESS',
          },
        },
      },
      include: {
        orderItems: { include: { product: true } },
        store: true,
        address: true,
      },
    });

    // Realtime notification to store and tracking room
    notifyOrderUpdate(order.id, {
      status: 'CONFIRMED',
      step: 1,
      etaMinutes: sla.etaMinutes,
      orderNumber: order.orderNumber,
    });

    // Send Confirmation SMS
    await SmsService.sendSms({
      to: userPhone,
      template: 'ORDER_PLACED',
      variables: {
        orderNumber: order.orderNumber,
        orderId: order.id,
      },
    });

    res.json({
      success: true,
      message: `Order confirmed! Dark store is packing for ${sla.serviceZone}.`,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        grandTotal: order.grandTotal,
        otp: order.otp,
        storeName: order.store.name,
        distanceKm: sla.distanceKm,
        etaMinutes: sla.etaMinutes,
        serviceZone: sla.serviceZone,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
});


/**
 * GET /api/v1/orders - User order history
 */
router.get('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: {
        orderItems: { include: { product: true } },
        store: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/orders/:id - Order detail & live status
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id }, { orderNumber: id }],
      },
      include: {
        orderItems: { include: { product: true } },
        store: true,
        address: true,
        payments: true,
      },
    });

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
});

export default router;
