

import AppButton from "@/components/appButton";
import FloatingButton from "@/components/floatingButton";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Linking,
  Platform, SafeAreaView, Text, View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Login() {
  const router = useRouter();
  const [userName , setUserName] = useState('')
  const [password , setPassword] = useState('')
    const { signIn, isLoading, userToken } = useAuth();
    console.log('here is token login', userToken,isLoading)

  const handleLogin =async()=>{
   await signIn(userName);
  //  router.replace("/(drawer)/(tabs)");
    // router.replace("/(drawer)/(tabs)")
  };

  const openWhatsApp = () => {
     
      let phoneNumber = "+923001234567";
      let message = "Hello, I want to create a new account.";
  
      let url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
  
      Linking.openURL(url).catch(() => {
        Alert.alert("Error", "Make sure WhatsApp is installed on your device");
      });
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
              value={userName}
              label="User Name/ID"
              placeholder="Enter User Name"
              placeholderTextColor={Colors.grayWhite}
              onChangeText={(val)=>setUserName(val)}
              //keyboardType="phone-pad"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />

            <Spacer size={Platform.OS === "web" ? 30 : 20} />

            {/* Password */}
            <LabeledTextInput
             value={password}
              label="Password"
              placeholder="Enter password"
              placeholderTextColor={Colors.grayWhite}
              onChangeText={(value)=>setPassword(value)}
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
              isLoading={isLoading}
            />
             <Spacer size={10} />

          <AppButton
            title="Get New ID"
            blink
            onPress={openWhatsApp}
            buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green mb-4"
          />
        
          <View className="w-[90%] md:w-[50%] mx-auto">
          <Text className={`font-small text-grayWhite align-center ${Platform.OS === "web" ? "text-1xl" : "text-0.5xl"}`} style={{ textAlign: "center" }}>
            To proceed, please obtain your login ID. Click Get ID or use the button below. A valid username and password are required to continue.
          </Text>
          </View>
          </View>
        </ScrollView>
        <FloatingButton/>
      </SafeAreaView>
    </View>
  );
}