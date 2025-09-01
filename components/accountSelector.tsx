import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize, responsiveScreenWidth } from "react-native-responsive-dimensions";

interface AccountSelectorProps {
  bankImage: any; // require("../assets/bank.png") or { uri: "..." }
  accountNumber: string;
  bankName: string;
  accountTitle: string;
  selected: boolean;
  onSelect: () => void;
  onCopy: () => void;
}

const AccountSelector: React.FC<AccountSelectorProps> = ({
  bankImage,
  bankName,
  accountNumber,
  accountTitle,
  selected,
  onSelect,
  onCopy,
}) => {
  return (
    <Pressable style={styles.container} onPress={onSelect}>
      {/* Bank Image */}
      <Image source={bankImage} style={styles.bankImage} resizeMode="contain" />

      {/* Account Details */}
      <View style={styles.accountDetails}>
        <Text style={styles.bankName}>{bankName}</Text>
        <View style={styles.accountRow}>
          <Text style={styles.accountNumber}>{`Acc#: ${accountNumber}`}</Text>
          <TouchableOpacity onPress={onCopy} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={18} color={Colors.grayWhite} />
          </TouchableOpacity>
        </View>
        <Text style={styles.accountTitle}>{`Acc Title#: ${accountTitle}`}</Text>
      </View>

      {/* Radio Button */}
      <Ionicons
        name={selected ? "radio-button-on" : "radio-button-off"}
        size={22}
        color="#007AFF"
      />
    </Pressable>
  );
};

export default AccountSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius:10,
    borderWidth: 1,
    borderColor: "#ddd",
    width: responsiveScreenWidth(Platform.OS === "web" ? 50 : 90),
     alignSelf: "center",
  },
  bankImage: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius:10,
  },
  accountDetails: {
    flex: 1,
    justifyContent: "center",
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountNumber: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: "500",
    color: Colors.grayWhite,
  },
  copyButton: {
    marginLeft: 8,
  },
  accountTitle: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: "500",
    color: Colors.grayWhite,
    marginTop: 2,
  },
  bankName:{
    fontSize: responsiveFontSize(2.2),
    fontWeight: "500",
    color: Colors.grayWhite,
    marginBottom: 4,
  }
});
