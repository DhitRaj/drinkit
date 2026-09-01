'use client';

import React, { useState, useMemo } from 'react';
import { radius, fontFamily } from '@/lib/tokens';

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
};

export type StoreOrder = {
  id: string;
  customerName: string;
  customerPhone: string;
  placedTime: string;
  elapsedSec: number;
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
    name: 'Schweppes Tonic Water (Pack of 4)',
    brand: 'Schweppes',
    category: 'mixers',
    volume: '4 x 250ml',
    abv: '0%',
    mrp: 240,
    isChilled: true,
    imageUrl: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80',
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
    elapsedSec: 48,
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
      },
      {
        name: 'Schweppes Tonic Water (Pack of 4)',
        volume: '4 x 250ml',
        quantity: 1,
        price: 199,
        isChilled: true,
        rackLocation: 'Chiller-4',
        imageUrl: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'DK-1045',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98111 22334',
    placedTime: '4 min ago',
    elapsedSec: 240,
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
      },
    ],
  },
  {
    id: 'DK-1042',
    customerName: 'Ankit Mehta',
    customerPhone: '+91 97123 45678',
    placedTime: '8 min ago',
    elapsedSec: 480,
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
      },
      {
        name: 'Corona Extra Imported Beer',
        volume: '355ml Pint',
        quantity: 2,
        price: 210,
        isChilled: true,
        rackLocation: 'Chiller-3',
        imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: '🛒' },
  { id: 'beer', label: 'Beer', icon: '🍺' },
  { id: 'whiskey', label: 'Whiskey', icon: '🥃' },
  { id: 'wine', label: 'Wine', icon: '🍷' },
  { id: 'vodka', label: 'Vodka', icon: '🍸' },
  { id: 'rum', label: 'Rum', icon: '🍹' },
  { id: 'gin', label: 'Gin', icon: '🫒' },
  { id: 'mixers', label: 'Mixers & Soda', icon: '🥤' },
  { id: 'snacks', label: 'Snacks', icon: '🍿' },
  { id: 'ice', label: 'Ice & Extras', icon: '🧊' },
] as const;

