import AppButton from "@/components/appButton";
import BalanceDeposit from "@/components/balanceDeposit";
import FloatingButton from "@/components/floatingButton";
import Spacer from "@/components/spacer";
import { useAuth } from "@/contexts/AuthContext";
import { fetchWebsiteURL } from "@/redux/actions/authActions";
import { AppDispatch, RootState } from "@/redux/store";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Alert, Linking, Platform, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import TextTicker from "react-native-text-ticker";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { websiteURL } = useSelector((state: RootState) => state.auth);
  const siteURL=websiteURL?.websiteURL


  const isWeb = Platform.OS === "web";
  const { signOut } = useAuth();

  useEffect(() => {
    fetchWebsite();
  }, [dispatch]);

  const fetchWebsite = async () => {
    try {
      const response = await dispatch(fetchWebsiteURL()).unwrap();
    } catch (error) {
      console.log("Failed to fetch WhatsApp number:", error);
    }
  };
  

  const openWeb = async () => {

    const url =siteURL? siteURL: "https://bpexch.net/";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Invalid URL", "Unable to open the link: " + url);
    }
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView className="flex-1 mt-6">
        <ScrollView showsVerticalScrollIndicator={false} className="mx-4">
          <Spacer size={20} />

          <BalanceDeposit
            onPress={() => router.push("/deposit")}
            amount={0}
            heading="Balance"
            title="Deposit"
          />
          <Spacer size={20} />

          <BalanceDeposit
            onPress={() => router.push("/withdraw")}
            amount={0}
            heading="Balance"
            title="Withdraw"
          />
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
            title={siteURL?siteURL:"https://bpexch.net"}
            onPress={openWeb}
            buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green mb-4"
          />

          <AppButton
            title="Logout"
            onPress={handleLogout}
            buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green mb-4"
          />
    
        </ScrollView>
        <FloatingButton />
      </SafeAreaView>
    </View>
  );
}
