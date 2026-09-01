import React, { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Phone, MessageCircle, CheckCircle2, Package, Truck, Home, Clock, MapPin, ShieldCheck } from 'lucide-react-native';
import { Button } from '../../src/lib/ui';
import { CustomerWebLayout } from '../../src/lib/CustomerWebLayout';

const STEPS = [
  { key: 'confirmed', label: 'Order Confirmed', Icon: CheckCircle2, done: true, time: '7:42 PM', desc: 'Your order has been accepted' },
  { key: 'packed', label: 'Packed & Ready', Icon: Package, done: true, time: '7:51 PM', desc: 'Packed by store partner' },
  { key: 'ofd', label: 'Out for Delivery', Icon: Truck, done: false, active: true, time: 'Now', desc: 'Ravi Kumar is on the way' },
  { key: 'delivered', label: 'Delivered', Icon: Home, done: false, time: '', desc: 'Will be delivered to your door' },
];

export default function TrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const HPAD = width >= 768 ? 32 : 16;
  const [pulse] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.3, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <CustomerWebLayout
      breadcrumbs={[
        { label: 'Orders', href: '/(tabs)/orders' },
        { label: `Tracking ${id ?? 'DK-2041'}` },
      ]}
      showFloatingCart={false}
    >
      <View style={[styles.mainWrapper, { paddingHorizontal: HPAD }]}>
        <View style={styles.container}>

          {/* ETA Hero Card */}
          <View style={styles.etaCard}>
            <View style={styles.etaLeft}>
              <Text style={styles.etaOrderId}>Order {id ?? 'DK-2041'}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Clock size={24} color="#F8CB46" strokeWidth={2.5} />
                <Text style={styles.etaTime}>⚡ 10 Mins</Text>
              </View>
              <Text style={styles.etaSub}>Estimated delivery time</Text>
            </View>
            <View style={styles.etaRight}>
              <Truck size={40} color="#F8CB46" strokeWidth={1.5} />
              <View style={styles.etaBadge}>
                <View style={styles.etaDot} />
                <Text style={styles.etaBadgeText}>LIVE</Text>
              </View>
            </View>
          </View>

          {/* Map placeholder */}
          <View style={styles.mapPlaceholder}>
            <MapPin size={32} color="#0C831F" strokeWidth={2.2} />
            <View style={styles.mapOverlay}>
              <MapPin size={18} color="#0C831F" strokeWidth={2.2} />
              <Text style={styles.mapLabel}>⚡ Delivery partner en route · 6 mins away</Text>
            </View>
          </View>

          {/* Timeline */}
          <View style={styles.timelineCard}>
            <Text style={styles.sectionTitle}>Order Progress</Text>
            {STEPS.map((step, i) => {
              const StepIcon = step.Icon;
              return (
                <View key={step.key} style={styles.step}>
                  {/* Rail */}
                  <View style={styles.rail}>
                    <Animated.View
                      style={[
                        styles.dot,
                        step.done && styles.dotDone,
                        step.active && styles.dotActive,
                        !step.done && !step.active && styles.dotPending,
                        step.active && { transform: [{ scale: pulse }] },
                      ]}
                    >
                      <StepIcon
                        size={18}
                        color={step.done ? '#0C831F' : step.active ? '#1C1C1C' : '#9E9E9E'}
                        strokeWidth={2}
                      />
                    </Animated.View>
                    {i < STEPS.length - 1 && (
                      <View style={[styles.line, step.done && styles.lineDone]} />
                    )}
                  </View>

                  {/* Content */}
                  <View style={[styles.stepBody, step.active && styles.stepBodyActive]}>
                    <View style={styles.stepTop}>
                      <Text
                        style={[
                          styles.stepLabel,
                          { color: step.done || step.active ? '#1C1C1C' : '#9E9E9E' },
                        ]}
                      >
                        {step.label}
                      </Text>
                      {step.time ? <Text style={styles.stepTime}>{step.time}</Text> : null}
                    </View>
                    <Text style={styles.stepDesc}>{step.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Doorstep Delivery OTP Card */}
          <View style={styles.otpCard}>
            <View style={styles.otpLeft}>
              <Text style={styles.otpLabel}>DOORSTEP DELIVERY OTP</Text>
              <Text style={styles.otpValue}>4921</Text>
              <Text style={styles.otpSub}>Share with rider after Govt ID age check</Text>
            </View>
            <View style={styles.otpBadge}>
              <ShieldCheck size={20} color="#0C831F" strokeWidth={2.5} />
              <Text style={styles.otpBadgeText}>21+ Age Verified</Text>
            </View>
          </View>

          {/* Delivery Partner */}
          <View style={styles.partnerCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>RK</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.partnerName}>Ravi Kumar</Text>
              <Text style={styles.partnerMeta}>Delivery Partner · KA-01-EE-2041</Text>
            </View>
            <Pressable style={styles.iconBtn}>
              <Phone size={18} color="#0C831F" />
            </Pressable>
            <Pressable style={styles.iconBtn}>
              <MessageCircle size={18} color="#0C831F" />
            </Pressable>
          </View>

          {/* Support */}
          <View style={styles.supportRow}>
            <ShieldCheck size={16} color="#0C831F" strokeWidth={2.2} />
            <Text style={styles.supportText}>24/7 Live Support Available</Text>
          </View>

          <Button
            label="Order More Drinks →"
            variant="green"
            fullWidth
            onPress={() => router.push('/(tabs)')}
          />
        </View>
      </View>
    </CustomerWebLayout>

  );
}

const styles = StyleSheet.create({
  mainWrapper: { paddingTop: 20, paddingBottom: 60 },
  container: { maxWidth: 640, alignSelf: 'center', width: '100%', gap: 16 },

  etaCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  etaLeft: { gap: 6 },
  etaOrderId: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600' },
  etaTime: { color: '#F8CB46', fontSize: 32, fontWeight: '900' },
  etaSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  etaRight: { alignItems: 'center', gap: 8 },
  etaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#0C831F',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  etaDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFFFFF' },
  etaBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '900' },

  mapPlaceholder: {
    height: 140,
    borderRadius: 16,
    backgroundColor: '#E8F7EC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C6F6D5',
    overflow: 'hidden',
    position: 'relative',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mapLabel: { color: '#1C1C1C', fontSize: 12, fontWeight: '700' },

  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#1C1C1C', marginBottom: 16 },

  step: { flexDirection: 'row', minHeight: 64 },
  rail: { width: 36, alignItems: 'center' },
  dot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F6FB',
  },
  dotDone: { backgroundColor: '#E8F7EC' },
  dotActive: {
    backgroundColor: '#E8F7EC',
    borderWidth: 2,
    borderColor: '#0C831F',
  },
  dotPending: { backgroundColor: '#F4F6FB', borderWidth: 1, borderColor: '#EBEBEB' },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: '#EBEBEB',
    marginVertical: 2,
  },
  lineDone: { backgroundColor: '#0C831F' },

  stepBody: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 20,
    gap: 2,
  },
  stepBodyActive: {
    backgroundColor: '#E8F7EC',
    borderRadius: 10,
    padding: 10,
    marginLeft: 8,
    marginBottom: 8,
  },
  stepTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepLabel: { fontSize: 14, fontWeight: '700' },
  stepTime: { color: '#9E9E9E', fontSize: 12 },
  stepDesc: { color: '#666666', fontSize: 12 },
  otpCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#0C831F',
    backgroundColor: '#F8FFF9',
  },
  otpLeft: { gap: 2 },
  otpLabel: { color: '#0C831F', fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  otpValue: { color: '#1C1C1C', fontSize: 28, fontWeight: '900', letterSpacing: 2 },

  otpSub: { color: '#666666', fontSize: 11 },
  otpBadge: {
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F7EC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  otpBadgeText: { color: '#0C831F', fontSize: 11, fontWeight: '800' },

  partnerCard: {

    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#F8CB46', fontWeight: '900', fontSize: 16 },
  partnerName: { color: '#1C1C1C', fontWeight: '800', fontSize: 15 },
  partnerMeta: { color: '#666666', fontSize: 12, marginTop: 2 },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F7EC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C6F6D5',
  },

  supportRow: {
    backgroundColor: '#E8F7EC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#C6F6D5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  supportText: { color: '#0C831F', fontSize: 12, fontWeight: '700' },
});

