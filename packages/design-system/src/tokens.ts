/**
 * Drinkit design tokens — Blinkit Brand Identity Aligned
 * Source of truth: docs/design/06_Design_System.md
 */

export const color = {
  // Brand Primary & Accents (Blinkit Signature Colors)
  primary: '#F8CB46', // Blinkit Vibrant Brand Yellow
  primaryHover: '#F5BE23',
  primaryPressed: '#E0A800',
  onPrimary: '#1C1C1C', // Dark text on Yellow

  // Green CTA (Blinkit Add/Checkout Green)
  brandGreen: '#0C831F', // Blinkit Signature Forest Green
  brandGreenHover: '#0A6C19',
  brandGreenPressed: '#085614',
  onBrandGreen: '#FFFFFF',

  cta: '#0C831F',
  ctaHover: '#0A6C19',
  ctaPressed: '#085614',
  onCta: '#FFFFFF',
  ctaSubtle: 'rgba(12,131,31,0.10)',

  // Clean Light Canvas (Blinkit Quick-Commerce Standard)
  bg: '#FFFFFF',
  bgAlt: '#F4F6FB',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfacePressed: '#F4F6FB',
  headerDark: '#1C1C1C',

  // Typography
  textPrimary: '#1C1C1C',
  textSecondary: '#666666',
  textTertiary: '#9E9E9E',
  textLink: '#0C831F',

  // Borders & Dividers
  border: '#EBEBEB',
  borderStrong: '#D1D5DB',
  borderFocus: '#0C831F',

  // Feedback & Status
  success: '#0C831F',
  warning: '#F59E0B',
  error: '#E23744',
  info: '#256FEF',
  rating: '#F59E0B',

  // Badges & Pills
  badgeYellow: '#F8CB46',
  badgeGreen: '#0C831F',
  badgeGreenLight: '#E8F7EC',

  // Skeletons & Overlays
  skeletonBase: '#EBEBEB',
  skeletonHighlight: '#F4F6FB',
  overlayScrim: 'rgba(0,0,0,0.5)',
  overlayPressed: 'rgba(12,131,31,0.06)',
  primarySubtle: 'rgba(248,203,70,0.20)',
  successSubtle: 'rgba(12,131,31,0.10)',
  errorSubtle: 'rgba(226,55,68,0.10)',
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

export const tokens = {
  color,
  space,
  radius,
  type,
  motion,
  fontFamily,
} as const;

export type ColorToken = keyof typeof color;
export type SpaceToken = keyof typeof space;
export type RadiusToken = keyof typeof radius;
