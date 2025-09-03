// import { useColorScheme } from '@/hooks/useColorScheme';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { useState } from 'react';
// import 'react-native-reanimated';
// import Toast from 'react-native-toast-message';
// import { toastConfig } from "../components/toastConfig";

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // toggle this

//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) return null;


//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="(drawer)" />
//           <Stack.Screen name="(auth)" />
//         <Stack.Screen name="+not-found" />
//       </Stack>

//       <StatusBar style="auto" />
//       <Toast config={toastConfig} />
//     </ThemeProvider>
//   );
// }


import "@/global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { toastConfig } from "../components/toastConfig";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="login" />

        {/* <Stack.Screen name="(admin)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
       <Toast config={toastConfig} />
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
