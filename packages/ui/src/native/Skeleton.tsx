import React from 'react';
import { StyleSheet, View } from 'react-native';
import { color, radius, space } from '@drinkit/design-system';

export function SkeletonBlock({
  width,
  height,
  borderRadius = radius.md,
}: {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
}) {
  return (
    <View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: color.skeletonBase,
      }}
    />
  );
}

export function HomeSkeleton() {
  return (
    <View style={styles.wrap} accessibilityLabel="Loading home">
      <SkeletonBlock width={120} height={16} />
      <View style={{ height: space[16] }} />
      <SkeletonBlock width="100%" height={140} borderRadius={radius.md} />
      <View style={{ height: space[24] }} />
      <View style={styles.row}>
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBlock key={i} width={64} height={64} borderRadius={32} />
        ))}
      </View>
      <View style={{ height: space[24] }} />
      <View style={styles.grid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={styles.card}>
            <SkeletonBlock width="100%" height={140} />
            <View style={{ height: space[8] }} />
            <SkeletonBlock width="100%" height={14} />
            <View style={{ height: 6 }} />
            <SkeletonBlock width="60%" height={14} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: space[16],
  },
  row: {
    flexDirection: 'row',
    gap: space[12],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space[12],
  },
  card: {
    width: '47%',
    flexGrow: 1,
  },
});
