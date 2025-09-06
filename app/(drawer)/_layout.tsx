// // app/(drawer)/_layout.tsx
// import { Ionicons } from "@expo/vector-icons";
// import { Drawer } from "expo-router/drawer";

// export default function DrawerLayout() {
//   return (
//     <Drawer
//       screenOptions={{
//         headerShown: false,
//         title: "",
//         drawerType: "front",
//         drawerPosition: "right",
//         swipeEdgeWidth: 0,
//         drawerActiveBackgroundColor: "transparent",
//         drawerActiveTintColor: "#007AFF",
//       }}
//     >

//       {/* Users */}
//       <Drawer.Screen
//         name="(admin)/users" // 👈 point to subfolder
//         options={{
//           title: "Users",
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="people-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Drawer.Screen
//         name="(admin)/accounts"
//         options={{
//           title: "Accounts",
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="person-circle-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Drawer.Screen
//         name="(admin)/whatsapp"
//         options={{
//           title: "Changed WhatsApp",
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="logo-whatsapp" size={size} color={color} />
//           ),
//         }}
//       />

//       <Drawer.Screen
//         name="(admin)/website"
//         options={{
//           title: "Website URL",
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="globe-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Drawer>
//   );
// }


// app/(drawer)/_layout.tsx
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Alert, StyleSheet, View } from "react-native";

export default function DrawerLayout() {
  const router = useRouter();
  const {signOut} = useAuth();

  const handleLogout = () => {
   signOut();
  };

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        title: "",
        drawerType: "front",
        drawerPosition: "right",
        swipeEdgeWidth: 0,
        drawerActiveBackgroundColor: "transparent",
        drawerActiveTintColor: "#007AFF",
      }}
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          {/* Scrollable list of items */}
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>

          {/* Fixed bottom logout button */}
          <View style={styles.logoutContainer}>
            <DrawerItem
              label="Logout"
              icon={({ color, size }) => (
                <Ionicons name="log-out-outline" size={size} color={color} />
              )}
              onPress={() =>
                Alert.alert("Logout", "Are you sure you want to logout?", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Logout", style: "destructive", onPress: handleLogout },
                ])
              }
            />
          </View>
        </View>
      )}
    >
      <Drawer.Screen
        name="(admin)/users"
        options={{
          title: "Users",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(admin)/accounts"
        options={{
          title: "Accounts",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
 
      <Drawer.Screen
        name="(admin)/whatsapp"
        options={{
          title: "Changed WhatsApp",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="logo-whatsapp" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(admin)/website"
        options={{
          title: "Website URL",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="globe-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
    paddingBottom: 10,
  },
});
