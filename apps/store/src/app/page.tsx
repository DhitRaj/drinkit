'use client';

import React, { useState, useMemo, useEffect } from 'react';

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: 'beer' | 'whiskey' | 'wine' | 'vodka' | 'rum' | 'gin' | 'mixers' | 'snacks' | 'ice';
  volume: string;
  abv: string;
  price: number;
  mrp: number;
  stock: number;
  minThreshold: number;
  inStock: boolean;
  isChilled: boolean;
  rackLocation: string;
  imageUrl: string;
};

export type OrderItem = {
  name: string;
  volume: string;
  quantity: number;
  price: number;
  isChilled: boolean;
  rackLocation: string;
  imageUrl: string;
  picked?: boolean;
};

export type StoreOrder = {
  id: string;
  customerName: string;
  customerPhone: string;
  placedTime: string;
  countdownSec: number;
  status: 'NEW' | 'PREPARING' | 'READY_PICKUP' | 'DELIVERED' | 'CANCELLED';
  paymentMode: 'UPI_ONLINE' | 'CARD_ONLINE' | 'COD';
  totalAmount: number;
  storeEarnings: number;
  deliveryPartner?: {
    name: string;
    phone: string;
    vehicle: string;
    etaMins: number;
  };
  items: OrderItem[];
};

const MASTER_CATALOG: Omit<Product, 'id' | 'price' | 'stock' | 'minThreshold' | 'inStock' | 'rackLocation'>[] = [
  {
    name: 'Kingfisher Premium Lager Beer',
    brand: 'Kingfisher',
    category: 'beer',
    volume: '330ml Can',
    abv: '4.8%',
    mrp: 80,
    isChilled: true,
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Budweiser Magnum Strong Beer',
    brand: 'Budweiser',
    category: 'beer',
    volume: '650ml Bottle',
    abv: '6.5%',
    mrp: 160,
    isChilled: true,
    imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Corona Extra Imported Beer',
    brand: 'Corona',
    category: 'beer',
    volume: '355ml Pint',
    abv: '4.5%',
    mrp: 250,
    isChilled: true,
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Bira 91 White Craft Beer',
    brand: 'Bira 91',
    category: 'beer',
    volume: '330ml Can',
    abv: '4.9%',
    mrp: 140,
    isChilled: true,
    imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Johnnie Walker Black Label 12YR',
    brand: 'Johnnie Walker',
    category: 'whiskey',
    volume: '750ml Bottle',
    abv: '40%',
    mrp: 2499,
    isChilled: false,
    imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Glenfiddich 12 Year Single Malt',
    brand: 'Glenfiddich',
    category: 'whiskey',
    volume: '750ml Bottle',
    abv: '40%',
    mrp: 4800,
    isChilled: false,
    imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Smirnoff Triple Distilled Vodka',
    brand: 'Smirnoff',
    category: 'vodka',
    volume: '750ml Bottle',
    abv: '40%',
    mrp: 1200,
    isChilled: true,
    imageUrl: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Absolut Swedish Premium Vodka',
    brand: 'Absolut',
    category: 'vodka',
    volume: '750ml Bottle',
    abv: '40%',
    mrp: 2100,
    isChilled: true,
    imageUrl: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Bacardi Carta Blanca White Rum',
    brand: 'Bacardi',
    category: 'rum',
    volume: '750ml Bottle',
    abv: '40%',
    mrp: 1400,
    isChilled: false,
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Bombay Sapphire Botanical Gin',
    brand: 'Bombay Sapphire',
    category: 'gin',
    volume: '750ml Bottle',
    abv: '47%',
    mrp: 2750,
    isChilled: false,
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Sula Sauvignon Blanc White Wine',
    brand: 'Sula Vineyards',
    category: 'wine',
    volume: '750ml Bottle',
    abv: '12.5%',
    mrp: 999,
    isChilled: true,
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Schweppes Tonic Water (Pack of 4)',
    brand: 'Schweppes',
    category: 'mixers',
    volume: '4 x 250ml',
    abv: '0%',
    mrp: 240,
    isChilled: true,
    imageUrl: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Party Ice Cubes Bag',
    brand: 'ClearIce',
    category: 'ice',
    volume: '2 Kg Bag',
    abv: '0%',
    mrp: 120,
    isChilled: true,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
  },
];

const INITIAL_STORE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Kingfisher Premium Lager Beer',
    brand: 'Kingfisher',
    category: 'beer',
    volume: '330ml Can',
    abv: '4.8%',
    price: 65,
    mrp: 80,
    stock: 48,
    minThreshold: 10,
    inStock: true,
    isChilled: true,
    rackLocation: 'Chiller-1',
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prod-2',
    name: 'Budweiser Magnum Strong Beer',
    brand: 'Budweiser',
    category: 'beer',
    volume: '650ml Bottle',
    abv: '6.5%',
    price: 120,
    mrp: 160,
    stock: 24,
    minThreshold: 8,
    inStock: true,
    isChilled: true,
    rackLocation: 'Chiller-2',
    imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prod-3',
    name: 'Corona Extra Imported Beer',
    brand: 'Corona',
    category: 'beer',
    volume: '355ml Pint',
    abv: '4.5%',
    price: 210,
    mrp: 250,
    stock: 4,
    minThreshold: 6,
    inStock: true,
    isChilled: true,
    rackLocation: 'Chiller-3',
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prod-4',
    name: 'Johnnie Walker Black Label 12YR',
    brand: 'Johnnie Walker',
    category: 'whiskey',
    volume: '750ml Bottle',
    abv: '40%',
    price: 1999,
    mrp: 2499,
    stock: 12,
    minThreshold: 4,
    inStock: true,
    isChilled: false,
    rackLocation: 'Rack A-4',
    imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prod-5',
    name: 'Smirnoff Triple Distilled Vodka',
    brand: 'Smirnoff',
    category: 'vodka',
    volume: '750ml Bottle',
    abv: '40%',
    price: 960,
    mrp: 1200,
    stock: 0,
    minThreshold: 5,
    inStock: false,
    isChilled: true,
    rackLocation: 'Rack B-1',
    imageUrl: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prod-6',
    name: 'Sula Sauvignon Blanc White Wine',
    brand: 'Sula Vineyards',
    category: 'wine',
    volume: '750ml Bottle',
    abv: '12.5%',
    price: 899,
    mrp: 999,
    stock: 18,
    minThreshold: 5,
    inStock: true,
    isChilled: true,
    rackLocation: 'Wine Cellar 2',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80',
  },
];

const INITIAL_ORDERS: StoreOrder[] = [
  {
    id: 'DK-1048',
    customerName: 'Rahul Verma',
    customerPhone: '+91 98765 43210',
    placedTime: '1 min ago',
    countdownSec: 85,
    status: 'NEW',
    paymentMode: 'UPI_ONLINE',
    totalAmount: 1180,
    storeEarnings: 1085,
    deliveryPartner: {
      name: 'Amit Kumar (Blinkit Rider)',
      phone: '+91 99887 76655',
      vehicle: 'Hero Electric (KA-01-EQ-9012)',
      etaMins: 4,
    },
    items: [
      {
        name: 'Kingfisher Premium Lager Beer',
        volume: '330ml Can',
        quantity: 4,
        price: 65,
        isChilled: true,
        rackLocation: 'Chiller-1',
        imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80',
        picked: false,
      },
      {
        name: 'Schweppes Tonic Water (Pack of 4)',
        volume: '4 x 250ml',
        quantity: 1,
        price: 199,
        isChilled: true,
        rackLocation: 'Chiller-4',
        imageUrl: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80',
        picked: false,
      },
    ],
  },
  {
    id: 'DK-1045',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98111 22334',
    placedTime: '4 min ago',
    countdownSec: 0,
    status: 'PREPARING',
    paymentMode: 'UPI_ONLINE',
    totalAmount: 2499,
    storeEarnings: 2299,
    deliveryPartner: {
      name: 'Vikas Rao (Blinkit Rider)',
      phone: '+91 97711 33445',
      vehicle: 'Honda Activa (KA-05-MK-4421)',
      etaMins: 2,
    },
    items: [
      {
        name: 'Johnnie Walker Black Label 12YR',
        volume: '750ml Bottle',
        quantity: 1,
        price: 1999,
        isChilled: false,
        rackLocation: 'Rack A-4',
        imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=400&q=80',
        picked: true,
      },
    ],
  },
  {
    id: 'DK-1042',
    customerName: 'Ankit Mehta',
    customerPhone: '+91 97123 45678',
    placedTime: '8 min ago',
    countdownSec: 0,
    status: 'READY_PICKUP',
    paymentMode: 'CARD_ONLINE',
    totalAmount: 1850,
    storeEarnings: 1702,
    deliveryPartner: {
      name: 'Deepak Singh (Blinkit Rider)',
      phone: '+91 96554 11223',
      vehicle: 'Ather 450X (KA-03-JJ-7788)',
      etaMins: 1,
    },
    items: [
      {
        name: 'Budweiser Magnum Strong Beer',
        volume: '650ml Bottle',
        quantity: 3,
        price: 120,
        isChilled: true,
        rackLocation: 'Chiller-2',
        imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=400&q=80',
        picked: true,
      },
      {
        name: 'Corona Extra Imported Beer',
        volume: '355ml Pint',
        quantity: 2,
        price: 210,
        isChilled: true,
        rackLocation: 'Chiller-3',
        imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80',
        picked: true,
      },
    ],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: '🛒', count: 184 },
  { id: 'beer', label: 'Beer', icon: '🍺', count: 56 },
  { id: 'whiskey', label: 'Whiskey', icon: '🥃', count: 42 },
  { id: 'wine', label: 'Wine', icon: '🍷', count: 31 },
  { id: 'vodka', label: 'Vodka', icon: '🍸', count: 24 },
  { id: 'rum', label: 'Rum', icon: '🍹', count: 18 },
  { id: 'gin', label: 'Gin', icon: '🫒', count: 14 },
  { id: 'mixers', label: 'Mixers & Soda', icon: '🥤', count: 28 },
  { id: 'snacks', label: 'Snacks', icon: '🍿', count: 35 },
  { id: 'ice', label: 'Ice & Extras', icon: '🧊', count: 12 },
] as const;

