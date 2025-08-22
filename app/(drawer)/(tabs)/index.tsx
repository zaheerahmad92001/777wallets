import AppButton from "@/components/appButton";
import BalanceDeposit from "@/components/balanceDeposit";
import AppHeader from "@/components/header";
import MarqueeText from "@/components/marqueeText";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppHeader
          userName="Zaheer"
          greetings="Good morning"
          onPress={() => navigation.openDrawer()}
        />
        <View style={styles.wrapper}>
        <Spacer size={20}/>
        <BalanceDeposit />
        <Spacer size={20}/>
        <AppButton title="Withdraw" onPress={() => {}} />
        <Spacer size={20}/>
        <MarqueeText
        text="🚀 Welcome to my app! This text scrolls infinitely from right to left..."
        duration={10000} // bigger = slower, smaller = faster
      />
          </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  wrapper:{
     marginHorizontal:responsiveScreenWidth(4) 
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
});
