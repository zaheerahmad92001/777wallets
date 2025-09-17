import AppButton from "@/components/appButton";
import FloatingButton from "@/components/floatingButton";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { fetchWhatsApp, loginUser } from "@/redux/actions/authActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, contactNumber, loading, inProgress } = useSelector(
    (state: RootState) => state.auth
  );

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoading, user: userData } = useAuth();

  useEffect(() => {
    fetchWhatsAppNumber();
  }, [dispatch]);

  const fetchWhatsAppNumber = async () => {
    try {
      const response = await dispatch(fetchWhatsApp()).unwrap();
    } catch (error) {
      console.log("Failed to fetch WhatsApp number:", error);
    }
  };

  const handleLogin = async () => {
    if (!userName || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all the fields.",
      });
      return;
    }
    const payload = {
      username: userName,
      password,
    };
    const response = await dispatch(loginUser(payload)).unwrap();
    await signIn(response);
  };

  const openWhatsApp = () => {
    let phoneNumber = contactNumber?.whatsAppNumber;
    let message = "Hello, I want to create a new account.";
    let url = "";
    if (Platform.OS === "web") {
      url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    } else {
      url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
    }

    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Make sure WhatsApp is installed on your device");
    });
  };

  return (
    <View className="flex-1 bg-bg px-4">
      <SafeAreaView className="flex-1 mt-12 px-4">
        <ScrollView className="flex-1">
          {/* Heading */}
          <Text
            className={`font-medium text-grayWhite ${
              Platform.OS === "web" ? "text-2xl" : "text-4xl"
            }`}
          >
            Login
          </Text>

          <View className={`${Platform.OS === "web" ? "mt-40" : "mt-20"}`}>
            {/* Phone Number */}
            <LabeledTextInput
              value={userName}
              label="UserName/ID"
              placeholder="Enter User Name"
              placeholderTextColor={Colors.grayWhite}
              onChangeText={(val) => setUserName(val)}
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
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
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
              isLoading={inProgress}
            />
            <Spacer size={10} />

            <AppButton
              title="Get New ID"
              blink
              onPress={openWhatsApp}
              buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green mb-4"
            />

            <View className="w-[90%] md:w-[50%] mx-auto">
              <Text
                className={`font-small text-grayWhite align-center ${
                  Platform.OS === "web" ? "text-1xl" : "text-0.5xl"
                }`}
                style={{ textAlign: "center" }}
              >
                To proceed, please obtain your login ID. Click Get ID or use the
                button below. A valid username and password are required to
                continue.
              </Text>
            </View>
          </View>
        </ScrollView>
        <FloatingButton />
      </SafeAreaView>
    </View>
  );
}
