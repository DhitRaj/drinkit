import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { color, radius, space, type as typeTokens } from '@drinkit/design-system';

import { formatInr } from '@drinkit/utils';

export interface ProductCardProps {
  id: string;
  name: string;
  meta: string;
  price: number;
  mrp?: number;
  discountPercent?: number;
  rating?: number;
  outOfStock?: boolean;
  quantity?: number;
  onPress?: () => void;
  onAdd?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  style?: ViewStyle;
}

export function ProductCard({
  name,
  meta,
  price,
  mrp,
  discountPercent,
  rating,
  outOfStock,
  quantity = 0,
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
      accessibilityLabel={`${name}, ${formatInr(price)}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
    >
      <View style={[styles.imageBox, outOfStock && styles.imageDimmed]}>
        {discountPercent != null && discountPercent > 0 && !outOfStock ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{discountPercent}% OFF</Text>
          </View>
        ) : null}
        <View style={styles.bottleGlow}>
          <Text style={styles.bottleGlyph}>◆</Text>
        </View>
      </View>

      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {meta}
      </Text>
      {rating != null ? (
        <Text style={styles.rating}>★ {rating.toFixed(1)}</Text>
      ) : (
        <View style={styles.ratingSpacer} />
      )}

      <View style={styles.priceRow}>
        <View style={styles.priceCol}>
          {outOfStock ? (
            <Text style={styles.oos}>Out of stock</Text>
          ) : (
            <>
              <Text style={styles.price}>{formatInr(price)}</Text>
              {showStrike ? <Text style={styles.mrp}>{formatInr(mrp!)}</Text> : null}
            </>
          )}
        </View>

        {!outOfStock ? (
          quantity > 0 ? (
            <View style={styles.stepper}>
              <Pressable
                accessibilityLabel="Decrease quantity"
                hitSlop={8}
                onPress={onDecrement}
                style={styles.stepBtn}
              >
                <Text style={styles.stepLabel}>−</Text>
              </Pressable>
              <Text style={styles.qty}>{quantity}</Text>
              <Pressable
                accessibilityLabel="Increase quantity"
                hitSlop={8}
                onPress={onIncrement}
                style={styles.stepBtn}
              >
                <Text style={styles.stepLabel}>+</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              accessibilityLabel={`Add ${name}`}
              onPress={onAdd}
              style={({ pressed }) => [styles.addBtn, pressed && { backgroundColor: color.primaryPressed }]}
            >
              <Text style={styles.addLabel}>+</Text>
            </Pressable>
          )
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: space[12],
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: '#F4F6FB',
  },
  imageBox: {
    aspectRatio: 1,
    borderRadius: radius.md,
    backgroundColor: '#F4F6FB',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: space[8],
  },
  imageDimmed: {
    opacity: 0.4,
  },
  bottleGlow: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#E8F7EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottleGlyph: {
    color: '#0C831F',
    fontSize: 26,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: space[8],
    left: space[8],
    backgroundColor: '#F8CB46',
    borderRadius: radius.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  badgeText: {
    color: '#1C1C1C',
    fontSize: 11,
    fontWeight: '800',
  },
  name: {
    color: color.textPrimary,
    fontSize: typeTokens.body.fontSize,
    lineHeight: typeTokens.body.lineHeight,
    fontWeight: '700',
    minHeight: 40,
  },
  meta: {
    color: color.textSecondary,
    fontSize: typeTokens.caption.fontSize,
    lineHeight: typeTokens.caption.lineHeight,
    marginTop: 2,
  },
  rating: {
    color: color.rating,
    fontSize: typeTokens.caption.fontSize,
    marginTop: 4,
    fontWeight: '700',
  },
  ratingSpacer: {
    height: 16,
    marginTop: 4,
  },
  priceRow: {
    marginTop: space[8],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  price: {
    color: color.textPrimary,
    fontSize: typeTokens.bodyStrong.fontSize,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  mrp: {
    color: color.textTertiary,
    fontSize: typeTokens.caption.fontSize,
    textDecorationLine: 'line-through',
    fontVariant: ['tabular-nums'],
  },
  oos: {
    color: color.textSecondary,
    fontSize: typeTokens.captionStrong.fontSize,
    fontWeight: '600',
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0C831F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: -1,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    width: 80,
    borderRadius: 8,
    backgroundColor: '#0C831F',
  },
  stepBtn: {
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  qty: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
});

