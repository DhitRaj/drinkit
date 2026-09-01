import React, { useMemo, useState } from 'react';
import {
  StyleSheet, Text, TextInput,
  View, useWindowDimensions, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Flame, Package, X } from 'lucide-react-native';
import { EmptyState, ProductCard } from '../../src/lib/ui';
import { PRODUCTS } from '../../src/data/catalog';
import { useCartStore } from '../../src/store/cart';
import { CustomerWebLayout } from '../../src/lib/CustomerWebLayout';

export default function SearchTabScreen() {
  const router = useRouter();
  const cart = useCartStore();
  const [q, setQ] = useState('');
  const { width } = useWindowDimensions();

  const HPAD = width >= 768 ? 24 : 16;
  const GAP = 12;
  const cols = width >= 1200 ? 5 : width >= 900 ? 4 : width >= 600 ? 3 : 2;
  const maxW = Math.min(width, 1400);
  const innerW = maxW - HPAD * 2;
  const cardW = (innerW - GAP * (cols - 1)) / cols;

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return PRODUCTS.filter((p) => !p.outOfStock);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle),
    );
  }, [q]);

  const popularSearches = ['Whisky', 'Beer', 'Wine', 'Vodka', 'Rum', 'Gin'];

  return (
    <CustomerWebLayout breadcrumbs={[{ label: 'Search' }]}>
      {/* Search Input Card */}
      <View style={[styles.header, { paddingHorizontal: HPAD }]}>
        <View style={styles.bar}>
          <Search size={18} color="#0C831F" strokeWidth={2.2} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder='Search "whisky", "beer", "wine", "chips"...'
            placeholderTextColor="#9E9E9E"
            style={styles.input}
            autoCorrect={false}
            autoFocus
          />
          {q.length > 0 && (
            <Pressable onPress={() => setQ('')} style={styles.clearBtn}>
              <X size={16} color="#666666" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Popular Searches (when empty) */}
      {q.length === 0 && (
        <View style={[styles.suggestArea, { paddingHorizontal: HPAD }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Flame size={16} color="#0C831F" strokeWidth={2.2} />
            <Text style={styles.suggestTitle}>Popular Searches</Text>
          </View>
          <View style={styles.pillRow}>
            {popularSearches.map((s) => (
              <Text
                key={s}
                style={styles.pill}
                onPress={() => setQ(s.toLowerCase())}
              >
                {s}
              </Text>
            ))}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, marginBottom: 8 }}>
            <Package size={16} color="#0C831F" strokeWidth={2.2} />
            <Text style={styles.suggestTitle}>All Products</Text>
          </View>
        </View>
      )}

      {results.length === 0 ? (
        <EmptyState
          title="No results found"
          body={`No products match "${q}". Try another search term.`}
          ctaLabel="Clear search"
          onCta={() => setQ('')}
        />
      ) : (
        <View style={[styles.grid, { paddingHorizontal: HPAD }]}>
          {q.length > 0 && (
            <Text style={styles.resultCount}>
              {results.length} result{results.length !== 1 ? 's' : ''} for "{q}"
            </Text>
          )}
          <View style={[styles.gridRow, { gap: GAP }]}>
            {results.map((p) => (
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
      )}
    </CustomerWebLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  bar: {
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F4F6FB',
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  input: { flex: 1, color: '#1C1C1C', fontSize: 14, fontWeight: '600' },
  clearBtn: { padding: 4 },

  suggestArea: { maxWidth: 1400, alignSelf: 'center', width: '100%', paddingTop: 20, gap: 4 },
  suggestTitle: { fontSize: 15, fontWeight: '800', color: '#1C1C1C' },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  pill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1C',
  },

  grid: { maxWidth: 1400, alignSelf: 'center', width: '100%', paddingTop: 16, paddingBottom: 40 },
  resultCount: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '600',
    marginBottom: 14,
  },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap' },
});

