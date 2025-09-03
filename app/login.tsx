

import AppButton from "@/components/appButton";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Platform, SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Login() {
  const router = useRouter();

  // const handleLogin = () => router.navigate("/(drawer)/(tabs)");

  const handleLogin =()=>{
    router.replace("/(drawer)/(tabs)")
  };

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
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}