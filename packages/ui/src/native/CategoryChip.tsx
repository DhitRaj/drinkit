import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, space, type as typeTokens } from '@drinkit/design-system';


export interface CategoryChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  glyph?: string;
}

export function CategoryChip({ label, selected, onPress, glyph = '◆' }: CategoryChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.col, pressed && { transform: [{ scale: 0.94 }] }]}
    >
      <View style={[styles.circle, selected && styles.circleSelected]}>
        <Text style={styles.glyph}>{glyph}</Text>
      </View>
      <Text style={[styles.label, selected && styles.labelSelected]} numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  col: {
    width: 72,
    alignItems: 'center',
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F4F6FB',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSelected: {
    borderWidth: 2,
    borderColor: '#0C831F',
    backgroundColor: '#E8F7EC',
  },
  glyph: {
    color: '#0C831F',
    fontSize: 22,
    fontWeight: '600',
  },
  label: {
    marginTop: space[8],
    color: color.textSecondary,
    fontSize: typeTokens.caption.fontSize,
    lineHeight: 14,
    textAlign: 'center',
  },
  labelSelected: {
    color: color.textPrimary,
    fontWeight: '800',
  },
});

