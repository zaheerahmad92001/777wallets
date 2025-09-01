// app/(auth)/login.tsx
import AppButton from "@/components/appButton";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

export default function SignUp() {
  const router = useRouter();

  const handleLogin = () => {
    // ✅ Save login state (AsyncStorage / Context / Redux)
    // then navigate
    router.replace("/(drawer)/(tabs)");
  };
  const goToLogin = () => {
    router.replace("/(auth)");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainwrapper}>
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Sign Up</Text>
          <View style={styles.inputWrapper}>
            <LabeledTextInput
              label="Name"
              placeholder="Enter name"
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle={styles.inputContainer}
              // labelStyle={{ color: Colors.lightWhite }}
            />
            <Spacer size={Platform.OS === "web" ? 30 : 20} />

            <LabeledTextInput
              label="UserName"
              placeholder="Enter number"
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle={styles.inputContainer}
              // labelStyle={{ color: Colors.lightWhite }}
            />
            <Spacer size={Platform.OS === "web" ? 30 : 20} />
            <LabeledTextInput
              label="Phone Number"
              placeholder="Enter number"
              placeholderTextColor={Colors.grayWhite}
              keyboardType="numeric"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle={styles.inputContainer}
              // labelStyle={{ color: Colors.lightWhite }}
            />
            <Spacer size={Platform.OS === "web" ? 30 : 20} />
            <LabeledTextInput
              label="Password"
              placeholder="Enter password"
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle={styles.inputContainer}
              // labelStyle={{ color: Colors.lightWhite }}
            />
            <Spacer size={Platform.OS === "web" ? 30 : 20} />
            <LabeledTextInput
              label="Confirm Password"
              placeholder="Confirm password"
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle={styles.inputContainer}
              // labelStyle={{ color: Colors.lightWhite }}
            />
            <Spacer size={20} />

            <AppButton
              title="Sign Up"
              onPress={() => {handleLogin()}}
              buttonStyle={styles.buttonStyle}
            />
            <Pressable onPress={goToLogin} style={{ alignSelf: "center" }}>
              <Text style={styles.signUpText}>already have account? Login</Text>
            </Pressable>
          </View>
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
