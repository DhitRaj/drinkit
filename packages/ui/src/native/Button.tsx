import { useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { color, radius, type as typeTokens } from '@drinkit/design-system';


export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'green' | 'yellow';
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

const heights: Record<ButtonSize, number> = { lg: 52, md: 44, sm: 36 };
const paddings: Record<ButtonSize, number> = { lg: 24, md: 20, sm: 16 };

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

  const { container, labelStyle, spinnerColor } = useMemo(() => {
    const base: ViewStyle = {
      height: heights[size],
      paddingHorizontal: paddings[size],
      borderRadius: radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      minWidth: fullWidth ? undefined : 120,
      alignSelf: fullWidth ? 'stretch' : 'flex-start',
      width: fullWidth ? '100%' : undefined,
      opacity: isDisabled ? 0.5 : 1,
    };

    const text: TextStyle = {
      fontSize: typeTokens.bodyStrong.fontSize,
      lineHeight: typeTokens.bodyStrong.lineHeight,
      fontWeight: '800',
    };

    switch (variant) {
      case 'yellow':
        return {
          container: {
            ...base,
            backgroundColor: isDisabled ? '#FDE68A' : '#F8CB46',
          },
          labelStyle: { ...text, color: '#1C1C1C' },
          spinnerColor: '#1C1C1C',
        };
      case 'secondary':
        return {
          container: {
            ...base,
            backgroundColor: '#FFFFFF',
            borderWidth: 1.5,
            borderColor: '#0C831F',
          },
          labelStyle: { ...text, color: '#0C831F' },
          spinnerColor: '#0C831F',
        };
      case 'ghost':
        return {
          container: { ...base, backgroundColor: 'transparent' },
          labelStyle: { ...text, color: isDisabled ? color.textTertiary : '#0C831F' },
          spinnerColor: '#0C831F',
        };
      case 'destructive':
        return {
          container: {
            ...base,
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: color.error,
          },
          labelStyle: { ...text, color: color.error },
          spinnerColor: color.error,
        };
      case 'green':
      case 'primary':
      default:
        return {
          container: {
            ...base,
            backgroundColor: isDisabled ? '#86EFAC' : '#0C831F',
          },
          labelStyle: {
            ...text,
            color: '#FFFFFF',
          },
          spinnerColor: '#FFFFFF',
        };
    }
  }, [variant, size, isDisabled, fullWidth]);


  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        container,
        pressed && !isDisabled && styles.pressed,
        pressed && !isDisabled && variant === 'primary' && { backgroundColor: color.primaryPressed },
        pressed && !isDisabled && variant === 'secondary' && { backgroundColor: color.primarySubtle },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text style={labelStyle}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    transform: [{ scale: 0.98 }],
  },
});
