import AccountSelector from "@/components/accountSelector";
import AppButton from "@/components/appButton";
import ExpoDocumentPickerComponent from "@/components/documentSelector";
import FloatingButton from "@/components/floatingButton";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { PickedFile } from "@/constants/types";
import {
  addTransaction,
  fetchBankAccounts,
} from "@/redux/actions/bankAccountActions";
import { AppDispatch, RootState } from "@/redux/store";
import { BankAccount } from "@/types";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const DepositScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { bankAccounts, loading,inProgress } = useSelector(
    (state: RootState) => state.bankAccounts
  );

  // const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<
    "RS" | "USDT" | null
  >(null);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [copiedValue, setCopiedValue] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [file, setFile] = useState<PickedFile | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [selectedAccountType, setSelectedAccountType] =
    useState<BankAccount | null>(null);

  useEffect(() => {
    loadBankAccounts();
  }, [dispatch]);

  const loadBankAccounts = async () => {
    try {
      await dispatch(fetchBankAccounts() as any);
    } catch (error) {
      console.error("Failed to load bank accounts:", error);
    }
  };

  const handleCopy = (value: string) => {
    setCopiedValue(value);
    Toast.show({
      type: "success",
      text1: "Copy",
      text2: "Account Copied",
    });
  };

  const handleDeposit = async () => {
    if (!userName || !phoneNumber || !amount || !selectedAccount || !file) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all the fields and select an account.",
      });
      return;
    }
    else if(Number(amount) < 500 ){
       Toast.show({
        type: "error",
        text1: "Error",
        text2: "Minimum ammount is RS:500",
      });
      return;
    }
    const payload = {
      username: userName,
      phoneNumber: phoneNumber,
      amount: amount,
      accountType: selectedAccountType?.iban
        ? "bank"
        : selectedAccountType?.bankName,
      bankName: selectedAccountType?.bankName,
      accountNumber: selectedAccountType?.accountNumber,
      accountTitle: selectedAccountType?.accountHolderName,
      transactionType: "deposit",
      // imageBase64: fileBase64,
    };

    const resultAction = await dispatch(addTransaction(payload)).unwrap();
  };

  const renderItem = ({ item, index }) => {
    return (
      <AccountSelector
        bankImage={
          item.bankLogoUrl
            ? { uri: item.bankLogoUrl }
            : require("../../../assets/images/ubl.png")
        }
        bankName={item.bankName}
        accountNumber={item.accountNumber}
        accountTitle={item.accountHolderName}
        selected={selectedAccount === item.accountNumber}
        onSelect={() => {
          setSelectedAccount(item.accountNumber);
          setSelectedAccountType(item);
        }}
        onCopy={() => handleCopy(item.iban)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainwrapper}>
        {/* <AppHeader userName="Deposit" onPress={() => navigation.openDrawer()} /> */}

        <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
          <Spacer size={20} />

          <LabeledTextInput
            title="Username/ID"
            label="Username/ID"
            value={userName}
            placeholder="Enter Username/ID"
            onChangeText={(text) => setUserName(text)}
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
            placeholder="Enter phone number"
            onChangeText={(text) => setPhoneNumber(text)}
            placeholderTextColor={Colors.grayWhite}
            keyboardType="phone-pad"
            autoCapitalize="none"
            backgroundColor={Colors.bg}
            containerStyle="w-[92%] md:w-[50%] mx-auto"
          />

          <Spacer size={15} />

          <LabeledTextInput
            title="Minimum Amount is RS:500 with 3% Bonus"
            label="Amount"
            value={amount}
            placeholder="Enter amount"
            onChangeText={(text) => setAmount(text)}
            placeholderTextColor={Colors.grayWhite}
            keyboardType="numeric"
            autoCapitalize="none"
            backgroundColor={Colors.bg}
            containerStyle="w-[92%] md:w-[50%] self-center"
            // labelStyle={{ color: Colors.lightWhite }}
          />

          <Spacer size={20} />
          <View className="w-[92%] md:w-[50%] self-center">
            <Text style={styles.depositTo}>{"Select Deposit Method"}</Text>
          </View>
          {loading ? (
            <View>
              <ActivityIndicator color={Colors.white} size={"small"} />
            </View>
          ) : (
            <FlatList
              data={bankAccounts}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <Spacer size={15} />}
            />
          )}

          <Spacer size={20} />

          <ExpoDocumentPickerComponent
            file={file}
            setFile={setFile}
            fileBase64={fileBase64}
            setFileBase64={setFileBase64}
          />

          <AppButton
            title="Submit"
            onPress={handleDeposit}
            isLoading={inProgress}
            buttonStyle="w-[92%] md:w-[50%] mx-auto bg-green my-4"
          />
        </ScrollView>

        {/* <CurrencyModal
          visible={isModalVisible}
          selectedCurrency={selectedCurrency}
          onClose={() => setModalVisible(false)}
          onSelect={(currency) => {
            setSelectedCurrency(currency);
            // setModalVisible(false);
          }}
        /> */}

        <FloatingButton />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  mainwrapper: {
    flex: 1,
    marginTop: responsiveHeight(3),
  },
  wrapper: {
    marginHorizontal: responsiveScreenWidth(4),
  },

  depositTo: {
    color: Colors.grayWhite,
    marginBottom: responsiveHeight(1.5),
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
  },
});

export default DepositScreen;
