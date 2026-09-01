import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { color, radius, type as typeTokens } from './tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
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
      alignSelf: fullWidth ? 'stretch' : 'flex-start',
      width: fullWidth ? '100%' : undefined,
    };
    const text: TextStyle = {
      fontSize: typeTokens.bodyStrong.fontSize,
      lineHeight: typeTokens.bodyStrong.lineHeight,
      fontWeight: typeTokens.bodyStrong.fontWeight,
    };
    switch (variant) {
      case 'secondary':
        return {
          container: { ...base, backgroundColor: color.surface, borderWidth: 1.5, borderColor: isDisabled ? `${color.cta}52` : color.cta },
          labelStyle: { ...text, color: color.cta },
          spinnerColor: color.cta,
        };
      case 'ghost':
        return {
          container: { ...base, backgroundColor: 'transparent' },
          labelStyle: { ...text, color: isDisabled ? color.textTertiary : color.cta },
          spinnerColor: color.cta,
        };
      case 'destructive':
        return {
          container: { ...base, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: color.error },
          labelStyle: { ...text, color: color.error },
          spinnerColor: color.error,
        };
      default:
        return {
          container: { ...base, backgroundColor: isDisabled ? 'rgba(255,192,0,0.35)' : color.primary },
          labelStyle: { ...text, color: isDisabled ? 'rgba(13,14,18,0.5)' : color.onPrimary, fontWeight: '700' as const },
          spinnerColor: color.onPrimary,
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
        pressed && !isDisabled && { transform: [{ scale: 0.98 }] },
        pressed && !isDisabled && variant === 'primary' && { backgroundColor: color.primaryHover },
        pressed && !isDisabled && variant === 'secondary' && { backgroundColor: color.primarySubtle },
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={spinnerColor} /> : <Text style={labelStyle}>{label}</Text>}
    </Pressable>
  );
}
