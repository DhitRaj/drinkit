import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, Home } from 'lucide-react-native';
import { HomeAppBar, FloatingCartBar } from './ui';
import { SiteFooter } from './Footer';
import { useCartStore } from '../store/cart';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CustomerWebLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  showFloatingCart?: boolean;
  address?: string;
}

export function CustomerWebLayout({
  children,
  breadcrumbs,
  showFloatingCart = true,
  address = 'Koramangala, Bengaluru - 560034',
}: CustomerWebLayoutProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const cart = useCartStore();
  const cartCount = cart.itemCount();
  const subtotal = cart.subtotal();
  const isWide = width >= 768;
  const HPAD = isWide ? 24 : 16;

  return (
    <View style={styles.root}>
      {/* ── 1. Global Header ── */}
      <HomeAppBar
        address={address}
        cartCount={cartCount}
        onCartPress={() => router.push('/(tabs)/cart')}
        onLoginPress={() => router.push('/(auth)/login')}
        onSearchPress={() => router.push('/(tabs)/search')}
        onCategoriesPress={() => router.push('/(tabs)/categories')}
        onLogoPress={() => router.push('/(tabs)')}
        onNavigate={(path) => router.push(path as any)}
      />

      {/* ── 2. Breadcrumbs Bar (Optional) ── */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <View style={styles.crumbBar}>
          <View style={[styles.crumbInner, { paddingHorizontal: HPAD }]}>
            <Pressable onPress={() => router.push('/(tabs)')} style={styles.crumbItem}>
              <Home size={13} color="#0C831F" strokeWidth={2} />
              <Text style={styles.crumbLink}>Home</Text>
            </Pressable>

            {breadcrumbs.map((b, i) => (
              <View key={i} style={styles.crumbGroup}>
                <ChevronRight size={12} color="#94A3B8" />
                {b.href ? (
                  <Pressable onPress={() => router.push(b.href as any)}>
                    <Text style={styles.crumbLink}>{b.label}</Text>
                  </Pressable>
                ) : (
                  <Text style={styles.crumbActive}>{b.label}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* ── 3. Page Body & Master Scroll ── */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Content Area */}
        <View style={styles.mainContent}>{children}</View>

        {/* ── 4. Global Site Footer ── */}
        <SiteFooter />
      </ScrollView>

      {/* ── 5. Floating Cart Bar (Hidden on Cart Page & when cart is empty) ── */}
      {showFloatingCart && cartCount > 0 && (
        <FloatingCartBar
          itemCount={cartCount}
          totalPrice={subtotal}
          onPress={() => router.push('/(tabs)/cart')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F6FB' },

  crumbBar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    paddingVertical: 10,
    zIndex: 10,
  },
  crumbInner: {
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  crumbItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  crumbGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  crumbLink: { color: '#0C831F', fontSize: 12, fontWeight: '700' },
  crumbActive: { color: '#1C1C1C', fontSize: 12, fontWeight: '700' },

  scrollContent: { flexGrow: 1 },
  mainContent: { flex: 1, width: '100%' },
});

