import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../db/prisma';
import { validateBody } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

const calculateCartSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
    })
  ),
  couponCode: z.string().optional(),
});

/**
 * POST /api/v1/cart/calculate
 */
router.post('/calculate', validateBody(calculateCartSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items, couponCode } = req.body;

    if (items.length === 0) {
      res.json({
        success: true,
        calculation: {
          itemTotal: 0,
          deliveryFee: 0,
          taxes: 0,
          discount: 0,
          grandTotal: 0,
          items: [],
        },
      });
      return;
    }

    const productIds = items.map((i: any) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    let itemTotal = 0;
    const resolvedItems = [];

    for (const item of items) {
      const p = productMap.get(item.productId);
      if (p) {
        const itemSubtotal = p.mrp * item.quantity;
        itemTotal += itemSubtotal;
        resolvedItems.push({
          productId: p.id,
          name: p.name,
          mrp: p.mrp,
          quantity: item.quantity,
          subtotal: itemSubtotal,
          imageUrl: p.imageUrl,
        });
      }
    }

    // Blinkit pricing rules
    const deliveryFee = itemTotal >= 499 ? 0 : 25; // Free delivery above ₹499
    const taxes = Math.round(itemTotal * 0.05); // 5% VAT / State excise cess
    let discount = 0;

    if (couponCode?.toUpperCase() === 'DRINKIT100') {
      discount = Math.min(100, itemTotal * 0.2);
    }

    const grandTotal = Math.max(0, itemTotal + deliveryFee + taxes - discount);

    res.json({
      success: true,
      calculation: {
        itemTotal,
        deliveryFee,
        taxes,
        discount,
        grandTotal,
        freeDeliveryEligible: itemTotal >= 499,
        freeDeliveryThresholdRemaining: Math.max(0, 499 - itemTotal),
        items: resolvedItems,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/cart/sync
 */
router.post('/sync', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items } = req.body;
    const userId = req.user!.id;

    const cart = await prisma.cart.upsert({
      where: { id: userId }, // or user relation
      update: { itemsJson: JSON.stringify(items || []) },
      create: {
        id: userId,
        userId,
        itemsJson: JSON.stringify(items || []),
      },
    });

    res.json({ success: true, message: 'Cart synchronized', cart });
  } catch (err) {
    next(err);
  }
});

export default router;
