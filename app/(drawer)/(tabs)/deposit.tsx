import AccountSelector from "@/components/accountSelector";
import CurrencyModal from "@/components/currencyModal";
import ExpoDocumentPickerComponent from "@/components/documentSelector";
import LabeledButton from "@/components/labeledInputButton";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { PickedFile } from "@/constants/types";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import Toast from "react-native-toast-message";

const DepositScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<
    "RS" | "USDT" | null
  >(null);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [copiedValue, setCopiedValue] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [file, setFile] = useState<PickedFile | null>(null);

  const handleCopy = (value: string) => {
    setCopiedValue(value);
    Toast.show({
      type: "success",
      text1: "Copy",
      text2: "Account Copied",
    });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainwrapper}>
        {/* <AppHeader userName="Deposit" onPress={() => navigation.openDrawer()} /> */}

        <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
          <Spacer size={20} />

          {/* <Text style={styles.selectCurrency}>{"Username/ID"}</Text> */}
          <LabeledTextInput
            title="Username/ID"
            label="Username/ID"
            placeholder="Enter Username/ID"
            placeholderTextColor={Colors.grayWhite}
            keyboardType="default"
            autoCapitalize="none"
            backgroundColor={Colors.bg}
            containerStyle={styles.inputContainer}
            // labelStyle={{ color: Colors.lightWhite }}
          />
          <Spacer size={15} />
          <LabeledButton
            onPress={() => setModalVisible(true)}
            label="Currency"
            value={selectedCurrency ? selectedCurrency : "Select Currency"}
            backgroundColor={Colors.bg}
            inputStyle={{ paddingVertical: 4 }}
            labelStyle={{ color: Colors.grayWhite }}
            containerStyle={styles.inputContainer}
          />

          <Spacer size={15} />

          {/* <Text style={styles.selectCurrency}>
            {"Minimum Amount is RS:500 with 3% Bonus"}
          </Text> */}
          <LabeledTextInput
            title="Minimum Amount is RS:500 with 3% Bonus"
            label="Amount"
            placeholder="Enter amount"
            placeholderTextColor={Colors.grayWhite}
            keyboardType="numeric"
            autoCapitalize="none"
            backgroundColor={Colors.bg}
            containerStyle={styles.inputContainer}
            // labelStyle={{ color: Colors.lightWhite }}
          />

          <Spacer size={20} />
          <View style={styles.inputContainer}>
            <Text style={styles.depositTo}>{"Select Deposit Method"}</Text>
          </View>
          <AccountSelector
            bankImage={require("../../../assets/images/easyPaisa.png")}
            bankName="EasyPaisa"
            accountNumber="1234567890"
            accountTitle="Zaheer Ahmed"
            selected={selectedAccount === "1234567890"}
            onSelect={() => setSelectedAccount("1234567890")}
            onCopy={() => handleCopy("1234 5678 9012")}
          />
          <Spacer size={15} />
          <AccountSelector
            bankImage={require("../../../assets/images/ubl.png")}
            bankName="UBL Bank"
            accountNumber="9876543210"
            accountTitle="Ali Khan"
            selected={selectedAccount === "9876543210"}
            onSelect={() => setSelectedAccount("9876543210")}
            onCopy={() => handleCopy("1234 5678 9012")}
          />
          <Spacer size={15} />
          <AccountSelector
            bankName="Jazz Cash"
            bankImage={require("../../../assets/images/jazzCash.png")}
            accountNumber="9876543212"
            accountTitle="Ali Khan"
            selected={selectedAccount === "9876543212"}
            onSelect={() => setSelectedAccount("9876543212")}
            onCopy={() => handleCopy("1234 5678 9012")}
          />
          <Spacer size={20} />

          <ExpoDocumentPickerComponent file={file} setFile={setFile} />
        </ScrollView>

        <CurrencyModal
          visible={isModalVisible}
          selectedCurrency={selectedCurrency}
          onClose={() => setModalVisible(false)}
          onSelect={(currency) => {
            setSelectedCurrency(currency);
            // setModalVisible(false);
          }}
        />
        {/* <Button title="Open Drawer" onPress={() => navigation.openDrawer()} /> */}
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
    // marginBottom:responsiveHeight(1),
  },
  selectCurrency: {
    color: Colors.grayWhite,
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(1.8),
    fontWeight: "500",
  },
  depositTo: {
    color: Colors.grayWhite,
    marginBottom: responsiveHeight(1.5),
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
  },
  inputContainer: {
    width: responsiveScreenWidth(Platform.OS === "web" ? 50 : 90),
    alignSelf: "center",
  },
});

export default DepositScreen;
