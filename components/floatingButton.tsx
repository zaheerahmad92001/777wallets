
// components/FloatingButton.tsx
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Alert, Linking, TouchableOpacity } from "react-native";

interface FloatingButtonProps {
  onPress?: () => void;
  icon?: React.ReactNode; // Pass icon element from parent
}

const handleContactUs = () => {
  let phoneNumber = "+923001234567";
  let message =
    "Thank you for contacting us. Kindly let us know how we may assist you further.";

  let url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  Linking.openURL(url).catch(() => {
    Alert.alert("Error", "Make sure WhatsApp is installed on your device");
  });
};

export default function FloatingButton({
  onPress,
  icon,
}: FloatingButtonProps) {
  return (
    <TouchableOpacity
      className="absolute bottom-6 right-6 bg-green rounded-full w-14 h-14 items-center justify-center shadow-lg"
      onPress={onPress || handleContactUs}
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