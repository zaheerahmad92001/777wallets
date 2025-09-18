// app/(auth)/login.tsx
import AppButton from "@/components/appButton";
import AdminHeader from "@/components/appHeader";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { updateUser } from "@/redux/actions/authActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenHeight,
    responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

export default function EditPassword() {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { inProgress } = useSelector((state: RootState) => state.auth);

  const { userItem } = useLocalSearchParams();
  const parsedUser = userItem ? JSON.parse(userItem as string) : null;
  console.log("parsedUser", parsedUser);
  const userId = parsedUser.userId;

  const [password , setPassword]=useState<string>('');
  const [confirmPassword , setConfirmPassword]=useState<string>('');

  useEffect(() => {
    if (userItem) {
      setPassword("");
      setConfirmPassword("");
    }
  }, [userItem]);

  const handleUpdate = async () => {
    try {
      if (!password || !confirmPassword) {
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: "All fields are required.",
        });
        return;
      }

      const payload = {
        password,
      };

      const response = await dispatch(updateUser({ payload, userId })).unwrap();
       if (response?.success) {
        Toast.show({
          type: "success",
          text1: "User Update",
          text2: response?.message,
        });
      } 

      if (response?.success === false) {
        Toast.show({
          type: "error",
          text1: "User Update Error",
          text2: response?.message,
        });
        return;
      }

      router.back();
    } catch (error: any) {
      console.error("Error updating user:", error?.response || error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.error || "Something went wrong",
      });
    }
  };

  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainwrapper}>
        <AdminHeader title="Update Password" onMenuPress={() => openMenu()} />
        <ScrollView style={styles.wrapper}>
          {/* <Text style={styles.heading}>Sign Up</Text> */}
          
          

          <View style={styles.inputWrapper}>
          
            <Spacer size={Platform.OS === "web" ? 30 : 20} />
            <LabeledTextInput
              label="Password"
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />
            <Spacer size={Platform.OS === "web" ? 30 : 20} />
             <LabeledTextInput
              label="Confirm Password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />

           <Spacer size={Platform.OS === "web" ? 40 : 30} /> 
            <AppButton
              title="Update Password"
              onPress={() => {
                handleUpdate();
              }}
              isLoading={inProgress}
              buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green"
              textStyle="text-white text-lg font-bold"
            />
             <Spacer size={Platform.OS === "web" ? 40 : 30} /> 
          </View>
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

