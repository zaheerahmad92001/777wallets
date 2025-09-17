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
  datetime:string
  transStatus: string;
  onDelete?: () => void;
  onEdit?: () => void;
  containerStyle?: string;
  onViewImage?: () => void;
  onAccept: () => void;
  onReject: () => void;
  selectedStatus: string;
  isSelectedIndex:boolean;
}


const formatDateTime = (dateString:string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short", // Jan, Feb, Mar
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit", // optional
    hour12: true,      // 12-hour clock (set false for 24h)
  });
};
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
export default function NotificationsCard({
  accountNumber,
  accountTitle,
  imageUrl,
  accountType,
  amount,
  bankName,
  phoneNumber,
  transStatus,
  transactionType,
  username,
  datetime,
  onViewImage,
  onAccept,
  onReject,
  containerStyle,
  selectedStatus,
  isSelectedIndex,
}: PaymentsProps) {
  return (
    <View
      className={`bg-headerColor p-4 rounded-lg shadow-md mb-4 relative ${containerStyle}`}
    >


      {/* Column: Account holder + Account number + IBAN */}
      <View className="ml-1">
        <Text className="text-grayWhite text-base font-normal">
          Account Holder: {accountTitle}
        </Text>
        <Text className="text-grayWhite text-base font-normal">
          Account #: {accountNumber}
        </Text>
        <Text className="text-grayWhite text-base font-normal">
          Bank Name: {bankName}
        </Text>
        <Text className="text-grayWhite text-base font-normal">
          Account Type : {accountType}
        </Text>
        <Text className="text-grayWhite text-base font-normal">
          Amount: {amount}
        </Text>

        <Text className="text-grayWhite text-base font-normal">
          Username/ID: {username}
        </Text>

        <Text className="text-grayWhite text-base font-normal">
          Phone Number: {phoneNumber}
        </Text>

          <Text className="text-grayWhite text-base font-normal">
            Date & Time: {formatDateTime(datetime)} 
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
              {transactionType}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center mt-1">
          <Text className="text-grayWhite text-base font-normal mr-1">
            Transaction Status:
          </Text>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: getStatusColor(transStatus) }}
          >
            <Text className="text-white text-sm font-semibold">
              {transStatus}
            </Text>
          </View>
        </View>


        {/* Right-side View Image Button */}


{transactionType === "deposit" && (
  <View className="absolute top-4 right-4">
    <TouchableOpacity
      className="bg-gray-700 p-2 rounded-full"
      onPress={onViewImage}
    >
      <Ionicons name="image-outline" size={20} color="white" />
    </TouchableOpacity>
  </View>
)}


        {/* <View className="absolute top-4 right-4">
          <TouchableOpacity
            className="bg-gray-700 p-2 rounded-full"
            onPress={onViewImage}
          >
            <Ionicons name="image-outline" size={20} color="white" />
          </TouchableOpacity>
        </View> */}

        {/* Bottom Accept / Reject Buttons */}
        <View className="flex-row justify-between mt-4">
          {/* <TouchableOpacity
            className="flex-1 mr-2 py-2 rounded-lg"
            style={{ backgroundColor: Colors.green }}
            onPress={onAccept}
          >
            <Text className="text-white text-center font-semibold">
              Accept
            </Text>
          </TouchableOpacity> */}


          {/* <TouchableOpacity
          className="flex-1 mr-2 py-2 rounded-lg"
          style={{
          backgroundColor: transStatus === "accepted" ? "gray" : Colors.green,
          opacity: transStatus === "accepted" ? 0.6 : 1,
          }}
          disabled={transStatus === "accepted"} // ✅ disable if already accepted
          onPress={onAccept}
          >
          <Text className="text-white text-center font-semibold">Accept</Text>
        </TouchableOpacity> */}

          {/* <TouchableOpacity
            className="flex-1 ml-2 py-2 rounded-lg"
            style={{ backgroundColor: "red" }}
            onPress={onReject}
          >
            <Text className="text-white text-center font-semibold">
              Reject
            </Text>
          </TouchableOpacity> */}
          {/* <AppButton title="Accept" onPress={onAccept}
            buttonStyle="w-[40%] md:w-[20%] mx-auto bg-green mb-4 py-2"
            textStyle="text-white text-lg font-bold"
            isLoading={selectedStatus==='accepted' && isSelectedIndex}
            disabled={transStatus !== "pending"}
             bgColor={Colors.green}

          />

          <AppButton title="Reject" onPress={onReject} 
            buttonStyle="w-[40%] md:w-[20%] mx-auto bg-red mb-4 py-2"
            textStyle="text-white text-lg font-bold"
            isLoading={selectedStatus==='rejected' && isSelectedIndex}
            disabled={transStatus !== "pending"}
            bgColor={Colors.red}
            /> */}
          {/* <TouchableOpacity
              className="flex-1 ml-2 py-2 rounded-lg"
              style={{
              backgroundColor: transStatus === "rejected" ? "gray" : "red",
              opacity: transStatus === "rejected" ? 0.6 : 1,
              }}
              disabled={transStatus === "rejected"} // ✅ disable if already rejected
              onPress={onReject}
          >
            <Text className="text-white text-center font-semibold">Reject</Text>
          </TouchableOpacity> */}

        </View>
      </View>
    </View>
  );
}
