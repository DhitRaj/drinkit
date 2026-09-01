import React, { useMemo, useState } from 'react';
import {
  Image, Modal, Pressable,
  StyleSheet, Text, View, useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SlidersHorizontal, Check } from 'lucide-react-native';
import { ProductCard } from '../../src/lib/ui';
import { getCategory, productsByCategory } from '../../src/data/catalog';
import { useCartStore } from '../../src/store/cart';
import { CustomerWebLayout } from '../../src/lib/CustomerWebLayout';

type Sort = 'popular' | 'price_asc' | 'price_desc';

const CATEGORY_HERO_IMAGES: Record<string, string> = {
  whiskey: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&q=80',
  beer: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=1200&q=80',
  wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
  vodka: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=1200&q=80',
  rum: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
  gin: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80',
  cocktails: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=1200&q=80',
};

const SORT_LABELS: Record<Sort, string> = {
  popular: 'Popular',
  price_asc: 'Price: Low to High',
  price_desc: 'Price: High to Low',
};

export default function CategoryListingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const cart = useCartStore();
  const category = getCategory(id ?? 'whiskey');
  const [sort, setSort] = useState<Sort>('popular');
  const [showSort, setShowSort] = useState(false);
  const { width } = useWindowDimensions();

  const cols = width >= 1200 ? 5 : width >= 900 ? 4 : width >= 600 ? 3 : 2;
  const HPAD = width >= 768 ? 24 : 16;
  const GAP = 12;
  const maxW = Math.min(width, 1400);
  const innerW = maxW - HPAD * 2;
  const cardW = (innerW - GAP * (cols - 1)) / cols;

  const heroImg = CATEGORY_HERO_IMAGES[id ?? ''] ??
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80';

  const products = useMemo(() => {
    const list = [...productsByCategory(id ?? 'whiskey')];
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [id, sort]);

  return (
    <CustomerWebLayout
      breadcrumbs={[
        { label: 'Categories', href: '/(tabs)/categories' },
        { label: category?.label ?? 'Category' },
      ]}
    >
      <View style={{ paddingBottom: 40 }}>
        {/* Hero Banner */}
        <View style={styles.heroWrapper}>
          <Image source={{ uri: heroImg }} style={styles.heroImg} resizeMode="cover" />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{category?.label ?? 'Category'}</Text>
            <Text style={styles.heroSub}>
              {products.length} products · ⚡ Express Delivery in 10 mins
            </Text>
          </View>
        </View>

        {/* Filter Bar */}
        <View style={[styles.filterBar, { paddingHorizontal: HPAD }]}>
          <Pressable style={styles.sortBtn} onPress={() => setShowSort(true)}>
            <SlidersHorizontal size={14} color="#1C1C1C" />
            <Text style={styles.sortBtnText}>{SORT_LABELS[sort]}</Text>
          </Pressable>
          <Text style={styles.countText}>{products.length} items</Text>
        </View>

        {/* Product Grid */}
        <View style={[styles.grid, { paddingHorizontal: HPAD, gap: GAP }]}>
          {products.map((p) => (
            <View key={p.id} style={{ width: cardW }}>
              <ProductCard
                id={p.id}
                name={p.name}
                meta={p.meta}
                price={p.price}
                mrp={p.mrp}
                discountPercent={p.discountPercent || undefined}
                rating={p.rating}
                outOfStock={p.outOfStock}
                imageUrl={p.imageUrl}
                quantity={cart.quantityOf(p.id)}
                onPress={() => router.push(`/product/${p.id}`)}
                onAdd={() => cart.add(p.id)}
                onIncrement={() => cart.increment(p.id)}
                onDecrement={() => cart.decrement(p.id)}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Sort Sheet */}
      <Modal visible={showSort} transparent animationType="slide" onRequestClose={() => setShowSort(false)}>
        <Pressable style={styles.scrim} onPress={() => setShowSort(false)}>
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Sort Products</Text>
            {(['popular', 'price_asc', 'price_desc'] as Sort[]).map((key) => (
              <Pressable
                key={key}
                style={[styles.sheetRow, sort === key && styles.sheetRowActive]}
                onPress={() => {
                  setSort(key);
                  setShowSort(false);
                }}
              >
                <Text style={[styles.sheetRowText, sort === key && { color: '#0C831F', fontWeight: '800' }]}>
                  {SORT_LABELS[key]}
                </Text>
                {sort === key && <Check size={16} color="#0C831F" strokeWidth={3} />}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </CustomerWebLayout>
  );
}

const styles = StyleSheet.create({
  heroWrapper: {
    height: 180,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject as any,
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 20,
  },
  heroTitle: { color: '#FFFFFF', fontSize: 30, fontWeight: '900', lineHeight: 36 },
  heroSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 4, fontWeight: '600' },

  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 10,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  sortBtnText: { color: '#1C1C1C', fontSize: 13, fontWeight: '700' },
  countText: { marginLeft: 'auto', color: '#666666', fontSize: 13, fontWeight: '600' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 8,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },

  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 48,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EBEBEB',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1C',
    marginBottom: 16,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
  },
  sheetRowActive: { backgroundColor: '#E8F7EC', marginHorizontal: -24, paddingHorizontal: 24 },
  sheetRowText: { flex: 1, color: '#1C1C1C', fontSize: 15 },
});

