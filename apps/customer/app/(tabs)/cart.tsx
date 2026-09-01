import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ShoppingCart,
  Zap,
  Truck,
  Sparkles,
  Lock,
  ShieldCheck,
  AlertCircle,
  Wine,
  Plus,
  Minus,
} from 'lucide-react-native';
import { formatInr } from '../../src/lib/utils';
import { Button, EmptyState, ProductCard, TrustBar } from '../../src/lib/ui';
import { PRODUCTS } from '../../src/data/catalog';
import { useCartStore } from '../../src/store/cart';
import { useAuthStore } from '../../src/store/auth';
import { CustomerWebLayout } from '../../src/lib/CustomerWebLayout';

export default function CartTabScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const cart = useCartStore();
  const lines = Object.values(cart.lines);
  const isWide = width >= 768;
  const HPAD = isWide ? 24 : 16;

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const product = PRODUCTS.find((p) => p.id === l.productId);
          return product ? { ...l, product } : null;
        })
        .filter(Boolean) as Array<{ productId: string; quantity: number; product: (typeof PRODUCTS)[0] }>,
    [lines],
  );

  const recommendedProducts = useMemo(
    () => PRODUCTS.filter((p) => !cart.lines[p.id]).slice(0, isWide ? 4 : 2),
    [cart.lines, isWide],
  );

  const itemTotal = cart.subtotal();
  const deliveryFee = itemTotal >= 500 ? 0 : 40;
  const platformFee = items.length ? 9 : 0;
  const grand = itemTotal + deliveryFee + platformFee;

  const handleProceedToCheckout = () => {
    const isAuth = useAuthStore.getState().isAuthenticated;
    if (isAuth) {
      router.push('/checkout');
    } else {
      router.push({ pathname: '/(auth)/login', params: { redirect: '/checkout' } });
    }
  };


  return (
    <CustomerWebLayout
      breadcrumbs={[{ label: 'My Cart' }]}
      showFloatingCart={false}
    >
      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          body="Add spirits, beer, wine or cocktails to get started."
          ctaLabel="Browse drinks"
          onCta={() => router.push('/(tabs)')}
        />
      ) : (
        <View style={[styles.mainWrapper, { paddingHorizontal: HPAD }]}>
          <View style={styles.container}>

            {/* Title Bar */}
            <View style={styles.cartTitleRow}>
              <ShoppingCart size={26} color="#0C831F" strokeWidth={2.2} />
              <Text style={styles.cartTitleText}>My Cart</Text>
              <Text style={styles.cartCountBadge}>
                {items.length} item{items.length > 1 ? 's' : ''}
              </Text>
            </View>

            {/* ── Two-Column Main Cart Layout ── */}
            <View style={[styles.layout, isWide && styles.layoutWide]}>

              {/* ── Left Column: Cart Items List ── */}
              <View style={[styles.itemsCol, isWide && styles.itemsColWide]}>
                <View style={styles.card}>
                  <View style={styles.deliveryBadge}>
                    <Zap size={14} color="#0C831F" strokeWidth={2.5} />
                    <Text style={styles.deliveryBadgeText}>⚡ Express Delivery in 10 mins</Text>
                  </View>

                  {items.map(({ product, quantity, productId }) => (
                    <View key={productId} style={styles.row}>
                      {/* Product Image */}
                      <View style={styles.thumb}>
                        {product.imageUrl ? (
                          <Image source={{ uri: product.imageUrl }} style={styles.thumbImg} resizeMode="contain" />
                        ) : (
                          <Wine size={32} color="#0C831F" strokeWidth={1.5} />
                        )}
                      </View>

                      {/* Product Info */}
                      <View style={styles.info}>
                        <Text style={styles.itemName} numberOfLines={2}>{product.name}</Text>
                        <Text style={styles.itemMeta}>{product.meta}</Text>
                        <View style={styles.priceLine}>
                          <Text style={styles.itemPrice}>{formatInr(product.price)}</Text>
                          {product.mrp > product.price && (
                            <Text style={styles.itemMrp}>{formatInr(product.mrp)} MRP</Text>
                          )}
                        </View>
                      </View>

                      {/* Quantity Stepper */}
                      <View style={styles.stepper}>
                        <Pressable
                          onPress={() => cart.decrement(productId)}
                          hitSlop={8}
                          style={styles.stepBtn}
                        >
                          <Minus size={14} color="#FFFFFF" strokeWidth={3} />
                        </Pressable>
                        <Text style={styles.qty}>{quantity}</Text>
                        <Pressable
                          onPress={() => cart.increment(productId)}
                          hitSlop={8}
                          style={styles.stepBtn}
                        >
                          <Plus size={14} color="#FFFFFF" strokeWidth={3} />
                        </Pressable>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Free delivery progress bar */}
                {itemTotal < 500 && (
                  <View style={styles.freeDeliveryBar}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Truck size={16} color="#0C831F" strokeWidth={2} />
                      <Text style={styles.freeDeliveryText}>
                        Add <Text style={{ fontWeight: '800', color: '#0C831F' }}>{formatInr(500 - itemTotal)}</Text> more for FREE delivery
                      </Text>
                    </View>
                    <View style={styles.freeDeliveryTrack}>
                      <View style={[styles.freeDeliveryFill, { width: `${Math.min((itemTotal / 500) * 100, 100)}%` as any }]} />
                    </View>
                  </View>
                )}
              </View>

              {/* ── Right Column: Price Details & Checkout CTA ── */}
              <View style={[styles.billCol, isWide && styles.billColWide]}>
                <View style={styles.card}>
                  <Text style={styles.billTitle}>Price Details</Text>

                  <BillRow label="Item Total" value={formatInr(itemTotal)} />
                  <BillRow
                    label="Delivery Fee"
                    value={deliveryFee === 0 ? 'FREE ✓' : formatInr(deliveryFee)}
                    valueGreen={deliveryFee === 0}
                  />
                  <BillRow label="Platform Fee" value={formatInr(platformFee)} />

                  <View style={styles.billDivider} />
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>{formatInr(grand)}</Text>
                  </View>

                  <View style={styles.savingsRow}>
                    <Sparkles size={14} color="#0C831F" strokeWidth={2} />
                    <Text style={styles.savingsText}>
                      You save {formatInr(items.reduce((acc, i) => acc + (i.product.mrp - i.product.price) * i.quantity, 0))} on this order
                    </Text>
                  </View>
                </View>

                <Button
                  label={`Proceed to Checkout · ${formatInr(grand)}`}
                  variant="green"
                  fullWidth
                  onPress={handleProceedToCheckout}
                  style={{ marginTop: 14 }}
                />

                {/* Safety & Compliance badges */}
                <View style={styles.badges}>
                  <View style={styles.badgePill}>
                    <Lock size={12} color="#0C831F" strokeWidth={2} />
                    <Text style={styles.badgeItem}>Secure payment</Text>
                  </View>
                  <View style={styles.badgePill}>
                    <ShieldCheck size={12} color="#0C831F" strokeWidth={2} />
                    <Text style={styles.badgeItem}>100% genuine</Text>
                  </View>
                  <View style={styles.badgePill}>
                    <AlertCircle size={12} color="#0C831F" strokeWidth={2} />
                    <Text style={styles.badgeItem}>18+ verified</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* ── Recommended / Frequently Bought Together Section ── */}
            {recommendedProducts.length > 0 && (
              <View style={styles.recommendedSection}>
                <View style={styles.recHeaderRow}>
                  <Sparkles size={18} color="#0C831F" strokeWidth={2} />
                  <Text style={styles.recTitle}>Frequently Bought Together</Text>
                </View>

                <View style={styles.recGrid}>
                  {recommendedProducts.map((p) => (
                    <View key={p.id} style={styles.recCardBox}>
                      <ProductCard
                        id={p.id}
                        name={p.name}
                        meta={p.meta}
                        price={p.price}
                        mrp={p.mrp}
                        discountPercent={p.discountPercent}
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

            {/* ── Trust & Service Benefits Bar ── */}
            <TrustBar />

          </View>
        </View>
      )}
    </CustomerWebLayout>
  );
}

function BillRow({ label, value, valueGreen }: { label: string; value: string; valueGreen?: boolean }) {
  return (
    <View style={brStyles.row}>
      <Text style={brStyles.label}>{label}</Text>
      <Text style={[brStyles.value, valueGreen && { color: '#0C831F', fontWeight: '800' }]}>{value}</Text>
    </View>
  );
}
const brStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { color: '#666666', fontSize: 14 },
  value: { color: '#1C1C1C', fontSize: 14, fontWeight: '700' },
});

const styles = StyleSheet.create({
  mainWrapper: { paddingTop: 24, paddingBottom: 40 },
  container: { maxWidth: 1400, alignSelf: 'center', width: '100%' },

  cartTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  cartTitleText: { fontSize: 24, fontWeight: '900', color: '#1C1C1C' },
  cartCountBadge: {
    backgroundColor: '#E8F7EC',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: '#0C831F',
    fontSize: 12,
    fontWeight: '800',
  },

  layout: { gap: 20 },
  layoutWide: { flexDirection: 'row', alignItems: 'flex-start' },

  itemsCol: { flex: 1, gap: 14 },
  itemsColWide: { flex: 3 },

  billCol: { gap: 0 },
  billColWide: { flex: 2, maxWidth: 400 },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  deliveryBadge: {
    backgroundColor: '#E8F7EC',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C6F6D5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryBadgeText: { color: '#0C831F', fontSize: 13, fontWeight: '800' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    gap: 14,
  },

  thumb: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F4F6FB',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  thumbImg: { width: '85%', height: '85%' },

  info: { flex: 1 },
  itemName: { color: '#1C1C1C', fontWeight: '700', fontSize: 14, lineHeight: 20 },
  itemMeta: { color: '#666666', fontSize: 12, marginTop: 2 },
  priceLine: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 6 },
  itemPrice: { color: '#1C1C1C', fontWeight: '800', fontSize: 16 },
  itemMrp: { color: '#9E9E9E', fontSize: 12, textDecorationLine: 'line-through' },

  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    width: 96,
    borderRadius: 999,
    backgroundColor: '#0C831F',
    flexShrink: 0,
  },
  stepBtn: { width: 30, alignItems: 'center', justifyContent: 'center', height: '100%' as any },
  qty: { flex: 1, textAlign: 'center', color: '#FFFFFF', fontWeight: '800', fontSize: 14 },

  freeDeliveryBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    gap: 8,
  },
  freeDeliveryText: { color: '#1C1C1C', fontSize: 13 },
  freeDeliveryTrack: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' },
  freeDeliveryFill: { height: '100%', backgroundColor: '#0C831F', borderRadius: 3 },

  billTitle: { fontSize: 16, fontWeight: '800', color: '#1C1C1C', marginBottom: 14 },
  billDivider: { height: 1, backgroundColor: '#EBEBEB', marginVertical: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  totalLabel: { color: '#1C1C1C', fontWeight: '800', fontSize: 15 },
  totalValue: { color: '#0C831F', fontWeight: '900', fontSize: 20 },

  savingsRow: {
    backgroundColor: '#E8F7EC',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  savingsText: { color: '#0C831F', fontSize: 12, fontWeight: '800' },

  badges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 14,
    flexWrap: 'wrap',
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeItem: { color: '#1C1C1C', fontSize: 11, fontWeight: '600' },

  // Recommended section
  recommendedSection: { marginTop: 36 },
  recHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  recTitle: { fontSize: 18, fontWeight: '800', color: '#1C1C1C' },
  recGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  recCardBox: { flex: 1, minWidth: 200, maxWidth: 280 },
});

