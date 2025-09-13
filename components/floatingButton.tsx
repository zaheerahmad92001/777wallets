// components/FloatingButton.tsx
import { fetchWhatsApp } from "@/redux/actions/authActions";
import { AppDispatch, RootState } from "@/redux/store";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Alert, Linking, Platform, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface FloatingButtonProps {
  onPress?: () => void;
  icon?: React.ReactNode; // Pass icon element from parent
}

const handleContactUs = (whatsApp: string) => {
  let phoneNumber = whatsApp;
  let message =
    "Thank you for contacting us. Kindly let us know how we may assist you further.";
  let url = "";
  if (Platform.OS === "web") {
    url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  } else {
    url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
  }
  Linking.openURL(url).catch(() => {
    Alert.alert("Error", "Make sure WhatsApp is installed on your device");
  });
};

export default function FloatingButton({ onPress, icon }: FloatingButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { contactNumber ,websiteURL } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(fetchWhatsApp())
      .unwrap()
      .catch((error) => {
        console.log("Failed to fetch WhatsApp number:", error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity
      className="absolute bottom-6 right-6 bg-green rounded-full w-14 h-14 items-center justify-center shadow-lg"
      onPress={() => {onPress?
        onPress() : handleContactUs(contactNumber?.whatsAppNumber);
      }}
    >
      {icon ? icon : <Entypo name="chat" size={24} color="#fff" />}
    </TouchableOpacity>
  );
}

// // components/FloatingButton.tsx
// import { Entypo, Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { Alert, Linking, TouchableOpacity } from "react-native";

// interface FloatingButtonProps {
//   onPress?: () => void;
//   addUser?: boolean; // new prop
// }

// const handleContactUs = () => {
//   let phoneNumber = "+923001234567";
//   let message =
//     "Thank you for contacting us. Kindly let us know how we may assist you further.";

//   let url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
//     message
//   )}`;

//   Linking.openURL(url).catch(() => {
//     Alert.alert("Error", "Make sure WhatsApp is installed on your device");
//   });
// };

// export default function FloatingButton({
//   onPress,
//   addUser = false,
// }: FloatingButtonProps) {
//   return (
//     <TouchableOpacity
//       className="absolute bottom-6 right-6 bg-green rounded-full w-14 h-14 items-center justify-center shadow-lg"
//       onPress={addUser ? onPress : handleContactUs}
//     >
//       {addUser ? (
//         <Ionicons name="person-add" size={24} color="#fff" />
//       ) : (
//         <Entypo name="chat" size={24} color="#fff" />
//       )}
//     </TouchableOpacity>
//   );
// }
