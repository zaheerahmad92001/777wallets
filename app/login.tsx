

import AppButton from "@/components/appButton";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => router.replace("/(drawer)/(tabs)");
  const handleSignup = () => {};

  return (
    <View className="flex-1 bg-bg px-4">
      <SafeAreaView className="flex-1 mt-12 px-4">
        <ScrollView className="flex-1">
          {/* Heading */}
          <Text className={`font-medium text-grayWhite ${Platform.OS === "web" ? "text-2xl" : "text-4xl"}`}>
            Login
          </Text>

          <View className={`${Platform.OS === "web" ? "mt-40" : "mt-20"}`}>
            {/* Phone Number */}
            <LabeledTextInput
              label="Phone Number"
              placeholder="Enter number"
              placeholderTextColor={Colors.grayWhite}
              keyboardType="numeric"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />

            <Spacer size={Platform.OS === "web" ? 30 : 20} />

            {/* Password */}
            <LabeledTextInput
              label="Password"
              placeholder="Enter password"
              placeholderTextColor={Colors.grayWhite}
              secureTextEntry
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />

            <Spacer size={20} />

            {/* Login Button */}
            <AppButton
              title="Login"
              onPress={handleLogin}
              buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green mb-4"
              textStyle="text-white text-lg font-bold"
            />

            {/* Signup Link */}
            <Pressable onPress={handleSignup} className="self-center mt-4">
              <Text className="text-grayWhite font-medium text-base md:text-lg">
                Don`t have account? SignUp
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}



// // app/(auth)/login.tsx
// import AppButton from "@/components/appButton";
// import LabeledTextInput from "@/components/labeledTextInput";
// import Spacer from "@/components/spacer";
// import { Colors } from "@/constants/Colors";
// import { useRouter } from "expo-router";
// import {
//     Platform,
//     Pressable,
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     View
// } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import {
//     responsiveFontSize,
//     responsiveHeight,
//     responsiveScreenWidth,
// } from "react-native-responsive-dimensions";

// export default function Login() {
//   const router = useRouter();

//   const handleLogin = () => {
//     // ✅ Save login state (AsyncStorage / Context / Redux)
//     // then navigate
//     router.replace("/(drawer)/(tabs)");
//   };

//   const handleSignup = () => {
//     // router.push("/(auth)/signup");
//   };

//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={styles.mainwrapper}>
//         <ScrollView style={styles.wrapper}>
//           <Text style={styles.heading}>Login</Text>
//           <View style={styles.inputWrapper}>
//             <LabeledTextInput
//               label="Phone Number"
//               placeholder="Enter number"
//               placeholderTextColor={Colors.grayWhite}
//               keyboardType="numeric"
//               autoCapitalize="none"
//               backgroundColor={Colors.bg}
//               containerStyle="w-11/12 md:w-1/2 self-center"
//             />

//             <Spacer size={Platform.OS === "web" ? 30 : 20} />
//             <LabeledTextInput
//               label="Password"
//               placeholder="Enter password"
//               placeholderTextColor={Colors.grayWhite}
//               keyboardType="numeric"
//               autoCapitalize="none"
//               backgroundColor={Colors.bg}
//               containerStyle="w-11/12 md:w-1/2 self-center"
//             />
//             <Spacer size={20} />
//             <AppButton
//   title="Login"
//   onPress={() => {}}
//  buttonStyle="mb-4 w-[90%] md:w-[20%] self-center"
// textStyle="text-textGreen text-lg font-bold"

// />

//             <Pressable onPress={handleSignup} style={{ alignSelf: "center" }}>
//               <Text style={styles.signUpText}>Don`t have account SignUp</Text>
//             </Pressable>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.bg,
//   },
//   wrapper: {
//     flex: 1,
//     marginHorizontal: responsiveScreenWidth(4),
//   },
//   mainwrapper: {
//     flex: 1,
//     marginTop: responsiveHeight(3),
//   },
//   heading: {
//     fontSize: responsiveFontSize(Platform.OS === "web" ? 2.2 : 3.5),
//     color: Colors.grayWhite,
//     fontWeight: "500",
//   },
//   signUpText: {
//     fontSize: responsiveFontSize(Platform.OS === "web" ? 1.2 : 2),
//     color: Colors.grayWhite,
//     fontWeight: Platform.OS === "web" ? "400" : "500",
//   },
//   inputWrapper: {
//     marginTop: responsiveHeight(Platform.OS === "web" ? 10 : 5),
//   },
//   inputContainer: {
//     width: responsiveScreenWidth(Platform.OS === "web" ? 50 : 90),
//     alignSelf: "center",
//   },
//   buttonStyle: {
//     marginBottom: Platform.OS === "web" ? responsiveHeight(2) : 10,
//     width:
//       Platform.OS === "web"
//         ? responsiveScreenWidth(20)
//         : responsiveScreenWidth(90),
//     alignSelf: "center",
//   },
// });
