
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/toastConfig";

// -------------------------
// RootNavigator handles auth redirection
// -------------------------
function RootNavigator() {
  const { userToken, isLoading } = useAuth();

  if (isLoading) return null;

  if (!userToken) {
    // Not logged in
    return <Redirect href="/login" />;
  }

  if (userToken === "03321122333") {
    // Admin user
    return <Redirect href="/(drawer)/(admin)/users" />;
  }

  // Normal user
  return <Redirect href="/(drawer)/(tabs)" />;
}

// -------------------------
// Main RootLayout
// -------------------------
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null; // wait for fonts
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={styles.container}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}>
            {/* Login screen */}
            <Stack.Screen name="login" />

            {/* Drawer (contains tabs + admin) */}
            <Stack.Screen name="(drawer)" />

            {/* Not found */}
            <Stack.Screen name="+not-found" />
          </Stack>

          {/* Handle auth routing */}
          <RootNavigator />

          <StatusBar style="auto" />
          <Toast config={toastConfig} />
        </ThemeProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



// import { AuthProvider } from "@/contexts/AuthContext";
// import "@/global.css";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import "react-native-reanimated";
// import Toast from "react-native-toast-message";
// import { toastConfig } from "../components/toastConfig";

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   return (
//       <AuthProvider>
//     <GestureHandlerRootView style={styles.container}>
    
//         <ThemeProvider
//           value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
//         >
//           <Stack screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
//             <Stack.Screen name="(admin)" options={{ headerShown: false }} />
//             <Stack.Screen name="login" />

//             {/* <Stack.Screen name="(admin)" options={{ headerShown: false }} /> */}
//             <Stack.Screen name="+not-found" />
//           </Stack>
//           <StatusBar style="auto" />
//           <Toast config={toastConfig} />
//         </ThemeProvider>
//     </GestureHandlerRootView>
//       </AuthProvider>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