export default function StoreDashboard() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'reports'>('inventory');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [products, setProducts] = useState<Product[]>(INITIAL_STORE_PRODUCTS);
  const [orders, setOrders] = useState<StoreOrder[]>(INITIAL_ORDERS);
  const [orderStatusFilter, setOrderStatusFilter] = useState<'ALL' | 'NEW' | 'PREPARING' | 'READY_PICKUP' | 'COMPLETED'>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Product Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<'catalog' | 'custom'>('catalog');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedCatalogItem, setSelectedCatalogItem] = useState<(typeof MASTER_CATALOG)[0] | null>(null);

  // Custom Product Form State
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Order Actions
  const handleAcceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'PREPARING' } : o))
    );
    showToast(`🔔 Order ${orderId} Accepted! Start picking bottles.`);
  };

  const handleMarkReady = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'READY_PICKUP' } : o))
    );
    showToast(`✅ Order ${orderId} Packed & Ready for Rider Pickup!`);
  };

  const handleHandoverToRider = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'DELIVERED' } : o))
    );
    showToast(`🛵 Handed over to Delivery Rider for ${orderId}`);
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'CANCELLED' } : o))
    );
    showToast(`❌ Order ${orderId} rejected.`);
  };

  // Toggle In-Stock status
  const handleToggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStatus = !p.inStock;
          showToast(`${p.name} is now ${newStatus ? 'AVAILABLE (In Stock)' : 'UNAVAILABLE (Out of Stock)'}`);
          return { ...p, inStock: newStatus, stock: newStatus && p.stock === 0 ? 10 : p.stock };
        }
        return p;
      })
    );
  };

  // Quick Stock Stepper
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
    showToast(`✅ "${newProd.name}" added to Store Inventory!`);
  };

  // Add Custom Drink
  const handleAddCustomProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customForm.name || !customForm.price) return;
    const newProd: Product = {
      id: `custom-${Date.now()}`,
      name: customForm.name,
      brand: customForm.brand || 'Local Brand',
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
    showToast(`✅ Custom product "${newProd.name}" is now live!`);
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

  // Catalog filtered for Master search
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
    <div style={styles.page}>
      {/* Toast Notification */}
      {toastMessage && <div style={styles.toast}>{toastMessage}</div>}

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.brandRow}>
          <div style={styles.brandLogo}>🍹</div>
          <div>
            <div style={styles.brand}>Drinkit</div>
            <div style={styles.brandBadge}>STORE PARTNER</div>
          </div>
        </div>

        <nav style={styles.nav}>
          <button
            onClick={() => setActiveTab('inventory')}
            style={{ ...styles.navItem, ...(activeTab === 'inventory' ? styles.navActive : {}) }}
          >
            📦 Inventory & Catalog
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            style={{ ...styles.navItem, ...(activeTab === 'orders' ? styles.navActive : {}) }}
          >
            🔔 Live Orders {newOrdersCount > 0 && <span style={styles.badgeCount}>{newOrdersCount}</span>}
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            style={{ ...styles.navItem, ...(activeTab === 'reports' ? styles.navActive : {}) }}
          >
            📊 Sales & Payouts
          </button>
        </nav>

        <div style={styles.storeCard}>
          <div style={styles.storeCardTitle}>🏪 STORE ACTIVE</div>
          <div style={styles.storeCardSubtitle}>Koramangala Wine Cellar</div>
          <div style={styles.statusOnline}>● Accepting Orders (Live)</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={styles.main}>
        {/* ========================================================================= */}
        {/* TAB 1: INVENTORY & CATALOG */}
        {/* ========================================================================= */}
        {activeTab === 'inventory' && (
          <div>
            {/* Header Bar */}
            <header style={styles.header}>
              <div>
                <div style={styles.eyebrow}>STORE INVENTORY & CATALOG</div>
                <h1 style={styles.h1}>Manage Drinks & Stock Levels</h1>
                <p style={styles.subtext}>Category-wise catalog, 1-click availability toggles, and live price management</p>
              </div>

              <div style={styles.headerActions}>
                <button onClick={() => setIsAddModalOpen(true)} style={styles.primaryAddBtn}>
                  <span style={{ fontSize: 18, fontWeight: 900 }}>+</span> Add Product
                </button>
              </div>
            </header>

            {/* Stats Overview */}
            <section style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Total SKUs in Store</div>
                <div style={styles.statValue}>{stats.total}</div>
                <div style={styles.statSub}>Configured in catalog</div>
              </div>
              <div style={{ ...styles.statCard, borderLeft: '4px solid #0C831F' }}>
                <div style={styles.statLabel}>Active & Live in App</div>
                <div style={{ ...styles.statValue, color: '#0C831F' }}>{stats.active}</div>
                <div style={styles.statSub}>Available for instant ordering</div>
              </div>
              <div style={{ ...styles.statCard, borderLeft: '4px solid #EAB308' }}>
                <div style={styles.statLabel}>Low Stock Alert</div>
                <div style={{ ...styles.statValue, color: '#CA8A04' }}>{stats.lowStock}</div>
                <div style={styles.statSub}>Below threshold alert</div>
              </div>
              <div style={{ ...styles.statCard, borderLeft: '4px solid #EF4444' }}>
                <div style={styles.statLabel}>Out of Stock</div>
                <div style={{ ...styles.statValue, color: '#EF4444' }}>{stats.outStock}</div>
                <div style={styles.statSub}>Hidden from customers</div>
              </div>
            </section>

            {/* Categories Carousel Filter */}
            <div style={styles.categoryFilterContainer}>
              <div style={styles.categoryPills}>
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        ...styles.categoryPill,
                        ...(isSelected ? styles.categoryPillActive : {}),
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search & Stock Filter Bar */}
            <div style={styles.toolbar}>
              <div style={styles.searchWrapper}>
                <span style={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Search by drink name, brand, or shelf rack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={styles.clearSearch}>
                    ✕
                  </button>
                )}
              </div>

              <div style={styles.filterGroup}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#666' }}>Filter:</span>
                {(['all', 'in_stock', 'low_stock', 'out_of_stock'] as const).map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setStockFilter(filterKey)}
                    style={{
                      ...styles.filterBtn,
                      ...(stockFilter === filterKey ? styles.filterBtnActive : {}),
                    }}
                  >
                    {filterKey === 'all' && 'All'}
                    {filterKey === 'in_stock' && 'In Stock'}
                    {filterKey === 'low_stock' && '⚠️ Low Stock'}
                    {filterKey === 'out_of_stock' && '❌ Out of Stock'}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Table */}
            <div style={styles.tableCard}>
              <div style={styles.tableHeader}>
                <div style={{ flex: 3 }}>PRODUCT DETAILS</div>
                <div style={{ flex: 1.5 }}>CATEGORY & ABV</div>
                <div style={{ flex: 1.5 }}>PRICE / MRP</div>
                <div style={{ flex: 1.5 }}>CURRENT STOCK</div>
                <div style={{ flex: 1.5, textAlign: 'center' }}>LIVE AVAILABILITY</div>
                <div style={{ flex: 1, textAlign: 'right' }}>LOCATION</div>
              </div>

              {filteredProducts.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: '#1C1C1C' }}>No products found</div>
                  <div style={{ color: '#777', fontSize: 14, marginTop: 4 }}>
                    Try searching for a different keyword or click "+ Add Product" to add new inventory.
                  </div>
                  <button onClick={() => setIsAddModalOpen(true)} style={styles.emptyAddBtn}>
                    + Add New Drink
                  </button>
                </div>
              ) : (
                filteredProducts.map((p) => {
                  const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
                  const isLowStock = p.stock > 0 && p.stock <= p.minThreshold;
                  const isOutOfStock = !p.inStock || p.stock === 0;

                  return (
                    <div key={p.id} style={styles.tableRow}>
                      {/* Product Details */}
                      <div style={{ flex: 3, display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={styles.imgWrapper}>
                          <img src={p.imageUrl} alt={p.name} style={styles.prodImg} />
                          {p.isChilled && <span style={styles.chilledTag}>❄️ Chilled</span>}
                        </div>
                        <div>
                          <div style={styles.prodName}>{p.name}</div>
                          <div style={styles.prodBrand}>
                            Brand: <span style={{ color: '#1C1C1C', fontWeight: 700 }}>{p.brand}</span> · {p.volume}
                          </div>
                        </div>
                      </div>

                      {/* Category & ABV */}
                      <div style={{ flex: 1.5 }}>
                        <span style={styles.categoryBadge}>{p.category.toUpperCase()}</span>
                        <div style={{ fontSize: 12, color: '#666', marginTop: 4, fontWeight: 600 }}>
                          ABV: {p.abv}
                        </div>
                      </div>

                      {/* Price */}
                      <div style={{ flex: 1.5 }}>
                        <div style={styles.priceRow}>
                          <span style={styles.sellingPrice}>₹{p.price}</span>
                          <span style={styles.mrpPrice}>₹{p.mrp}</span>
                        </div>
                        {discount > 0 && <span style={styles.discountBadge}>{discount}% OFF</span>}
                      </div>

                      {/* Stock Stepper */}
                      <div style={{ flex: 1.5 }}>
                        <div style={styles.stockStepper}>
                          <button onClick={() => handleUpdateStockCount(p.id, -1)} style={styles.stepBtn}>
                            -
                          </button>
                          <span
                            style={{
                              ...styles.stockCount,
                              color: isOutOfStock ? '#EF4444' : isLowStock ? '#CA8A04' : '#0C831F',
                            }}
                          >
                            {p.stock}
                          </span>
                          <button onClick={() => handleUpdateStockCount(p.id, 5)} style={styles.stepBtn}>
                            +5
                          </button>
                        </div>
                        {isLowStock && <div style={styles.lowStockWarning}>⚠️ Low Stock (≤{p.minThreshold})</div>}
                      </div>

                      {/* 1-Click Availability Toggle */}
                      <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label style={styles.switchLabel}>
                          <input
                            type="checkbox"
                            checked={p.inStock && p.stock > 0}
                            onChange={() => handleToggleStock(p.id)}
                            style={styles.switchInput}
                          />
                          <span
                            style={{
                              ...styles.switchSlider,
                              background: p.inStock && p.stock > 0 ? '#0C831F' : '#D1D5DB',
                            }}
                          >
                            <span
                              style={{
                                ...styles.switchKnob,
                                transform: p.inStock && p.stock > 0 ? 'translateX(20px)' : 'translateX(0px)',
                              }}
                            />
                          </span>
                        </label>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            marginTop: 4,
                            color: p.inStock && p.stock > 0 ? '#0C831F' : '#9CA3AF',
                          }}
                        >
                          {p.inStock && p.stock > 0 ? 'IN STOCK' : 'DISABLED'}
                        </span>
                      </div>

                      {/* Shelf Location */}
                      <div style={{ flex: 1, textAlign: 'right' }}>
                        <span style={styles.rackPill}>📍 {p.rackLocation}</span>
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
          <div>
            <header style={styles.header}>
              <div>
                <div style={styles.eyebrow}>REAL-TIME ORDER DISPATCH TERMINAL</div>
                <h1 style={styles.h1}>Live Incoming & Active Orders</h1>
                <p style={styles.subtext}>Accept incoming orders, pick chilled bottles from racks, and hand over to delivery rider</p>
              </div>

              <div style={styles.orderStatusPills}>
                {(['ALL', 'NEW', 'PREPARING', 'READY_PICKUP', 'COMPLETED'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    style={{
                      ...styles.orderFilterBtn,
                      ...(orderStatusFilter === st ? styles.orderFilterBtnActive : {}),
                    }}
                  >
                    {st === 'ALL' && 'All Orders'}
                    {st === 'NEW' && `🚨 New (${orders.filter((o) => o.status === 'NEW').length})`}
                    {st === 'PREPARING' && `⏳ Preparing (${orders.filter((o) => o.status === 'PREPARING').length})`}
                    {st === 'READY_PICKUP' && `📦 Ready for Pickup (${orders.filter((o) => o.status === 'READY_PICKUP').length})`}
                    {st === 'COMPLETED' && '✅ Completed'}
                  </button>
                ))}
              </div>
            </header>

            {/* Orders Feed Grid */}
            <div style={styles.ordersGrid}>
              {filteredOrders.length === 0 ? (
                <div style={styles.emptyOrderBox}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>No orders in this queue</div>
                  <div style={{ color: '#666', fontSize: 14, marginTop: 4 }}>
                    New orders placed by customers will ring here in real-time.
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
                        ...styles.orderCard,
                        ...(isNew ? styles.orderCardNew : {}),
                      }}
                    >
                      {/* Order Card Header */}
                      <div style={styles.orderCardHeader}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={styles.orderIdBadge}>{order.id}</span>
                            <span style={styles.paymentPill}>💳 {order.paymentMode.replace('_', ' ')}</span>
                          </div>
                          <div style={styles.orderCustomerMeta}>
                            Customer: <strong style={{ color: '#1C1C1C' }}>{order.customerName}</strong> ({order.customerPhone})
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span
                            style={{
                              ...styles.statusBadge,
                              background:
                                isNew
                                  ? '#FEF2F2'
                                  : isPreparing
                                  ? '#FEFCE8'
                                  : isReady
                                  ? '#E8F7EC'
                                  : '#F3F4F6',
                              color:
                                isNew
                                  ? '#DC2626'
                                  : isPreparing
                                  ? '#CA8A04'
                                  : isReady
                                  ? '#0C831F'
                                  : '#4B5563',
                            }}
                          >
                            {order.status === 'NEW' && '🚨 NEW ORDER (ACCEPT)'}
                            {order.status === 'PREPARING' && '⏳ PACKING IN PROGRESS'}
                            {order.status === 'READY_PICKUP' && '🛵 RIDER ARRIVING'}
                            {order.status === 'DELIVERED' && '✅ DELIVERED'}
                          </span>
                          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>{order.placedTime}</div>
                        </div>
                      </div>

                      {/* Items Picking Checklist */}
                      <div style={styles.itemsBox}>
                        <div style={styles.itemsBoxTitle}>BOTTLE PICKING CHECKLIST ({order.items.length} ITEMS):</div>
                        {order.items.map((it, idx) => (
                          <div key={idx} style={styles.orderItemRow}>
                            <img src={it.imageUrl} alt={it.name} style={styles.orderItemThumb} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 800, fontSize: 14, color: '#111827' }}>
                                {it.quantity}x {it.name}
                              </div>
                              <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                                {it.volume} · Location: <strong style={{ color: '#0C831F' }}>{it.rackLocation}</strong>
                              </div>
                            </div>
                            <div>
                              {it.isChilled && <span style={styles.chilledItemBadge}>❄️ Chill Pack</span>}
                              <div style={{ fontWeight: 800, fontSize: 14, textAlign: 'right', marginTop: 2 }}>
                                ₹{it.price * it.quantity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Rider & Delivery Info */}
                      {order.deliveryPartner && (
                        <div style={styles.riderBar}>
                          <div style={{ fontSize: 18 }}>🛵</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: '#111827' }}>
                              {order.deliveryPartner.name}
                            </div>
                            <div style={{ fontSize: 11, color: '#6B7280' }}>
                              {order.deliveryPartner.vehicle} · ETA {order.deliveryPartner.etaMins} mins
                            </div>
                          </div>
                          <div style={styles.riderPhone}>{order.deliveryPartner.phone}</div>
                        </div>
                      )}

                      {/* Order Card Footer / Actions */}
                      <div style={styles.orderCardFooter}>
                        <div>
                          <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700 }}>YOUR STORE PAYOUT:</div>
                          <div style={{ fontSize: 18, fontWeight: 900, color: '#0C831F' }}>₹{order.storeEarnings}</div>
                        </div>

                        <div style={styles.orderActionsGroup}>
                          {isNew && (
                            <>
                              <button onClick={() => handleRejectOrder(order.id)} style={styles.orderRejectBtn}>
                                Reject
                              </button>
                              <button onClick={() => handleAcceptOrder(order.id)} style={styles.orderAcceptBtn}>
                                Accept Order (2 min)
                              </button>
                            </>
                          )}

                          {isPreparing && (
                            <button onClick={() => handleMarkReady(order.id)} style={styles.orderPackReadyBtn}>
                              ✅ Mark Packed & Ready for Pickup
                            </button>
                          )}

                          {isReady && (
                            <button onClick={() => handleHandoverToRider(order.id)} style={styles.orderHandoverBtn}>
                              🤝 Handover to Rider & Complete
                            </button>
                          )}

                          {order.status === 'DELIVERED' && (
                            <span style={{ fontSize: 13, fontWeight: 800, color: '#0C831F' }}>
                              🎉 Order Completed Successfully
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
        {/* TAB 3: SALES & PAYOUTS (FINANCIALS & ANALYTICS) */}
        {/* ========================================================================= */}
        {activeTab === 'reports' && (
          <div>
            <header style={styles.header}>
              <div>
                <div style={styles.eyebrow}>MERCHANT FINANCIALS & SETTLEMENTS</div>
                <h1 style={styles.h1}>Store Sales, Revenue & Payouts</h1>
                <p style={styles.subtext}>Daily GMV, net merchant earnings, category split, and automated bank settlements</p>
              </div>
              <div style={styles.bankCard}>
                <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 800 }}>LINKED SETTLEMENT BANK</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginTop: 2 }}>
                  🏦 HDFC Bank Ltd (**** 4892)
                </div>
                <div style={{ fontSize: 11, color: '#0C831F', fontWeight: 700, marginTop: 2 }}>
                  ● Daily Auto-Settlement at 11:59 PM
                </div>
              </div>
            </header>

            {/* Financial Overview Cards */}
            <section style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Today Gross Revenue (GMV)</div>
                <div style={styles.statValue}>₹42,180</div>
                <div style={{ ...styles.statSub, color: '#0C831F', fontWeight: 700 }}>+18.4% vs yesterday</div>
              </div>
              <div style={{ ...styles.statCard, borderLeft: '4px solid #0C831F' }}>
                <div style={styles.statLabel}>Today Net Store Payout</div>
                <div style={{ ...styles.statValue, color: '#0C831F' }}>₹38,805</div>
                <div style={styles.statSub}>After 8% Drinkit platform commission</div>
              </div>
              <div style={{ ...styles.statCard, borderLeft: '4px solid #3B82F6' }}>
                <div style={styles.statLabel}>Avg Fulfillment Speed</div>
                <div style={{ ...styles.statValue, color: '#2563EB' }}>3.8 mins</div>
                <div style={styles.statSub}>Packing & Handover time (Target &lt; 5m)</div>
              </div>
              <div style={{ ...styles.statCard, borderLeft: '4px solid #8B5CF6' }}>
                <div style={styles.statLabel}>Order Acceptance Rate</div>
                <div style={{ ...styles.statValue, color: '#7C3AED' }}>98.6%</div>
                <div style={styles.statSub}>42 Accepted / 0 Rejected</div>
              </div>
            </section>

            {/* Category Revenue Breakdown & Weekly Trends */}
            <div style={styles.analyticsRow}>
              {/* Category Breakdown */}
              <div style={{ ...styles.reportBox, flex: 1.2 }}>
                <h3 style={styles.reportBoxTitle}>🍹 Category Revenue Split</h3>
                <div style={styles.categoryBarList}>
                  {[
                    { name: 'Beer (Lager, Strong, Craft)', share: '46%', gmv: '₹19,400', color: '#F59E0B' },
                    { name: 'Whiskey (Single Malt, Scotch)', share: '32%', gmv: '₹13,500', color: '#8B5CF6' },
                    { name: 'Vodka & Gin', share: '12%', gmv: '₹5,060', color: '#3B82F6' },
                    { name: 'Wine & Champagne', share: '6%', gmv: '₹2,530', color: '#EC4899' },
                    { name: 'Mixers, Ice & Snacks', share: '4%', gmv: '₹1,690', color: '#10B981' },
                  ].map((c) => (
                    <div key={c.name} style={{ marginBottom: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
                        <span>{c.name}</span>
                        <span>
                          {c.gmv} ({c.share})
                        </span>
                      </div>
                      <div style={styles.progressBarBg}>
                        <div style={{ ...styles.progressBarFill, width: c.share, background: c.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Performance Bar Chart */}
              <div style={{ ...styles.reportBox, flex: 1 }}>
                <h3 style={styles.reportBoxTitle}>📈 Last 7 Days Revenue Trend</h3>
                <div style={styles.chartContainer}>
                  {[
                    { day: 'Mon', gmv: '₹34k', height: '60%' },
                    { day: 'Tue', gmv: '₹28k', height: '48%' },
                    { day: 'Wed', gmv: '₹36k', height: '65%' },
                    { day: 'Thu', gmv: '₹39k', height: '70%' },
                    { day: 'Fri', gmv: '₹58k', height: '95%' },
                    { day: 'Sat', gmv: '₹62k', height: '100%' },
                    { day: 'Sun (Today)', gmv: '₹42k', height: '75%' },
                  ].map((b) => (
                    <div key={b.day} style={styles.chartCol}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#0C831F' }}>{b.gmv}</div>
                      <div style={styles.chartBarTrack}>
                        <div style={{ ...styles.chartBarFill, height: b.height }} />
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', marginTop: 6 }}>{b.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Bank Settlements Table */}
            <div style={styles.tableCard}>
              <div style={styles.tableHeader}>
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
                <div key={s.id} style={styles.tableRow}>
                  <div style={{ flex: 2 }}>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{s.id}</div>
                    <div style={{ fontSize: 12, color: '#666' }}>{s.date}</div>
                  </div>
                  <div style={{ flex: 1.5, fontWeight: 700 }}>{s.orders} Orders</div>
                  <div style={{ flex: 1.5, fontWeight: 700 }}>{s.gross}</div>
                  <div style={{ flex: 1.5, color: '#EF4444', fontWeight: 700 }}>- {s.comm}</div>
                  <div style={{ flex: 2, fontWeight: 900, color: '#0C831F', fontSize: 16 }}>{s.net}</div>
                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <span style={styles.settledBadge}>✓ {s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* BLINKIT STYLE ADD PRODUCT MODAL / DRAWER */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>Add Product to Store</h2>
                <p style={styles.modalSubtitle}>Search verified master drinks or create a custom SKU</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={styles.closeBtn}>
                ✕
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div style={styles.modeTabs}>
              <button
                onClick={() => setAddMode('catalog')}
                style={{ ...styles.modeTab, ...(addMode === 'catalog' ? styles.modeTabActive : {}) }}
              >
                ✨ Select from Master Catalog (1-Click)
              </button>
              <button
                onClick={() => setAddMode('custom')}
                style={{ ...styles.modeTab, ...(addMode === 'custom' ? styles.modeTabActive : {}) }}
              >
                ✍️ Add Custom Drink / Snack
              </button>
            </div>

            {/* Modal Body */}
            <div style={styles.modalBody}>
              {addMode === 'catalog' ? (
                <div>
                  {/* Master Catalog Search */}
                  <div style={styles.modalSearchWrapper}>
                    <span>🔍</span>
                    <input
                      type="text"
                      placeholder="Search master catalog (e.g. Bira, Kingfisher, Glenfiddich, Corona)..."
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      style={styles.modalSearchInput}
                    />
                  </div>

                  {/* Selected Item Review & Customization */}
                  {selectedCatalogItem ? (
                    <div style={styles.selectedItemBox}>
                      <div style={styles.selectedItemHeader}>
                        <img
                          src={selectedCatalogItem.imageUrl}
                          alt={selectedCatalogItem.name}
                          style={styles.selectedThumb}
                        />
                        <div style={{ flex: 1 }}>
                          <span style={styles.categoryBadge}>{selectedCatalogItem.category.toUpperCase()}</span>
                          <div style={{ fontWeight: 800, fontSize: 16, marginTop: 4 }}>
                            {selectedCatalogItem.name}
                          </div>
                          <div style={{ fontSize: 13, color: '#666' }}>
                            {selectedCatalogItem.brand} · {selectedCatalogItem.volume} · ABV {selectedCatalogItem.abv}
                          </div>
                        </div>
                        <button onClick={() => setSelectedCatalogItem(null)} style={styles.changeSelectionBtn}>
                          Change Item
                        </button>
                      </div>

                      {/* Store-specific inputs for this master drink */}
                      <div style={styles.formGrid}>
                        <div>
                          <label style={styles.formLabel}>MRP (₹)</label>
                          <input
                            type="number"
                            value={customForm.mrp || selectedCatalogItem.mrp}
                            onChange={(e) => setCustomForm({ ...customForm, mrp: Number(e.target.value) })}
                            style={styles.formInput}
                          />
                        </div>

                        <div>
                          <label style={styles.formLabel}>Store Selling Price (₹)</label>
                          <input
                            type="number"
                            value={customForm.price || Math.round(selectedCatalogItem.mrp * 0.9)}
                            onChange={(e) => setCustomForm({ ...customForm, price: Number(e.target.value) })}
                            style={styles.formInput}
                          />
                        </div>

                        <div>
                          <label style={styles.formLabel}>Initial Stock (Units)</label>
                          <input
                            type="number"
                            value={customForm.stock}
                            onChange={(e) => setCustomForm({ ...customForm, stock: Number(e.target.value) })}
                            style={styles.formInput}
                          />
                        </div>

                        <div>
                          <label style={styles.formLabel}>Shelf / Rack Location</label>
                          <input
                            type="text"
                            placeholder="e.g. Chiller-1, Rack B-3"
                            value={customForm.rackLocation}
                            onChange={(e) => setCustomForm({ ...customForm, rackLocation: e.target.value })}
                            style={styles.formInput}
                          />
                        </div>
                      </div>

                      <div style={styles.modalFooter}>
                        <button onClick={() => setSelectedCatalogItem(null)} style={styles.cancelBtn}>
                          Back
                        </button>
                        <button onClick={handleAddMasterProduct} style={styles.submitBtn}>
                          Confirm & Add to Inventory
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Master Catalog Selection Grid */
                    <div style={styles.catalogGrid}>
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
                          style={styles.catalogCard}
                        >
                          <img src={item.imageUrl} alt={item.name} style={styles.catalogThumb} />
                          <div style={styles.catalogCardContent}>
                            <span style={styles.categoryBadgeMini}>{item.category}</span>
                            <div style={styles.catalogName}>{item.name}</div>
                            <div style={styles.catalogMeta}>
                              {item.volume} · ABV {item.abv}
                            </div>
                            <div style={styles.catalogMrp}>MRP ₹{item.mrp}</div>
                          </div>
                          <button style={styles.selectBtn}>Select</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Custom Product Form */
                <form onSubmit={handleAddCustomProduct} style={styles.customForm}>
                  <div style={styles.formGrid}>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={styles.formLabel}>Product Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Simba Stout Craft Beer"
                        value={customForm.name}
                        onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                        style={styles.formInput}
                      />
                    </div>

                    <div>
                      <label style={styles.formLabel}>Brand Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Simba"
                        value={customForm.brand}
                        onChange={(e) => setCustomForm({ ...customForm, brand: e.target.value })}
                        style={styles.formInput}
                      />
                    </div>

                    <div>
                      <label style={styles.formLabel}>Category *</label>
                      <select
                        value={customForm.category}
                        onChange={(e) =>
                          setCustomForm({ ...customForm, category: e.target.value as Product['category'] })
                        }
                        style={styles.formInput}
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
                      <label style={styles.formLabel}>Volume / Pack Size</label>
                      <input
                        type="text"
                        placeholder="e.g. 500ml Can / 750ml Bottle"
                        value={customForm.volume}
                        onChange={(e) => setCustomForm({ ...customForm, volume: e.target.value })}
                        style={styles.formInput}
                      />
                    </div>

                    <div>
                      <label style={styles.formLabel}>Alcohol Content (ABV %)</label>
                      <input
                        type="text"
                        placeholder="e.g. 5.0% / 0% for mixers"
                        value={customForm.abv}
                        onChange={(e) => setCustomForm({ ...customForm, abv: e.target.value })}
                        style={styles.formInput}
                      />
                    </div>

                    <div>
                      <label style={styles.formLabel}>MRP (₹) *</label>
                      <input
                        type="number"
                        required
                        value={customForm.mrp}
                        onChange={(e) => setCustomForm({ ...customForm, mrp: Number(e.target.value) })}
                        style={styles.formInput}
                      />
                    </div>

                    <div>
                      <label style={styles.formLabel}>Selling Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={customForm.price}
                        onChange={(e) => setCustomForm({ ...customForm, price: Number(e.target.value) })}
                        style={styles.formInput}
                      />
                    </div>

                    <div>
                      <label style={styles.formLabel}>Initial Stock Count</label>
                      <input
                        type="number"
                        value={customForm.stock}
                        onChange={(e) => setCustomForm({ ...customForm, stock: Number(e.target.value) })}
                        style={styles.formInput}
                      />
                    </div>

                    <div>
                      <label style={styles.formLabel}>Rack / Chiller Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Chiller-1, Shelf A"
                        value={customForm.rackLocation}
                        onChange={(e) => setCustomForm({ ...customForm, rackLocation: e.target.value })}
                        style={styles.formInput}
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={styles.formLabel}>Product Image URL / CDN Link</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={customForm.imageUrl}
                        onChange={(e) => setCustomForm({ ...customForm, imageUrl: e.target.value })}
                        style={styles.formInput}
                      />
                    </div>
                  </div>

                  <div style={styles.chilledCheckRow}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={customForm.isChilled}
                        onChange={(e) => setCustomForm({ ...customForm, isChilled: e.target.checked })}
                      />
                      <span style={{ fontSize: 14, fontWeight: 700 }}>❄️ Served Chilled (Cold Storage)</span>
                    </label>
                  </div>

                  <div style={styles.modalFooter}>
                    <button type="button" onClick={() => setIsAddModalOpen(false)} style={styles.cancelBtn}>
                      Cancel
                    </button>
                    <button type="submit" style={styles.submitBtn}>
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

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    background: '#F6F8FA',
    color: '#1C1C1C',
    fontFamily: fontFamily.sansFallback,
  },
  toast: {
    position: 'fixed',
    top: 24,
    right: 24,
    background: '#1C1C1C',
    color: '#FFFFFF',
    padding: '12px 24px',
    borderRadius: radius.pill,
    fontSize: 14,
    fontWeight: 700,
    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
    zIndex: 9999,
  },
  sidebar: {
    borderRight: '1px solid #E5E7EB',
    background: '#FFFFFF',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  brandLogo: {
    fontSize: 32,
    background: '#E8F7EC',
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    color: '#0C831F',
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: -0.5,
  },
  brandBadge: {
    fontSize: 10,
    fontWeight: 800,
    color: '#666',
    letterSpacing: 1,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderRadius: radius.md,
    color: '#4B5563',
    fontSize: 14,
    fontWeight: 700,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  },
  navActive: {
    background: '#E8F7EC',
    color: '#0C831F',
    fontWeight: 900,
  },
  badgeCount: {
    background: '#EF4444',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 900,
    padding: '2px 8px',
    borderRadius: 999,
  },
  storeCard: {
    marginTop: 'auto',
    background: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: radius.md,
    padding: 14,
  },
  storeCardTitle: {
    fontSize: 11,
    fontWeight: 800,
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  storeCardSubtitle: {
    fontSize: 13,
    fontWeight: 800,
    color: '#1F2937',
    marginTop: 4,
  },
  statusOnline: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0C831F',
    marginTop: 6,
  },
  main: {
    padding: '32px 40px',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  eyebrow: {
    color: '#0C831F',
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 1.5,
  },
  h1: {
    margin: '4px 0 2px',
    fontSize: 28,
    fontWeight: 900,
    color: '#111827',
  },
  subtext: {
    margin: 0,
    fontSize: 14,
    color: '#6B7280',
  },
  headerActions: {
    display: 'flex',
    gap: 12,
  },
  primaryAddBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#0C831F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: radius.pill,
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(12, 131, 31, 0.25)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: radius.lg,
    padding: '16px 20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: '#6B7280',
  },
  statValue: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: 900,
    color: '#111827',
  },
  statSub: {
    marginTop: 4,
    fontSize: 11,
    color: '#9CA3AF',
  },
  categoryFilterContainer: {
    marginBottom: 20,
    overflowX: 'auto',
    paddingBottom: 4,
  },
  categoryPills: {
    display: 'flex',
    gap: 10,
  },
  categoryPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    borderRadius: radius.pill,
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    color: '#4B5563',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  categoryPillActive: {
    background: '#111827',
    color: '#FFFFFF',
    borderColor: '#111827',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  searchWrapper: {
    position: 'relative',
    flex: 1,
    maxWidth: 440,
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    top: 12,
    fontSize: 14,
    color: '#9CA3AF',
  },
  searchInput: {
    width: '100%',
    padding: '10px 36px 10px 38px',
    borderRadius: radius.pill,
    border: '1px solid #D1D5DB',
    fontSize: 13,
    outline: 'none',
    background: '#FFFFFF',
  },
  clearSearch: {
    position: 'absolute',
    right: 12,
    top: 10,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9CA3AF',
    fontSize: 12,
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  filterBtn: {
    padding: '6px 14px',
    borderRadius: radius.pill,
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    color: '#4B5563',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
  },
  filterBtnActive: {
    background: '#E8F7EC',
    borderColor: '#0C831F',
    color: '#0C831F',
    fontWeight: 800,
  },
  tableCard: {
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: radius.lg,
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex',
    padding: '14px 24px',
    background: '#F9FAFB',
    borderBottom: '1px solid #E5E7EB',
    fontSize: 11,
    fontWeight: 900,
    color: '#6B7280',
    letterSpacing: 0.8,
  },
  tableRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: '1px solid #F3F4F6',
    transition: 'background 0.1s ease',
  },
  imgWrapper: {
    position: 'relative',
    width: 52,
    height: 52,
    borderRadius: 10,
    overflow: 'hidden',
    border: '1px solid #E5E7EB',
    background: '#F9FAFB',
    flexShrink: 0,
  },
  prodImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  chilledTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(12, 131, 31, 0.85)',
    color: '#FFF',
    fontSize: 8,
    fontWeight: 900,
    textAlign: 'center',
    padding: '1px 0',
  },
  prodName: {
    fontSize: 14,
    fontWeight: 800,
    color: '#111827',
  },
  prodBrand: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  categoryBadge: {
    display: 'inline-block',
    background: '#F3F4F6',
    color: '#374151',
    fontSize: 10,
    fontWeight: 800,
    padding: '2px 8px',
    borderRadius: radius.pill,
  },
  categoryBadgeMini: {
    display: 'inline-block',
    background: '#F3F4F6',
    color: '#374151',
    fontSize: 9,
    fontWeight: 800,
    padding: '2px 6px',
    borderRadius: radius.pill,
    textTransform: 'uppercase',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 6,
  },
  sellingPrice: {
    fontSize: 15,
    fontWeight: 900,
    color: '#111827',
  },
  mrpPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecoration: 'line-through',
  },
  discountBadge: {
    display: 'inline-block',
    fontSize: 10,
    fontWeight: 800,
    color: '#0C831F',
    marginTop: 2,
  },
  stockStepper: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#F9FAFB',
    border: '1px solid #D1D5DB',
    borderRadius: radius.pill,
    padding: '2px 4px',
  },
  stepBtn: {
    background: 'none',
    border: 'none',
    fontSize: 13,
    fontWeight: 900,
    color: '#4B5563',
    padding: '2px 8px',
    cursor: 'pointer',
  },
  stockCount: {
    fontSize: 13,
    fontWeight: 900,
    padding: '0 8px',
    minWidth: 32,
    textAlign: 'center',
  },
  lowStockWarning: {
    fontSize: 10,
    fontWeight: 800,
    color: '#CA8A04',
    marginTop: 4,
  },
  switchLabel: {
    position: 'relative',
    display: 'inline-block',
    width: 44,
    height: 24,
    cursor: 'pointer',
  },
  switchInput: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  switchSlider: {
    position: 'absolute',
    inset: 0,
    borderRadius: 24,
    transition: '0.2s',
  },
  switchKnob: {
    position: 'absolute',
    height: 18,
    width: 18,
    left: 3,
    bottom: 3,
    background: '#FFFFFF',
    borderRadius: '50%',
    transition: '0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
  rackPill: {
    background: '#F3F4F6',
    color: '#4B5563',
    fontSize: 11,
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: radius.pill,
  },
  emptyState: {
    padding: '60px 20px',
    textAlign: 'center',
  },
  emptyAddBtn: {
    marginTop: 16,
    background: '#0C831F',
    color: '#FFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: radius.pill,
    fontWeight: 800,
    cursor: 'pointer',
  },

  // Orders Tab Styles
  orderStatusPills: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  orderFilterBtn: {
    padding: '8px 16px',
    borderRadius: radius.pill,
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    color: '#4B5563',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
  },
  orderFilterBtnActive: {
    background: '#111827',
    color: '#FFFFFF',
    borderColor: '#111827',
  },
  ordersGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  orderCard: {
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: radius.lg,
    padding: 24,
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  },
  orderCardNew: {
    border: '2px solid #EF4444',
    boxShadow: '0 4px 16px rgba(239, 68, 68, 0.12)',
  },
  orderCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottom: '1px solid #F3F4F6',
  },
  orderIdBadge: {
    fontSize: 16,
    fontWeight: 900,
    color: '#111827',
  },
  paymentPill: {
    fontSize: 11,
    fontWeight: 800,
    background: '#E8F7EC',
    color: '#0C831F',
    padding: '2px 8px',
    borderRadius: radius.pill,
  },
  orderCustomerMeta: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  statusBadge: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 900,
    padding: '4px 10px',
    borderRadius: radius.pill,
    letterSpacing: 0.5,
  },
  itemsBox: {
    margin: '16px 0',
    background: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  itemsBoxTitle: {
    fontSize: 11,
    fontWeight: 900,
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  orderItemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '8px 0',
    borderBottom: '1px solid #E5E7EB',
  },
  orderItemThumb: {
    width: 42,
    height: 42,
    borderRadius: 8,
    objectFit: 'cover',
  },
  chilledItemBadge: {
    display: 'inline-block',
    background: '#E8F7EC',
    color: '#0C831F',
    fontSize: 10,
    fontWeight: 800,
    padding: '2px 6px',
    borderRadius: radius.pill,
  },
  riderBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: '#F3F4F6',
    borderRadius: 10,
    padding: '10px 16px',
    marginBottom: 16,
  },
  riderPhone: {
    fontSize: 12,
    fontWeight: 800,
    color: '#2563EB',
    background: '#EFF6FF',
    padding: '4px 10px',
    borderRadius: radius.pill,
  },
  orderCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTop: '1px solid #F3F4F6',
  },
  orderActionsGroup: {
    display: 'flex',
    gap: 10,
  },
  orderAcceptBtn: {
    background: '#0C831F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: radius.pill,
    padding: '10px 24px',
    fontWeight: 800,
    fontSize: 13,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(12, 131, 31, 0.25)',
  },
  orderRejectBtn: {
    background: 'transparent',
    color: '#EF4444',
    border: '1.5px solid #EF4444',
    borderRadius: radius.pill,
    padding: '10px 18px',
    fontWeight: 800,
    fontSize: 13,
    cursor: 'pointer',
  },
  orderPackReadyBtn: {
    background: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: radius.pill,
    padding: '10px 24px',
    fontWeight: 800,
    fontSize: 13,
    cursor: 'pointer',
  },
  orderHandoverBtn: {
    background: '#111827',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: radius.pill,
    padding: '10px 24px',
    fontWeight: 800,
    fontSize: 13,
    cursor: 'pointer',
  },
  emptyOrderBox: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: '60px 20px',
    textAlign: 'center',
    border: '1px solid #E5E7EB',
  },

  // Reports / Sales Tab Styles
  bankCard: {
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: 12,
    padding: '12px 18px',
    textAlign: 'right',
  },
  analyticsRow: {
    display: 'flex',
    gap: 20,
    marginBottom: 24,
  },
  reportBox: {
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: radius.lg,
    padding: 24,
  },
  reportBoxTitle: {
    margin: '0 0 16px',
    fontSize: 16,
    fontWeight: 900,
    color: '#111827',
  },
  categoryBarList: {
    display: 'flex',
    flexDirection: 'column',
  },
  progressBarBg: {
    height: 8,
    background: '#F3F4F6',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    paddingTop: 20,
  },
  chartCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  chartBarTrack: {
    width: 24,
    height: 120,
    background: '#F3F4F6',
    borderRadius: '6px 6px 0 0',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
    marginTop: 6,
  },
  chartBarFill: {
    width: '100%',
    background: '#0C831F',
    borderRadius: '6px 6px 0 0',
    transition: 'height 0.3s ease',
  },
  settledBadge: {
    background: '#E8F7EC',
    color: '#0C831F',
    fontSize: 11,
    fontWeight: 800,
    padding: '4px 10px',
    borderRadius: radius.pill,
  },

  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContainer: {
    background: '#FFFFFF',
    borderRadius: 16,
    width: '90%',
    maxWidth: 720,
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
    overflow: 'hidden',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '24px 28px',
    borderBottom: '1px solid #E5E7EB',
  },
  modalTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 900,
    color: '#111827',
  },
  modalSubtitle: {
    margin: '4px 0 0',
    fontSize: 13,
    color: '#6B7280',
  },
  closeBtn: {
    background: '#F3F4F6',
    border: 'none',
    width: 32,
    height: 32,
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 800,
  },
  modeTabs: {
    display: 'flex',
    borderBottom: '1px solid #E5E7EB',
    background: '#F9FAFB',
  },
  modeTab: {
    flex: 1,
    padding: '12px 16px',
    border: 'none',
    background: 'transparent',
    fontSize: 13,
    fontWeight: 700,
    color: '#6B7280',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  },
  modeTabActive: {
    background: '#FFFFFF',
    color: '#0C831F',
    fontWeight: 900,
    borderBottom: '2px solid #0C831F',
  },
  modalBody: {
    padding: '24px 28px',
    overflowY: 'auto',
  },
  modalSearchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#F9FAFB',
    border: '1px solid #D1D5DB',
    borderRadius: radius.pill,
    padding: '10px 16px',
    marginBottom: 20,
  },
  modalSearchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '100%',
    fontSize: 13,
  },
  catalogGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
    maxHeight: 380,
    overflowY: 'auto',
    paddingRight: 6,
  },
  catalogCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    border: '1px solid #E5E7EB',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  catalogThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    objectFit: 'cover',
  },
  catalogCardContent: {
    flex: 1,
  },
  catalogName: {
    fontSize: 13,
    fontWeight: 800,
    color: '#111827',
    marginTop: 2,
  },
  catalogMeta: {
    fontSize: 11,
    color: '#6B7280',
  },
  catalogMrp: {
    fontSize: 12,
    fontWeight: 800,
    color: '#0C831F',
    marginTop: 2,
  },
  selectBtn: {
    background: '#E8F7EC',
    color: '#0C831F',
    border: 'none',
    borderRadius: radius.pill,
    padding: '6px 12px',
    fontSize: 11,
    fontWeight: 800,
    cursor: 'pointer',
  },
  selectedItemBox: {
    background: '#F9FAFB',
    border: '1px solid #D1D5DB',
    borderRadius: 12,
    padding: 20,
  },
  selectedItemHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 16,
    borderBottom: '1px solid #E5E7EB',
    marginBottom: 20,
  },
  selectedThumb: {
    width: 60,
    height: 60,
    borderRadius: 10,
    objectFit: 'cover',
  },
  changeSelectionBtn: {
    background: '#FFFFFF',
    border: '1px solid #D1D5DB',
    borderRadius: radius.pill,
    padding: '6px 14px',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
  },
  customForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 16,
  },
  formLabel: {
    display: 'block',
    fontSize: 12,
    fontWeight: 800,
    color: '#374151',
    marginBottom: 6,
  },
  formInput: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #D1D5DB',
    fontSize: 13,
    outline: 'none',
    boxSizing: 'border-box',
  },
  chilledCheckRow: {
    marginTop: 12,
    padding: '12px 16px',
    background: '#E8F7EC',
    borderRadius: 8,
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  cancelBtn: {
    background: '#F3F4F6',
    border: 'none',
    padding: '10px 20px',
    borderRadius: radius.pill,
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    color: '#4B5563',
  },
  submitBtn: {
    background: '#0C831F',
    border: 'none',
    padding: '10px 24px',
    borderRadius: radius.pill,
    fontSize: 13,
    fontWeight: 800,
    cursor: 'pointer',
    color: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(12, 131, 31, 0.25)',
  },
};
