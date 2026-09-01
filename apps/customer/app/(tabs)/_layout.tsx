import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Tabs } from 'expo-router';
import { Home, LayoutGrid, Search, Package, User } from 'lucide-react-native';
import { color } from '../../src/lib/tokens';

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: isDesktop
            ? { display: 'none', height: 0 }
            : {
                backgroundColor: '#FFFFFF',
                borderTopColor: '#EBEBEB',
                borderTopWidth: 1,
                height: 64,
                paddingTop: 6,
              },
          tabBarActiveTintColor: '#0C831F',
          tabBarInactiveTintColor: '#666666',
          tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginBottom: 6 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color: c, size }) => <Home size={size} color={c} strokeWidth={2.2} />,
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: 'Categories',
            tabBarIcon: ({ color: c, size }) => <LayoutGrid size={size} color={c} strokeWidth={2.2} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color: c, size }) => <Search size={size} color={c} strokeWidth={2.2} />,
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({ color: c, size }) => <Package size={size} color={c} strokeWidth={2.2} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color: c, size }) => <User size={size} color={c} strokeWidth={2.2} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}

