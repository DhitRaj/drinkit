'use client';

import React, { useState, useMemo } from 'react';
import { color, space, radius, fontFamily } from '@/lib/tokens';

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
    name: 'Royal Challenge Whisky',
    brand: 'Royal Challenge',
    category: 'whiskey',
    volume: '750ml Bottle',
    abv: '42.8%',
    mrp: 1120,
    isChilled: false,
    imageUrl: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80',
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
    name: 'Old Monk The Legend Rum',
    brand: 'Old Monk',
    category: 'rum',
    volume: '750ml Bottle',
    abv: '42.8%',
    mrp: 850,
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
    name: 'Gourmet Salted Roasted Cashews',
    brand: 'Nutty Gritties',
    category: 'snacks',
    volume: '200g Pack',
    abv: '0%',
    mrp: 320,
    isChilled: false,
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=400&q=80',
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

  // Toggle In-Stock status in 1-click (Blinkit store partner style)
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
            🔔 Live Orders <span style={styles.badgeCount}>3</span>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            style={{ ...styles.navItem, ...(activeTab === 'reports' ? styles.navActive : {}) }}
          >
            📊 Sales & Payouts
          </button>
        </nav>

        <div style={styles.storeCard}>
          <div style={styles.storeCardTitle}>🏪 Store Live Status</div>
          <div style={styles.storeCardSubtitle}>Koramangala Wine Cellar</div>
          <div style={styles.statusOnline}>● Accepting Orders (Live)</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={styles.main}>
        {/* Header Bar */}
        <header style={styles.header}>
          <div>
            <div style={styles.eyebrow}>BLINKIT STORE PARTNER PORTAL</div>
            <h1 style={styles.h1}>Product & Inventory Manager</h1>
            <p style={styles.subtext}>Manage stock levels, drink catalog, pricing, and 1-click availability</p>
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

        {/* Products Table / Grid View */}
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
