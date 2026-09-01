import { Stack } from 'expo-router';
import { color } from '../../src/lib/tokens';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: color.bg },
        animation: 'fade',
      }}
    />
  );
}
