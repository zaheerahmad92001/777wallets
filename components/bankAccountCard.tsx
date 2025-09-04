// components/BankAccount.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface BankAccountProps {
  logo: string; // bank logo URL
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  iban: string;
  onDelete?: () => void;
  onEdit?: () => void;
  containerStyle?:string
}

export default function BankAccountCard({
  logo,
  bankName,
  accountHolder,
  accountNumber,
  iban,
  onDelete,
  onEdit,
  containerStyle
}: BankAccountProps) {
  return (
    <View className={`bg-headerColor p-4 rounded-lg shadow-md mb-4 relative ${containerStyle}`}>
      {/* Action icons (Edit + Delete) */}
      <View className="absolute right-3 top-3 flex-row space-x-2 gap-6">
        {onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Ionicons name="create-outline" size={20} color={Colors.grayWhite} />
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name="trash-outline" size={20} color="red" />
          </TouchableOpacity>
        )}
      </View>

      {/* Row: Bank logo + Bank name */}
      <View className="flex-row items-center mb-3">
        <Image
          source={logo}
        //   className="w-12 h-12 rounded-full mr-3"
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
          resizeMode="contain"
        />
        <Text className="text-lg font-bold text-grayWhite">{bankName}</Text>
      </View>

      {/* Column: Account holder + Account number + IBAN */}
      <View className="ml-1">
        <Text className="text-grayWhite text-base font-normal">Account Holder: {accountHolder}</Text>
        <Text className="text-grayWhite text-base font-normal">Account #: {accountNumber}</Text>
        <Text className="text-grayWhite text-base font-normal">IBAN: {iban}</Text>
      </View>
    </View>
  );
}
