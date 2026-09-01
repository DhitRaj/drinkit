import React from 'react';
import { ActivityIndicator, Pressable, Text, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { color, radius, type as typeTokens } from './tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'lg' | 'md' | 'sm';
export interface ButtonProps {
  label: string; onPress?: () => void; variant?: ButtonVariant; size?: ButtonSize;
  disabled?: boolean; loading?: boolean; fullWidth?: boolean;
  accessibilityLabel?: string; style?: StyleProp<ViewStyle>;
}
const heights: Record<ButtonSize, number> = { lg: 52, md: 44, sm: 36 };
const pads: Record<ButtonSize, number> = { lg: 24, md: 20, sm: 16 };

export function Button({ label, onPress, variant = 'primary', size = 'lg', disabled = false, loading = false, fullWidth = false, accessibilityLabel, style }: ButtonProps) {
  const isDisabled = disabled || loading;
  const base: ViewStyle = { height: heights[size], paddingHorizontal: pads[size], borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', alignSelf: fullWidth ? 'stretch' : 'flex-start', width: fullWidth ? '100%' : undefined };
  const text: TextStyle = { fontSize: typeTokens.bodyStrong.fontSize, fontWeight: typeTokens.bodyStrong.fontWeight };
  let container: ViewStyle; let labelStyle: TextStyle; let spinnerColor: string;
  switch (variant) {
    case 'secondary': container = { ...base, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: color.primary }; labelStyle = { ...text, color: color.primary }; spinnerColor = color.primary; break;
    case 'ghost': container = { ...base, backgroundColor: 'transparent' }; labelStyle = { ...text, color: color.primary }; spinnerColor = color.primary; break;
    default: container = { ...base, backgroundColor: isDisabled ? `${color.primary}52` : color.primary }; labelStyle = { ...text, color: color.onPrimary }; spinnerColor = color.onPrimary;
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel ?? label} disabled={isDisabled} onPress={onPress}
      style={({ pressed }) => [container, pressed && !isDisabled && { transform: [{ scale: 0.98 }] }, style]}>
      {loading ? <ActivityIndicator color={spinnerColor} /> : <Text style={labelStyle}>{label}</Text>}
    </Pressable>
  );
}
