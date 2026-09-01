import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react-native';
import { Button } from '../../src/lib/ui';

export default function AgeGateScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const [busy, setBusy] = useState(false);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Background image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80' }}
        style={StyleSheet.absoluteFillObject as any}
        resizeMode="cover"
      />
      <View style={styles.overlay} />

      {/* Card */}
      <View style={[styles.card, isWide && styles.cardWide, { marginBottom: insets.bottom + 24 }]}>
        {/* Badge */}
        <View style={styles.badge}>
          <ShieldAlert size={38} color="#EF4444" strokeWidth={2} />
        </View>

        <Text style={styles.title}>Age Verification</Text>
        <Text style={styles.sub}>
          Alcohol delivery is strictly restricted to individuals aged{' '}
          <Text style={{ color: '#EF4444', fontWeight: '800' }}>18 years and above.</Text>
        </Text>
        <Text style={styles.prompt}>Are you 18 years or older?</Text>

        {/* Warning strip */}
        <View style={styles.warnStrip}>
          <AlertTriangle size={16} color="#DC2626" strokeWidth={2} style={{ flexShrink: 0 }} />
          <Text style={styles.warnText}>
            It is illegal to sell or supply alcohol to anyone under 18 years of age.
          </Text>
        </View>

        {/* CTA */}
        <Button
          label="Yes, I am 18 or above →"
          fullWidth
          loading={busy}
          onPress={() => {
            setBusy(true);
            setTimeout(() => router.replace('/(tabs)'), 350);
          }}
          style={{ marginTop: 8 }}
        />
        <Button
          label="No, Exit App"
          variant="ghost"
          fullWidth
          style={{ marginTop: 8 }}
          onPress={() => router.replace('/(auth)/onboarding')}
        />

        <Text style={styles.footer}>
          By confirming, you agree to our Terms & Conditions.{'\n'}Drink responsibly.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject as any,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  cardWide: {
    maxWidth: 480,
    alignSelf: 'center',
    marginBottom: 60,
    borderRadius: 24,
  },

  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FEE2E2',
    borderWidth: 2,
    borderColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },

  title: {
    color: '#121316',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
  },
  sub: {
    color: '#6C757D',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  prompt: {
    color: '#121316',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },

  warnStrip: {
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    padding: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  warnText: {
    flex: 1,
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },

  footer: {
    color: '#9CA3AF',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 4,
  },
});
