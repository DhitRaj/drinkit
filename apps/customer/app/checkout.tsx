import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Zap, Clock, ShieldCheck } from 'lucide-react-native';
import { formatInr } from '../src/lib/utils';
import { Button } from '../src/lib/ui';
import { useCartStore } from '../src/store/cart';
import { CustomerWebLayout } from '../src/lib/CustomerWebLayout';

export default function CheckoutScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const subtotal = useCartStore((s) => s.subtotal());
  const [instructions, setInstructions] = useState('');
  const [selectedTime, setSelectedTime] = useState('now');
  const deliveryFee = subtotal >= 500 ? 0 : 40;
  const platformFee = 9;
  const grand = subtotal + deliveryFee + platformFee;
  const isWide = width >= 768;
  const HPAD = isWide ? 24 : 16;

  const deliveryTimes = [
    { id: 'now', label: 'ASAP', sub: '30–45 mins' },
    { id: 'later', label: 'Schedule', sub: 'Pick a time' },
  ];

  return (
    <CustomerWebLayout
      breadcrumbs={[
        { label: 'Cart', href: '/(tabs)/cart' },
        { label: 'Checkout' },
      ]}
      showFloatingCart={false}
    >
      <View style={[styles.mainWrapper, { paddingHorizontal: HPAD }]}>
        <View style={[styles.layout, isWide && styles.layoutWide]}>

          {/* ── Left: Address + Instructions ── */}
          <View style={[styles.leftCol, isWide && styles.leftColWide]}>

            {/* Delivery Address Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardIconBox}>
                  <MapPin size={16} color="#0C831F" />
                </View>
                <Text style={styles.cardTitle}>Delivery Address</Text>
                <Pressable>
                  <Text style={styles.changeBtn}>Change</Text>
                </Pressable>
              </View>
              <Text style={styles.addressText}>
                214, 5th Block, Koramangala{'\n'}
                Bengaluru, Karnataka 560095
              </Text>
              <View style={styles.etaBadge}>
                <Zap size={13} color="#0C831F" strokeWidth={2.5} />
                <Text style={styles.etaText}>⚡ Expected delivery in 10 mins</Text>
              </View>
            </View>

            {/* Delivery Time */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Clock size={16} color="#0C831F" />
                <Text style={styles.cardTitle}>Delivery Time</Text>
              </View>

              <View style={styles.timeGrid}>
                {deliveryTimes.map((t) => (
                  <Pressable
                    key={t.id}
                    onPress={() => setSelectedTime(t.id)}
                    style={[styles.timeOption, selectedTime === t.id && styles.timeOptionSelected]}
                  >
                    <Text style={[styles.timeLabel, selectedTime === t.id && styles.timeLabelSelected]}>
                      {t.label}
                    </Text>
                    <Text style={[styles.timeSub, selectedTime === t.id && styles.timeSubSelected]}>
                      {t.sub}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Delivery Instructions */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Delivery Instructions (Optional)</Text>
              <TextInput
                value={instructions}
                onChangeText={setInstructions}
                placeholder="e.g. Leave at door, don't ring doorbell..."
                placeholderTextColor="#9CA3AF"
                style={styles.instructionInput}
                multiline
              />
            </View>

            {/* Age Verification Note */}
            <View style={styles.ageNoteCard}>
              <ShieldCheck size={18} color="#0C831F" strokeWidth={2.2} />
              <Text style={styles.ageNoteText}>
                Delivery partner will verify age (18+) at the time of delivery. Please keep a valid Govt ID handy.
              </Text>
            </View>
          </View>

          {/* ── Right: Summary ── */}
          <View style={[styles.rightCol, isWide && styles.rightColWide]}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Payment Summary</Text>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Item Subtotal</Text>
                <Text style={styles.billValue}>{formatInr(subtotal)}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={[styles.billValue, deliveryFee === 0 && { color: '#0C831F', fontWeight: '800' }]}>
                  {deliveryFee === 0 ? 'FREE ✓' : formatInr(deliveryFee)}
                </Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Platform Fee</Text>
                <Text style={styles.billValue}>{formatInr(platformFee)}</Text>
              </View>

              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Payable</Text>
                <Text style={styles.totalValue}>{formatInr(grand)}</Text>
              </View>
            </View>

            <Button
              label={`Proceed to Pay ${formatInr(grand)} →`}
              variant="green"
              fullWidth
              onPress={() => router.push('/payment')}
              style={{ marginTop: 12 }}
            />
          </View>

        </View>
      </View>
    </CustomerWebLayout>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { paddingTop: 20, paddingBottom: 40 },
  layout: { gap: 16 },
  layoutWide: { flexDirection: 'row', alignItems: 'flex-start', maxWidth: 1000, alignSelf: 'center', width: '100%' },

  leftCol: { flex: 1, gap: 14 },
  leftColWide: { flex: 3 },
  rightCol: { gap: 0 },
  rightColWide: { flex: 2 },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 18,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#E8F7EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#1C1C1C', flex: 1 },
  changeBtn: { color: '#0C831F', fontSize: 13, fontWeight: '700' },
  addressText: { color: '#666666', fontSize: 13, lineHeight: 20 },

  etaBadge: {
    backgroundColor: '#E8F7EC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#C6F6D5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  etaText: { color: '#0C831F', fontSize: 12, fontWeight: '800' },

  timeGrid: { flexDirection: 'row', gap: 10 },
  timeOption: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F4F6FB',
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
  },
  timeOptionSelected: { backgroundColor: '#FFFFFF', borderColor: '#0C831F' },
  timeLabel: { fontSize: 13, fontWeight: '800', color: '#1C1C1C' },
  timeLabelSelected: { color: '#0C831F' },
  timeSub: { fontSize: 11, color: '#666666', marginTop: 2 },
  timeSubSelected: { color: '#0C831F' },

  instructionInput: {
    backgroundColor: '#F4F6FB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 12,
    fontSize: 13,
    color: '#1C1C1C',
    minHeight: 70,
    textAlignVertical: 'top',
  },

  ageNoteCard: {
    backgroundColor: '#E8F7EC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C6F6D5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ageNoteText: { flex: 1, color: '#0C831F', fontSize: 12, fontWeight: '700', lineHeight: 17 },

  billRow: { flexDirection: 'row', justifyContent: 'space-between' },
  billLabel: { color: '#666666', fontSize: 14 },
  billValue: { color: '#1C1C1C', fontSize: 14, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#EBEBEB', marginVertical: 6 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 15, fontWeight: '800', color: '#1C1C1C' },
  totalValue: { fontSize: 18, fontWeight: '900', color: '#0C831F' },
});

