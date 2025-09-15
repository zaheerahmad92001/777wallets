// app/(auth)/login.tsx
import AppButton from "@/components/appButton";
import AdminHeader from "@/components/appHeader";
import ImagePickerComponent from "@/components/imagePickerComponent";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { updateBankAccount } from "@/redux/actions/bankAccountActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
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

export default function UpdateBankAccount() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {inProgress} = useSelector((state:RootState) => state.bankAccounts)
  const navigation = useNavigation();
const { bank } = useLocalSearchParams();
  const parsedBank = bank ? JSON.parse(bank as string) : null;
  console.log('here is parsebank', parsedBank)

const [bankName, setBankName] = useState(parsedBank?.bankName ?? "");
  const [accountHolder, setAccountHolder] = useState(parsedBank?.accountHolderName ?? "");
  const [accountNumber, setAccountNumber] = useState(parsedBank?.accountNumber ?? "");
  const [iban, setIban] = useState(parsedBank?.iban ?? "");
const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    imagebase64: string;
  } | null>(null);

const [imageUri, setImageUri] = useState<string | null>(
    parsedBank?.bankLogoUrl || null // show existing bank logo first
  );

  const updateBankAccountApi = async() => {
       
      if (!bankName.trim() || !accountHolder.trim() || !accountNumber.trim() || !iban.trim()) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please fill all the fields.",
        });
        return;
      }
  
   const payload = {
      bankName,
      accountHolderName:accountHolder,
      accountNumber:accountNumber,
      iban,
      bankLogoBase64: selectedImage?.imagebase64,
    };
      console.log("New Account Data:", payload);
      const response = await dispatch(updateBankAccount({bankId: parsedBank.id,payload:payload})).unwrap();
      
      //  setBankName("");
      // setAccountHolder("");
      // setAccountNumber("");
      // setIban("");
      // setSelectedImage(null);
      // setImageUri(null);
       router.push("/(drawer)/(admin)/accounts");
  
    };
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainwrapper}>
        <AdminHeader title="Update Account" onMenuPress={() => openMenu()} />
        <ScrollView style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            <LabeledTextInput
             value={bankName}
              onChangeText={setBankName}
              label="Bank Name"
              placeholder="Enter bank name"
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />
            <Spacer size={Platform.OS === "web" ? 30 : 20} />

            <LabeledTextInput
             value={accountHolder}
              onChangeText={setAccountHolder}
              label="Account Holder"
              placeholder="Enter account holder name"
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />
            <Spacer size={Platform.OS === "web" ? 30 : 20} />
            <LabeledTextInput
             value={accountNumber}
              onChangeText={setAccountNumber}
              label="Account Number"
              placeholder="Enter account number"

              placeholderTextColor={Colors.grayWhite}
              keyboardType="numeric"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />
            <Spacer size={Platform.OS === "web" ? 30 : 20} />
            <LabeledTextInput
             value={iban}
              onChangeText={setIban}
              label="IBAN"
              placeholder="Enter IBAN"
              placeholderTextColor={Colors.grayWhite}
              keyboardType="default"
              autoCapitalize="none"
              backgroundColor={Colors.bg}
              containerStyle="w-[90%] md:w-[50%] mx-auto"
            />
            <Spacer size={Platform.OS === "web" ? 30 : 20} />
            <ImagePickerComponent
                label="Bank Logo"
                onImageSelected={({ uri, imagebase64 }) => {
                setSelectedImage({ uri, imagebase64 });
                setImageUri(uri); // update preview when new image is chosen
                }}
                imageUri={imageUri} // will show either initial URL or selected image
                setImageUri={setImageUri}
            />
            <Spacer size={Platform.OS === "web" ? 40 : 30} />

            <AppButton
              title="Update Account"
              onPress={() => {
                //Alert.alert(accountHolder)
                updateBankAccountApi();
              }}
              isLoading={inProgress}
              buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green mb-4"
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
