import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Smartphone, CreditCard, Building, Wallet, Banknote, ShieldCheck } from 'lucide-react-native';
import { formatInr } from '../src/lib/utils';
import { Button } from '../src/lib/ui';
import { useCartStore } from '../src/store/cart';
import { CustomerWebLayout } from '../src/lib/CustomerWebLayout';
import { api } from '../src/services/api';


const METHODS = [
  { id: 'gpay', label: 'Google Pay', group: 'UPI', Icon: Smartphone },
  { id: 'phonepe', label: 'PhonePe', group: 'UPI', Icon: Smartphone },
  { id: 'paytm', label: 'Paytm UPI', group: 'UPI', Icon: Smartphone },
  { id: 'card', label: 'Credit / Debit Card', group: 'Card', Icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', group: 'Other', Icon: Building },
  { id: 'wallet', label: 'Drinkit Wallet', group: 'Other', Icon: Wallet },
  { id: 'cod', label: 'Cash on Delivery', group: 'Other', Icon: Banknote },
];

const GROUPS = [
  { key: 'UPI', label: 'UPI / Instant Wallets' },
  { key: 'Card', label: 'Cards' },
  { key: 'Other', label: 'Other Methods' },
];

export default function PaymentScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const subtotal = useCartStore((s) => s.subtotal());
  const [selected, setSelected] = useState('gpay');
  const [paying, setPaying] = useState(false);
  const grand = subtotal + (subtotal >= 500 ? 0 : 40) + 9;
  const isWide = width >= 768;
  const HPAD = isWide ? 24 : 16;

  return (
    <CustomerWebLayout
      breadcrumbs={[
        { label: 'Cart', href: '/(tabs)/cart' },
        { label: 'Checkout', href: '/checkout' },
        { label: 'Payment' },
      ]}
      showFloatingCart={false}
    >
      <View style={[styles.mainWrapper, { paddingHorizontal: HPAD }]}>
        <View style={[styles.layout, isWide && styles.layoutWide]}>

          {/* ── Payment Methods ── */}
          <View style={[styles.leftCol, isWide && styles.leftColWide]}>

            {/* Security badge */}
            <View style={styles.secureBar}>
              <ShieldCheck size={16} color="#0C831F" strokeWidth={2.2} />
              <Text style={styles.secureText}>100% Secure · SSL Encrypted · RBI Compliant</Text>
            </View>

            {/* Method Groups */}
            {GROUPS.map((g) => (
              <View key={g.key} style={styles.methodGroup}>
                <Text style={styles.groupLabel}>{g.label}</Text>
                {METHODS.filter((m) => m.group === g.key).map((m) => {
                  const IconComponent = m.Icon;
                  const isAct = selected === m.id;
                  return (
                    <Pressable
                      key={m.id}
                      onPress={() => setSelected(m.id)}
                      style={[styles.methodRow, isAct && styles.methodRowActive]}
                    >
                      <View style={[styles.iconBox, isAct && { backgroundColor: '#E8F7EC' }]}>
                        <IconComponent size={18} color={isAct ? '#0C831F' : '#666666'} strokeWidth={2} />
                      </View>
                      <Text style={[styles.methodLabel, isAct && { color: '#0C831F', fontWeight: '800' }]}>
                        {m.label}
                      </Text>
                      <View style={[styles.radio, isAct && styles.radioFilled]}>
                        {isAct && <View style={styles.radioDot} />}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>

          {/* ── Amount Summary ── */}
          <View style={[styles.rightCol, isWide && styles.rightColWide]}>
            {/* Amount Card */}
            <View style={styles.amountCard}>
              <Text style={styles.amountLabel}>Total Amount to Pay</Text>
              <Text style={styles.amountValue}>{formatInr(grand)}</Text>
              <View style={styles.amountBreakdown}>
                <Text style={styles.breakdownText}>Items · {formatInr(subtotal)}</Text>
                <Text style={styles.breakdownText}>
                  Delivery · {grand - subtotal - 9 === 0 ? 'FREE' : formatInr(grand - subtotal - 9)}
                </Text>
                <Text style={styles.breakdownText}>Platform fee · ₹9</Text>
              </View>
            </View>

            {/* UPI ID field if UPI selected */}
            {['gpay', 'phonepe', 'paytm'].includes(selected) && (
              <View style={styles.upiCard}>
                <Text style={styles.upiLabel}>
                  {selected === 'gpay' ? 'Google Pay UPI ID' :
                   selected === 'phonepe' ? 'PhonePe UPI ID' :
                   'Paytm UPI ID'}
                </Text>
                <View style={styles.upiInput}>
                  <Text style={styles.upiPlaceholder}>yourname@upi</Text>
                </View>
              </View>
            )}

            <Button
              label={`Pay ${formatInr(grand)} →`}
              variant="green"
              fullWidth
              loading={paying}
              onPress={async () => {
                setPaying(true);
                try {
                  const cartState = useCartStore.getState();
                  const cartLines = Object.values(cartState.lines);
                  const orderItems = cartLines.length > 0
                    ? cartLines.map((l) => ({ productId: l.productId, quantity: l.quantity }))
                    : [{ productId: 'prod_1', quantity: 1 }];

                  const res = await api.placeOrder('mock_token', {
                    items: orderItems,
                    address: { addressLine1: 'Flat 402, 5th Block, Koramangala' },
                    paymentMethod: selected.toUpperCase() === 'COD' ? 'WALLET' : 'UPI',
                    grandTotal: grand,
                  });

                  // Clear cart completely after order is confirmed
                  useCartStore.getState().clearCart();

                  const createdId = res.order?.id || res.order?.orderNumber || 'DK-2041';
                  setTimeout(() => router.replace(`/tracking/${createdId}`), 400);
                } catch {
                  useCartStore.getState().clearCart();
                  setTimeout(() => router.replace('/tracking/DK-2041'), 400);
                }
              }}
            />

            <Text style={styles.disclaimer}>
              By paying, you confirm you are 21+ and agree to state excise laws.
            </Text>
          </View>
        </View>
      </View>
    </CustomerWebLayout>

  );
}


const styles = StyleSheet.create({
  mainWrapper: { paddingTop: 20, paddingBottom: 40 },
  layout: { gap: 14 },
  layoutWide: { flexDirection: 'row', alignItems: 'flex-start', maxWidth: 1000, alignSelf: 'center', width: '100%' },
  leftCol: { gap: 14 },
  leftColWide: { flex: 3 },
  rightCol: { gap: 14 },
  rightColWide: { flex: 2, maxWidth: 380 },

  secureBar: {
    backgroundColor: '#E8F7EC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#C6F6D5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secureText: { color: '#0C831F', fontSize: 12, fontWeight: '800' },

  methodGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  groupLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#666666',
    padding: 14,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  methodRowActive: { backgroundColor: '#E8F7EC' },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F4F6FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodLabel: { flex: 1, color: '#1C1C1C', fontWeight: '700', fontSize: 14 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioFilled: { borderColor: '#0C831F' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0C831F' },

  amountCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 16,
    padding: 20,
    gap: 8,
    alignItems: 'center',
  },
  amountLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },
  amountValue: { color: '#F8CB46', fontSize: 32, fontWeight: '900' },
  amountBreakdown: { gap: 4, alignItems: 'center' },
  breakdownText: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },

  upiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    gap: 8,
  },
  upiLabel: { fontSize: 13, fontWeight: '700', color: '#1C1C1C' },
  upiInput: {
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F4F6FB',
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  upiPlaceholder: { color: '#9E9E9E', fontSize: 13 },

  disclaimer: {
    color: '#9E9E9E',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});

