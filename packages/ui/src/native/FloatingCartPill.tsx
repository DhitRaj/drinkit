import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShoppingCart } from 'lucide-react-native';
import { radius, space, type as typeTokens } from '@drinkit/design-system';

import { formatInr } from '@drinkit/utils';

export interface FloatingCartPillProps {
  itemCount: number;
  total: number;
  onPress?: () => void;
}

export function FloatingCartPill({ itemCount, total, onPress }: FloatingCartPillProps) {
  const insets = useSafeAreaInsets();
  if (itemCount <= 0) return null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View cart, ${itemCount} items, ${formatInr(total)}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        { bottom: 60 + Math.max(insets.bottom, 8) + 12 },
        pressed && { transform: [{ scale: 1.04 }] },
      ]}
    >
      <View style={styles.thumb}>
        <ShoppingCart size={16} color="#0C831F" strokeWidth={2.5} />
      </View>
      <Text style={styles.summary}>
        {itemCount} {itemCount === 1 ? 'item' : 'items'} • {formatInr(total)}
      </Text>
      <Text style={styles.cta}>View Cart →</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    position: 'absolute',
    left: space[16],
    right: space[16],
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: '#0C831F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space[12],
    gap: space[8],
    shadowColor: '#0C831F',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  thumb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: typeTokens.bodyStrong.fontSize,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  cta: {
    color: '#FFFFFF',
    fontSize: typeTokens.bodyStrong.fontSize,
    fontWeight: '800',
  },
});

