import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Navigation, Zap, ArrowLeft } from 'lucide-react-native';
import { Button } from '../../src/lib/ui';

export default function LocationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const [location, setLocation] = useState('Koramangala, Bengaluru - 560034');
  const [detecting, setDetecting] = useState(false);

  const handleDetect = () => {
    setDetecting(true);
    setTimeout(() => {
      setLocation('Indiranagar, Bengaluru - 560038');
      setDetecting(false);
    }, 800);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#121316" />
        </Pressable>
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={[styles.content, isWide && styles.contentWide]}>
        {/* Map Card */}
        <View style={styles.mapCard}>
          <MapPin size={48} color="#D97706" strokeWidth={1.5} />
          <View style={styles.pinOverlay}>
            <MapPin size={32} color="#D97706" strokeWidth={2.5} />
            <View style={styles.pinPulse} />
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoCard}>
          <View style={styles.etaBadge}>
            <Zap size={14} color="#D97706" strokeWidth={2.5} />
            <Text style={styles.etaText}>12–15 Mins Express Delivery Available</Text>
          </View>

          <Text style={styles.locTitle}>Delivering to</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MapPin size={18} color="#D97706" strokeWidth={2} />
            <Text style={styles.locText}>{location}</Text>
          </View>

          <Pressable style={styles.detectBtn} onPress={handleDetect}>
            <Navigation size={16} color="#D97706" />
            <Text style={styles.detectText}>
              {detecting ? 'Detecting GPS Location...' : 'Detect My Location'}
            </Text>
          </Pressable>

          <View style={styles.divider} />

          <Button
            label="Confirm Location & Continue →"
            fullWidth
            onPress={() => router.push('/(auth)/age-gate')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '800', color: '#0F172A' },

  content: { flex: 1, padding: 20, gap: 16, maxWidth: 500, alignSelf: 'center', width: '100%' },
  contentWide: { maxWidth: 500 },

  mapCard: {
    height: 200,
    backgroundColor: '#FFFBEB',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
    position: 'relative',
    overflow: 'hidden',
  },
  pinOverlay: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  pinPulse: {
    width: 40,
    height: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(217,119,6,0.2)',
    marginTop: -6,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  etaBadge: {
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FDE68A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  etaText: { color: '#D97706', fontSize: 12, fontWeight: '800' },

  locTitle: { fontSize: 12, color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  locText: { fontSize: 15, fontWeight: '800', color: '#0F172A', lineHeight: 22, flex: 1 },

  detectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignSelf: 'flex-start',
  },
  detectText: { color: '#D97706', fontSize: 13, fontWeight: '700' },

  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 4 },
});
