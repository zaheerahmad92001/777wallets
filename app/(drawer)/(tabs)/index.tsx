import AppButton from "@/components/appButton";
import BalanceDeposit from "@/components/balanceDeposit";
import FloatingButton from "@/components/floatingButton";
import Spacer from "@/components/spacer";
import { useAuth } from "@/contexts/AuthContext";
import { router, useNavigation } from "expo-router";
import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import TextTicker from "react-native-text-ticker";

export default function HomeScreen() {
  const navigation = useNavigation();
  const isWeb = Platform.OS === "web";
  const {signOut} = useAuth()

  const openWhatsApp = () => {
    signOut();
    let phoneNumber = "+923001234567";
    let message = "Hello, I want to create a new account.";

    let url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Make sure WhatsApp is installed on your device");
    });
  };


  const openWeb = async () => {
    const url = "https://bpexch.net/";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Invalid URL", "Unable to open the link: " + url);
    }
  };

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView className="flex-1 mt-6">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mx-4"
        >
          <Spacer size={20} />

          <BalanceDeposit 
          onPress={() => router.push("/deposit")}
          amount={0} heading="Balance" title="Deposit" />
          <Spacer size={20} />

          <BalanceDeposit 
          onPress={() => router.push("/withdraw")}
          amount={0} heading="Balance" title="Withdraw" />
          <Spacer size={20} />

          {/* Ticker View */}
          <View className="bg-white py-3 rounded-lg">
            <TextTicker
             style={{ fontSize: responsiveFontSize(2.5) }}
              duration={10000}
              loop
              bounce={false}
              repeatSpacer={350}
              marqueeDelay={1000}
            >
              Welcome to world777 get 5% extra bonus on 1st deposit and 3% extra
              bonus on regular deposit.
            </TextTicker>
          </View>

          <Spacer size={20} />

          {/* Buttons */}
          <AppButton
            title="https://bpexch.net"
            onPress={openWeb}
            buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green mb-4"
          />

          <Spacer size={10} />

          <AppButton
            title="Get New ID"
            blink
            onPress={openWhatsApp}
            buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green mb-4"
          />
        </ScrollView>
        <FloatingButton/>
      </SafeAreaView>
    </View>
  );
}
