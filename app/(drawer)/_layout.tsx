// app/(drawer)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        title: "",
        drawerType: "front",
         drawerPosition: "right",
        swipeEdgeWidth: 0,
        drawerActiveTintColor: "#007AFF",
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Main Tabs",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="apps-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      /> */}
    </Drawer>
  );
}
