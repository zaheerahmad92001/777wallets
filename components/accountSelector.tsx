import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AccountSelectorProps {
  bankImage: any;
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
    <Pressable
      onPress={onSelect}
      className={`w-[90%] md:w-[50%] flex-row items-center rounded-lg border border-grayWhite px-4 py-3 self-center`}>
      {/* Bank Image */}
      <Image
        source={bankImage}
        className="mr-3 rounded-lg"
        style={{
          width: Platform.OS === "web" ? 60 : 60,
          height: Platform.OS === "web" ? 60 : 60,
        }}
        resizeMode="contain"
      />

      {/* Account Details */}
      <View className="flex-1 justify-center">
        <Text
          className="text-grayWhite font-medium mb-1"
          style={{ fontSize: Platform.OS === "web" ? 14 : 18 }}
        >
          {bankName}
        </Text>

        <View className="flex-row items-center">
          <Text
            className="text-grayWhite font-medium"
            style={{ fontSize: Platform.OS === "web" ? 12 : 16 }}
          >
            {`Acc#: ${accountNumber}`}
          </Text>
          <TouchableOpacity onPress={onCopy} className="ml-2">
            <Ionicons name="copy-outline" size={18} color={Colors.grayWhite} />
          </TouchableOpacity>
        </View>

        <Text
          className="text-grayWhite font-medium mt-0.5"
          style={{ fontSize: Platform.OS === "web" ? 12 : 16 }}
        >
          {`Acc Title#: ${accountTitle}`}
        </Text>
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