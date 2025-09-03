// components/FloatingButton.tsx
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Alert, Linking, TouchableOpacity } from "react-native";

interface FloatingButtonProps {
  onPress?: () => void;
  icon?: string;
}

 const handleContactUs=()=>{
    let phoneNumber = "+923001234567";
    let message = "Thank you for contacting us. Kindly let us know how we may assist you further.";

    let url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Make sure WhatsApp is installed on your device");
    });
  }

export default function FloatingButton({
  onPress,
  icon = "chatbubble-ellipses",
}: FloatingButtonProps) {
  return (
    <TouchableOpacity
      className="absolute bottom-6 right-6 bg-green rounded-full w-14 h-14 items-center justify-center shadow-lg"
      onPress={handleContactUs}
    >
      {/* <MaterialIcons name={icon as any} size={28} color="#fff" /> */}
      <Entypo name="chat" size={24} color={"#fff"} />
    </TouchableOpacity>
  );
}
