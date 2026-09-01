import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Package, Truck, CheckCircle2, XCircle, Zap } from 'lucide-react-native';
import { formatInr } from '../../src/lib/utils';
import { EmptyState } from '../../src/lib/ui';
import { CustomerWebLayout } from '../../src/lib/CustomerWebLayout';

type Tab = 'ongoing' | 'completed' | 'cancelled';

const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=120&q=80',
];

const MOCK = {
  ongoing: [
    {
      id: 'DK-2041',
      title: 'Royal Stag Reserve + 1 more',
      when: 'Today · 7:42 PM',
      total: 1429,
      status: 'Out for delivery',
      img: PRODUCT_IMAGES[0],
      eta: '8 mins away',
    },
  ],
  completed: [
    {
      id: 'DK-1988',
      title: 'Kingfisher Ultra ×6',
      when: 'Yesterday · 9:10 PM',
      total: 1080,
      status: 'Delivered',
      img: PRODUCT_IMAGES[1],
      eta: null,
    },
    {
      id: 'DK-1902',
      title: 'Sula Sauvignon Blanc',
      when: 'Mon · 8:05 PM',
      total: 948,
      status: 'Delivered',
      img: PRODUCT_IMAGES[2],
      eta: null,
    },
  ],
  cancelled: [
    {
      id: 'DK-1870',
      title: 'Absolut Vodka 750ml',
      when: 'Sun · 10:22 PM',
      total: 0,
      status: 'Cancelled',
      img: PRODUCT_IMAGES[0],
      eta: null,
    },
  ],
};

export default function OrdersScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState<Tab>('ongoing');
  const rows = MOCK[tab];
  const HPAD = width >= 768 ? 24 : 16;

  return (
    <CustomerWebLayout breadcrumbs={[{ label: 'My Orders' }]}>
      <View style={[styles.mainWrapper, { paddingHorizontal: HPAD }]}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Package size={22} color="#0F172A" strokeWidth={2} />
            <Text style={styles.headerTitle}>My Orders</Text>
          </View>

          {/* Tab Switcher */}
          <View style={styles.tabStrip}>
            {(['ongoing', 'completed', 'cancelled'] as const).map((key) => {
              const isAct = tab === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => setTab(key)}
                  style={[styles.tab, isAct && styles.tabActive]}
                >
                  {key === 'ongoing' && <Truck size={14} color={isAct ? '#FFFFFF' : '#6C757D'} strokeWidth={2} />}
                  {key === 'completed' && <CheckCircle2 size={14} color={isAct ? '#FFFFFF' : '#6C757D'} strokeWidth={2} />}
                  {key === 'cancelled' && <XCircle size={14} color={isAct ? '#FFFFFF' : '#6C757D'} strokeWidth={2} />}
                  <Text style={[styles.tabText, isAct && styles.tabTextActive]}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {rows.length === 0 ? (
            <EmptyState
              title="No orders here"
              body="Your orders will appear here once you place them."
              ctaLabel="Browse drinks"
              onCta={() => router.push('/(tabs)')}
            />
          ) : (
            <View style={styles.list}>
              {rows.map((o) => (
                <Pressable
                  key={o.id}
                  style={styles.card}
                  onPress={() => {
                    if (tab === 'ongoing') router.push(`/tracking/${o.id}`);
                  }}
                >
                  {/* Product image */}
                  <View style={styles.thumb}>
                    <Image source={{ uri: o.img }} style={styles.thumbImg} resizeMode="contain" />
                  </View>

                  {/* Info */}
                  <View style={{ flex: 1, gap: 3 }}>
                    <Text style={styles.orderId}>{o.id}</Text>
                    <Text style={styles.orderName} numberOfLines={1}>{o.title}</Text>
                    <Text style={styles.orderWhen}>{o.when}</Text>
                    {o.eta && (
                      <View style={styles.etaBadge}>
                        <Zap size={11} color="#D97706" strokeWidth={2.5} />
                        <Text style={styles.etaText}>Arriving in {o.eta}</Text>
                      </View>
                    )}
                  </View>

                  {/* Status + Amount */}
                  <View style={{ alignItems: 'flex-end', gap: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      {tab === 'ongoing' && <Truck size={13} color="#0C831F" strokeWidth={2} />}
                      {tab === 'completed' && <CheckCircle2 size={13} color="#0C831F" strokeWidth={2} />}
                      {tab === 'cancelled' && <XCircle size={13} color="#EF4444" strokeWidth={2} />}
                      <Text style={[
                        styles.status,
                        tab === 'cancelled' && { color: '#EF4444' },
                        tab === 'completed' && { color: '#0C831F' },
                        tab === 'ongoing' && { color: '#0C831F' },
                      ]}>
                        {o.status}
                      </Text>
                    </View>
                    {o.total > 0 && (
                      <Text style={styles.total}>{formatInr(o.total)}</Text>
                    )}
                    {tab === 'ongoing' && (
                      <Text style={styles.trackLink}>Track →</Text>
                    )}
                    {tab === 'completed' && (
                      <Text style={styles.reorderLink}>Reorder</Text>
                    )}
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </CustomerWebLayout>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { paddingTop: 16, paddingBottom: 40 },
  container: { maxWidth: 1000, alignSelf: 'center', width: '100%' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1C1C1C' },

  tabStrip: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  tabActive: {
    backgroundColor: '#0C831F',
    borderColor: '#0C831F',
  },
  tabText: { fontSize: 12, fontWeight: '700', color: '#666666' },
  tabTextActive: { color: '#FFFFFF' },

  list: { gap: 12 },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  thumb: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#F4F6FB',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbImg: { width: '80%', height: '80%' },

  orderId: { color: '#9E9E9E', fontSize: 11, fontWeight: '600' },
  orderName: { color: '#1C1C1C', fontWeight: '700', fontSize: 14 },
  orderWhen: { color: '#666666', fontSize: 12 },

  etaBadge: {
    backgroundColor: '#E8F7EC',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#C6F6D5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  etaText: { color: '#0C831F', fontSize: 11, fontWeight: '800' },

  status: { fontSize: 12, fontWeight: '700' },
  total: { color: '#1C1C1C', fontWeight: '800', fontSize: 15 },
  trackLink: { color: '#0C831F', fontSize: 12, fontWeight: '800' },
  reorderLink: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    backgroundColor: '#0C831F',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
});

