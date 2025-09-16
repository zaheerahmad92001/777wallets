// app/(auth)/login.tsx
import AppButton from "@/components/appButton";
import AdminHeader from "@/components/appHeader";
import ImagePickerComponent from "@/components/imagePickerComponent";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { editBankAccount } from "@/redux/actions/bankAccountActions";
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

export default function UpdateBankAccount() {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {inProgress} = useSelector((state:RootState)=>state.bankAccounts)


  const { bankItem } = useLocalSearchParams();
  const parsedBankItem = bankItem ? JSON.parse(bankItem as string) : null;
  const bankId = parsedBankItem.id;
  const [bankName, setBankName] = useState<string>(parsedBankItem?.bankName || "");
  const [accountHolder, setAccountHolder] = useState<string>(parsedBankItem?.accountHolderName || "");
  const [accountNumber, setAccountNumber] = useState<string>(parsedBankItem?.accountNumber ||"");
  const [iban, setIban] = useState<string>(parsedBankItem?.iban || "");
  const [imageUri, setImageUri] = useState<string | null>(parsedBankItem?.bankLogoUrl || null);
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    imagebase64: string;
  } | null>(null);


useEffect(() => {
  if (bankItem) {
    const parsed = JSON.parse(bankItem as string);
    setBankName(parsed.bankName || "");
    setAccountHolder(parsed.accountHolderName || "");
    setAccountNumber(parsed.accountNumber || "");
    setIban(parsed.iban || "");
    setImageUri(parsed.bankLogoUrl || null);
  }
}, [bankItem]);

  const handleUpdate = async() => {
   
 if (!bankName.trim() || !accountHolder.trim() || !accountNumber.trim() || !iban.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all the fields.",
      });
      return;
    }

    const payload:any = {
      bankName,
      accountHolderName:accountHolder,
      accountNumber:accountNumber,
      iban,
    };
    if (selectedImage?.imagebase64) {
    payload.bankLogoBase64 = selectedImage.imagebase64;
  }
    const response = await dispatch(editBankAccount({payload,bankId}) as any).unwrap();
    if(response?.status){
      Toast.show({
        type: "success",
        text1: "Bank account",
        text2: response?.message,
      });
    }
    router.push("/(drawer)/(admin)/accounts");

  };
  const openMenu = () => {
    navigation.openDrawer();
  };

  console.log('bank name is', bankName)

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainwrapper}>
        <AdminHeader title="Update Account" onBackPress={()=>{router.push("/(drawer)/(admin)/accounts")}} onMenuPress={() => openMenu()} />
        <ScrollView style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            <LabeledTextInput
             value={bankName}
              onChangeText={setBankName}
              label="Bank Name"
              placeholder="Enter bank name"
               value={bankName}
              onChangeText={(val) => setBankName(val)}
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
                value={accountHolder}
              onChangeText={(val) =>
                setAccountHolder(val)
              }
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
               value={accountNumber}
              onChangeText={(val) =>
                setAccountNumber(val)
              }
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
               value={iban}
              onChangeText={(val) => setIban(val)}
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
              }}
              imageUri={imageUri}
              setImageUri={setImageUri}
            />
            <Spacer size={Platform.OS === "web" ? 40 : 30} />

            <AppButton
              title="Update Account"
              onPress={() => {
                handleUpdate();
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
