import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,

        // tabBarStyle: {
        //   height: 70, // Change height here
        //   backgroundColor: 'red', // Light gray (you can replace with your color)
        //   borderTopWidth: 0, // remove border if you want a clean look
        //   paddingBottom: Platform.OS === 'ios' ? 20 : 10, // adjust safe area
        //   paddingTop: 10,
        // },
        tabBarStyle: Platform.select({
          ios: {
            // Transparent background on iOS for blur effect
            position: 'absolute',
            backgroundColor: 'red',
          },
          default: {},
        }),
      }}>
      
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Deposit */}
      <Tabs.Screen
        name="deposit"
        options={{
          title: 'Deposit',
          tabBarLabel: 'Deposit',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Withdraw */}
      <Tabs.Screen
        name="withdraw"
        options={{
          title: 'Withdraw',
          tabBarLabel: 'Withdraw',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
