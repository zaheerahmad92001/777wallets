import AppButton from "@/components/appButton";
import AdminHeader from "@/components/appHeader";
import LabeledTextInput from "@/components/labeledTextInput";
import Loader from "@/components/Loader";
import Spacer from "@/components/spacer";
import WebsiteCard from "@/components/websiteCard";
import { Colors } from "@/constants/Colors";
import { addWebsite, fetchWebsiteURL, updateWebsite } from "@/redux/actions/authActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

export default function Website() {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { websiteURL ,loading,inProgress } = useSelector((state: RootState) => state.auth);
  const siteURL=websiteURL?.websiteURL;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [webUrl, setWebUrl] = useState<string>('');

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

  

const handleUpdate = async (newUrl: string) => {
    const websiteId = websiteURL.id;
    const websiteURL = newUrl;
    const payload = {
      websiteId,
      websiteURL,
    };
    const response = await dispatch(updateWebsite(payload)).unwrap();
    console.log("here is website response", response?.message);
    if (response?.message === "Website URL updated successfully") {
      setIsEditing(false);
      Toast.show({
        type: "success",
        text1: "Website URL",
        text2: response?.message,
      });
    }
  };

  const handleSaveWebsite= async() => {
    const payload={
      websiteURL:webUrl
    }
    const response= await dispatch(addWebsite(payload)).unwrap();
    console.log('here is response for add website', response)
    if(response?.success){
       Toast.show({
        type: "success",
        text1: "Website Number",
        text2: response?.message,
      });
    }
  
  };

  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainwrapper}>
        <AdminHeader title="Website" onMenuPress={() => openMenu()} />
            <View style={styles.inputWrapper}>
             {!websiteURL ? (
            <View className="w-[90%] md:w-[50%] mx-auto mb-4">
              <LabeledTextInput
                value={webUrl}
                label={"WhatsApp Number"}
                placeholder={"Enter number"}
                placeholderTextColor={Colors.grayWhite}
                onChangeText={setWebUrl}
                keyboardType={"phone-pad"}
                autoCapitalize="none"
                backgroundColor={Colors.bg}
              />

              <Spacer size={Platform.OS === "web" ? 40 : 30} />

              <AppButton
                title="Save"
                onPress={() => {
                  handleSaveWebsite();
                }}
                isLoading={inProgress}
                buttonStyle="w-[100%] md:w-[30%] mx-auto bg-green mb-4"
                textStyle="text-white text-lg font-bold"
              />
            </View>
          ) : loading ? (
            <Loader />
          ) : (
            <WebsiteCard
              label="Website URL"
              placeholder="Enter Website URL"
              keybarodType="default"
              url={siteURL}
              onUpdate={handleUpdate}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          )}
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
