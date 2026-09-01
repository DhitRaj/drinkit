import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Drinkit Indian Alcohol & Mixers Catalog...');

  // Clean old data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.storeInventory.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.storeDocument.deleteMany({});
  await prisma.store.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Demo Admin & Dark Store Owner
  const adminUser = await prisma.user.create({
    data: {
      phone: '9876543210',
      email: 'admin@drinkit.in',
      fullName: 'Vikram Mehta (Store Manager)',
      role: 'STORE_ADMIN',
      isAgeVerified: true,
    },
  });

  // 2. Create Koramangala Licensed Dark Store
  const store = await prisma.store.create({
    data: {
      ownerId: adminUser.id,
      name: 'Drinkit Dark Store #01 — Koramangala',
      licenseNo: 'KA-EXCISE-BLR-2026-8941',
      phone: '+91 80 4123 4567',
      address: 'Plot 42, 5th Block, Koramangala Industrial Layout',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560095',
      latitude: 12.9352,
      longitude: 77.6245,
      openTime: '10:00',
      closeTime: '23:30',
      isActive: true,
    },
  });

  // 3. Products
  const products = [
    // --- BEERS ---
    {
      name: 'Kingfisher Premium Lager Beer',
      brand: 'Kingfisher',
      category: 'BEER',
      abv: 4.8,
      volumeMl: 650,
      mrp: 170,
      description: 'The King of Good Times. Crisp, smooth, and refreshing iconic Indian lager.',
      imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Bira 91 White Craft Beer (Can)',
      brand: 'Bira 91',
      category: 'BEER',
      abv: 4.9,
      volumeMl: 500,
      mrp: 210,
      description: 'Deliciously refreshing wheat beer with subtle citrus and coriander aromas.',
      imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Budweiser Magnum Strong Beer',
      brand: 'Budweiser',
      category: 'BEER',
      abv: 6.5,
      volumeMl: 650,
      mrp: 220,
      description: 'Super-premium strong beer with high quality hops and smooth finish.',
      imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Corona Extra Premium Beer',
      brand: 'Corona',
      category: 'BEER',
      abv: 4.5,
      volumeMl: 330,
      mrp: 240,
      description: 'Iconic Mexican beer, crisp and light, best enjoyed with a fresh lime wedge.',
      imageUrl: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Heineken Silver Lager',
      brand: 'Heineken',
      category: 'BEER',
      abv: 4.0,
      volumeMl: 500,
      mrp: 195,
      description: 'Extra-refreshing lager brewed at -1°C for a crisp, smooth taste.',
      imageUrl: 'https://images.unsplash.com/photo-1618886614638-80e3c15cd819?auto=format&fit=crop&w=600&q=80',
    },

    // --- WHISKY & SCOTCH ---
    {
      name: 'Johnnie Walker Black Label 12 Yrs',
      brand: 'Johnnie Walker',
      category: 'WHISKY',
      abv: 40.0,
      volumeMl: 750,
      mrp: 3250,
      description: 'The definitive blend of 12-year-old whiskies with rich, smoky, and complex fruit notes.',
      imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Glenfiddich 12 Year Old Single Malt',
      brand: 'Glenfiddich',
      category: 'WHISKY',
      abv: 40.0,
      volumeMl: 750,
      mrp: 4950,
      description: 'World’s most awarded single malt scotch with sweet pear notes and subtle oak.',
      imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Jameson Triple Distilled Irish Whiskey',
      brand: 'Jameson',
      category: 'WHISKY',
      abv: 40.0,
      volumeMl: 750,
      mrp: 2350,
      description: 'Exceptionally smooth triple-distilled blended Irish whiskey with hints of vanilla.',
      imageUrl: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Royal Challenge American Pride Whisky',
      brand: 'Royal Challenge',
      category: 'WHISKY',
      abv: 42.8,
      volumeMl: 750,
      mrp: 850,
      description: 'Rich blend infused with American oak barrel aged scotch.',
      imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    },

    // --- VODKA ---
    {
      name: 'Absolut Swedish Vodka Original',
      brand: 'Absolut',
      category: 'VODKA',
      abv: 40.0,
      volumeMl: 750,
      mrp: 1750,
      description: 'Crafted from winter wheat, continuous distillation for distinct grain character and crisp purity.',
      imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Smirnoff Triple Distilled Vodka',
      brand: 'Smirnoff',
      category: 'VODKA',
      abv: 37.5,
      volumeMl: 750,
      mrp: 1100,
      description: 'Triple distilled and 10 times filtered for extraordinary smoothness.',
      imageUrl: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=600&q=80',
    },

    // --- RUM ---
    {
      name: 'Old Monk XXX Very Old Vatted Rum',
      brand: 'Old Monk',
      category: 'RUM',
      abv: 42.8,
      volumeMl: 750,
      mrp: 520,
      description: 'The legendary Indian dark rum aged in oak vats. Notes of vanilla, caramel and dark chocolate.',
      imageUrl: 'https://images.unsplash.com/photo-1614313511387-1436a4480ebb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Bacardi Carta Blanca Superior White Rum',
      brand: 'Bacardi',
      category: 'RUM',
      abv: 40.0,
      volumeMl: 750,
      mrp: 1250,
      description: 'Classic white rum aged in white oak barrels, ideal for Mojitos and Cuba Libres.',
      imageUrl: 'https://images.unsplash.com/photo-1550985543-f47f38aeee65?auto=format&fit=crop&w=600&q=80',
    },

    // --- GIN ---
    {
      name: 'Greater Than London Dry Craft Gin',
      brand: 'Greater Than',
      category: 'GIN',
      abv: 42.8,
      volumeMl: 750,
      mrp: 1450,
      description: 'India’s pioneering craft gin with juniper, coriander seeds, lemongrass, ginger and chamomile.',
      imageUrl: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Bombay Sapphire Botanical Gin',
      brand: 'Bombay Sapphire',
      category: 'GIN',
      abv: 40.0,
      volumeMl: 750,
      mrp: 2450,
      description: 'Vapour-infused with 10 exotic botanicals for an exceptionally bright and fresh profile.',
      imageUrl: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80',
    },

    // --- WINE ---
    {
      name: 'Jacob’s Creek Shiraz Cabernet Red Wine',
      brand: 'Jacob’s Creek',
      category: 'WINE',
      abv: 13.5,
      volumeMl: 750,
      mrp: 1450,
      description: 'Medium-bodied Australian red wine with spicy blackberry and plum aromas.',
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Sula Vineyards Sauvignon Blanc',
      brand: 'Sula',
      category: 'WINE',
      abv: 12.0,
      volumeMl: 750,
      mrp: 850,
      description: 'Nashik valley dry white wine with intense aromas of bell peppers and fresh cut grass.',
      imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80',
    },

    // --- MIXERS & TONICS ---
    {
      name: 'Schweppes Indian Tonic Water (Can)',
      brand: 'Schweppes',
      category: 'MIXERS',
      volumeMl: 300,
      mrp: 60,
      description: 'Classic effervescent tonic with a quinine kick. Perfect gin partner.',
      imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Red Bull Energy Drink (Can)',
      brand: 'Red Bull',
      category: 'MIXERS',
      volumeMl: 250,
      mrp: 125,
      description: 'Vitalizes body and mind with premium taurine and B-group vitamins.',
      imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    },

    // --- BAR SNACKS & ICE ---
    {
      name: 'Drinkit Pure Crystal Ice Cubes Bag',
      brand: 'Drinkit Cold',
      category: 'SNACKS',
      volumeMl: 1000,
      mrp: 50,
      description: '1 kg food-grade purified crystalline ice cubes. Delivered frozen in 10 mins.',
      imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    },
  ];

  for (const prod of products) {
    const createdProd = await prisma.product.create({
      data: {
        name: prod.name,
        brand: prod.brand,
        category: prod.category,
        abv: prod.abv || null,
        volumeMl: prod.volumeMl,
        mrp: prod.mrp,
        description: prod.description,
        imageUrl: prod.imageUrl,
      },
    });

    // Link into Dark Store Inventory with 50 units stock
    await prisma.storeInventory.create({
      data: {
        storeId: store.id,
        productId: createdProd.id,
        price: prod.mrp,
        stockQty: 50,
        isAvailable: true,
      },
    });
  }

  console.log(`✅ Successfully seeded ${products.length} products into ${store.name}!`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
