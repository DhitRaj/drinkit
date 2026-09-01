import { Pressable, StyleSheet, Text } from 'react-native';
import { Search } from 'lucide-react-native';
import { color, radius, space, type as typeTokens } from '@drinkit/design-system';


export interface SearchBarProps {
  placeholder?: string;
  onPress?: () => void;
  editable?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

export function SearchBar({
  placeholder = "Search 'whisky'",
  onPress,
  editable = false,
}: SearchBarProps) {
  return (
    <Pressable
      accessibilityRole="search"
      accessibilityLabel={placeholder}
      onPress={onPress}
      disabled={editable}
      style={({ pressed }) => [styles.bar, pressed && !editable && { opacity: 0.9 }]}
    >
      <Search size={20} color={color.textSecondary} strokeWidth={1.75} />
      <Text style={styles.placeholder} numberOfLines={1}>
        {placeholder}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: '#F4F6FB',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingHorizontal: space[16],
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[8],
  },
  placeholder: {
    flex: 1,
    color: color.textSecondary,
    fontSize: typeTokens.body.fontSize,
    lineHeight: typeTokens.body.lineHeight,
  },
});

