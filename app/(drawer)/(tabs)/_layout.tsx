import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform, useWindowDimensions } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user:userData, isLoading  } = useAuth();
 
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isLargeScreen = width >= 768;
  
  if (!userData) {
    return <Redirect href={"/login"} />;
  }
  if (userData?.role==='admin') {
    return <Redirect href={"/(drawer)/(admin)/users"} />;
  }
  

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarPosition: isWeb && isLargeScreen ? "top" : "bottom",
        // tabBarBackground: TabBarBackground,

        tabBarStyle: {
          height: 80, // Change height here
          backgroundColor: Colors.headerColor, // Light gray (you can replace with your color)
          borderTopWidth: 0, // remove border if you want a clean look
          paddingBottom: Platform.OS === "ios" ? 20 : 10, // adjust safe area
          paddingTop: 10,
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Deposit */}
      <Tabs.Screen
        name="deposit"
        options={{
          title: "Deposit",
          tabBarLabel: "Deposit",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Withdraw */}
      <Tabs.Screen
        name="withdraw"
        options={{
          title: "Withdraw",
          tabBarLabel: "Withdraw",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
