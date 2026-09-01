/**
 * Drinkit Modern E-Commerce UI Component Library
 * Blinkit-Aligned Quick-Commerce Design System
 * 100% SVG Lucide Icons — Clean White & Green Palette
 */
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  ActivityIndicator,
  TextStyle,
  StyleProp,
  Image,
  useWindowDimensions,
} from 'react-native';
import {
  MapPin,
  Zap,
  Package,
  HelpCircle,
  User,
  ShoppingCart,
  Search as SearchIcon,
  Percent,
  LayoutGrid,
  ShieldCheck,
  Tag,
  Lock,
  Headphones,
  ArrowRight,
  PackageOpen,
  Wine,
  Check,
  Plus,
  Minus,
  Star,
  Snowflake,
  Clock,
} from 'lucide-react-native';
import { color, radius, space, type as typeTokens } from './tokens';
import { formatInr } from './utils';

// ─── Button Component ──────────────────────────────────────────────────────────
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'yellow' | 'green';
export type ButtonSize = 'lg' | 'md' | 'sm';
export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}
const btnHeights: Record<ButtonSize, number> = { lg: 50, md: 42, sm: 34 };
const btnPads: Record<ButtonSize, number> = { lg: 24, md: 18, sm: 14 };

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  fullWidth = false,
  accessibilityLabel,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const base: ViewStyle = {
    height: btnHeights[size],
    paddingHorizontal: btnPads[size],
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: fullWidth ? 'stretch' : 'flex-start',
    width: fullWidth ? '100%' : undefined,
  };
  const textStyle: TextStyle = {
    fontSize: typeTokens.bodyStrong.fontSize,
    lineHeight: typeTokens.bodyStrong.lineHeight,
    fontWeight: '800',
  };

  let containerStyle: ViewStyle;
  let labelStyle: TextStyle;
  let spinnerColor: string;

  switch (variant) {
    case 'yellow':
      containerStyle = { ...base, backgroundColor: isDisabled ? '#FDE68A' : '#F8CB46' };
      labelStyle = { ...textStyle, color: '#1C1C1C' };
      spinnerColor = '#1C1C1C';
      break;
    case 'secondary':
      containerStyle = { ...base, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#0C831F' };
      labelStyle = { ...textStyle, color: '#0C831F' };
      spinnerColor = '#0C831F';
      break;
    case 'ghost':
      containerStyle = { ...base, backgroundColor: 'transparent' };
      labelStyle = { ...textStyle, color: isDisabled ? color.textTertiary : '#0C831F' };
      spinnerColor = '#0C831F';
      break;
    case 'destructive':
      containerStyle = { ...base, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: color.error };
      labelStyle = { ...textStyle, color: color.error };
      spinnerColor = color.error;
      break;
    case 'green':
    case 'primary':
    default:
      containerStyle = { ...base, backgroundColor: isDisabled ? '#86EFAC' : '#0C831F' };
      labelStyle = { ...textStyle, color: '#FFFFFF' };
      spinnerColor = '#FFFFFF';
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        containerStyle,
        pressed && !isDisabled && { transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={spinnerColor} /> : <Text style={labelStyle}>{label}</Text>}
    </Pressable>
  );
}

// ─── HomeAppBar — Blinkit Style Header ─────────────────────────────────────────
export interface HomeAppBarProps {
  address?: string;
  onLoginPress?: () => void;
  onCartPress?: () => void;
  cartCount?: number;
  onSearchPress?: () => void;
  onCategoriesPress?: () => void;
  onLogoPress?: () => void;
  onNavigate?: (path: string) => void;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
}

