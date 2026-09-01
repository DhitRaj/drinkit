import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Home, LayoutGrid, Package, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { space } from '@drinkit/design-system';


export type TabKey = 'home' | 'categories' | 'orders' | 'profile';

const TABS: { key: TabKey; label: string; Icon: typeof Home }[] = [
  { key: 'home', label: 'Home', Icon: Home },
  { key: 'categories', label: 'Categories', Icon: LayoutGrid },
  { key: 'orders', label: 'Orders', Icon: Package },
  { key: 'profile', label: 'Profile', Icon: User },
];

export interface BottomNavProps {
  active: TabKey;
  onChange: (key: TabKey) => void;
  ordersBadge?: number;
}

export function BottomNav({ active, onChange, ordersBadge }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, space[8]) }]}>
      {TABS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        const tint = isActive ? '#0C831F' : '#666666';
        return (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={label}
            onPress={() => onChange(key)}
            style={styles.item}
          >
            <View>
              <Icon size={24} color={tint} strokeWidth={isActive ? 2.3 : 1.75} />
              {key === 'orders' && ordersBadge != null && ordersBadge > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{ordersBadge > 9 ? '9+' : ordersBadge}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, { color: tint, fontWeight: isActive ? '800' : '600' }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    paddingTop: space[8],
    minHeight: 60,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    minHeight: 48,
  },
  label: {
    fontSize: 10,
    lineHeight: 14,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: color.error,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
});

