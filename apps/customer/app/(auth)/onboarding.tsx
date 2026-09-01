import React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Zap, ShieldCheck, Wine, AlertCircle } from 'lucide-react-native';
import { Button } from '../../src/lib/ui';

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Background Image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=1400&q=80' }}
        style={StyleSheet.absoluteFillObject as any}
        resizeMode="cover"
      />
      {/* Dark overlay */}
      <LinearGradient
        colors={['rgba(28,28,28,0.3)', 'rgba(28,28,28,0.75)', 'rgba(28,28,28,0.95)']}
        style={StyleSheet.absoluteFillObject as any}
      />

      {/* Content */}
      <View style={[styles.content, { paddingBottom: insets.bottom + 48 }]}>
        {/* Top logo */}
        <View style={styles.logoArea}>
          <Text style={styles.brand}>
            drink<Text style={{ color: '#F8CB46' }}>it</Text>
          </Text>
          <Text style={styles.kicker}>10-Minute Alcohol Delivery</Text>
        </View>

        {/* Bottom CTA area */}
        <View style={[styles.ctaArea, isWide && styles.ctaAreaWide]}>
          {/* Feature pills */}
          <View style={styles.pills}>
            <View style={styles.pill}>
              <Zap size={13} color="#F8CB46" strokeWidth={2.5} />
              <Text style={styles.pillText}>⚡ 10 min express delivery</Text>
            </View>
            <View style={styles.pill}>
              <ShieldCheck size={13} color="#0C831F" strokeWidth={2} />
              <Text style={styles.pillText}>100% licensed stores</Text>
            </View>
            <View style={styles.pill}>
              <Wine size={13} color="#F8CB46" strokeWidth={2} />
              <Text style={styles.pillText}>500+ genuine brands</Text>
            </View>
          </View>

          <Text style={styles.headline}>
            Your favourite drinks,{'\n'}
            <Text style={{ color: '#F8CB46' }}>delivered in 10 mins.</Text>
          </Text>
          <Text style={styles.sub}>
            Order from licensed dark stores near you. Chilled beers, fine wines, premium spirits & mixers.
          </Text>

          <Button
            label="Get Started  →"
            variant="green"
            fullWidth
            size="lg"
            onPress={() => router.push('/(auth)/login')}
            style={{ marginTop: 8 }}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 6 }}>
            <AlertCircle size={13} color="rgba(255,255,255,0.7)" strokeWidth={2} />
            <Text style={styles.legal}>
              Must be 21+ to order. Enjoy responsibly.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1C1C1C' },


  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  logoArea: {},
  brand: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1,
  },
  kicker: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 2,
  },

  ctaArea: { gap: 12 },
  ctaAreaWide: { maxWidth: 480, alignSelf: 'center', width: '100%' },

  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pillText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },

  headline: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 44,
    marginTop: 4,
  },
  sub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    lineHeight: 21,
  },

  legal: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    textAlign: 'center',
  },
});