export default function StorePartnerPortal() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'reports'>('inventory');
  const [isStoreOnline, setIsStoreOnline] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Inventory States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [products, setProducts] = useState<Product[]>(INITIAL_STORE_PRODUCTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Orders States
  const [orders, setOrders] = useState<StoreOrder[]>(INITIAL_ORDERS);
  const [orderStatusFilter, setOrderStatusFilter] = useState<'ALL' | 'NEW' | 'PREPARING' | 'READY_PICKUP' | 'COMPLETED'>('ALL');

  // Add Product Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<'catalog' | 'custom'>('catalog');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedCatalogItem, setSelectedCatalogItem] = useState<(typeof MASTER_CATALOG)[0] | null>(null);

  // Custom Form State
  const [customForm, setCustomForm] = useState({
    name: '',
    brand: '',
    category: 'beer' as Product['category'],
    volume: '330ml Can',
    abv: '5.0%',
    mrp: 150,
    price: 130,
    stock: 20,
    minThreshold: 5,
    isChilled: true,
    rackLocation: 'Chiller 1',
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80',
  });

  // Clock Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1-Click Availability Toggle
  const handleToggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStatus = !p.inStock;
          showToast(`${p.name} is now ${newStatus ? '🟢 LIVE IN APP' : '🔴 DISABLED (Out of Stock)'}`);
          return { ...p, inStock: newStatus, stock: newStatus && p.stock === 0 ? 10 : p.stock };
        }
        return p;
      })
    );
  };

  // Stock Stepper
  const handleUpdateStockCount = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStock = Math.max(0, p.stock + delta);
          return {
            ...p,
            stock: newStock,
            inStock: newStock > 0,
          };
        }
        return p;
      })
    );
  };

  // Order Actions
  const handleAcceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'PREPARING' } : o))
    );
    showToast(`🔔 Order ${orderId} ACCEPTED! Assigned to picking.`);
  };

  const handleTogglePickItem = (orderId: string, itemIdx: number) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedItems = [...o.items];
          updatedItems[itemIdx] = {
            ...updatedItems[itemIdx],
            picked: !updatedItems[itemIdx].picked,
          };
          return { ...o, items: updatedItems };
        }
        return o;
      })
    );
  };

  const handleMarkReady = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'READY_PICKUP' } : o))
    );
    showToast(`✅ Order ${orderId} PACKED! Rider notified for pickup.`);
  };

  const handleHandoverToRider = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'DELIVERED' } : o))
    );
    showToast(`🛵 Handover verified for ${orderId}!`);
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'CANCELLED' } : o))
    );
    showToast(`❌ Order ${orderId} cancelled.`);
  };

  // Add from Master Catalog
  const handleAddMasterProduct = () => {
    if (!selectedCatalogItem) return;
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: selectedCatalogItem.name,
      brand: selectedCatalogItem.brand,
      category: selectedCatalogItem.category,
      volume: selectedCatalogItem.volume,
      abv: selectedCatalogItem.abv,
      mrp: customForm.mrp || selectedCatalogItem.mrp,
      price: customForm.price || Math.round(selectedCatalogItem.mrp * 0.9),
      stock: customForm.stock || 24,
      minThreshold: customForm.minThreshold || 5,
      inStock: true,
      isChilled: selectedCatalogItem.isChilled,
      rackLocation: customForm.rackLocation || 'Front Shelf',
      imageUrl: selectedCatalogItem.imageUrl,
    };

    setProducts((prev) => [newProd, ...prev]);
    setIsAddModalOpen(false);
    setSelectedCatalogItem(null);
    showToast(`✨ "${newProd.name}" added to Store Inventory!`);
  };

  // Add Custom Drink
  const handleAddCustomProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customForm.name || !customForm.price) return;
    const newProd: Product = {
      id: `custom-${Date.now()}`,
      name: customForm.name,
      brand: customForm.brand || 'Local Specialty',
      category: customForm.category,
      volume: customForm.volume,
      abv: customForm.abv,
      mrp: Number(customForm.mrp),
      price: Number(customForm.price),
      stock: Number(customForm.stock),
      minThreshold: Number(customForm.minThreshold),
      inStock: Number(customForm.stock) > 0,
      isChilled: customForm.isChilled,
      rackLocation: customForm.rackLocation,
      imageUrl: customForm.imageUrl,
    };

    setProducts((prev) => [newProd, ...prev]);
    setIsAddModalOpen(false);
    showToast(`✅ "${newProd.name}" is now live in app!`);
  };

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.rackLocation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'in_stock' && p.inStock && p.stock > p.minThreshold) ||
        (stockFilter === 'low_stock' && p.inStock && p.stock <= p.minThreshold && p.stock > 0) ||
        (stockFilter === 'out_of_stock' && (!p.inStock || p.stock === 0));

      return matchesCategory && matchesSearch && matchesStock;
    });
  }, [products, selectedCategory, searchQuery, stockFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderStatusFilter === 'ALL') return true;
      if (orderStatusFilter === 'COMPLETED') return o.status === 'DELIVERED';
      return o.status === orderStatusFilter;
    });
  }, [orders, orderStatusFilter]);

  const newOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status === 'NEW').length;
  }, [orders]);

  const filteredCatalog = useMemo(() => {
    return MASTER_CATALOG.filter(
      (m) =>
        m.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        m.brand.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        m.category.toLowerCase().includes(catalogSearch.toLowerCase())
    );
  }, [catalogSearch]);

  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.inStock && p.stock > 0).length;
    const lowStock = products.filter((p) => p.inStock && p.stock <= p.minThreshold && p.stock > 0).length;
    const outStock = products.filter((p) => !p.inStock || p.stock === 0).length;
    return { total, active, lowStock, outStock };
  }, [products]);

  return (
    <div style={ui.wrapper}>
      {/* Toast Notification */}
      {toastMessage && <div style={ui.toast}>{toastMessage}</div>}

      {/* Top Navbar */}
      <header style={ui.topBar}>
        <div style={ui.topBarLeft}>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={ui.mobileMenuBtn}>
            ☰
          </button>
          <div style={ui.brandGroup}>
            <span style={ui.brandEmoji}>⚡</span>
            <div>
              <div style={ui.brandText}>drinkit <span style={ui.partnerTag}>PARTNER</span></div>
              <div style={ui.storeLocationText}>Koramangala Dark Hub · #104</div>
            </div>
          </div>
        </div>

        <div style={ui.topBarCenter}>
          <div style={ui.liveStatusBadge}>
            <span style={{ ...ui.statusDot, background: isStoreOnline ? '#10B981' : '#EF4444' }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: isStoreOnline ? '#065F46' : '#991B1B' }}>
              {isStoreOnline ? 'STORE ONLINE (ACCEPTING ORDERS)' : 'STORE PAUSED (OFFLINE)'}
            </span>
            <button
              onClick={() => {
                setIsStoreOnline(!isStoreOnline);
                showToast(isStoreOnline ? 'Store paused for incoming orders' : 'Store is now LIVE and accepting orders!');
              }}
              style={ui.toggleOnlineBtn}
            >
              {isStoreOnline ? 'Pause' : 'Go Live'}
            </button>
          </div>
        </div>

        <div style={ui.topBarRight}>
          <div style={ui.clockPill}>🕒 {currentTime || 'Live'}</div>
          <button
            onClick={() => {
              setIsSoundEnabled(!isSoundEnabled);
              showToast(isSoundEnabled ? '🔔 Order ringtone muted' : '🔔 Order ringtone ENABLED');
            }}
            style={{ ...ui.iconCircleBtn, background: isSoundEnabled ? '#E8F7EC' : '#F1F5F9' }}
            title="Toggle Order Sound"
          >
            {isSoundEnabled ? '🔔' : '🔕'}
          </button>
          <div style={ui.profileAvatar}>KC</div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div style={ui.bodyLayout}>
        {/* Desktop & Mobile Drawer Sidebar */}
        <aside style={{ ...ui.sidebar, ...(mobileMenuOpen ? ui.sidebarMobileOpen : {}) }}>
          <div style={ui.sidebarHeader}>
            <div style={ui.sidebarSectionTitle}>OPERATIONS TERMINAL</div>
          </div>

          <nav style={ui.sidebarNav}>
            <button
              onClick={() => {
                setActiveTab('inventory');
                setMobileMenuOpen(false);
              }}
              style={{
                ...ui.sidebarItem,
                ...(activeTab === 'inventory' ? ui.sidebarItemActive : {}),
              }}
            >
              <span style={ui.sidebarItemIcon}>📦</span>
              <span style={{ flex: 1 }}>Inventory & Catalog</span>
              <span style={ui.sidebarCountPill}>{products.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('orders');
                setMobileMenuOpen(false);
              }}
              style={{
                ...ui.sidebarItem,
                ...(activeTab === 'orders' ? ui.sidebarItemActive : {}),
              }}
            >
              <span style={ui.sidebarItemIcon}>🔔</span>
              <span style={{ flex: 1 }}>Live POS Orders</span>
              {newOrdersCount > 0 && <span style={ui.sidebarAlertPill}>{newOrdersCount} NEW</span>}
            </button>

            <button
              onClick={() => {
                setActiveTab('reports');
                setMobileMenuOpen(false);
              }}
              style={{
                ...ui.sidebarItem,
                ...(activeTab === 'reports' ? ui.sidebarItemActive : {}),
              }}
            >
              <span style={ui.sidebarItemIcon}>📊</span>
              <span style={{ flex: 1 }}>Sales & Settlements</span>
            </button>
          </nav>

          <div style={ui.sidebarFooterCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>❄️</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A' }}>Chiller Hub Active</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>Temp: 2.4°C (Optimal)</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Backdrop for Mobile Sidebar */}
        {mobileMenuOpen && <div onClick={() => setMobileMenuOpen(false)} style={ui.mobileBackdrop} />}

        {/* Content View Container */}
        <main style={ui.contentArea}>
          {/* ========================================================================= */}
          {/* TAB 1: INVENTORY & CATALOG VIEW */}
          {/* ========================================================================= */}
          {activeTab === 'inventory' && (
            <div style={ui.tabFadeIn}>
              {/* Page Title & Main Action */}
              <div style={ui.pageHeaderRow}>
                <div>
                  <h1 style={ui.pageTitle}>Inventory & Stock Control</h1>
                  <p style={ui.pageSubtitle}>
                    Real-time drink availability, quick stock increment, and master catalog integration
                  </p>
                </div>
                <button onClick={() => setIsAddModalOpen(true)} style={ui.primaryAddButton}>
                  <span style={{ fontSize: 18, fontWeight: 900 }}>+</span> Add Product
                </button>
              </div>

              {/* KPI Summary Grid */}
              <div style={ui.kpiGrid}>
                <div style={ui.kpiCard}>
                  <div style={ui.kpiLabel}>TOTAL DRINKS IN CATALOG</div>
                  <div style={ui.kpiValue}>{stats.total}</div>
                  <div style={ui.kpiSub}>Across all drink categories</div>
                </div>

                <div style={{ ...ui.kpiCard, borderLeft: '4px solid #10B981' }}>
                  <div style={ui.kpiLabel}>LIVE IN CUSTOMER APP</div>
                  <div style={{ ...ui.kpiValue, color: '#0C831F' }}>{stats.active}</div>
                  <div style={ui.kpiSub}>Ready for instant 10-min delivery</div>
                </div>

                <div style={{ ...ui.kpiCard, borderLeft: '4px solid #F59E0B' }}>
                  <div style={ui.kpiLabel}>LOW STOCK ALERT</div>
                  <div style={{ ...ui.kpiValue, color: '#D97706' }}>{stats.lowStock}</div>
                  <div style={ui.kpiSub}>Less than 5 units left in shelf</div>
                </div>

                <div style={{ ...ui.kpiCard, borderLeft: '4px solid #EF4444' }}>
                  <div style={ui.kpiLabel}>OUT OF STOCK</div>
                  <div style={{ ...ui.kpiValue, color: '#EF4444' }}>{stats.outStock}</div>
                  <div style={ui.kpiSub}>Hidden from customers</div>
                </div>
              </div>

              {/* Category Carousel Pills */}
              <div style={ui.categoryScrollContainer}>
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        ...ui.categoryButton,
                        ...(isSelected ? ui.categoryButtonActive : {}),
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{cat.icon}</span>
                      <span>{cat.label}</span>
                      <span
                        style={{
                          ...ui.categoryCountBadge,
                          background: isSelected ? '#FFFFFF' : '#F1F5F9',
                          color: isSelected ? '#0F172A' : '#64748B',
                        }}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Filter and Search Bar */}
              <div style={ui.filterBar}>
                <div style={ui.searchBoxWrapper}>
                  <span style={{ color: '#94A3B8' }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search by drink name, brand, or shelf rack..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={ui.searchBarInput}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} style={ui.clearSearchBtn}>
                      ✕
                    </button>
                  )}
                </div>

                <div style={ui.statusFilterPills}>
                  {(['all', 'in_stock', 'low_stock', 'out_of_stock'] as const).map((filterKey) => (
                    <button
                      key={filterKey}
                      onClick={() => setStockFilter(filterKey)}
                      style={{
                        ...ui.filterPillBtn,
                        ...(stockFilter === filterKey ? ui.filterPillBtnActive : {}),
                      }}
                    >
                      {filterKey === 'all' && 'All Products'}
                      {filterKey === 'in_stock' && '🟢 In Stock'}
                      {filterKey === 'low_stock' && '⚠️ Low Stock'}
                      {filterKey === 'out_of_stock' && '❌ Out of Stock'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Table Card */}
              <div style={ui.tableWrapperCard}>
                <div style={ui.tableHeadRow}>
                  <div style={{ flex: 3 }}>PRODUCT & DETAILS</div>
                  <div style={{ flex: 1.5 }}>CATEGORY / ABV</div>
                  <div style={{ flex: 1.5 }}>PRICE / MRP</div>
                  <div style={{ flex: 1.8 }}>STOCK QUANTITY</div>
                  <div style={{ flex: 1.8, textAlign: 'center' }}>LIVE AVAILABILITY</div>
                  <div style={{ flex: 1.2, textAlign: 'right' }}>LOCATION</div>
                </div>

                {filteredProducts.length === 0 ? (
                  <div style={ui.emptyView}>
                    <div style={{ fontSize: 44, marginBottom: 12 }}>🔍</div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>No drinks found</div>
                    <div style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>
                      Try adjusting filters or add new drinks to catalog.
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} style={ui.emptyActionButton}>
                      + Add New Drink
                    </button>
                  </div>
                ) : (
                  filteredProducts.map((p) => {
                    const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
                    const isLowStock = p.stock > 0 && p.stock <= p.minThreshold;
                    const isOutOfStock = !p.inStock || p.stock === 0;

                    return (
                      <div key={p.id} style={ui.tableDataRow}>
                        {/* Details */}
                        <div style={{ flex: 3, display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={ui.prodThumbBox}>
                            <img src={p.imageUrl} alt={p.name} style={ui.prodThumbImg} />
                            {p.isChilled && <span style={ui.chilledRibbon}>❄️ Chilled</span>}
                          </div>
                          <div>
                            <div style={ui.prodTitle}>{p.name}</div>
                            <div style={ui.prodSub}>
                              Brand: <strong style={{ color: '#0F172A' }}>{p.brand}</strong> · {p.volume}
                            </div>
                          </div>
                        </div>

                        {/* Category */}
                        <div style={{ flex: 1.5 }}>
                          <span style={ui.categoryTag}>{p.category.toUpperCase()}</span>
                          <div style={{ fontSize: 12, color: '#64748B', marginTop: 4, fontWeight: 700 }}>
                            ABV: {p.abv}
                          </div>
                        </div>

                        {/* Price */}
                        <div style={{ flex: 1.5 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                            <span style={ui.sellingPriceText}>₹{p.price}</span>
                            <span style={ui.mrpPriceText}>₹{p.mrp}</span>
                          </div>
                          {discount > 0 && <span style={ui.discountPill}>{discount}% OFF</span>}
                        </div>

                        {/* Stock Stepper */}
                        <div style={{ flex: 1.8 }}>
                          <div style={ui.stockStepperBox}>
                            <button onClick={() => handleUpdateStockCount(p.id, -1)} style={ui.stepperBtn}>
                              -
                            </button>
                            <span
                              style={{
                                ...ui.stepperCount,
                                color: isOutOfStock ? '#EF4444' : isLowStock ? '#D97706' : '#0C831F',
                              }}
                            >
                              {p.stock}
                            </span>
                            <button onClick={() => handleUpdateStockCount(p.id, 5)} style={ui.stepperBtn}>
                              +5
                            </button>
                          </div>
                          {isLowStock && <div style={ui.lowStockText}>⚠️ Low Stock (≤{p.minThreshold})</div>}
                        </div>

                        {/* Availability Toggle */}
                        <div style={{ flex: 1.8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <label style={ui.switchContainer}>
                            <input
                              type="checkbox"
                              checked={p.inStock && p.stock > 0}
                              onChange={() => handleToggleStock(p.id)}
                              style={ui.switchHiddenInput}
                            />
                            <span
                              style={{
                                ...ui.switchTrack,
                                background: p.inStock && p.stock > 0 ? '#0C831F' : '#CBD5E1',
                              }}
                            >
                              <span
                                style={{
                                  ...ui.switchThumb,
                                  transform: p.inStock && p.stock > 0 ? 'translateX(22px)' : 'translateX(0px)',
                                }}
                              />
                            </span>
                          </label>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 900,
                              marginTop: 4,
                              color: p.inStock && p.stock > 0 ? '#0C831F' : '#94A3B8',
                            }}
                          >
                            {p.inStock && p.stock > 0 ? 'LIVE IN APP' : 'DISABLED'}
                          </span>
                        </div>

                        {/* Location */}
                        <div style={{ flex: 1.2, textAlign: 'right' }}>
                          <span style={ui.rackBadge}>📍 {p.rackLocation}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: LIVE ORDERS (BLINKIT STORE POS TERMINAL) */}
          {/* ========================================================================= */}
          {activeTab === 'orders' && (
            <div style={ui.tabFadeIn}>
              <div style={ui.pageHeaderRow}>
                <div>
                  <h1 style={ui.pageTitle}>Live Order Dispatch Terminal</h1>
                  <p style={ui.pageSubtitle}>
                    Accept instant orders, pick bottles from chillers, and dispatch to waiting delivery riders
                  </p>
                </div>

                {/* Sub-status buttons */}
                <div style={ui.orderStatusSubNav}>
                  {(['ALL', 'NEW', 'PREPARING', 'READY_PICKUP', 'COMPLETED'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      style={{
                        ...ui.orderStatusNavBtn,
                        ...(orderStatusFilter === st ? ui.orderStatusNavBtnActive : {}),
                      }}
                    >
                      {st === 'ALL' && 'All Orders'}
                      {st === 'NEW' && `🚨 New Alert (${orders.filter((o) => o.status === 'NEW').length})`}
                      {st === 'PREPARING' && `⏳ Picking (${orders.filter((o) => o.status === 'PREPARING').length})`}
                      {st === 'READY_PICKUP' && `📦 Ready (${orders.filter((o) => o.status === 'READY_PICKUP').length})`}
                      {st === 'COMPLETED' && '✅ Completed'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List Grid */}
              <div style={ui.ordersContainerGrid}>
                {filteredOrders.length === 0 ? (
                  <div style={ui.emptyView}>
                    <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>No orders in this queue</div>
                    <div style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>
                      Incoming customer orders will ring here in real-time.
                    </div>
                  </div>
                ) : (
                  filteredOrders.map((order) => {
                    const isNew = order.status === 'NEW';
                    const isPreparing = order.status === 'PREPARING';
                    const isReady = order.status === 'READY_PICKUP';

                    return (
                      <div
                        key={order.id}
                        style={{
                          ...ui.posOrderCard,
                          ...(isNew ? ui.posOrderCardNew : {}),
                        }}
                      >
                        {/* Order Header */}
                        <div style={ui.posCardHeader}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <span style={ui.orderCodeBadge}>{order.id}</span>
                              <span style={ui.payPill}>💳 {order.paymentMode.replace('_', ' ')}</span>
                            </div>
                            <div style={ui.orderCustomerText}>
                              Customer: <strong>{order.customerName}</strong> ({order.customerPhone})
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            {isNew && (
                              <div style={ui.countdownPill}>
                                ⏱️ Accept within <strong>01:25s</strong>
                              </div>
                            )}
                            <span
                              style={{
                                ...ui.orderStatePill,
                                background: isNew ? '#FEF2F2' : isPreparing ? '#FEFCE8' : isReady ? '#E8F7EC' : '#F1F5F9',
                                color: isNew ? '#DC2626' : isPreparing ? '#B45309' : isReady ? '#0C831F' : '#475569',
                              }}
                            >
                              {order.status === 'NEW' && '🚨 NEW ORDER (ACCEPT)'}
                              {order.status === 'PREPARING' && '⏳ BOTTLE PICKING IN PROGRESS'}
                              {order.status === 'READY_PICKUP' && '🛵 RIDER ARRIVING AT STORE'}
                              {order.status === 'DELIVERED' && '✅ DELIVERED & PAID'}
                            </span>
                          </div>
                        </div>

                        {/* Items Checklist for Store Pickers */}
                        <div style={ui.pickingChecklistBox}>
                          <div style={ui.checklistHeader}>
                            BOTTLE PICKING CHECKLIST ({order.items.length} ITEMS) — TAP TO MARK PICKED:
                          </div>

                          {order.items.map((it, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleTogglePickItem(order.id, idx)}
                              style={{
                                ...ui.checklistItemRow,
                                opacity: it.picked ? 0.6 : 1,
                                background: it.picked ? '#F8FAFC' : '#FFFFFF',
                              }}
                            >
                              <div style={ui.checkboxBox}>{it.picked ? '✓' : ''}</div>
                              <img src={it.imageUrl} alt={it.name} style={ui.checklistThumb} />
                              <div style={{ flex: 1 }}>
                                <div
                                  style={{
                                    fontWeight: 800,
                                    fontSize: 14,
                                    color: '#0F172A',
                                    textDecoration: it.picked ? 'line-through' : 'none',
                                  }}
                                >
                                  {it.quantity}x {it.name}
                                </div>
                                <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                                  {it.volume} · Location: <strong style={{ color: '#0C831F' }}>{it.rackLocation}</strong>
                                </div>
                              </div>

                              <div style={{ textAlign: 'right' }}>
                                {it.isChilled && <span style={ui.chilledSmallTag}>❄️ Chilled</span>}
                                <div style={{ fontWeight: 800, fontSize: 14, marginTop: 2 }}>
                                  ₹{it.price * it.quantity}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Rider Info Card */}
                        {order.deliveryPartner && (
                          <div style={ui.riderInfoCard}>
                            <span style={{ fontSize: 24 }}>🛵</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
                                {order.deliveryPartner.name}
                              </div>
                              <div style={{ fontSize: 12, color: '#64748B' }}>
                                {order.deliveryPartner.vehicle} · ETA {order.deliveryPartner.etaMins} mins
                              </div>
                            </div>
                            <a href={`tel:${order.deliveryPartner.phone}`} style={ui.callRiderButton}>
                              📞 Call Rider
                            </a>
                          </div>
                        )}

                        {/* Action Buttons Footer */}
                        <div style={ui.posCardFooter}>
                          <div>
                            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 800 }}>YOUR STORE NET PAYOUT:</div>
                            <div style={{ fontSize: 20, fontWeight: 900, color: '#0C831F' }}>₹{order.storeEarnings}</div>
                          </div>

                          <div style={ui.posActionButtons}>
                            {isNew && (
                              <>
                                <button onClick={() => handleRejectOrder(order.id)} style={ui.rejectButton}>
                                  Reject
                                </button>
                                <button onClick={() => handleAcceptOrder(order.id)} style={ui.acceptButton}>
                                  Accept Order (2 min)
                                </button>
                              </>
                            )}

                            {isPreparing && (
                              <button onClick={() => handleMarkReady(order.id)} style={ui.packReadyButton}>
                                ✅ Mark Packed & Ready for Rider
                              </button>
                            )}

                            {isReady && (
                              <button onClick={() => handleHandoverToRider(order.id)} style={ui.handoverButton}>
                                🤝 Handover to Rider & Complete
                              </button>
                            )}

                            {order.status === 'DELIVERED' && (
                              <span style={{ fontSize: 13, fontWeight: 800, color: '#0C831F' }}>
                                🎉 Order Completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: SALES & PAYOUTS VIEW */}
          {/* ========================================================================= */}
          {activeTab === 'reports' && (
            <div style={ui.tabFadeIn}>
              <div style={ui.pageHeaderRow}>
                <div>
                  <h1 style={ui.pageTitle}>Sales, Revenue & Payouts</h1>
                  <p style={ui.pageSubtitle}>
                    Daily GMV, net merchant earnings after 8% commission, and automated bank settlements
                  </p>
                </div>
                <div style={ui.settlementBankBox}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>LINKED BANK ACCOUNT</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
                    🏦 HDFC Bank Ltd (**** 4892)
                  </div>
                  <div style={{ fontSize: 11, color: '#10B981', fontWeight: 800, marginTop: 2 }}>
                    ● Daily Auto-Settlement at 11:59 PM
                  </div>
                </div>
              </div>

              {/* KPI Cards */}
              <div style={ui.kpiGrid}>
                <div style={ui.kpiCard}>
                  <div style={ui.kpiLabel}>TODAY GROSS GMV</div>
                  <div style={ui.kpiValue}>₹42,180</div>
                  <div style={{ ...ui.kpiSub, color: '#10B981', fontWeight: 800 }}>+18.4% vs yesterday</div>
                </div>

                <div style={{ ...ui.kpiCard, borderLeft: '4px solid #0C831F' }}>
                  <div style={ui.kpiLabel}>TODAY NET STORE EARNINGS</div>
                  <div style={{ ...ui.kpiValue, color: '#0C831F' }}>₹38,805</div>
                  <div style={ui.kpiSub}>After 8% Drinkit platform commission</div>
                </div>

                <div style={{ ...ui.kpiCard, borderLeft: '4px solid #3B82F6' }}>
                  <div style={ui.kpiLabel}>AVG FULFILLMENT SPEED</div>
                  <div style={{ ...ui.kpiValue, color: '#2563EB' }}>3.8 mins</div>
                  <div style={ui.kpiSub}>Target &lt; 5 mins (Excellent speed)</div>
                </div>

                <div style={{ ...ui.kpiCard, borderLeft: '4px solid #8B5CF6' }}>
                  <div style={ui.kpiLabel}>ACCEPTANCE RATE</div>
                  <div style={{ ...ui.kpiValue, color: '#7C3AED' }}>98.6%</div>
                  <div style={ui.kpiSub}>42 Accepted / 0 Rejected</div>
                </div>
              </div>

              {/* Charts & Split Layout */}
              <div style={ui.chartsRow}>
                {/* Category Revenue Breakdown */}
                <div style={{ ...ui.analyticsBox, flex: 1.2 }}>
                  <h3 style={ui.analyticsBoxTitle}>🍹 Category Revenue Distribution</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { name: 'Beer (Lager, Strong, Craft)', share: '46%', gmv: '₹19,400', color: '#F59E0B' },
                      { name: 'Whiskey (Single Malt, Scotch)', share: '32%', gmv: '₹13,500', color: '#8B5CF6' },
                      { name: 'Vodka & Gin', share: '12%', gmv: '₹5,060', color: '#3B82F6' },
                      { name: 'Wine & Champagne', share: '6%', gmv: '₹2,530', color: '#EC4899' },
                      { name: 'Mixers, Ice & Snacks', share: '4%', gmv: '₹1,690', color: '#10B981' },
                    ].map((c) => (
                      <div key={c.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
                          <span>{c.name}</span>
                          <span>
                            {c.gmv} ({c.share})
                          </span>
                        </div>
                        <div style={ui.barTrack}>
                          <div style={{ ...ui.barProgress, width: c.share, background: c.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7-Day Weekly Chart */}
                <div style={{ ...ui.analyticsBox, flex: 1 }}>
                  <h3 style={ui.analyticsBoxTitle}>📈 Last 7 Days Revenue Trend</h3>
                  <div style={ui.histogramChart}>
                    {[
                      { day: 'Mon', gmv: '₹34k', height: '60%' },
                      { day: 'Tue', gmv: '₹28k', height: '48%' },
                      { day: 'Wed', gmv: '₹36k', height: '65%' },
                      { day: 'Thu', gmv: '₹39k', height: '70%' },
                      { day: 'Fri', gmv: '₹58k', height: '95%' },
                      { day: 'Sat', gmv: '₹62k', height: '100%' },
                      { day: 'Sun', gmv: '₹42k', height: '75%' },
                    ].map((col) => (
                      <div key={col.day} style={ui.histogramCol}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#0C831F' }}>{col.gmv}</div>
                        <div style={ui.barColumnSlot}>
                          <div style={{ ...ui.barColumnFill, height: col.height }} />
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginTop: 6 }}>{col.day}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Settlement History Table */}
              <div style={ui.tableWrapperCard}>
                <div style={ui.tableHeadRow}>
                  <div style={{ flex: 2 }}>SETTLEMENT ID & DATE</div>
                  <div style={{ flex: 1.5 }}>ORDERS PROCESSED</div>
                  <div style={{ flex: 1.5 }}>GROSS GMV</div>
                  <div style={{ flex: 1.5 }}>COMMISSION (8%)</div>
                  <div style={{ flex: 2 }}>NET SETTLED AMOUNT</div>
                  <div style={{ flex: 1, textAlign: 'right' }}>STATUS</div>
                </div>

                {[
                  { id: 'SETTL-8921', date: 'Yesterday (31 Aug)', orders: 38, gross: '₹54,200', comm: '₹4,336', net: '₹49,864', status: 'PAID' },
                  { id: 'SETTL-8920', date: '30 Aug', orders: 44, gross: '₹61,400', comm: '₹4,912', net: '₹56,488', status: 'PAID' },
                  { id: 'SETTL-8919', date: '29 Aug', orders: 31, gross: '₹39,800', comm: '₹3,184', net: '₹36,616', status: 'PAID' },
                  { id: 'SETTL-8918', date: '28 Aug', orders: 29, gross: '₹35,100', comm: '₹2,808', net: '₹32,292', status: 'PAID' },
                ].map((s) => (
                  <div key={s.id} style={ui.tableDataRow}>
                    <div style={{ flex: 2 }}>
                      <div style={{ fontWeight: 800, fontSize: 14 }}>{s.id}</div>
                      <div style={{ fontSize: 12, color: '#64748B' }}>{s.date}</div>
                    </div>
                    <div style={{ flex: 1.5, fontWeight: 700 }}>{s.orders} Orders</div>
                    <div style={{ flex: 1.5, fontWeight: 700 }}>{s.gross}</div>
                    <div style={{ flex: 1.5, color: '#EF4444', fontWeight: 700 }}>- {s.comm}</div>
                    <div style={{ flex: 2, fontWeight: 900, color: '#0C831F', fontSize: 16 }}>{s.net}</div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <span style={ui.settledBadgePill}>✓ {s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Sticky Bottom Navigation for Mobile / Tablet */}
      <div style={ui.mobileBottomBar}>
        <button
          onClick={() => setActiveTab('inventory')}
          style={{
            ...ui.bottomTabBtn,
            ...(activeTab === 'inventory' ? ui.bottomTabBtnActive : {}),
          }}
        >
          <span style={{ fontSize: 20 }}>📦</span>
          <span>Inventory</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          style={{
            ...ui.bottomTabBtn,
            ...(activeTab === 'orders' ? ui.bottomTabBtnActive : {}),
          }}
        >
          <span style={{ fontSize: 20 }}>🔔</span>
          <span>Orders {newOrdersCount > 0 && `(${newOrdersCount})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          style={{
            ...ui.bottomTabBtn,
            ...(activeTab === 'reports' ? ui.bottomTabBtnActive : {}),
          }}
        >
          <span style={{ fontSize: 20 }}>📊</span>
          <span>Payouts</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* BLINKIT STORE PARTNER ADD PRODUCT MODAL / DRAWER */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div style={ui.modalOverlay}>
          <div style={ui.modalBox}>
            {/* Modal Header */}
            <div style={ui.modalHeaderRow}>
              <div>
                <h2 style={ui.modalTitle}>Add Product to Store Catalog</h2>
                <p style={ui.modalSubtitle}>Search verified master drinks or add custom local inventory</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={ui.closeModalBtn}>
                ✕
              </button>
            </div>

            {/* Mode Switcher */}
            <div style={ui.modalModeBar}>
              <button
                onClick={() => setAddMode('catalog')}
                style={{ ...ui.modeButton, ...(addMode === 'catalog' ? ui.modeButtonActive : {}) }}
              >
                ✨ Select from Master Catalog (1-Click)
              </button>
              <button
                onClick={() => setAddMode('custom')}
                style={{ ...ui.modeButton, ...(addMode === 'custom' ? ui.modeButtonActive : {}) }}
              >
                ✍️ Add Custom Drink / Snack
              </button>
            </div>

            {/* Modal Content */}
            <div style={ui.modalBodyArea}>
              {addMode === 'catalog' ? (
                <div>
                  <div style={ui.modalSearchRow}>
                    <span>🔍</span>
                    <input
                      type="text"
                      placeholder="Search master drinks (e.g. Bira, Kingfisher, Glenfiddich, Corona)..."
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      style={ui.modalSearchInput}
                    />
                  </div>

                  {selectedCatalogItem ? (
                    <div style={ui.selectedMasterCard}>
                      <div style={ui.selectedMasterHeader}>
                        <img
                          src={selectedCatalogItem.imageUrl}
                          alt={selectedCatalogItem.name}
                          style={ui.selectedMasterImg}
                        />
                        <div style={{ flex: 1 }}>
                          <span style={ui.categoryTag}>{selectedCatalogItem.category.toUpperCase()}</span>
                          <div style={{ fontWeight: 800, fontSize: 16, marginTop: 4, color: '#0F172A' }}>
                            {selectedCatalogItem.name}
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                            {selectedCatalogItem.brand} · {selectedCatalogItem.volume} · ABV {selectedCatalogItem.abv}
                          </div>
                        </div>
                        <button onClick={() => setSelectedCatalogItem(null)} style={ui.changeSelectionButton}>
                          Change Item
                        </button>
                      </div>

                      <div style={ui.formGridTwoCol}>
                        <div>
                          <label style={ui.formLabel}>MRP (₹)</label>
                          <input
                            type="number"
                            value={customForm.mrp || selectedCatalogItem.mrp}
                            onChange={(e) => setCustomForm({ ...customForm, mrp: Number(e.target.value) })}
                            style={ui.formInputField}
                          />
                        </div>

                        <div>
                          <label style={ui.formLabel}>Store Selling Price (₹)</label>
                          <input
                            type="number"
                            value={customForm.price || Math.round(selectedCatalogItem.mrp * 0.9)}
                            onChange={(e) => setCustomForm({ ...customForm, price: Number(e.target.value) })}
                            style={ui.formInputField}
                          />
                        </div>

                        <div>
                          <label style={ui.formLabel}>Initial Available Stock (Units)</label>
                          <input
                            type="number"
                            value={customForm.stock}
                            onChange={(e) => setCustomForm({ ...customForm, stock: Number(e.target.value) })}
                            style={ui.formInputField}
                          />
                        </div>

                        <div>
                          <label style={ui.formLabel}>Shelf / Rack Location</label>
                          <input
                            type="text"
                            placeholder="e.g. Chiller-1, Rack B-3"
                            value={customForm.rackLocation}
                            onChange={(e) => setCustomForm({ ...customForm, rackLocation: e.target.value })}
                            style={ui.formInputField}
                          />
                        </div>
                      </div>

                      <div style={ui.modalFooterRow}>
                        <button onClick={() => setSelectedCatalogItem(null)} style={ui.modalCancelBtn}>
                          Back
                        </button>
                        <button onClick={handleAddMasterProduct} style={ui.modalSubmitBtn}>
                          Confirm & Add to Inventory
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={ui.catalogSelectGrid}>
                      {filteredCatalog.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedCatalogItem(item);
                            setCustomForm((prev) => ({
                              ...prev,
                              mrp: item.mrp,
                              price: Math.round(item.mrp * 0.9),
                            }));
                          }}
                          style={ui.catalogItemCard}
                        >
                          <img src={item.imageUrl} alt={item.name} style={ui.catalogItemThumb} />
                          <div style={{ flex: 1 }}>
                            <span style={ui.categoryTagMini}>{item.category}</span>
                            <div style={ui.catalogItemTitle}>{item.name}</div>
                            <div style={ui.catalogItemMeta}>
                              {item.volume} · ABV {item.abv}
                            </div>
                            <div style={ui.catalogItemPrice}>MRP ₹{item.mrp}</div>
                          </div>
                          <button style={ui.selectItemBtn}>Select</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleAddCustomProduct} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={ui.formGridTwoCol}>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={ui.formLabel}>Product Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Simba Stout Craft Beer"
                        value={customForm.name}
                        onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                        style={ui.formInputField}
                      />
                    </div>

                    <div>
                      <label style={ui.formLabel}>Brand Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Simba"
                        value={customForm.brand}
                        onChange={(e) => setCustomForm({ ...customForm, brand: e.target.value })}
                        style={ui.formInputField}
                      />
                    </div>

                    <div>
                      <label style={ui.formLabel}>Category *</label>
                      <select
                        value={customForm.category}
                        onChange={(e) =>
                          setCustomForm({ ...customForm, category: e.target.value as Product['category'] })
                        }
                        style={ui.formInputField}
                      >
                        <option value="beer">Beer</option>
                        <option value="whiskey">Whiskey</option>
                        <option value="wine">Wine</option>
                        <option value="vodka">Vodka</option>
                        <option value="rum">Rum</option>
                        <option value="gin">Gin</option>
                        <option value="mixers">Mixers & Soda</option>
                        <option value="snacks">Snacks</option>
                        <option value="ice">Ice & Extras</option>
                      </select>
                    </div>

                    <div>
                      <label style={ui.formLabel}>Volume / Pack Size</label>
                      <input
                        type="text"
                        placeholder="e.g. 500ml Can / 750ml Bottle"
                        value={customForm.volume}
                        onChange={(e) => setCustomForm({ ...customForm, volume: e.target.value })}
                        style={ui.formInputField}
                      />
                    </div>

                    <div>
                      <label style={ui.formLabel}>Alcohol Content (ABV %)</label>
                      <input
                        type="text"
                        placeholder="e.g. 5.0% / 0% for mixers"
                        value={customForm.abv}
                        onChange={(e) => setCustomForm({ ...customForm, abv: e.target.value })}
                        style={ui.formInputField}
                      />
                    </div>

                    <div>
                      <label style={ui.formLabel}>MRP (₹) *</label>
                      <input
                        type="number"
                        required
                        value={customForm.mrp}
                        onChange={(e) => setCustomForm({ ...customForm, mrp: Number(e.target.value) })}
                        style={ui.formInputField}
                      />
                    </div>

                    <div>
                      <label style={ui.formLabel}>Selling Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={customForm.price}
                        onChange={(e) => setCustomForm({ ...customForm, price: Number(e.target.value) })}
                        style={ui.formInputField}
                      />
                    </div>

                    <div>
                      <label style={ui.formLabel}>Initial Stock Count</label>
                      <input
                        type="number"
                        value={customForm.stock}
                        onChange={(e) => setCustomForm({ ...customForm, stock: Number(e.target.value) })}
                        style={ui.formInputField}
                      />
                    </div>

                    <div>
                      <label style={ui.formLabel}>Rack / Chiller Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Chiller-1, Shelf A"
                        value={customForm.rackLocation}
                        onChange={(e) => setCustomForm({ ...customForm, rackLocation: e.target.value })}
                        style={ui.formInputField}
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={ui.formLabel}>Product Image CDN Link</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={customForm.imageUrl}
                        onChange={(e) => setCustomForm({ ...customForm, imageUrl: e.target.value })}
                        style={ui.formInputField}
                      />
                    </div>
                  </div>

                  <div style={ui.chilledBox}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={customForm.isChilled}
                        onChange={(e) => setCustomForm({ ...customForm, isChilled: e.target.checked })}
                      />
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#065F46' }}>
                        ❄️ Served Chilled (Stored in cold refrigerator)
                      </span>
                    </label>
                  </div>

                  <div style={ui.modalFooterRow}>
                    <button type="button" onClick={() => setIsAddModalOpen(false)} style={ui.modalCancelBtn}>
                      Cancel
                    </button>
                    <button type="submit" style={ui.modalSubmitBtn}>
                      Create & Publish Drink
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// RESPONSIVE & HIGH-AESTHETIC STYLES
// -----------------------------------------------------------------------------
const ui: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: '#F4F6F9',
    color: '#0F172A',
  },
  toast: {
    position: 'fixed',
    top: 20,
    right: 20,
    background: '#0F172A',
    color: '#FFFFFF',
    padding: '12px 24px',
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 800,
    boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
    zIndex: 99999,
  },
  topBar: {
    height: 64,
    background: '#FFFFFF',
    borderBottom: '1px solid #E2E8F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  topBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: 22,
    cursor: 'pointer',
    color: '#0F172A',
  },
  brandGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  brandEmoji: {
    fontSize: 24,
    background: '#E8F7EC',
    width: 40,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 20,
    fontWeight: 900,
    color: '#0C831F',
    letterSpacing: -0.5,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  partnerTag: {
    fontSize: 10,
    fontWeight: 900,
    background: '#0F172A',
    color: '#FFFFFF',
    padding: '2px 6px',
    borderRadius: 4,
    letterSpacing: 0.5,
  },
  storeLocationText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: 700,
  },
  topBarCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  liveStatusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    padding: '6px 14px',
    borderRadius: 9999,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
  },
  toggleOnlineBtn: {
    background: '#FFFFFF',
    border: '1px solid #CBD5E1',
    borderRadius: 9999,
    padding: '3px 10px',
    fontSize: 11,
    fontWeight: 800,
    cursor: 'pointer',
    color: '#0F172A',
  },
  topBarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  clockPill: {
    fontSize: 12,
    fontWeight: 800,
    color: '#64748B',
    background: '#F1F5F9',
    padding: '6px 12px',
    borderRadius: 9999,
  },
  iconCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 16,
  },
  profileAvatar: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: '#0C831F',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    fontSize: 14,
  },
  bodyLayout: {
    display: 'flex',
    flex: 1,
    minHeight: 'calc(100vh - 64px)',
  },
  sidebar: {
    width: 260,
    background: '#FFFFFF',
    borderRight: '1px solid #E2E8F0',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  sidebarMobileOpen: {
    position: 'fixed',
    top: 64,
    left: 0,
    bottom: 0,
    zIndex: 999,
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  },
  mobileBackdrop: {
    position: 'fixed',
    inset: 0,
    top: 64,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 998,
  },
  sidebarHeader: {
    padding: '0 8px 12px',
  },
  sidebarSectionTitle: {
    fontSize: 11,
    fontWeight: 900,
    color: '#94A3B8',
    letterSpacing: 1,
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    flex: 1,
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 14px',
    borderRadius: 12,
    border: 'none',
    background: 'transparent',
    color: '#475569',
    fontSize: 14,
    fontWeight: 800,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  },
  sidebarItemActive: {
    background: '#E8F7EC',
    color: '#0C831F',
    fontWeight: 900,
  },
  sidebarItemIcon: {
    fontSize: 18,
  },
  sidebarCountPill: {
    fontSize: 12,
    fontWeight: 800,
    background: '#F1F5F9',
    color: '#475569',
    padding: '2px 8px',
    borderRadius: 9999,
  },
  sidebarAlertPill: {
    fontSize: 11,
    fontWeight: 900,
    background: '#EF4444',
    color: '#FFFFFF',
    padding: '2px 8px',
    borderRadius: 9999,
  },
  sidebarFooterCard: {
    marginTop: 'auto',
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: 12,
    padding: 12,
  },
  contentArea: {
    flex: 1,
    padding: '32px 36px',
    maxWidth: 1400,
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    paddingBottom: 80,
  },
  tabFadeIn: {
    animation: 'fadeIn 0.25s ease-out forwards',
  },
  pageHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 16,
    flexWrap: 'wrap',
  },
  pageTitle: {
    margin: 0,
    fontSize: 26,
    fontWeight: 900,
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    margin: '4px 0 0',
    fontSize: 14,
    color: '#64748B',
  },
  primaryAddButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#0C831F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 9999,
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 900,
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(12, 131, 31, 0.3)',
    whiteSpace: 'nowrap',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  kpiCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 16,
    padding: '18px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: 900,
    color: '#64748B',
    letterSpacing: 0.8,
  },
  kpiValue: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: 900,
    color: '#0F172A',
  },
  kpiSub: {
    marginTop: 4,
    fontSize: 12,
    color: '#94A3B8',
  },
  categoryScrollContainer: {
    display: 'flex',
    gap: 10,
    overflowX: 'auto',
    paddingBottom: 8,
    marginBottom: 20,
  },
  categoryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 18px',
    borderRadius: 9999,
    border: '1px solid #E2E8F0',
    background: '#FFFFFF',
    color: '#475569',
    fontSize: 13,
    fontWeight: 800,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
  },
  categoryButtonActive: {
    background: '#0F172A',
    color: '#FFFFFF',
    borderColor: '#0F172A',
  },
  categoryCountBadge: {
    fontSize: 11,
    fontWeight: 900,
    padding: '2px 8px',
    borderRadius: 9999,
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  searchBoxWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: '#FFFFFF',
    border: '1px solid #CBD5E1',
    borderRadius: 9999,
    padding: '0 16px',
    width: '100%',
    maxWidth: 420,
    height: 44,
  },
  searchBarInput: {
    border: 'none',
    outline: 'none',
    width: '100%',
    marginLeft: 8,
    fontSize: 13,
    fontWeight: 600,
  },
  clearSearchBtn: {
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    cursor: 'pointer',
    fontSize: 13,
  },
  statusFilterPills: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  filterPillBtn: {
    padding: '8px 14px',
    borderRadius: 9999,
    border: '1px solid #E2E8F0',
    background: '#FFFFFF',
    color: '#475569',
    fontSize: 12,
    fontWeight: 800,
    cursor: 'pointer',
  },
  filterPillBtnActive: {
    background: '#E8F7EC',
    borderColor: '#0C831F',
    color: '#0C831F',
    fontWeight: 900,
  },
  tableWrapperCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    overflow: 'hidden',
  },
  tableHeadRow: {
    display: 'flex',
    padding: '16px 24px',
    background: '#F8FAFC',
    borderBottom: '1px solid #E2E8F0',
    fontSize: 11,
    fontWeight: 900,
    color: '#64748B',
    letterSpacing: 0.8,
  },
  tableDataRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: '1px solid #F1F5F9',
    transition: 'background 0.15s ease',
  },
  prodThumbBox: {
    position: 'relative',
    width: 56,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid #E2E8F0',
    background: '#F8FAFC',
    flexShrink: 0,
  },
  prodThumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  chilledRibbon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(12, 131, 31, 0.9)',
    color: '#FFF',
    fontSize: 8,
    fontWeight: 900,
    textAlign: 'center',
    padding: '1px 0',
  },
  prodTitle: {
    fontSize: 14,
    fontWeight: 800,
    color: '#0F172A',
  },
  prodSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  categoryTag: {
    display: 'inline-block',
    background: '#F1F5F9',
    color: '#334155',
    fontSize: 10,
    fontWeight: 900,
    padding: '3px 8px',
    borderRadius: 9999,
  },
  categoryTagMini: {
    display: 'inline-block',
    background: '#F1F5F9',
    color: '#334155',
    fontSize: 9,
    fontWeight: 900,
    padding: '2px 6px',
    borderRadius: 9999,
    textTransform: 'uppercase',
  },
  sellingPriceText: {
    fontSize: 16,
    fontWeight: 900,
    color: '#0F172A',
  },
  mrpPriceText: {
    fontSize: 12,
    color: '#94A3B8',
    textDecoration: 'line-through',
  },
  discountPill: {
    display: 'inline-block',
    fontSize: 10,
    fontWeight: 900,
    color: '#0C831F',
    marginTop: 2,
  },
  stockStepperBox: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#F8FAFC',
    border: '1px solid #CBD5E1',
    borderRadius: 9999,
    padding: '2px 6px',
  },
  stepperBtn: {
    background: 'none',
    border: 'none',
    fontSize: 14,
    fontWeight: 900,
    color: '#475569',
    padding: '2px 8px',
    cursor: 'pointer',
  },
  stepperCount: {
    fontSize: 14,
    fontWeight: 900,
    padding: '0 8px',
    minWidth: 32,
    textAlign: 'center',
  },
  lowStockText: {
    fontSize: 10,
    fontWeight: 900,
    color: '#D97706',
    marginTop: 4,
  },
  switchContainer: {
    position: 'relative',
    display: 'inline-block',
    width: 48,
    height: 26,
    cursor: 'pointer',
  },
  switchHiddenInput: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  switchTrack: {
    position: 'absolute',
    inset: 0,
    borderRadius: 26,
    transition: '0.2s',
  },
  switchThumb: {
    position: 'absolute',
    height: 20,
    width: 20,
    left: 3,
    bottom: 3,
    background: '#FFFFFF',
    borderRadius: '50%',
    transition: '0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
  rackBadge: {
    background: '#F1F5F9',
    color: '#475569',
    fontSize: 11,
    fontWeight: 800,
    padding: '4px 10px',
    borderRadius: 9999,
  },
  emptyView: {
    padding: '60px 20px',
    textAlign: 'center',
  },
  emptyActionButton: {
    marginTop: 16,
    background: '#0C831F',
    color: '#FFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 9999,
    fontWeight: 800,
    cursor: 'pointer',
  },

  // Orders Tab
  orderStatusSubNav: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  orderStatusNavBtn: {
    padding: '8px 16px',
    borderRadius: 9999,
    border: '1px solid #E2E8F0',
    background: '#FFFFFF',
    color: '#475569',
    fontSize: 13,
    fontWeight: 800,
    cursor: 'pointer',
  },
  orderStatusNavBtnActive: {
    background: '#0F172A',
    color: '#FFFFFF',
    borderColor: '#0F172A',
  },
  ordersContainerGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  posOrderCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  },
  posOrderCardNew: {
    border: '2px solid #EF4444',
    boxShadow: '0 6px 20px rgba(239, 68, 68, 0.15)',
  },
  posCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottom: '1px solid #F1F5F9',
    gap: 12,
    flexWrap: 'wrap',
  },
  orderCodeBadge: {
    fontSize: 18,
    fontWeight: 900,
    color: '#0F172A',
  },
  payPill: {
    fontSize: 11,
    fontWeight: 900,
    background: '#E8F7EC',
    color: '#0C831F',
    padding: '3px 8px',
    borderRadius: 9999,
  },
  orderCustomerText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  countdownPill: {
    fontSize: 12,
    fontWeight: 900,
    color: '#EF4444',
    background: '#FEF2F2',
    padding: '4px 10px',
    borderRadius: 9999,
    marginBottom: 6,
    display: 'inline-block',
  },
  orderStatePill: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 900,
    padding: '4px 10px',
    borderRadius: 9999,
    letterSpacing: 0.5,
  },
  pickingChecklistBox: {
    margin: '16px 0',
    background: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
  },
  checklistHeader: {
    fontSize: 11,
    fontWeight: 900,
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  checklistItemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: 10,
    marginBottom: 8,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    border: '2px solid #CBD5E1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    fontSize: 14,
    color: '#0C831F',
    background: '#FFFFFF',
  },
  checklistThumb: {
    width: 42,
    height: 42,
    borderRadius: 8,
    objectFit: 'cover',
  },
  chilledSmallTag: {
    display: 'inline-block',
    background: '#E8F7EC',
    color: '#0C831F',
    fontSize: 10,
    fontWeight: 900,
    padding: '2px 6px',
    borderRadius: 9999,
  },
  riderInfoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: '#F1F5F9',
    borderRadius: 12,
    padding: '12px 16px',
    marginBottom: 16,
  },
  callRiderButton: {
    fontSize: 12,
    fontWeight: 800,
    color: '#2563EB',
    background: '#EFF6FF',
    padding: '6px 14px',
    borderRadius: 9999,
    textDecoration: 'none',
  },
  posCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTop: '1px solid #F1F5F9',
    gap: 16,
    flexWrap: 'wrap',
  },
  posActionButtons: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },
  acceptButton: {
    background: '#0C831F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 9999,
    padding: '10px 24px',
    fontWeight: 900,
    fontSize: 13,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(12, 131, 31, 0.25)',
  },
  rejectButton: {
    background: 'transparent',
    color: '#EF4444',
    border: '1.5px solid #EF4444',
    borderRadius: 9999,
    padding: '10px 18px',
    fontWeight: 800,
    fontSize: 13,
    cursor: 'pointer',
  },
  packReadyButton: {
    background: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 9999,
    padding: '10px 24px',
    fontWeight: 900,
    fontSize: 13,
    cursor: 'pointer',
  },
  handoverButton: {
    background: '#0F172A',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 9999,
    padding: '10px 24px',
    fontWeight: 900,
    fontSize: 13,
    cursor: 'pointer',
  },

  // Sales / Reports
  settlementBankBox: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 12,
    padding: '12px 18px',
    textAlign: 'right',
  },
  chartsRow: {
    display: 'flex',
    gap: 20,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  analyticsBox: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: 16,
    padding: 24,
    minWidth: 280,
  },
  analyticsBoxTitle: {
    margin: '0 0 16px',
    fontSize: 16,
    fontWeight: 900,
    color: '#0F172A',
  },
  barTrack: {
    height: 8,
    background: '#F1F5F9',
    borderRadius: 9999,
    overflow: 'hidden',
    marginTop: 6,
  },
  barProgress: {
    height: '100%',
    borderRadius: 9999,
  },
  histogramChart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    paddingTop: 20,
  },
  histogramCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barColumnSlot: {
    width: 24,
    height: 120,
    background: '#F1F5F9',
    borderRadius: '6px 6px 0 0',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
    marginTop: 6,
  },
  barColumnFill: {
    width: '100%',
    background: '#0C831F',
    borderRadius: '6px 6px 0 0',
    transition: 'height 0.3s ease',
  },
  settledBadgePill: {
    background: '#E8F7EC',
    color: '#0C831F',
    fontSize: 11,
    fontWeight: 900,
    padding: '4px 10px',
    borderRadius: 9999,
  },

  // Mobile Bottom Bar
  mobileBottomBar: {
    display: 'none',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    background: '#FFFFFF',
    borderTop: '1px solid #E2E8F0',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 90,
  },
  bottomTabBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    background: 'none',
    border: 'none',
    fontSize: 11,
    fontWeight: 800,
    color: '#64748B',
    cursor: 'pointer',
  },
  bottomTabBtnActive: {
    color: '#0C831F',
    fontWeight: 900,
  },

  // Modal
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: 16,
  },
  modalBox: {
    background: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 720,
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
  },
  modalHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '24px 28px',
    borderBottom: '1px solid #E2E8F0',
  },
  modalTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 900,
    color: '#0F172A',
  },
  modalSubtitle: {
    margin: '4px 0 0',
    fontSize: 13,
    color: '#64748B',
  },
  closeModalBtn: {
    background: '#F1F5F9',
    border: 'none',
    width: 32,
    height: 32,
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 800,
  },
  modalModeBar: {
    display: 'flex',
    borderBottom: '1px solid #E2E8F0',
    background: '#F8FAFC',
  },
  modeButton: {
    flex: 1,
    padding: '14px 16px',
    border: 'none',
    background: 'transparent',
    fontSize: 13,
    fontWeight: 800,
    color: '#64748B',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  },
  modeButtonActive: {
    background: '#FFFFFF',
    color: '#0C831F',
    fontWeight: 900,
    borderBottom: '2px solid #0C831F',
  },
  modalBodyArea: {
    padding: '24px 28px',
    overflowY: 'auto',
  },
  modalSearchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#F8FAFC',
    border: '1px solid #CBD5E1',
    borderRadius: 9999,
    padding: '10px 16px',
    marginBottom: 20,
  },
  modalSearchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '100%',
    fontSize: 13,
    fontWeight: 600,
  },
  catalogSelectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 12,
    maxHeight: 380,
    overflowY: 'auto',
    paddingRight: 6,
  },
  catalogItemCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    border: '1px solid #E2E8F0',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  catalogItemThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    objectFit: 'cover',
  },
  catalogItemTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: '#0F172A',
    marginTop: 2,
  },
  catalogItemMeta: {
    fontSize: 11,
    color: '#64748B',
  },
  catalogItemPrice: {
    fontSize: 12,
    fontWeight: 900,
    color: '#0C831F',
    marginTop: 2,
  },
  selectItemBtn: {
    background: '#E8F7EC',
    color: '#0C831F',
    border: 'none',
    borderRadius: 9999,
    padding: '6px 12px',
    fontSize: 11,
    fontWeight: 900,
    cursor: 'pointer',
  },
  selectedMasterCard: {
    background: '#F8FAFC',
    border: '1px solid #CBD5E1',
    borderRadius: 14,
    padding: 20,
  },
  selectedMasterHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 16,
    borderBottom: '1px solid #E2E8F0',
    marginBottom: 20,
  },
  selectedMasterImg: {
    width: 64,
    height: 64,
    borderRadius: 12,
    objectFit: 'cover',
  },
  changeSelectionButton: {
    background: '#FFFFFF',
    border: '1px solid #CBD5E1',
    borderRadius: 9999,
    padding: '6px 14px',
    fontSize: 12,
    fontWeight: 800,
    cursor: 'pointer',
  },
  formGridTwoCol: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 16,
  },
  formLabel: {
    display: 'block',
    fontSize: 12,
    fontWeight: 800,
    color: '#334155',
    marginBottom: 6,
  },
  formInputField: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid #CBD5E1',
    fontSize: 13,
    fontWeight: 600,
    outline: 'none',
    boxSizing: 'border-box',
  },
  chilledBox: {
    marginTop: 12,
    padding: '12px 16px',
    background: '#E8F7EC',
    borderRadius: 10,
  },
  modalFooterRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  modalCancelBtn: {
    background: '#F1F5F9',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 800,
    cursor: 'pointer',
    color: '#475569',
  },
  modalSubmitBtn: {
    background: '#0C831F',
    border: 'none',
    padding: '10px 24px',
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 900,
    cursor: 'pointer',
    color: '#FFFFFF',
    boxShadow: '0 4px 14px rgba(12, 131, 31, 0.3)',
  },
};
