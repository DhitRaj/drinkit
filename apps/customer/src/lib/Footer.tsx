/**
 * Drinkit Ultra-Modern E-Commerce Site Footer
 * Midnight Slate Background with Electric Indigo & Vibrant Amber Accents
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { ShieldCheck, Facebook, Twitter, Instagram, Linkedin, Apple, Play, Sparkles, HeartHandshake, Truck, Clock } from 'lucide-react-native';

const USEFUL_LINKS = [
  ['About Drinkit', 'Partner Stores', 'Cocktail Recipes'],
  ['Privacy Policy', 'Franchise Network', 'Dark Stores'],
  ['Terms of Service', 'Licensed Sellers', 'Coverage Map'],
  ['FAQs & Support', 'Warehouse Hubs', 'Responsible Drinking'],
  ['Security & Safety', 'Excise Licenses', 'Contact Us'],
];

const CATEGORIES_COL1 = [
  'Whisky & Single Malt', 'Beer & Craft Cider', 'Fine Wine & Champagne', 'Vodka & Crystal Spirits',
  'Dark Rum & Aged Spirits', 'Craft Gin & Botanicals', 'Tequila & Mezcal',
];
const CATEGORIES_COL2 = [
  'Craft IPA & Stout', 'Single Malt Scotch', 'Premium Mixers & Tonic', 'Ready-to-Drink Premix',
  'Zero Proof Non-Alcoholic', 'Liqueurs & Aperitifs', 'Celebration Gift Packs',
];
const CATEGORIES_COL3 = [
  'Crystal Tumblers', 'Bar Accessories & Shakers', 'Ice Cubes & Garnishes', 'Artisanal Soda & Tonic',
  'Energy Drinks', 'Sparkling Mineral Water', 'Gourmet Party Snacks',
];

export function SiteFooter() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const HPAD = isWide ? 24 : 16;

  return (
    <View style={styles.footer}>
      <View style={[styles.inner, { paddingHorizontal: HPAD }]}>
        
        {/* ── Top Trust Badges Bar ── */}
        <View style={styles.trustBar}>
          <View style={styles.trustItem}>
            <Clock size={20} color="#D97706" />
            <View>
              <Text style={styles.trustTitle}>15-Min Delivery</Text>
              <Text style={styles.trustSub}>Lightning fast to your door</Text>
            </View>
          </View>
          <View style={styles.trustItem}>
            <ShieldCheck size={20} color="#10B981" />
            <View>
              <Text style={styles.trustTitle}>100% Genuine</Text>
              <Text style={styles.trustSub}>Government licensed sellers</Text>
            </View>
          </View>
          <View style={styles.trustItem}>
            <Truck size={20} color="#F59E0B" />
            <View>
              <Text style={styles.trustTitle}>Chilled Delivery</Text>
              <Text style={styles.trustSub}>Temperature controlled transit</Text>
            </View>
          </View>
          <View style={styles.trustItem}>
            <HeartHandshake size={20} color="#E11D48" />
            <View>
              <Text style={styles.trustTitle}>Best Prices</Text>
              <Text style={styles.trustSub}>Direct store prices & deals</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* ── Top section: Links + Categories ── */}
        <View style={[styles.topRow, !isWide && styles.topRowMobile]}>

          {/* Useful Links */}
          <View style={styles.linksBlock}>
            <Text style={styles.colTitle}>Company & Support</Text>
            <View style={styles.linksGrid}>
              {USEFUL_LINKS.map((row, ri) => (
                <View key={ri} style={styles.linksRow}>
                  {row.map((link, li) =>
                    link ? (
                      <Pressable key={li}>
                        <Text style={styles.link}>{link}</Text>
                      </Pressable>
                    ) : (
                      <View key={li} style={{ flex: 1 }} />
                    )
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Categories */}
          <View style={styles.catsBlock}>
            <View style={styles.catsTitleRow}>
              <Text style={styles.colTitle}>Explore Categories</Text>
              <Pressable><Text style={styles.seeAll}>View All →</Text></Pressable>
            </View>
            <View style={styles.catsGrid}>
              <View style={styles.catsCol}>
                {CATEGORIES_COL1.map((c) => (
                  <Pressable key={c}><Text style={styles.link}>{c}</Text></Pressable>
                ))}
              </View>
              <View style={styles.catsCol}>
                {CATEGORIES_COL2.map((c) => (
                  <Pressable key={c}><Text style={styles.link}>{c}</Text></Pressable>
                ))}
              </View>
              <View style={styles.catsCol}>
                {CATEGORIES_COL3.map((c) => (
                  <Pressable key={c}><Text style={styles.link}>{c}</Text></Pressable>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* ── Divider ── */}
        <View style={styles.divider} />

        {/* ── Bottom bar: Copyright + Download + Social ── */}
        <View style={[styles.bottomBar, !isWide && styles.bottomBarMobile]}>
          <View style={styles.brandCol}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.brandTitleGreen}>drink</Text>
              <Text style={styles.brandTitleYellow}>it</Text>
            </View>
            <Text style={styles.copyright}>
              © Drinkit Commerce Pvt Ltd 2026. All rights reserved.
            </Text>
          </View>

          {/* Download App Badges */}
          <View style={styles.downloadRow}>
            <Text style={styles.downloadLabel}>Get the Mobile App</Text>
            <Pressable style={styles.appBtn}>
              <Apple size={18} color="#FFFFFF" />
              <View>
                <Text style={styles.appBtnSub}>Download on</Text>
                <Text style={styles.appBtnTitle}>App Store</Text>
              </View>
            </Pressable>
            <Pressable style={styles.appBtn}>
              <Play size={16} color="#FFFFFF" />
              <View>
                <Text style={styles.appBtnSub}>Get it on</Text>
                <Text style={styles.appBtnTitle}>Google Play</Text>
              </View>
            </Pressable>
          </View>

          {/* Social Icons */}
          <View style={styles.socialRow}>
            <Pressable style={[styles.socialBtn, { backgroundColor: '#1877F2' }]}>
              <Facebook size={16} color="#FFFFFF" />
            </Pressable>
            <Pressable style={[styles.socialBtn, { backgroundColor: '#1E293B' }]}>
              <Twitter size={16} color="#FFFFFF" />
            </Pressable>
            <Pressable style={[styles.socialBtn, { backgroundColor: '#E1306C' }]}>
              <Instagram size={16} color="#FFFFFF" />
            </Pressable>
            <Pressable style={[styles.socialBtn, { backgroundColor: '#0A66C2' }]}>
              <Linkedin size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* ── Disclaimer & Compliance ── */}
        <View style={styles.disclaimer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
            <ShieldCheck size={14} color="#0C831F" strokeWidth={2.2} />
            <Text style={styles.complianceHeader}>State Government Excise Licensed & Verified Partner</Text>
          </View>
          <Text style={styles.disclaimerText}>
            "Drinkit" is a technology platform connecting consumers with licensed local alcohol retailers. Alcohol consumption is injurious to health.{' '}
            <Text style={{ fontWeight: '800', color: '#F87171' }}>Strictly for legal drinking age (21+ / 18+ depending on state laws).</Text>{' '}
            Mandatory age and identity verification is enforced at order checkout and delivery.
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1C1C1C',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    marginTop: 40,
    width: '100%',
  },
  inner: {
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
    paddingTop: 40,
    paddingBottom: 24,
  },

  trustBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 10,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 200,
  },
  trustTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  trustSub: {
    color: '#94A3B8',
    fontSize: 12,
  },

  topRow: { flexDirection: 'row', gap: 48, flexWrap: 'wrap' },
  topRowMobile: { flexDirection: 'column', gap: 24 },

  linksBlock: { minWidth: 240, flex: 1 },
  colTitle: { fontSize: 15, fontWeight: '800', color: '#F8FAFC', marginBottom: 16 },
  linksGrid: { gap: 10 },
  linksRow: { flexDirection: 'row', gap: 24 },
  link: { fontSize: 13, color: '#94A3B8', fontWeight: '500', lineHeight: 22 },

  catsBlock: { flex: 2, minWidth: 280 },
  catsTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  seeAll: { fontSize: 13, color: '#0C831F', fontWeight: '700' },
  catsGrid: { flexDirection: 'row', gap: 24 },
  catsCol: { flex: 1, gap: 8 },

  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 28 },

  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-between',
  },
  bottomBarMobile: { flexDirection: 'column', alignItems: 'flex-start', gap: 16 },

  brandCol: { flex: 1, minWidth: 200 },
  brandTitleGreen: { color: '#0C831F', fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
  brandTitleYellow: { color: '#F8CB46', fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
  copyright: { color: '#9E9E9E', fontSize: 12, marginTop: 4 },

  downloadRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  downloadLabel: { color: '#94A3B8', fontSize: 12, fontWeight: '700' },
  appBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  appBtnSub: { color: 'rgba(255,255,255,0.6)', fontSize: 9 },
  appBtnTitle: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },

  socialRow: { flexDirection: 'row', gap: 8 },
  socialBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  disclaimer: {
    backgroundColor: 'rgba(42, 42, 42, 0.6)',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  complianceHeader: { color: '#0C831F', fontSize: 12, fontWeight: '800' },
  disclaimerText: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 18,
    textAlign: 'center',
  },
});

