import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Bell, ChevronDown, MapPin } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color, space, type as typeTokens } from '@drinkit/design-system';


export interface HomeAppBarProps {
  address: string;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
  hasNotification?: boolean;
}

export function HomeAppBar({
  address,
  onLocationPress,
  onNotificationPress,
  hasNotification,
}: HomeAppBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + space[8] }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Deliver to ${address}`}
        onPress={onLocationPress}
        style={styles.location}
      >
        <View style={styles.badgeRow}>
          <Text style={styles.overline}>⚡ 10 MINS DELIVERY</Text>
        </View>
        <View style={styles.addressRow}>
          <MapPin size={16} color="#0C831F" strokeWidth={2.2} />
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
          <ChevronDown size={16} color={color.textPrimary} strokeWidth={2} />
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        onPress={onNotificationPress}
        style={styles.bell}
        hitSlop={8}
      >
        <Bell size={20} color={color.textPrimary} strokeWidth={2} />
        {hasNotification ? <View style={styles.dot} /> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: space[16],
    paddingBottom: space[12],
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  location: {
    flex: 1,
    paddingRight: space[12],
  },
  badgeRow: {
    backgroundColor: '#E8F7EC',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  overline: {
    color: '#0C831F',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  address: {
    flexShrink: 1,
    color: color.textPrimary,
    fontSize: typeTokens.h3.fontSize,
    lineHeight: typeTokens.h3.lineHeight,
    fontWeight: '800',
  },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F6FB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: color.error,
  },
});

