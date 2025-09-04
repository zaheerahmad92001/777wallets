import AdminHeader from "@/components/appHeader";
import WebsiteCard from "@/components/websiteCard";
import { Colors } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import {
    Platform,
    SafeAreaView,
    StyleSheet,
    View
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenHeight,
    responsiveScreenWidth,
} from "react-native-responsive-dimensions";

export default function WhatsAppScreen() {
  const router = useRouter();
  const navigation = useNavigation();

 
  const handleUpdate = (newUrl: string) => {
    console.log("Updated website:", newUrl);
  };
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainwrapper}>
        <AdminHeader title="whatsApp" onMenuPress={() => openMenu()} />
            <View style={styles.inputWrapper}>
             <WebsiteCard 
             label="WhatsApp Number"
             placeholder="Enter number"
             keybarodType="phone-pad"
             url="+92 3326765343" onUpdate={handleUpdate} />
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
  wrapper: {
    marginHorizontal: responsiveScreenWidth(4),
    flex: 1,
  },
  mainwrapper: {
    flex: 1,
    marginTop: responsiveScreenHeight(3),
  },
  heading: {
    fontSize: responsiveFontSize(Platform.OS === "web" ? 2.2 : 3.5),
    color: Colors.grayWhite,
    fontWeight: "500",
  },
  inputWrapper: {
    marginTop: responsiveHeight(Platform.OS === "web" ? 10 : 5),
  },
  inputContainer: {
    width: responsiveScreenWidth(Platform.OS === "web" ? 50 : 90),
    alignSelf: "center",
  },
  buttonStyle: {
    marginBottom: Platform.OS === "web" ? responsiveHeight(2) : 10,
    width:
      Platform.OS === "web"
        ? responsiveScreenWidth(20)
        : responsiveScreenWidth(90),
    alignSelf: "center",
  },
  signUpText: {
    fontSize: responsiveFontSize(Platform.OS === "web" ? 1.2 : 2),
    color: Colors.grayWhite,
    fontWeight: Platform.OS === "web" ? "400" : "500",
  },
});
