/**
 * Drinkit design tokens — inlined from packages/design-system
 * Source of truth: docs/design/06_Design_System.md
 */

export const color = {
  bg: '#FFFFFF',
  bgAlt: '#F4F6FB',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfacePressed: '#F4F6FB',
  primary: '#F8CB46',
  primaryHover: '#E5BC3B',
  primaryPressed: '#D4AC2F',
  onPrimary: '#1C1C1C',
  brandGreen: '#0C831F',
  brandGreenHover: '#0A6E1A',
  cta: '#0C831F',
  ctaPressed: '#0A6E1A',
  textPrimary: '#1C1C1C',
  textSecondary: '#666666',
  textTertiary: '#9E9E9E',
  textLink: '#0C831F',
  border: '#EBEBEB',
  borderStrong: '#D1D5DB',
  borderFocus: '#0C831F',
  success: '#0C831F',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#2563EB',
  rating: '#F59E0B',
  skeletonBase: '#F0F0F0',
  skeletonHighlight: '#FAFAFA',
  overlayScrim: 'rgba(0,0,0,0.6)',
  overlayPressed: 'rgba(0,0,0,0.04)',
  primarySubtle: '#FEF9C3',
  successSubtle: '#E8F7EC',
  errorSubtle: 'rgba(239,68,68,0.12)',
} as const;


export const space = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32,
  48: 48,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
  circle: 9999,
} as const;

export const type = {
  display: { fontSize: 32, lineHeight: 40, fontWeight: '700' as const, letterSpacing: -0.5 },
  h1: { fontSize: 24, lineHeight: 32, fontWeight: '700' as const, letterSpacing: -0.25 },
  h2: { fontSize: 20, lineHeight: 28, fontWeight: '600' as const, letterSpacing: -0.25 },
  h3: { fontSize: 17, lineHeight: 24, fontWeight: '600' as const, letterSpacing: 0 },
  bodyLg: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const, letterSpacing: 0 },
  body: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const, letterSpacing: 0 },
  bodyStrong: { fontSize: 14, lineHeight: 20, fontWeight: '600' as const, letterSpacing: 0 },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const, letterSpacing: 0.1 },
  captionStrong: { fontSize: 12, lineHeight: 16, fontWeight: '600' as const, letterSpacing: 0.1 },
  overline: { fontSize: 11, lineHeight: 16, fontWeight: '600' as const, letterSpacing: 1 },
  priceLg: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const, letterSpacing: 0 },
} as const;

export const motion = {
  fast: 150,
  base: 250,
  slow: 400,
} as const;

export const fontFamily = {
  sans: 'Inter',
  sansFallback: 'Inter, "Plus Jakarta Sans", system-ui, -apple-system, Roboto, sans-serif',
} as const;

export const tokens = { color, space, radius, type, motion, fontFamily } as const;

export type ColorToken = keyof typeof color;
export type SpaceToken = keyof typeof space;
export type RadiusToken = keyof typeof radius;
