// app/(auth)/login.tsx
import AppButton from "@/components/appButton";
import AdminHeader from "@/components/appHeader";
import ImagePickerComponent from "@/components/imagePickerComponent";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { signUp } from "@/redux/actions/authActions";
import { AppDispatch, RootState } from "@/redux/store";
import { CreateUserPayload } from "@/types";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
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

export default function SignUp() {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {inProgress} = useSelector((state:RootState) => state.auth)

    const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    imagebase64: string;
  } | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name , setName]=useState<string>('');
  const [username , setUsername]=useState<string>('');
  const [phone , setPhone]=useState<string>('');
  const [password , setPassword]=useState<string>('');
  const [confirmPassword , setConfirmPassword]=useState<string>('');
  

  const createUser = async() => {
   try {
    if (!name || !username || !phone || !password || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "All fields are required.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Passwords do not match.",
      });
      return;
    }
    const payload:CreateUserPayload = {
      name,
      username,
      phone,
      password,
      role: "user", // default role
      imageBase64: selectedImage?.imagebase64 || null, // optional
    };
    const response = await dispatch(signUp(payload)).unwrap();
   if(response?.success===false){
    Toast.show({
        type: "error",
        text1: "User Create Error",
        text2: response?.error,
      });
      return 
   }

      // Reset fields
      setName("");
      setUsername("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setSelectedImage(null);
      setImageUri(null);
      router.back();
    
  } catch (error: any) {
    console.error("Error creating user:", error?.response || error.message);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error?.response?.data?.error || "Something went wrong",
    });
  };


  };
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainwrapper}>
        <AdminHeader
          title="Add New User"
          onMenuPress={() => openMenu()}
        />
        <ScrollView style={styles.wrapper}>
          {/* <Text style={styles.heading}>Sign Up</Text> */}
          <View style={styles.inputWrapper}>
            <LabeledTextInput
              label="Name"
              placeholder="Enter name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />
            <Spacer size={Platform.OS === "web" ? 30 : 20} />

            <LabeledTextInput
              label="UserName"
              placeholder="Enter User Name"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />
            <Spacer size={Platform.OS === "web" ? 30 : 20} />
            <LabeledTextInput
              label="Phone Number"
              placeholder="Enter number"
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor={Colors.grayWhite}
              keyboardType="numeric"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />
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

            <Spacer size={Platform.OS === "web" ? 30 : 20} />
            <ImagePickerComponent
               label="User Image"
               onImageSelected={({ uri, imagebase64 }) => {
               setSelectedImage({ uri, imagebase64 });
            }}
            imageUri={imageUri}
            setImageUri={setImageUri}
            />
            <Spacer size={Platform.OS==='web'? 40: 30} />

            <AppButton
              title="Create User"
              onPress={() => {
                createUser();
              }}
              isLoading={inProgress}
              buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green"
              textStyle="text-white text-lg font-bold"
            />
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
