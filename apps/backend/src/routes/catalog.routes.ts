import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db/prisma';

const router = Router();

const CATEGORIES = [
  { id: 'beer', name: 'Beer', icon: '🍺', description: 'Craft, Premium & Strong Lagers' },
  { id: 'whisky', name: 'Whisky & Scotch', icon: '🥃', description: 'Single Malts, Blends & Bourbons' },
  { id: 'vodka', name: 'Vodka', icon: '🍸', description: 'Crisp & Triple-Distilled Spirits' },
  { id: 'rum', name: 'Rum', icon: '🍹', description: 'Dark, Spiced & White Rums' },
  { id: 'wine', name: 'Wine', icon: '🍷', description: 'Red, White & Sparkling Sula/Jacob\'s' },
  { id: 'gin', name: 'Gin', icon: '🌿', description: 'Botanical & Artisanal Gins' },
  { id: 'mixers', name: 'Mixers & Tonics', icon: '🥤', description: 'Tonics, Ginger Ale, Red Bull & Sodas' },
  { id: 'snacks', name: 'Bar Snacks & Ice', icon: '🧊', description: 'Ice Bags, Peanuts & Chips' },
];

/**
 * GET /api/v1/catalog/categories
 */
router.get('/categories', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    categories: CATEGORIES,
  });
});

/**
 * GET /api/v1/catalog/products
 */
router.get('/products', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, brand, limit = 50 } = req.query;

    const whereClause: any = {};

    if (category && typeof category === 'string') {
      whereClause.category = { equals: category.toUpperCase() };
    }

    if (brand && typeof brand === 'string') {
      whereClause.brand = { contains: brand };
    }

    if (search && typeof search === 'string') {
      whereClause.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      take: Number(limit),
      orderBy: { name: 'asc' },
    });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/catalog/products/:id
 */
router.get('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        inventory: {
          select: {
            storeId: true,
            price: true,
            stockQty: true,
            isAvailable: true,
          },
        },
      },
    });

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
});

export default router;
