import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Package, MapPin, CreditCard, HelpCircle, ShieldCheck, LogOut, ChevronRight } from 'lucide-react-native';
import { CustomerWebLayout } from '../../src/lib/CustomerWebLayout';

export default function ProfileTabScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const HPAD = isWide ? 32 : 16;

  const menuItems = [
    { key: 'orders', label: 'My Orders', icon: Package, badge: '2 active', onPress: () => router.push('/(tabs)/orders') },
    { key: 'addresses', label: 'Saved Delivery Addresses', icon: MapPin, badge: 'Home & Office', onPress: () => router.push('/account') },
    { key: 'payments', label: 'Payment Methods & UPI', icon: CreditCard, badge: '3 saved', onPress: () => router.push('/account') },
    { key: 'support', label: 'Help & Customer Support', icon: HelpCircle, badge: '24/7 Live', onPress: () => router.push('/account') },
    { key: 'legal', label: 'Legal, Privacy & Compliance', icon: ShieldCheck, badge: '100% Compliant', onPress: () => router.push('/account') },
  ];

  return (
    <CustomerWebLayout breadcrumbs={[{ label: 'My Profile' }]}>
      <View style={[styles.mainWrapper, { paddingHorizontal: HPAD }]}>
        <View style={[styles.container, isWide && styles.containerWide]}>

          {/* Header Title */}
          <View style={styles.header}>
            <User size={22} color="#1C1C1C" strokeWidth={2.2} />
            <Text style={styles.headerTitle}>My Profile</Text>
          </View>

          {/* User Info Card */}
          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AK</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>Amit Kumar</Text>
              <Text style={styles.userPhone}>+91 98765 43210</Text>
              <View style={styles.ageVerifiedPill}>
                <ShieldCheck size={13} color="#0C831F" />
                <Text style={styles.ageVerifiedText}>Age Verified (21+ Adult)</Text>
              </View>
            </View>
          </View>

          {/* Menu Options */}
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Pressable
                  key={item.key}
                  style={({ pressed }) => [
                    styles.menuRow,
                    pressed && styles.menuRowPressed,
                    index < menuItems.length - 1 && styles.menuRowBorder,
                  ]}
                  onPress={item.onPress}
                >
                  <View style={styles.iconBox}>
                    <Icon size={18} color="#0C831F" />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuBadge}>{item.badge}</Text>
                  <ChevronRight size={16} color="#9E9E9E" />
                </Pressable>
              );
            })}
          </View>

          {/* Logout Button */}
          <Pressable style={styles.logoutBtn} onPress={() => router.replace('/(auth)/login')}>
            <LogOut size={18} color="#EF4444" />
            <Text style={styles.logoutText}>Log Out of Account</Text>
          </Pressable>

          <Text style={styles.versionText}>Drinkit Mobile v1.4.0 · ⚡ 10 Min Hyperlocal Delivery</Text>
        </View>
      </View>
    </CustomerWebLayout>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { paddingTop: 20, paddingBottom: 60 },
  container: { gap: 16, maxWidth: 600, alignSelf: 'center', width: '100%' },
  containerWide: { maxWidth: 600 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1C1C1C' },

  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#F8CB46', fontSize: 22, fontWeight: '900' },
  userName: { fontSize: 18, fontWeight: '800', color: '#1C1C1C' },
  userPhone: { fontSize: 13, color: '#666666', marginTop: 2 },
  ageVerifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E8F7EC',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  ageVerifiedText: { color: '#0C831F', fontSize: 11, fontWeight: '800' },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  menuRowPressed: { backgroundColor: '#F4F6FB' },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: '#EBEBEB' },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E8F7EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '700', color: '#1C1C1C' },
  menuBadge: { fontSize: 12, color: '#666666', fontWeight: '600', marginRight: 4 },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  logoutText: { color: '#EF4444', fontSize: 14, fontWeight: '800' },

  versionText: { color: '#9E9E9E', fontSize: 11, textAlign: 'center', marginTop: 8 },
});

