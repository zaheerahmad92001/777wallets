import AppButton from "@/components/appButton";
import CurrencyModal from "@/components/currencyModal";
import FloatingButton from "@/components/floatingButton";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import React, { Fragment, useState } from "react";
import Toast from "react-native-toast-message";

import AppHeader from "@/components/appHeader";
import { addTransaction } from "@/redux/actions/bankAccountActions";
import { AppDispatch, RootState } from "@/redux/store";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const WithdrawScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { bankAccounts, loading ,inProgress } = useSelector(
    (state: RootState) => state.bankAccounts
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<
    "RS" | "USDT" | null
  >(null);

  // ✅ JazzCash default
  const [selectedMethod, setSelectedMethod] = useState<
    "JazzCash" | "EasyPaisa" | "Bank" | null
  >("JazzCash");

  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const [bankName, setBankName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountTitle, setAccountTitle] = useState<string>("");
  const { user} = useSelector(
    (state: RootState) => state.auth
  );
  
  // const handleWidral = async () => {
  //   if (user.username != userName) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: "Username/ID does not match",
  //     });
  //     return;
  //   } else
  //   if (!phoneNumber || !amount) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: "Please fill all the fields.",
  //     });
  //     return;
  //   } else if (Number(amount) < 1) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: "minimum ammount is RS:1.",
  //     });
  //     return;
  //   } else if (!accountNumber || !accountTitle) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: "Please add bank detail",
  //     });
  //     return;
  //   } else if (selectedMethod === "Bank" && !bankName) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: "Please add bank name",
  //     });
  //     return;
  //   }
  //   const payload = {
  //     username: userName,
  //     phoneNumber: phoneNumber,
  //     amount: amount,
  //     accountType: selectedMethod,
  //     bankName: bankName,
  //     accountNumber: accountNumber,
  //     accountTitle: accountTitle,
  //     transactionType: "withdraw",
  //     // imageBase64: fileBase64,
  //   };
  //   const resultAction = await dispatch(addTransaction(payload)).unwrap();
  // };


  const handleWidral = async () => {
  if (user.username != userName) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Username/ID does not match",
    });
    return;
  } else if (!phoneNumber || !amount) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Please fill all the fields.",
    });
    return;
  } else if (Number(amount) < 1) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "minimum amount is RS:1.",
    });
    return;
  } else if (!accountNumber || !accountTitle) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Please add bank detail",
    });
    return;
  } else if (selectedMethod === "Bank" && !bankName) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Please add bank name",
    });
    return;
  }

  const payload = {
    username: userName,
    phoneNumber: phoneNumber,
    amount: amount,
    accountType: selectedMethod,
    bankName: bankName || selectedMethod,
    accountNumber: accountNumber,
    accountTitle: accountTitle,
    transactionType: "withdraw",
    // imageBase64: fileBase64,
  };

  try {
    const resultAction = await dispatch(addTransaction(payload)).unwrap();

    // ✅ Reset all fields after successful API call
    setSelectedMethod("JazzCash");
    setUserName("");
    setPhoneNumber("");
    setAmount("");
    setBankName("");
    setAccountNumber("");
    setAccountTitle("");

    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Withdrawal request submitted successfully!",
    });
    router.push("/notifications"); 
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Something went wrong. Please try again.",
    });
  }
};

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView className="flex-1 mt-6">
        <AppHeader
          title="Withdraw"
          showNotification
          onNotificationPress={() => 
                router.push("/notifications") 
          }
          
        />

        <ScrollView showsVerticalScrollIndicator={false} className="mx-[4%]">
          <Spacer size={20} />

          <LabeledTextInput
            title="Username/ID"
            label="Username/ID"
            value={userName}
            onChangeText={(vale) => setUserName(vale)}
            placeholder="Enter Username/ID"
            placeholderTextColor={Colors.grayWhite}
            keyboardType="default"
            autoCapitalize="none"
            backgroundColor={Colors.bg}
            containerStyle="w-[92%] md:w-[50%] mx-auto"
          />
          <Spacer size={15} />
          <LabeledTextInput
            title="Phone Number"
            label="Phone Number"
            value={phoneNumber}
            onChangeText={(value) => setPhoneNumber(value)}
            placeholder="Enter phone number"
            placeholderTextColor={Colors.grayWhite}
            keyboardType="phone-pad"
            autoCapitalize="none"
            backgroundColor={Colors.bg}
            containerStyle="w-[92%] md:w-[50%] mx-auto"
          />
          <Spacer size={15} />

          <LabeledTextInput
            title="Amount to Withdraw (Minimum RS: 1)"
            label="Amount"
            placeholder="Enter amount"
            value={amount}
            onChangeText={(value) => setAmount(value)}
            placeholderTextColor={Colors.grayWhite}
            keyboardType="numeric"
            autoCapitalize="none"
            backgroundColor={Colors.bg}
            containerStyle="w-[92%] md:w-[50%] mx-auto"
          />

          <Spacer size={20} />
          <View className="w-[92%] md:w-[50%] mx-auto">
            <Text className="text-grayWhite font-semibold text-lg mb-3">
              Account Details
            </Text>
          </View>

          <View className="w-[92%] md:w-[50%] mx-auto border border-grayWhite rounded-2xl px-5 pt-3 pb-8">
            <View className="flex-row justify-between my-2">
              {["JazzCash", "EasyPaisa", "Bank"].map((method) => (
                <TouchableOpacity
                  key={method}
                  className={`flex-1 py-3 mx-1 border rounded-lg items-center ${
                    selectedMethod === method
                      ? "bg-green border-green"
                      : "border-grayWhite"
                  }`}
                  onPress={() => setSelectedMethod(method as any)}
                >
                  <Text
                    className={`text-sm font-medium ${
                      selectedMethod === method
                        ? "text-white"
                        : "text-grayWhite"
                    }`}
                  >
                    
                    {method}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ✅ Bottom Border */}
            <View className="border-b border-grayWhite mt-1" />

            {selectedMethod === "Bank" && (
              <Fragment>
                <Spacer size={25} />
                <LabeledTextInput
                  label="Bank Name"
                  value={bankName}
                  onChangeText={(val) => setBankName(val)}
                  placeholder="Enter bank name"
                  placeholderTextColor={Colors.grayWhite}
                  autoCapitalize="words"
                  backgroundColor={Colors.bg}
                />
              </Fragment>
            )}

            {/* Input Fields */}
            <View className="mt-4">
              <Spacer size={10} />
              <LabeledTextInput
                label="Account Number"
                placeholder="Enter account number"
                value={accountNumber}
                onChangeText={(val) => setAccountNumber(val)}
                placeholderTextColor={Colors.grayWhite}
                keyboardType="numeric"
                autoCapitalize="none"
                backgroundColor={Colors.bg}
              />
              <Spacer size={25} />
              <LabeledTextInput
                label="Account Title"
                placeholder="Enter account title"
                value={accountTitle}
                onChangeText={(val) => setAccountTitle(val)}
                placeholderTextColor={Colors.grayWhite}
                autoCapitalize="words"
                backgroundColor={Colors.bg}
              />
            </View>
          </View>

          <Spacer size={20} />
          <AppButton
            title="Withdraw"
            onPress={() => {
              handleWidral();
            }}
            isLoading={inProgress}
            buttonStyle="w-[92%] md:w-[20%] mx-auto bg-green mb-4"
          />
        </ScrollView>

        <CurrencyModal
          visible={isModalVisible}
          selectedCurrency={selectedCurrency}
          onClose={() => setModalVisible(false)}
          onSelect={(currency) => {
            setSelectedCurrency(currency);
          }}
        />
        <FloatingButton />
      </SafeAreaView>
    </View>
  );
};

export default WithdrawScreen;
