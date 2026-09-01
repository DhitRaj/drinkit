import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Zap,
  Snowflake,
  ShieldCheck,
  CreditCard,
  Sparkles,
  ArrowRight,
  Percent,
  Flame,
  Clock,
  ChevronRight,
  Award,
  Package,
} from 'lucide-react-native';
import { CategoryTile, HomeSkeleton, ProductCard, TrustBar, Button } from '../../src/lib/ui';
import { CATEGORIES, PRODUCTS, CatalogProduct } from '../../src/data/catalog';
import { useCartStore } from '../../src/store/cart';
import { CustomerWebLayout } from '../../src/lib/CustomerWebLayout';

const CATEGORY_IMAGES: Record<string, string> = {
  beer: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80',
  whiskey: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=400&q=80',
  wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80',
  vodka: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=400&q=80',
  rum: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80',
  gin: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80',
  mixers: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80',
  snacks: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80',
  ice: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=400&q=80',
};

const POPULAR_SEARCHES = [
  'Beer',
  'Whiskey',
  'Wine',
  'Gin',
  'Vodka',
  'Mixers',
  'Ice',
];

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const cart = useCartStore();

  const isWide = width >= 768;
  const HPAD = isWide ? 24 : 16;
  const catCols = width >= 1200 ? 9 : width >= 900 ? 9 : width >= 600 ? 5 : 3;
  const GAP = 14;
  const maxW = Math.min(width, 1400);
  const innerW = maxW - HPAD * 2;
  const catW = (innerW - GAP * (catCols - 1)) / catCols;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <CustomerWebLayout showFloatingCart={false}>
        <HomeSkeleton />
      </CustomerWebLayout>
    );
  }

  // Filter product collections for carousels
  const bestsellers = PRODUCTS.slice(0, 8);
  const chilledReady = PRODUCTS.filter((p) => p.isChilled || p.category === 'beer' || p.category === 'vodka');
  const offersDeals = PRODUCTS.filter((p) => p.discountPercent >= 15);
  const partyItems = PRODUCTS.filter((p) => p.category === 'beer' || p.category === 'mixers' || p.category === 'whiskey');

  return (
    <CustomerWebLayout showFloatingCart={true}>
      <View style={[styles.mainWrapper, { paddingHorizontal: HPAD }]}>
        <View style={styles.container}>

          {/* ── 1. Full-Width Premium Hero Banner ────────────────────────────── */}
          <View style={styles.heroBanner}>
            <LinearGradient
              colors={['#1C1C1C', '#2A2A2A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.heroLayout}>
              {/* Left Column: Headline, Copy & CTA */}
              <View style={styles.heroLeft}>
                <View style={styles.heroPill}>
                  <Zap size={13} color="#F8CB46" strokeWidth={2.5} />
                  <Text style={styles.heroPillText}>⚡ 10 MINS SUPERFAST BEVERAGE DELIVERY</Text>
                </View>

                <Text style={styles.heroHeadline}>
                  Ice Cold Drinks,{'\n'}
                  <Text style={{ color: '#F8CB46' }}>Delivered in 10 Mins.</Text>
                </Text>

                <Text style={styles.heroSub}>
                  Chilled beers, single malts, mixers & party snacks at MRP.
                </Text>

                {/* Info Pills */}
                <View style={styles.heroBadgeRow}>
                  <View style={styles.heroBadge}>
                    <Clock size={12} color="#0C831F" strokeWidth={2.5} />
                    <Text style={styles.heroBadgeText}>10 Min Delivery</Text>
                  </View>
                  <View style={styles.heroBadge}>
                    <Snowflake size={12} color="#0284C7" strokeWidth={2.5} />
                    <Text style={styles.heroBadgeText}>Ice Cold Guarantee</Text>
                  </View>
                  <View style={styles.heroBadge}>
                    <ShieldCheck size={12} color="#F8CB46" strokeWidth={2.5} />
                    <Text style={styles.heroBadgeText}>100% Genuine</Text>
                  </View>
                </View>

                <Button
                  label="Order Now →"
                  variant="green"
                  size="lg"
                  onPress={() => router.push('/(tabs)/categories')}
                  style={{ marginTop: 8 }}
                />
              </View>

              {/* Center Column: Commercial Studio Bottle Visuals */}
              {width >= 900 && (
                <View style={styles.heroCenter}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80' }}
                    style={styles.heroImgBottle1}
                    resizeMode="contain"
                  />
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=400&q=80' }}
                    style={styles.heroImgBottle2}
                    resizeMode="contain"
                  />
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80' }}
                    style={styles.heroImgBottle3}
                    resizeMode="contain"
                  />
                </View>
              )}

              {/* Right Column: "Why Drinkit?" Translucent Card */}
              {width >= 768 && (
                <View style={styles.whyCard}>
                  <Text style={styles.whyTitle}>Why Drinkit?</Text>

                  <View style={styles.whyList}>
                    <View style={styles.whyItem}>
                      <Zap size={16} color="#F8CB46" strokeWidth={2.2} />
                      <View>
                        <Text style={styles.whyItemTitle}>⚡ 10 Mins Delivery</Text>
                        <Text style={styles.whyItemSub}>Superfast from local dark store</Text>
                      </View>
                    </View>

                    <View style={styles.whyItem}>
                      <Snowflake size={16} color="#38BDF8" strokeWidth={2.2} />
                      <View>
                        <Text style={styles.whyItemTitle}>Ice Cold Guarantee</Text>
                        <Text style={styles.whyItemSub}>Chilled & ready to pop</Text>
                      </View>
                    </View>

                    <View style={styles.whyItem}>
                      <ShieldCheck size={16} color="#0C831F" strokeWidth={2.2} />
                      <View>
                        <Text style={styles.whyItemTitle}>100% Genuine & Sealed</Text>
                        <Text style={styles.whyItemSub}>Directly from licensed distributors</Text>
                      </View>
                    </View>

                    <View style={styles.whyItem}>
                      <CreditCard size={16} color="#F8CB46" strokeWidth={2.2} />
                      <View>
                        <Text style={styles.whyItemTitle}>Instant UPI & COD</Text>
                        <Text style={styles.whyItemSub}>GPay, PhonePe, Cards & Cash</Text>
                      </View>
                    </View>
                  </View>

                  {/* 18+ / 21+ Legal Box */}
                  <View style={styles.legalBox}>
                    <View style={styles.ageBadge}>
                      <Text style={styles.ageBadgeText}>21+</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.legalTitle}>Responsible Delivery</Text>
                      <Text style={styles.legalSub}>Age verification at delivery</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* ── 2. Popular Searches Bar ──────────────────────────────────────── */}
          <View style={styles.quickSearchSection}>
            <View style={styles.quickSearchHeader}>
              <Flame size={16} color="#0C831F" strokeWidth={2.2} />
              <Text style={styles.quickSearchTitle}>Popular Searches</Text>
            </View>
            <View style={styles.pillRow}>
              {POPULAR_SEARCHES.map((term) => (
                <Pressable
                  key={term}
                  style={styles.searchPill}
                  onPress={() => router.push('/(tabs)/search')}
                >
                  <Text style={styles.searchPillText}>{term}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* ── 3. Shop by Category (Visual Cards Grid) ──────────────────────── */}
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Package size={20} color="#1C1C1C" strokeWidth={2.2} />
              <Text style={styles.sectionTitle}>Shop by Category</Text>
            </View>
            <Pressable style={styles.seeAllBtn} onPress={() => router.push('/(tabs)/categories')}>
              <Text style={styles.seeAll}>See all categories</Text>
              <ChevronRight size={16} color="#0C831F" strokeWidth={2.5} />
            </Pressable>
          </View>

          <View style={[styles.catGrid, { gap: GAP }]}>
            {CATEGORIES.map((c) => (
              <View key={c.id} style={{ width: catW }}>
                <CategoryTile
                  label={c.label}
                  imageUrl={CATEGORY_IMAGES[c.id]}
                  onPress={() => router.push(`/category/${c.id}`)}
                />
              </View>
            ))}
          </View>

          {/* ── 4. Bestsellers / Popular Drinks (Horizontal Carousel) ────────── */}
          <SectionHeader
            title="Bestsellers / Popular Drinks"
            subtitle="Top rated drinks near you"
            IconComponent={Award}
            iconColor="#0C831F"
            onSeeAll={() => router.push('/(tabs)/categories')}
          />
          <HorizontalProductCarousel items={bestsellers} cart={cart} router={router} />

          {/* ── 5. Ice Cold & Ready Section (Horizontal Carousel) ───────────── */}
          <SectionHeader
            title="Ice Cold & Ready"
            subtitle="Pre-chilled beers & RTDs delivered under 10 mins"
            IconComponent={Snowflake}
            iconColor="#0284C7"
            onSeeAll={() => router.push('/category/beer')}
          />
          <HorizontalProductCarousel items={chilledReady} cart={cart} router={router} />

          {/* ── 6. Party Bundles & Promotional Cards Row ─────────────────────── */}
          <View style={styles.promoRow}>
            <View style={[styles.promoBannerCard, { backgroundColor: '#E8F7EC', borderColor: '#C6F6D5' }]}>
              <View style={styles.promoHeaderRow}>
                <Sparkles size={20} color="#0C831F" strokeWidth={2.2} />
                <Text style={styles.promoBadgeTitle}>Party Bundles{'\n'}In One Tap</Text>
              </View>
              <Text style={styles.promoBadgeSub}>Beer + Chips + Ice combos prepped for your vibe.</Text>
              <Pressable style={styles.promoBtnGreen} onPress={() => router.push('/(tabs)/categories')}>
                <Text style={styles.promoBtnText}>Shop Bundles →</Text>
              </Pressable>
            </View>

            <View style={[styles.promoBannerCard, { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }]}>
              <View style={styles.promoHeaderRow}>
                <Snowflake size={20} color="#0284C7" strokeWidth={2.2} />
                <Text style={styles.promoBadgeTitle}>Ice Cold Beers</Text>
              </View>
              <Text style={styles.promoBadgeSub}>Chilled at 2°C & delivered in sealed thermal bags.</Text>
              <Pressable style={styles.promoBtnBlue} onPress={() => router.push('/category/beer')}>
                <Text style={styles.promoBtnText}>Shop Beers →</Text>
              </Pressable>
            </View>

            <View style={[styles.promoBannerCard, { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
              <View style={styles.promoHeaderRow}>
                <Percent size={20} color="#D97706" strokeWidth={2.2} />
                <Text style={styles.promoBadgeTitle}>Weekend Offers{'\n'}Up to 30% OFF</Text>
              </View>
              <Text style={styles.promoBadgeSub}>Special discounts on single malts & fine wines.</Text>
              <Pressable style={styles.promoBtnYellow} onPress={() => router.push('/(tabs)/categories')}>
                <Text style={styles.promoBtnTextDark}>View Deals →</Text>
              </Pressable>
            </View>

            <View style={[styles.promoBannerCard, { backgroundColor: '#F4F6FB', borderColor: '#E2E8F0' }]}>
              <View style={styles.promoHeaderRow}>
                <Zap size={20} color="#0C831F" strokeWidth={2.5} />
                <Text style={styles.promoBadgeTitle}>10 Mins Express</Text>
              </View>
              <Text style={styles.promoBadgeSub}>From local government-licensed dark stores.</Text>
              <Pressable style={styles.promoBtnDark} onPress={() => router.push('/(tabs)/categories')}>
                <Text style={styles.promoBtnText}>Order Fast →</Text>
              </Pressable>
            </View>
          </View>

          {/* ── 7. Offers & Deals (Horizontal Carousel) ──────────────────────── */}
          <SectionHeader
            title="Offers & Deals"
            subtitle="Big savings on your favourite drinks"
            IconComponent={Percent}
            iconColor="#0C831F"
            onSeeAll={() => router.push('/(tabs)/categories')}
          />
          <HorizontalProductCarousel items={offersDeals} cart={cart} router={router} />

          {/* ── 8. Party Essentials & Mixers (Horizontal Carousel) ──────────── */}
          <SectionHeader
            title="Party Essentials & Mixers"
            subtitle="Tonics, sodas, energy drinks & gourmet snacks"
            IconComponent={Zap}
            iconColor="#0C831F"
            onSeeAll={() => router.push('/category/mixers')}
          />
          <HorizontalProductCarousel items={partyItems} cart={cart} router={router} />

          {/* ── 9. Trust & Service Benefits Bar ──────────────────────────────── */}
          <TrustBar />

        </View>
      </View>
    </CustomerWebLayout>
  );
}

// ─── Section Header Helper ───────────────────────────────────────────────────
function SectionHeader({
  title,
  subtitle,
  IconComponent,
  iconColor = '#1C1C1C',
  onSeeAll,
}: {
  title: string;
  subtitle?: string;
  IconComponent: any;
  iconColor?: string;
  onSeeAll: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <IconComponent size={20} color={iconColor} strokeWidth={2.2} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {subtitle && <Text style={styles.sectionSub}>{subtitle}</Text>}
      </View>
      <Pressable style={styles.seeAllBtn} onPress={onSeeAll}>
        <Text style={styles.seeAll}>See all</Text>
        <ChevronRight size={16} color="#0C831F" strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}

// ─── Horizontal Product Carousel Component ───────────────────
function HorizontalProductCarousel({
  items,
  cart,
  router,
}: {
  items: CatalogProduct[];
  cart: any;
  router: any;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carouselContainer}
    >
      {items.map((p) => (
        <View key={p.id} style={styles.carouselCardItem}>
          <ProductCard
            id={p.id}
            name={p.name}
            brand={p.brand}
            meta={p.meta}
            price={p.price}
            mrp={p.mrp}
            discountPercent={p.discountPercent}
            rating={p.rating}
            imageUrl={p.imageUrl}
            isChilled={p.isChilled ?? true}
            etaMins={p.etaMins ?? 10}
            quantity={cart.quantityOf(p.id)}
            onPress={() => router.push(`/product/${p.id}`)}
            onAdd={() => cart.add(p.id)}
            onIncrement={() => cart.increment(p.id)}
            onDecrement={() => cart.decrement(p.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { paddingTop: 16, paddingBottom: 60 },
  container: { maxWidth: 1400, alignSelf: 'center', width: '100%' },

  // Hero Section
  heroBanner: {
    borderRadius: 20,
    overflow: 'hidden',
    minHeight: 340,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  heroLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    height: '100%',
  },
  heroLeft: { flex: 1, gap: 14, maxWidth: 480 },
  heroPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(248, 203, 70, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(248, 203, 70, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroPillText: { color: '#F8CB46', fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  heroHeadline: { fontSize: 36, fontWeight: '900', color: '#FFFFFF', lineHeight: 44 },
  heroSub: { color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 20 },

  heroBadgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 4 },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  heroBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },

  heroCenter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    height: 240,
  },
  heroImgBottle1: { width: 100, height: 220 },
  heroImgBottle2: { width: 90, height: 200 },
  heroImgBottle3: { width: 80, height: 180 },

  whyCard: {
    width: 280,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 14,
  },
  whyTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  whyList: { gap: 12 },
  whyItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  whyItemTitle: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  whyItemSub: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },

  legalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginTop: 4,
  },
  ageBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#F8CB46',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageBadgeText: { color: '#F8CB46', fontSize: 11, fontWeight: '900' },
  legalTitle: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  legalSub: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },

  // Quick search
  quickSearchSection: { marginTop: 24, gap: 10 },
  quickSearchHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  quickSearchTitle: { fontSize: 14, fontWeight: '800', color: '#1C1C1C' },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  searchPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  searchPillText: { fontSize: 13, fontWeight: '600', color: '#1C1C1C' },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1C' },
  sectionSub: { fontSize: 12, color: '#666666', marginTop: 2 },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  seeAll: { fontSize: 13, fontWeight: '700', color: '#0C831F' },

  // Category Grid
  catGrid: { flexDirection: 'row', flexWrap: 'wrap' },

  // Carousel
  carouselContainer: { paddingRight: 16, gap: 14 },
  carouselCardItem: { width: 220 },

  // Promo Banners Row
  promoRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 32,
    flexWrap: 'wrap',
  },
  promoBannerCard: {
    flex: 1,
    minWidth: 220,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    justifyContent: 'space-between',
    minHeight: 140,
    gap: 8,
  },
  promoHeaderRow: { gap: 6 },
  promoBadgeTitle: { fontSize: 16, fontWeight: '900', color: '#1C1C1C', lineHeight: 22 },
  promoBadgeSub: { fontSize: 12, color: '#666666' },
  promoBtnDark: {
    alignSelf: 'flex-start',
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 8,
  },
  promoBtnGreen: {
    alignSelf: 'flex-start',
    backgroundColor: '#0C831F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 8,
  },
  promoBtnBlue: {
    alignSelf: 'flex-start',
    backgroundColor: '#0284C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 8,
  },
  promoBtnYellow: {
    alignSelf: 'flex-start',
    backgroundColor: '#F8CB46',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 8,
  },
  promoBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  promoBtnTextDark: { color: '#1C1C1C', fontSize: 12, fontWeight: '800' },
});

