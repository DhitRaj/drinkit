import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Share2,
  Star,
  Zap,
  ShieldCheck,
  Tag,
  FileText,
  Truck,
  Plus,
  Minus,
  Wine,
  AlertCircle,
} from 'lucide-react-native';

import { PRODUCTS } from '../../src/data/catalog';
import { Button } from '../../src/lib/ui';
import { formatInr } from '../../src/lib/utils';
import { useCartStore } from '../../src/store/cart';
import { CustomerWebLayout } from '../../src/lib/CustomerWebLayout';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
  const cart = useCartStore();
  const qty = cart.quantityOf(product.id);

  return (
    <CustomerWebLayout
      breadcrumbs={[
        { label: 'Categories', href: '/(tabs)/categories' },
        { label: product.name },
      ]}
    >
      <View style={{ paddingBottom: 100 }}>
        {/* Hero Image Area */}
        <View style={styles.hero}>
          {/* Share Action */}
          <View style={styles.heroActions}>
            <Pressable style={styles.iconBtn}>
              <Share2 size={18} color="#121316" />
            </Pressable>
          </View>

          {/* Product Image */}
          <View style={styles.imageContainer}>
            {product.imageUrl ? (
              <Image
                source={{ uri: product.imageUrl }}
                style={[styles.productImage, isWide && { height: 320 }]}
                resizeMode="contain"
              />
            ) : (
              <Wine size={72} color="#0C831F" strokeWidth={1.5} />
            )}
          </View>

          {/* Delivery Badge */}
          <View style={styles.deliveryBadge}>
            <Zap size={14} color="#0C831F" strokeWidth={2.5} />
            <Text style={styles.deliveryBadgeText}>⚡ 10 mins · From nearby licensed dark stores</Text>
          </View>
        </View>

        {/* Body Content */}
        <View style={[styles.body, isWide && { maxWidth: 900, alignSelf: 'center', width: '100%' }]}>

          {/* Discount Badge */}
          {product.discountPercent > 0 && (
            <View style={styles.discountBadge}>
              <Tag size={12} color="#0C831F" strokeWidth={2} />
              <Text style={styles.discountText}>{product.discountPercent}% OFF</Text>
            </View>
          )}

          {/* Name */}
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productMeta}>{product.volume} · {product.abv} ABV</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.ratingCount}>({product.reviews} reviews)</Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatInr(product.price)}</Text>
            {product.mrp > product.price && (
              <Text style={styles.mrp}>{formatInr(product.mrp)}</Text>
            )}
            {product.discountPercent > 0 && (
              <Text style={styles.saving}>Save {formatInr(product.mrp - product.price)}</Text>
            )}
          </View>

          {/* Feature Tags */}
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Zap size={13} color="#0C831F" strokeWidth={2.5} />
              <Text style={styles.tagLabel}>⚡ 10 mins delivery</Text>
            </View>
            <View style={styles.tag}>
              <ShieldCheck size={13} color="#0C831F" strokeWidth={2} />
              <Text style={styles.tagLabel}>100% Genuine product</Text>
            </View>
            <View style={styles.tag}>
              <AlertCircle size={13} color="#0C831F" strokeWidth={2} />
              <Text style={styles.tagLabel}>Age verified delivery</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <FileText size={16} color="#1C1C1C" strokeWidth={2} />
              <Text style={styles.sectionTitle}>Product Details</Text>
            </View>
            <Text style={styles.sectionText}>{product.description}</Text>
          </View>

          {/* Delivery Info */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Truck size={16} color="#1C1C1C" strokeWidth={2} />
              <Text style={styles.sectionTitle}>Delivery Info</Text>
            </View>
            <Text style={styles.sectionText}>
              Usually arrives in 10 minutes from your local dark store. Delivered in temperature-controlled thermal bags. Valid ID required.
            </Text>
          </View>

          {/* Legal */}
          <View style={styles.legalBox}>
            <AlertCircle size={16} color="#B91C1C" strokeWidth={2} />
            <Text style={styles.legalText}>
              Consumption of alcohol is injurious to health. This product is for legal drinking age adults only.
            </Text>
          </View>
        </View>
      </View>

      {/* Sticky CTA Bar */}
      <View style={styles.ctaBar}>
        {product.outOfStock ? (
          <View style={styles.oosBox}>
            <Text style={styles.oosText}>Out of stock</Text>
          </View>
        ) : qty > 0 ? (
          <View style={styles.stepperContainer}>
            <View style={styles.stepper}>
              <Pressable onPress={() => cart.decrement(product.id)} style={styles.stepBtn}>
                <Minus size={16} color="#FFFFFF" strokeWidth={3} />
              </Pressable>
              <Text style={styles.qtyText}>{qty} in cart</Text>
              <Pressable onPress={() => cart.increment(product.id)} style={styles.stepBtn}>
                <Plus size={16} color="#FFFFFF" strokeWidth={3} />
              </Pressable>
            </View>
            <Button
              label="View Cart →"
              variant="green"
              size="lg"
              onPress={() => router.push('/(tabs)/cart')}
            />
          </View>
        ) : (
          <Button
            label={`Add to Cart · ${formatInr(product.price)}`}
            variant="green"
            fullWidth
            onPress={() => cart.add(product.id)}
          />
        )}
      </View>
    </CustomerWebLayout>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    alignItems: 'center',
    position: 'relative',
  },
  heroActions: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F6FB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },

  imageContainer: {
    height: 240,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  productImage: { width: '80%', height: '100%' },

  deliveryBadge: {
    backgroundColor: '#E8F7EC',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#C6F6D5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deliveryBadgeText: { color: '#0C831F', fontSize: 12, fontWeight: '800' },

  body: { padding: 20, gap: 14 },

  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F7EC',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  discountText: { color: '#0C831F', fontSize: 12, fontWeight: '800' },

  productName: { color: '#1C1C1C', fontSize: 24, fontWeight: '900', lineHeight: 30 },
  productMeta: { color: '#666666', fontSize: 14, fontWeight: '500' },

  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingText: { color: '#1C1C1C', fontSize: 14, fontWeight: '800' },
  ratingCount: { color: '#666666', fontSize: 13 },

  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 4 },
  price: { color: '#1C1C1C', fontSize: 28, fontWeight: '900' },
  mrp: { color: '#9E9E9E', fontSize: 16, textDecorationLine: 'line-through' },
  saving: { color: '#0C831F', fontSize: 13, fontWeight: '800' },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 4 },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagLabel: { color: '#1C1C1C', fontSize: 12, fontWeight: '600' },

  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 16,
    gap: 8,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { color: '#1C1C1C', fontSize: 15, fontWeight: '800' },
  sectionText: { color: '#666666', fontSize: 13, lineHeight: 20 },

  legalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    padding: 14,
  },
  legalText: { flex: 1, color: '#991B1B', fontSize: 12, fontWeight: '600', lineHeight: 17 },

  ctaBar: {
    position: 'fixed' as any,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 100,
  },
  oosBox: {
    backgroundColor: '#EBEBEB',
    borderRadius: 999,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oosText: { color: '#666666', fontSize: 14, fontWeight: '700' },

  stepperContainer: { flexDirection: 'row', gap: 12, maxWidth: 800, alignSelf: 'center', width: '100%' },
  stepper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0C831F',
    borderRadius: 999,
    paddingHorizontal: 16,
    height: 50,
  },
  stepBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  qtyText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});