export function HomeAppBar({
  address = 'Koramangala, Bengaluru - 560034',
  onLoginPress,
  onCartPress,
  cartCount = 0,
  onSearchPress,
  onCategoriesPress,
  onLogoPress,
  onNavigate,
  searchValue,
  onSearchChange,
}: HomeAppBarProps) {
  return (
    <View style={appBarStyles.container}>
      {/* ── Top Announcement Bar (Blinkit Yellow with Dark Elements) ── */}
      <View style={appBarStyles.topBar}>
        <View style={appBarStyles.topBarInner}>
          {/* Left: Location Picker */}
          <Pressable style={appBarStyles.locBtn}>
            <MapPin size={13} color="#0C831F" strokeWidth={2.5} />
            <Text style={appBarStyles.locPrefix}>Deliver to:</Text>
            <Text style={appBarStyles.locAddress} numberOfLines={1}>
              {address} ▾
            </Text>
          </Pressable>

          {/* Center: Express Badge */}
          <View style={appBarStyles.expressBadge}>
            <Zap size={13} color="#1C1C1C" strokeWidth={2.5} />
            <Text style={appBarStyles.expressText}>⚡ 10 MINS DELIVERY</Text>
          </View>

          {/* Right Links */}
          <View style={appBarStyles.topRightLinks}>
            <Pressable style={appBarStyles.topLinkBtn} onPress={() => (onNavigate ? onNavigate('/(tabs)/orders') : null)}>
              <Package size={12} color="#1C1C1C" strokeWidth={2} />
              <Text style={appBarStyles.topLink}>Track Order</Text>
            </Pressable>
            <Text style={appBarStyles.topLinkDivider}>|</Text>
            <Pressable style={appBarStyles.topLinkBtn} onPress={() => (onNavigate ? onNavigate('/account') : null)}>
              <HelpCircle size={12} color="#1C1C1C" strokeWidth={2} />
              <Text style={appBarStyles.topLink}>Help</Text>
            </Pressable>
            <Text style={appBarStyles.topLinkDivider}>|</Text>
            <Pressable style={appBarStyles.topLinkBtn} onPress={onLoginPress}>
              <User size={12} color="#1C1C1C" strokeWidth={2.2} />
              <Text style={appBarStyles.topLinkBold}>Account / Login</Text>
            </Pressable>
            <Pressable onPress={onCartPress} style={appBarStyles.topCartIconBox}>
              <ShoppingCart size={15} color="#1C1C1C" strokeWidth={2.2} />
              {cartCount > 0 && (
                <View style={appBarStyles.topBadge}>
                  <Text style={appBarStyles.topBadgeText}>{cartCount}</Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>

      {/* ── Main Header Navbar (Clean White Canvas) ── */}
      <View style={appBarStyles.mainHeader}>
        <View style={appBarStyles.mainHeaderInner}>
          {/* Logo & Tagline */}
          <Pressable style={appBarStyles.logoBox} onPress={onLogoPress}>
            <View style={appBarStyles.logoRow}>
              <Text style={appBarStyles.logoTextGreen}>drink</Text>
              <Text style={appBarStyles.logoTextYellow}>it</Text>
            </View>
            <View style={appBarStyles.taglineBadge}>
              <Text style={appBarStyles.logoTagline}>⚡ 10 MINS BEVERAGE EXPRESS</Text>
            </View>
          </Pressable>

          {/* Center Search Bar */}
          <View style={appBarStyles.searchContainer}>
            <SearchIcon size={16} color="#666666" strokeWidth={2} style={appBarStyles.searchLens} />
            <TextInput
              value={searchValue}
              onChangeText={onSearchChange}
              onFocus={onSearchPress}
              placeholder='Search "Energy Drinks", "Chilled Beer", "Whisky", "Cold Brew", "Soda"...'
              placeholderTextColor="#9E9E9E"
              style={appBarStyles.searchInput}
            />
            <Pressable onPress={onSearchPress} style={appBarStyles.searchBtn}>
              <Text style={appBarStyles.searchBtnText}>Search</Text>
            </Pressable>
          </View>

          {/* Right Action Buttons */}
          <View style={appBarStyles.headerActions}>
            <Pressable style={appBarStyles.actionPill} onPress={onCategoriesPress}>
              <Percent size={14} color="#0C831F" strokeWidth={2.2} />
              <Text style={appBarStyles.actionLabel}>Offers</Text>
            </Pressable>
            <Pressable style={appBarStyles.actionPill} onPress={onCategoriesPress}>
              <LayoutGrid size={14} color="#0C831F" strokeWidth={2.2} />
              <Text style={appBarStyles.actionLabel}>Categories</Text>
            </Pressable>
            <Pressable onPress={onCartPress} style={[appBarStyles.actionPill, appBarStyles.cartActionPill]}>
              <ShoppingCart size={15} color="#FFFFFF" strokeWidth={2.2} />
              <Text style={appBarStyles.cartActionLabel}>My Cart</Text>
              {cartCount > 0 && (
                <View style={appBarStyles.cartBadgeCircle}>
                  <Text style={appBarStyles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const appBarStyles = StyleSheet.create({
  container: { width: '100%', zIndex: 100 },
  topBar: {
    backgroundColor: '#F8CB46',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#EAB308',
  },
  topBarInner: {
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  locPrefix: { color: '#423B15', fontSize: 11, fontWeight: '600' },
  locAddress: { color: '#1C1C1C', fontSize: 11, fontWeight: '800', maxWidth: 220 },
  expressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  expressText: { color: '#0C831F', fontSize: 11, fontWeight: '900' },
  topRightLinks: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  topLinkBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  topLink: { color: '#1C1C1C', fontSize: 11, fontWeight: '600' },
  topLinkBold: { color: '#1C1C1C', fontSize: 11, fontWeight: '800' },
  topLinkDivider: { color: '#D97706', fontSize: 10 },
  topCartIconBox: { position: 'relative', padding: 2 },
  topBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#0C831F',
    borderRadius: 8,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '900' },

  mainHeader: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 3,
    paddingVertical: 12,
  },
  mainHeaderInner: {
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  logoBox: { minWidth: 130 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoTextGreen: { fontSize: 28, fontWeight: '900', color: '#0C831F', letterSpacing: -0.5 },
  logoTextYellow: { fontSize: 28, fontWeight: '900', color: '#F59E0B', letterSpacing: -0.5 },
  taglineBadge: {
    backgroundColor: '#E8F7EC',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  logoTagline: { fontSize: 9, fontWeight: '900', color: '#0C831F', letterSpacing: 0.5 },

  searchContainer: {
    flex: 1,
    maxWidth: 620,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F4F6FB',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    overflow: 'hidden',
  },
  searchLens: { marginRight: 8 },
  searchInput: { flex: 1, color: '#1C1C1C', fontSize: 13, fontWeight: '500' },
  searchBtn: {
    backgroundColor: '#0C831F',
    height: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },

  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    backgroundColor: '#F4F6FB',
  },
  cartActionPill: { backgroundColor: '#0C831F', borderColor: '#0C831F', position: 'relative' },
  actionLabel: { color: '#1C1C1C', fontSize: 13, fontWeight: '700' },
  cartActionLabel: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  cartBadgeCircle: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#F8CB46',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: { color: '#1C1C1C', fontSize: 10, fontWeight: '900' },
});

// ─── CategoryTile — Modern Elevated Card ───────────────────────────────────────
export interface CategoryTileProps {
  label: string;
  imageUrl?: string;
  bgColor?: string;
  onPress?: () => void;
}
export function CategoryTile({ label, imageUrl, bgColor = '#F4F6FB', onPress }: CategoryTileProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [ctStyles.tile, pressed && { opacity: 0.85 }]}>
      <View style={[ctStyles.imgBox, { backgroundColor: bgColor }]}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={ctStyles.img} resizeMode="contain" />
        ) : (
          <Wine size={32} color="#0C831F" strokeWidth={1.5} />
        )}
      </View>
      <Text style={ctStyles.label} numberOfLines={1}>{label}</Text>
    </Pressable>
  );
}
const ctStyles = StyleSheet.create({
  tile: { width: '100%', alignItems: 'center', gap: 8 },
  imgBox: {
    width: '100%',
    aspectRatio: 1.1,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    backgroundColor: '#F4F6FB',
    padding: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  img: { width: '85%', height: '85%' },
  label: { color: '#1C1C1C', fontSize: 12, fontWeight: '700', textAlign: 'center' },
});

// ─── ProductCard — Blinkit Quick-Commerce Product Card ─────────────────────────
export interface ProductCardProps {
  id: string;
  name: string;
  brand?: string;
  meta: string;
  price: number;
  mrp?: number;
  discountPercent?: number;
  rating?: number;
  outOfStock?: boolean;
  imageUrl?: string;
  quantity?: number;
  isChilled?: boolean;
  etaMins?: number;
  onPress?: () => void;
  onAdd?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  style?: ViewStyle;
}
export function ProductCard({
  name,
  brand,
  meta,
  price,
  mrp,
  discountPercent,
  rating = 4.8,
  outOfStock,
  imageUrl,
  quantity = 0,
  isChilled = true,
  etaMins = 10,
  onPress,
  onAdd,
  onIncrement,
  onDecrement,
  style,
}: ProductCardProps) {
  const showStrike = mrp != null && mrp > price;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [pcStyles.card, pressed && pcStyles.pressed, style]}
    >
      {/* Top Delivery ETA & Discount Row */}
      <View style={pcStyles.topBadgeRow}>
        <View style={pcStyles.etaPill}>
          <Clock size={10} color="#0C831F" strokeWidth={2.5} />
          <Text style={pcStyles.etaText}>{etaMins} MINS</Text>
        </View>

        {discountPercent != null && discountPercent > 0 && !outOfStock ? (
          <View style={pcStyles.badge}>
            <Text style={pcStyles.badgeText}>{discountPercent}% OFF</Text>
          </View>
        ) : null}
      </View>

      {/* Main Image */}
      <View style={[pcStyles.imageBox, outOfStock && pcStyles.imageDimmed]}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={pcStyles.productImg} resizeMode="contain" />
        ) : (
          <Wine size={48} color="#CBD5E1" strokeWidth={1.5} />
        )}
      </View>

      {/* Chilled & Rating Row */}
      <View style={pcStyles.midInfoRow}>
        {isChilled && !outOfStock && (
          <View style={pcStyles.chilledBadge}>
            <Snowflake size={10} color="#0284C7" strokeWidth={2.5} />
            <Text style={pcStyles.chilledText}>Chilled</Text>
          </View>
        )}
        <View style={pcStyles.ratingRow}>
          <Star size={11} color="#F59E0B" fill="#F59E0B" />
          <Text style={pcStyles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>

      {/* Brand & Product Name */}
      {brand && <Text style={pcStyles.brand}>{brand}</Text>}
      <Text style={pcStyles.name} numberOfLines={2}>{name}</Text>
      <Text style={pcStyles.meta} numberOfLines={1}>{meta}</Text>

      {/* Price & ADD Row */}
      <View style={pcStyles.priceRow}>
        <View style={pcStyles.priceCol}>
          {outOfStock ? (
            <Text style={pcStyles.oos}>Out of stock</Text>
          ) : (
            <View style={pcStyles.priceStack}>
              <Text style={pcStyles.price}>{formatInr(price)}</Text>
              {showStrike ? <Text style={pcStyles.mrp}>{formatInr(mrp!)}</Text> : null}
            </View>
          )}
        </View>

        {!outOfStock ? (
          quantity > 0 ? (
            <View style={pcStyles.stepper}>
              <Pressable hitSlop={6} onPress={onDecrement} style={pcStyles.stepBtn}>
                <Minus size={12} color="#FFFFFF" strokeWidth={3} />
              </Pressable>
              <Text style={pcStyles.qty}>{quantity}</Text>
              <Pressable hitSlop={6} onPress={onIncrement} style={pcStyles.stepBtn}>
                <Plus size={12} color="#FFFFFF" strokeWidth={3} />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={onAdd} style={pcStyles.addBtn}>
              <Text style={pcStyles.addLabel}>ADD</Text>
            </Pressable>
          )
        ) : null}
      </View>
    </Pressable>
  );
}

const pcStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 12,
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
    minWidth: 180,
  },
  pressed: { transform: [{ scale: 0.98 }] },

  topBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    minHeight: 20,
  },
  etaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#E8F7EC',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  etaText: { color: '#0C831F', fontSize: 10, fontWeight: '900' },
  badge: {
    backgroundColor: '#FFFBEB',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  badgeText: { color: '#B45309', fontSize: 10, fontWeight: '900' },

  imageBox: {
    height: 120,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  productImg: { width: '85%', height: '85%' },
  imageDimmed: { opacity: 0.4 },

  midInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chilledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#E0F2FE',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  chilledText: { color: '#0284C7', fontSize: 9, fontWeight: '800' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 11, color: '#1C1C1C', fontWeight: '800' },

  brand: { color: '#666666', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  name: { color: '#1C1C1C', fontSize: 13, lineHeight: 17, fontWeight: '800', minHeight: 34 },
  meta: { color: '#666666', fontSize: 11, marginTop: 2, marginBottom: 8 },

  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' },
  priceCol: { flexShrink: 1 },
  priceStack: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  price: { color: '#1C1C1C', fontSize: 15, fontWeight: '900' },
  mrp: { color: '#9E9E9E', fontSize: 11, textDecorationLine: 'line-through' },
  oos: { color: '#666666', fontSize: 11, fontWeight: '600' },

  addBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0C831F',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLabel: { color: '#0C831F', fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },

  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    width: 76,
    borderRadius: 8,
    backgroundColor: '#0C831F',
  },
  stepBtn: { width: 24, alignItems: 'center', justifyContent: 'center' },
  qty: { flex: 1, textAlign: 'center', color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
});

// ─── TrustBar — Bottom 5 Pillars ──────────────────────────────────────────────
export function TrustBar() {
  const pillars = [
    { Icon: ShieldCheck, title: 'Genuine Products', sub: '100% Original & Sealed' },
    { Icon: Tag, title: 'Best Prices', sub: 'Lower than MRP' },
    { Icon: Zap, title: 'Lightning Delivery', sub: '10-15 Mins Express' },
    { Icon: Lock, title: 'Safe & Secure', sub: 'Data & Payment Protected' },
    { Icon: Headphones, title: '24/7 Support', sub: 'We’re here for you' },
  ];

  return (
    <View style={tbStyles.container}>
      <View style={tbStyles.inner}>
        {pillars.map((p) => {
          const IconComp = p.Icon;
          return (
            <View key={p.title} style={tbStyles.item}>
              <View style={tbStyles.iconBox}>
                <IconComp size={20} color="#0C831F" strokeWidth={2.2} />
              </View>
              <View>
                <Text style={tbStyles.title}>{p.title}</Text>
                <Text style={tbStyles.sub}>{p.sub}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const tbStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    paddingVertical: 24,
    marginTop: 40,
  },
  inner: {
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 180 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E8F7EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 13, fontWeight: '800', color: '#1C1C1C' },
  sub: { fontSize: 11, color: '#666666', marginTop: 2 },
});

// ─── FloatingCartBar — Blinkit Green Persistent Bottom Bar ────────────────────
export interface FloatingCartBarProps {
  itemCount: number;
  totalPrice: number;
  onPress: () => void;
}
export function FloatingCartBar({ itemCount, totalPrice, onPress }: FloatingCartBarProps) {
  if (itemCount === 0) return null;
  return (
    <Pressable onPress={onPress} style={fcbStyles.bar}>
      <View style={fcbStyles.left}>
        <View style={fcbStyles.iconBox}>
          <ShoppingCart size={18} color="#0C831F" strokeWidth={2.5} />
        </View>
        <View style={fcbStyles.badge}>
          <Text style={fcbStyles.badgeText}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Text>
        </View>
        <Text style={fcbStyles.price}>{formatInr(totalPrice)}</Text>
      </View>
      <View style={fcbStyles.right}>
        <Text style={fcbStyles.ctaText}>View Cart</Text>
        <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.5} />
      </View>
    </Pressable>
  );
}

const fcbStyles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    maxWidth: 600,
    alignSelf: 'center',
    backgroundColor: '#0C831F',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0C831F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 999,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  price: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  right: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ctaText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
});

// ─── HomeSkeleton ─────────────────────────────────────────────────────────────
export function HomeSkeleton() {
  return (
    <ScrollView contentContainerStyle={{ padding: space[16], gap: space[12] }} scrollEnabled={false}>
      <View style={{ height: 260, borderRadius: 14, backgroundColor: color.skeletonBase }} />
      <View style={{ flexDirection: 'row', gap: space[12] }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View key={i} style={{ width: 80, height: 90, borderRadius: 14, backgroundColor: color.skeletonBase }} />
        ))}
      </View>
    </ScrollView>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
export interface EmptyStateProps { title: string; body?: string; ctaLabel?: string; onCta?: () => void; }
export function EmptyState({ title, body, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <View style={esStyles.root}>
      <View style={esStyles.iconBox}>
        <PackageOpen size={48} color="#9E9E9E" strokeWidth={1.5} />
      </View>
      <Text style={esStyles.title}>{title}</Text>
      {body ? <Text style={esStyles.body}>{body}</Text> : null}
      {ctaLabel && onCta ? <Button label={ctaLabel} onPress={onCta} variant="secondary" style={{ marginTop: space[24] }} /> : null}
    </View>
  );
}
const esStyles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space[32] },
  iconBox: { marginBottom: space[16], opacity: 0.8 },
  title: { color: color.textPrimary, fontSize: typeTokens.h3.fontSize, fontWeight: '700', textAlign: 'center' },
  body: { marginTop: space[8], color: color.textSecondary, fontSize: typeTokens.body.fontSize, textAlign: 'center', maxWidth: 280 },
});

