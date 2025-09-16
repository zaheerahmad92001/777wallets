// app/(auth)/login.tsx
import AppButton from "@/components/appButton";
import AdminHeader from "@/components/appHeader";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
export default function UpdateUser() {
  const router = useRouter();
  const navigation = useNavigation();
const [profileImage, setProfileImage] = useState<string | null>(null);

  const createUser = () => {
  Alert.alert('Update user')
  };
  const openMenu = () => {
    navigation.openDrawer();
  };

  const pickImage = async () => {
    // Ask for permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "You need to allow access to photos!");
      return;
    }

    // Launch picker
     const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
       });
   
       if (!result.canceled) {
         const uri = result.assets[0].uri;
         setProfileImage(uri);
         
       }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainwrapper}>
        <AdminHeader
          title="Update User"
          onMenuPress={() => openMenu()}
        />
        <ScrollView style={styles.wrapper}>
          {/* <Text style={styles.heading}>Sign Up</Text> */}
          <View style={styles.inputWrapper}>
          

<View style={{ alignItems: "center", marginVertical: 20 }}>
  <View style={{ position: "relative" }}>
    <Image
      source={require("../../../assets/images/easyPaisa.png")} 
      style={{
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: Colors.grayWhite,
      }}
    />
    <TouchableOpacity
       onPress={pickImage}
      style={{
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: Colors.green, 
        borderRadius: 20,
        padding: 8,
        borderWidth: 2,
        borderColor: Colors.grayWhite,
      }}
    >
      <Text style={{ color: "white", fontSize: 12 }}>✎</Text>
      
    </TouchableOpacity>
  </View>
</View>

            
            <LabeledTextInput
              label="Name"
              placeholder="Enter name"
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
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />
            <Spacer size={Platform.OS==='web'? 40: 30} />

            <AppButton
              title="Update User"
              onPress={() => {
                createUser();
              }}
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
