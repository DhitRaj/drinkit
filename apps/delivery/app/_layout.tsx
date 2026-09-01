import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { color, radius, space, type as typeTokens } from '../src/lib/tokens';
import { Button } from '../src/lib/ui';

const OFFERS = [
  { id: '1', store: 'Koramangala Cellar', drop: 'HSR Layout', pay: 86, km: 2.4 },
  { id: '2', store: 'Indiranagar Wines', drop: 'Domlur', pay: 74, km: 1.8 },
];

function DeliveryHome() {
  const insets = useSafeAreaInsets();
  const [online, setOnline] = useState(true);

  return (
    <View style={[styles.root, { paddingTop: insets.top + space[16], paddingBottom: insets.bottom + space[16] }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>Drinkit Partner</Text>
          <Text style={styles.sub}>{online ? '⚡ You are online · Ready for 10-min orders' : 'You are offline'}</Text>
        </View>
        <Pressable
          onPress={() => setOnline((v) => !v)}
          style={[styles.toggle, online ? styles.toggleOn : styles.toggleOff]}
          accessibilityRole="switch"
          accessibilityState={{ checked: online }}
        >
          <Text style={styles.toggleText}>{online ? 'ONLINE' : 'OFFLINE'}</Text>
        </Pressable>
      </View>

      <View style={styles.earnings}>
        <Text style={styles.earnLabel}>Today&apos;s earnings</Text>
        <Text style={styles.earnValue}>₹1,240</Text>
        <Text style={styles.earnMeta}>9 trips completed · ⭐ 4.9 rating</Text>
      </View>

      <Text style={styles.section}>⚡ Nearby Active Orders</Text>
      <ScrollView contentContainerStyle={{ gap: space[12] }}>
        {!online ? (
          <Text style={styles.empty}>Go online to receive delivery offers.</Text>
        ) : (
          OFFERS.map((o) => (
            <View key={o.id} style={styles.card}>
              <Text style={styles.store}>{o.store}</Text>
              <Text style={styles.drop}>Drop · {o.drop}</Text>
              <View style={styles.cardRow}>
                <Text style={styles.pay}>₹{o.pay}</Text>
                <Text style={styles.km}>{o.km} km</Text>
              </View>
              <View style={styles.actions}>
                <Button label="Accept (10m delivery)" size="md" style={{ flex: 1 }} onPress={() => undefined} />
                <Button label="Skip" variant="ghost" size="md" style={{ flex: 1 }} onPress={() => undefined} />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DeliveryHome />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F6FB',
    paddingHorizontal: space[16],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brand: {
    color: '#1C1C1C',
    fontSize: 22,
    fontWeight: '900',
  },
  sub: {
    marginTop: 4,
    color: '#0C831F',
    fontSize: 13,
    fontWeight: '700',
  },
  toggle: {
    minWidth: 74,
    height: 36,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  toggleOn: { backgroundColor: '#0C831F' },
  toggleOff: { backgroundColor: '#EBEBEB' },
  toggleText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 },
  earnings: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: space[16],
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  earnLabel: { color: '#666666', fontSize: 13, fontWeight: '600' },
  earnValue: {
    marginTop: 4,
    color: '#0C831F',
    fontSize: 32,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  earnMeta: { marginTop: 4, color: '#666666', fontSize: 13 },
  section: {
    color: '#1C1C1C',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: space[12],
  },
  empty: { color: '#666666', fontSize: 14, textAlign: 'center', marginTop: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: space[16],
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  store: { color: '#1C1C1C', fontWeight: '800', fontSize: 16 },
  drop: { color: '#666666', marginTop: 4, fontSize: 13 },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 12,
    marginBottom: 14,
  },
  pay: { color: '#0C831F', fontSize: 22, fontWeight: '900' },
  km: { color: '#666666', fontSize: 13, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 10 },
});

