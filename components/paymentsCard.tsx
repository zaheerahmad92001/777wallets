// components/BankAccount.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface PaymentsProps {
  recepitimage: string; // bank logo URL
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  iban: string;
  transStatus:string;
  onDelete?: () => void;
  onEdit?: () => void;
  containerStyle?: string;
  onViewImage?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}


const getStatusColor = (status: string) => {
  switch (status) {
    case "accepted":
      return "green";
    case "rejected":
      return "red";
    case "pending":
      return "orange";
    default:
      return "gray";
  }
};
export default function PaymentsCard({
  recepitimage,
  bankName,

  accountHolder,
  accountNumber,
  transStatus,
  onViewImage,
  onAccept,
  onReject,
  containerStyle,
}: PaymentsProps) {
  return (
    <View
      className={`bg-headerColor p-4 rounded-lg shadow-md mb-4 relative ${containerStyle}`}
    >
      {/* <View className="flex-row items-center justify-between mb-3"> */}
        {/* <View className="flex-row items-center">
          <Image
            source={logo}
            //   className="w-12 h-12 rounded-full mr-3"
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
            resizeMode="contain"
          />
          <Text className="text-lg font-bold text-grayWhite">{bankName}</Text>
        </View> */}

        {/* <View className="flex-row space-x-2 gap-6 self-start">
          {onEdit && (
            <TouchableOpacity onPress={onEdit}>
              <Ionicons
                name="create-outline"
                size={20}
                color={Colors.grayWhite}
              />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete}>
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </View> */}

      {/* Column: Account holder + Account number + IBAN */}
      <View className="ml-1">
        <Text className="text-grayWhite text-base font-normal">
          Account Holder: {accountHolder}
        </Text>
        <Text className="text-grayWhite text-base font-normal">
          Account #: {accountNumber}
        </Text>
         <Text className="text-grayWhite text-base font-normal">
          Bank Name: {bankName}
        </Text>
        <Text className="text-grayWhite text-base font-normal">
          Amount: {"5000"}
        </Text>
        
        <Text className="text-grayWhite text-base font-normal">
          Username/ID: {"werwerert"}
        </Text>

        <Text className="text-grayWhite text-base font-normal">
         Phone Number: {"03323456789"}
        </Text>

   <View className="flex-row items-center mt-1">
          <Text className="text-grayWhite text-base font-normal mr-1">
            Transaction Type:
          </Text>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: Colors.green }}
          >
            <Text className="text-white text-sm font-semibold">
              {"Withdraw"}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center mt-1">
          <Text className="text-grayWhite text-base font-normal mr-1">
            Transaction Status:
          </Text>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: getStatusColor(transStatus)}}
          >
            <Text className="text-white text-sm font-semibold">
              {"accepted"}
            </Text>
          </View>
        </View>


 {/* Right-side View Image Button */}
        <View className="absolute top-4 right-4">
          <TouchableOpacity
            className="bg-gray-700 p-2 rounded-full"
            onPress={onViewImage}
          >
            <Ionicons name="image-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Bottom Accept / Reject Buttons */}
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            className="flex-1 mr-2 py-2 rounded-lg"
            style={{ backgroundColor: Colors.green }}
            onPress={onAccept}
          >
            <Text className="text-white text-center font-semibold">
              Accept
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 ml-2 py-2 rounded-lg"
            style={{ backgroundColor: "red" }}
            onPress={onReject}
          >
            <Text className="text-white text-center font-semibold">
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
