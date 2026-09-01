import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Package, MapPin, HelpCircle, ShieldCheck } from 'lucide-react-native';
import { Button } from '../../src/lib/ui';
import { formatInr } from '../../src/lib/utils';
import { CustomerWebLayout } from '../../src/lib/CustomerWebLayout';

export default function AccountScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const HPAD = isWide ? 32 : 16;
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'support' | 'compliance'>('orders');

  const pastOrders = [
    {
      id: 'DK-2041',
      date: 'Today, 7:42 PM',
      items: 'Kingfisher Premium (x2), Johnnie Walker Black Label (x1)',
      total: 2129,
      status: 'Delivered',
      statusColor: '#0C831F',
    },
    {
      id: 'DK-1988',
      date: '04 Aug 2026',
      items: 'Budweiser Magnum Beer (x6), Ice Bag (x1)',
      total: 780,
      status: 'Delivered',
      statusColor: '#0C831F',
    },
  ];

  const faqs = [
    { q: 'How fast is Drinkit delivery?', a: 'Drinkit delivers in 10 minutes from local licensed dark stores.' },
    { q: 'Is age verification mandatory?', a: 'Yes, mandatory age verification (18+ / 21+ depending on state law) is performed at doorstep.' },
    { q: 'What happens on Dry Days?', a: 'Alcohol deliveries are legally paused during state dry days in accordance with excise laws.' },
    { q: 'Are products 100% genuine?', a: 'All products are sourced directly from government-licensed alcohol distributors.' },
  ];

  return (
    <CustomerWebLayout breadcrumbs={[{ label: 'Help & Account Support' }]}>
      <View style={[styles.mainWrapper, { paddingHorizontal: HPAD }]}>
        <View style={[styles.container, isWide && styles.containerWide]}>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarText}>AK</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>Amit Kumar</Text>
              <Text style={styles.userPhone}>+91 98765 43210 · amit.kumar@example.com</Text>
              <View style={styles.verifiedBadge}>
                <ShieldCheck size={14} color="#0C831F" />
                <Text style={styles.verifiedText}>Age Verified (21+ Legal Adult)</Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabBar}>
            <Pressable style={[styles.tabItem, activeTab === 'orders' && styles.tabActive]} onPress={() => setActiveTab('orders')}>
              <Package size={16} color={activeTab === 'orders' ? '#0C831F' : '#666666'} />
              <Text style={[styles.tabText, activeTab === 'orders' && styles.tabTextActive]}>My Orders</Text>
            </Pressable>
            <Pressable style={[styles.tabItem, activeTab === 'addresses' && styles.tabActive]} onPress={() => setActiveTab('addresses')}>
              <MapPin size={16} color={activeTab === 'addresses' ? '#0C831F' : '#666666'} />
              <Text style={[styles.tabText, activeTab === 'addresses' && styles.tabTextActive]}>Saved Addresses</Text>
            </Pressable>
            <Pressable style={[styles.tabItem, activeTab === 'support' && styles.tabActive]} onPress={() => setActiveTab('support')}>
              <HelpCircle size={16} color={activeTab === 'support' ? '#0C831F' : '#666666'} />
              <Text style={[styles.tabText, activeTab === 'support' && styles.tabTextActive]}>Help & Support</Text>
            </Pressable>
          </View>

          {/* Tab Content: Orders */}
          {activeTab === 'orders' && (
            <View style={styles.sectionArea}>
              <Text style={styles.sectionHeading}>Order History</Text>
              {pastOrders.map((o) => (
                <View key={o.id} style={styles.orderCard}>
                  <View style={styles.orderTop}>
                    <View>
                      <Text style={styles.orderId}>Order #{o.id}</Text>
                      <Text style={styles.orderDate}>{o.date}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: '#E8F7EC' }]}>
                      <Text style={[styles.statusText, { color: o.statusColor }]}>{o.status}</Text>
                    </View>
                  </View>
                  <Text style={styles.orderItems}>{o.items}</Text>
                  <View style={styles.orderBottom}>
                    <Text style={styles.orderTotal}>Total: {formatInr(o.total)}</Text>
                    <Button label="Reorder" size="sm" variant="green" onPress={() => router.push('/(tabs)/cart')} />
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Tab Content: Addresses */}
          {activeTab === 'addresses' && (
            <View style={styles.sectionArea}>
              <Text style={styles.sectionHeading}>Saved Delivery Locations</Text>
              <View style={styles.orderCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <MapPin size={16} color="#0C831F" strokeWidth={2} />
                  <Text style={styles.orderId}>Home (Primary)</Text>
                </View>
                <Text style={styles.orderItems}>Flat 402, 5th Block, Koramangala, Bengaluru, Karnataka 560095</Text>
                <Text style={styles.orderDate}>Default Service Area · ⚡ 10 Mins Express</Text>
              </View>
            </View>
          )}

          {/* Tab Content: Help & Support */}
          {activeTab === 'support' && (
            <View style={styles.sectionArea}>
              <Text style={styles.sectionHeading}>Frequently Asked Questions</Text>
              {faqs.map((f, i) => (
                <View key={i} style={styles.faqCard}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <HelpCircle size={16} color="#0C831F" strokeWidth={2} />
                    <Text style={styles.faqQ}>{f.q}</Text>
                  </View>
                  <Text style={styles.faqA}>{f.a}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </CustomerWebLayout>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { paddingTop: 24, paddingBottom: 60 },
  container: { maxWidth: 1000, alignSelf: 'center', width: '100%', gap: 20 },
  containerWide: { maxWidth: 1000 },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#F8CB46', fontSize: 20, fontWeight: '900' },
  userName: { fontSize: 18, fontWeight: '800', color: '#1C1C1C' },
  userPhone: { fontSize: 13, color: '#666666', marginTop: 2 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  verifiedText: { color: '#0C831F', fontSize: 12, fontWeight: '800' },

  tabBar: { flexDirection: 'row', gap: 10, borderBottomWidth: 1, borderBottomColor: '#EBEBEB', paddingBottom: 8 },
  tabItem: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  tabActive: { backgroundColor: '#E8F7EC' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#666666' },
  tabTextActive: { color: '#0C831F', fontWeight: '800' },

  sectionArea: { gap: 14 },
  sectionHeading: { fontSize: 16, fontWeight: '800', color: '#1C1C1C' },
  orderCard: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#EBEBEB', padding: 16, gap: 10 },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { fontSize: 15, fontWeight: '800', color: '#1C1C1C' },
  orderDate: { fontSize: 12, color: '#666666', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 12, fontWeight: '800' },
  orderItems: { fontSize: 13, color: '#666666', lineHeight: 18 },
  orderBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EBEBEB', paddingTop: 10 },
  orderTotal: { fontSize: 14, fontWeight: '800', color: '#1C1C1C' },

  faqCard: { backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#EBEBEB', padding: 14, gap: 6 },
  faqQ: { fontSize: 14, fontWeight: '800', color: '#1C1C1C' },
  faqA: { fontSize: 13, color: '#666666', lineHeight: 20 },
});

