import AppButton from "@/components/appButton";
import BalanceDeposit from "@/components/balanceDeposit";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import TextTicker from "react-native-text-ticker";

export default function HomeScreen() {
  const navigation = useNavigation();
  const isWeb = Platform.OS === "web";


// useEffect(()=>{
//   router.push("/(auth)/login");
// })


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

  const openWeb = async ()=>{
    const url = "https://www.world777.now/";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Invalid URL", "Unable to open the link: " + url);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainwrapper}>
        {/* <AppHeader
          userName="Zaheer"
          greetings="Good morning"
          onPress={() => navigation.openDrawer()}
        /> */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
          <Spacer size={20} />
          <BalanceDeposit amount={0} heading="Balance" title="Deposit" />
          <Spacer size={20} />
          <BalanceDeposit amount={0} heading="Balance" title="Withdraw" />

          <Spacer size={20} />
          <View style={styles.tickerView}>
            <TextTicker
              style={{ fontSize: responsiveFontSize(2.5) }}
              duration={10000} // total scroll duration
              loop // infinite loop
              bounce={false} // disables bounce, keeps smooth scroll
              repeatSpacer={350} // space before repeating
              marqueeDelay={1000} // delay before animation starts
            >
              Welcome to world777 get 5% extra bonus on 1st deposit and 3% extra
              bonus on regular deposit.
            </TextTicker>
          </View>

          <Spacer size={20} />
          <AppButton title="www.world777.now" onPress={openWeb} 
            buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green mb-4"
            />
          <Spacer size={10} />
          <AppButton
            title="Get New ID"
            blink
            onPress={() => {
              openWhatsApp();
            }}
           buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green mb-4"
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  wrapper: {
    marginHorizontal: responsiveScreenWidth(4),
  },
  mainwrapper: {
    flex: 1,
    marginTop: responsiveHeight(3),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  tickerView: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    // borderRadius: responsiveWidth(3),
  },
  buttonStyle: {
    marginBottom: Platform.OS==='web' ? responsiveHeight(2) : 10,
    width: Platform.OS==='web' ? responsiveScreenWidth(20) : responsiveScreenWidth(90),
    alignSelf: "center",
  },
});
