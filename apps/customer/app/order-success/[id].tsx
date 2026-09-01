import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle2, MapPin, Package, ArrowRight } from 'lucide-react-native';
import { Button } from '../../src/lib/ui';
import { formatInr } from '../../src/lib/utils';
import { useCartStore } from '../../src/store/cart';

export default function OrderSuccessScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const HPAD = isWide ? 32 : 16;
  const orderId = id ?? 'DK-2041';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingHorizontal: HPAD }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, isWide && styles.cardWide]}>
          {/* Animated Success Badge */}
          <View style={styles.badgeWrapper}>
            <View style={styles.checkCircle}>
              <CheckCircle2 size={56} color="#0C831F" strokeWidth={2.2} />
            </View>
            <Text style={styles.successTitle}>Order Confirmed!</Text>
            <Text style={styles.orderIdText}>Order ID: #{orderId}</Text>
          </View>

          {/* ETA Live Box */}
          <View style={styles.etaBox}>
            <Text style={styles.etaLabel}>ESTIMATED DELIVERY</Text>
            <Text style={styles.etaTime}>⚡ 10 Mins</Text>
            <Text style={styles.etaSub}>Your order has been sent to nearby dark store</Text>
          </View>

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailRow}>
              <MapPin size={18} color="#0C831F" />
              <View style={{ flex: 1 }}>
                <Text style={styles.detailTitle}>Delivering to</Text>
                <Text style={styles.detailSub}>Flat 402, 5th Block, Koramangala, Bengaluru</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Package size={18} color="#0C831F" />
              <View style={{ flex: 1 }}>
                <Text style={styles.detailTitle}>Items Included</Text>
                <Text style={styles.detailSub}>Kingfisher Premium (x2), Johnnie Walker Black Label (x1)</Text>
              </View>
            </View>
          </View>

          {/* CTAs */}
          <View style={styles.ctaRow}>
            <Button
              label="Track Live Order →"
              variant="green"
              fullWidth
              onPress={() => router.replace(`/tracking/${orderId}`)}
            />
            <Button
              label="Continue Shopping"
              variant="ghost"
              fullWidth
              style={{ marginTop: 8 }}
              onPress={() => router.replace('/(tabs)')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F6FB' },
  scroll: { paddingTop: 40, paddingBottom: 60, alignItems: 'center', justifyContent: 'center' },
  card: {
    width: '100%',
    maxWidth: 580,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 32,
    alignItems: 'center',
    gap: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  cardWide: { padding: 40 },

  badgeWrapper: { alignItems: 'center', gap: 8 },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E8F7EC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#C6F6D5',
  },
  successTitle: { fontSize: 26, fontWeight: '900', color: '#1C1C1C' },
  orderIdText: { fontSize: 14, fontWeight: '700', color: '#666666' },

  etaBox: {
    width: '100%',
    backgroundColor: '#1C1C1C',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 4,
  },
  etaLabel: { color: '#F8CB46', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  etaTime: { color: '#FFFFFF', fontSize: 32, fontWeight: '900' },
  etaSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },

  detailsGrid: { width: '100%', gap: 14, borderTopWidth: 1, borderTopColor: '#EBEBEB', paddingTop: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  detailTitle: { fontSize: 13, fontWeight: '800', color: '#1C1C1C' },
  detailSub: { fontSize: 12, color: '#666666', marginTop: 2, lineHeight: 18 },

  ctaRow: { width: '100%', marginTop: 8 },
});

