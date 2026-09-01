import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Zap, Lock, Gift, ShieldAlert, Sparkles, Wine } from 'lucide-react-native';
import { CATEGORIES, PRODUCTS } from '../../src/data/catalog';
import { CustomerWebLayout } from '../../src/lib/CustomerWebLayout';

const CATEGORY_IMAGES: Record<string, string> = {
  beer: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=400&q=80',
  whiskey: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=400&q=80',
  wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80',
  vodka: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=400&q=80',
  rum: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80',
  gin: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80',
  mixers: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80',
  snacks: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80',
  ice: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=400&q=80',
};

const CATEGORY_BG: Record<string, string> = {
  whiskey: '#FFF8E1', beer: '#E3F2FD', wine: '#FCE4EC',
  vodka: '#E8EAF6', rum: '#FBE9E7', gin: '#E8F5E9', mixers: '#F3E5F5', snacks: '#FFF3E0', ice: '#E0F7FA',
};

export default function CategoriesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const HPAD = width >= 768 ? 24 : 16;
  const maxW = Math.min(width, 1400);
  const innerW = maxW - HPAD * 2;
  const GAP = 16;
  const cols = width >= 1100 ? 5 : width >= 768 ? 4 : width >= 480 ? 3 : 2;
  const tileW = (innerW - GAP * (cols - 1)) / cols;

  const countByCategory = (id: string) => PRODUCTS.filter((p) => p.category === id).length;

  return (
    <CustomerWebLayout breadcrumbs={[{ label: 'All Categories' }]}>
      <View style={[styles.mainWrapper, { paddingHorizontal: HPAD }]}>
        <View style={[styles.container, { maxWidth: 1400 }]}>

          {/* ── Hero Banner ── */}
          <View style={styles.heroBanner}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1548041520-e0c41a6f4c80?auto=format&fit=crop&w=1200&q=80' }}
              style={StyleSheet.absoluteFillObject as any}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay} />
            <View style={styles.heroContent}>
              <View style={styles.heroEyebrowRow}>
                <Sparkles size={14} color="#F8CB46" strokeWidth={2.5} />
                <Text style={styles.heroEyebrow}>SHOP BY CATEGORY</Text>
              </View>
              <Text style={styles.heroTitle}>All Beverages</Text>
              <Text style={styles.heroSub}>
                {CATEGORIES.length} categories · {PRODUCTS.length}+ products · ⚡ 10 mins delivery
              </Text>
            </View>
          </View>

          {/* ── Category Grid ── */}
          <Text style={styles.sectionTitle}>Browse Categories</Text>

          <View style={[styles.catGrid, { gap: GAP }]}>
            {CATEGORIES.map((c) => (
              <Pressable
                key={c.id}
                style={({ pressed }) => [styles.catTile, { width: tileW }, pressed && { opacity: 0.88 }]}
                onPress={() => router.push(`/category/${c.id}`)}
              >
                {/* Image */}
                <View style={[styles.catImgBox, { backgroundColor: CATEGORY_BG[c.id] ?? '#F4F6FB' }]}>
                  {CATEGORY_IMAGES[c.id] ? (
                    <Image
                      source={{ uri: CATEGORY_IMAGES[c.id] }}
                      style={styles.catImg}
                      resizeMode="cover"
                    />
                  ) : (
                    <Wine size={40} color="#0C831F" strokeWidth={1.5} />
                  )}
                </View>
                <View style={styles.catInfo}>
                  <Text style={styles.catLabel}>{c.label}</Text>
                  <Text style={styles.catCount}>{countByCategory(c.id)} items</Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Info strip */}
          <View style={styles.infoStrip}>
            <View style={styles.infoCard}>
              <Zap size={22} color="#0C831F" strokeWidth={2.2} />
              <Text style={styles.infoTitle}>10-Min Delivery</Text>
              <Text style={styles.infoSub}>Direct from dark stores</Text>
            </View>
            <View style={styles.infoCard}>
              <Lock size={22} color="#0C831F" strokeWidth={2.2} />
              <Text style={styles.infoTitle}>Verified Stores</Text>
              <Text style={styles.infoSub}>100% licensed sellers</Text>
            </View>
            <View style={styles.infoCard}>
              <Gift size={22} color="#0C831F" strokeWidth={2.2} />
              <Text style={styles.infoTitle}>Best Prices</Text>
              <Text style={styles.infoSub}>Instant savings on packs</Text>
            </View>
            <View style={styles.infoCard}>
              <ShieldAlert size={22} color="#0C831F" strokeWidth={2.2} />
              <Text style={styles.infoTitle}>Legal Age</Text>
              <Text style={styles.infoSub}>18+ verified delivery</Text>
            </View>
          </View>

        </View>
      </View>
    </CustomerWebLayout>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { paddingTop: 16, paddingBottom: 40 },
  container: { alignSelf: 'center', width: '100%' },

  heroBanner: {
    height: 200,
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 8,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject as any,
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
  },
  heroContent: { padding: 24, zIndex: 2 },
  heroEyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  heroEyebrow: { color: '#F8CB46', fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { color: '#FFFFFF', fontSize: 30, fontWeight: '900', marginTop: 4 },
  heroSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 4, fontWeight: '600' },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1C1C1C',
    marginTop: 32,
    marginBottom: 18,
  },

  catGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  catTile: { marginBottom: 16 },
  catImgBox: {
    width: '100%',
    aspectRatio: 1.1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catImg: { width: '100%', height: '100%' },
  catInfo: { marginTop: 8, paddingHorizontal: 2 },
  catLabel: { fontSize: 14, fontWeight: '700', color: '#1C1C1C' },
  catCount: { fontSize: 12, color: '#666666', marginTop: 2 },

  infoStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
  },
  infoCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  infoTitle: { fontSize: 14, fontWeight: '800', color: '#1C1C1C' },
  infoSub: { fontSize: 11, color: '#666666', textAlign: 'center' },
});

