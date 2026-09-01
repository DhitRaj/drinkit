import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color, space, type as typeTokens } from '@drinkit/design-system';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  body: string;
  ctaLabel?: string;
  onCta?: () => void;
  glyph?: string;
}

export function EmptyState({ title, body, ctaLabel, onCta, glyph = '◇' }: EmptyStateProps) {
  return (
    <View style={styles.wrap} accessibilityRole="summary">
      <Text style={styles.glyph}>{glyph}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {ctaLabel && onCta ? (
        <View style={styles.cta}>
          <Button label={ctaLabel} onPress={onCta} size="md" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space[32],
    paddingVertical: space[48],
  },
  glyph: {
    fontSize: 56,
    color: color.primary,
    marginBottom: space[16],
  },
  title: {
    color: color.textPrimary,
    fontSize: typeTokens.h3.fontSize,
    lineHeight: typeTokens.h3.lineHeight,
    fontWeight: typeTokens.h3.fontWeight,
    textAlign: 'center',
  },
  body: {
    marginTop: space[8],
    maxWidth: 260,
    color: color.textSecondary,
    fontSize: typeTokens.body.fontSize,
    lineHeight: typeTokens.body.lineHeight,
    textAlign: 'center',
  },
  cta: {
    marginTop: space[24],
  },
});
