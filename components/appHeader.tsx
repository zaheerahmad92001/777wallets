// // components/AppHeader.tsx
// import { Colors } from "@/constants/Colors";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "expo-router";
// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// interface AppHeaderProps {
//   title: string;
//   onMenuPress?: () => void;
//   onBackPress?: () => void;
//   showNotification?: boolean; 
//   onNotificationPress?: () => void; 
// }

// export default function AdminHeader({ 
//   title, 
//   onMenuPress ,
//   onBackPress ,
//   showNotification = false,
//   onNotificationPress,
// }: AppHeaderProps) {
//   const navigation = useNavigation();

//   return (
//     <View className="flex-row items-center justify-between px-4 py-3 bg-bg shadow-md">
//       {/* Back Button */}
//       <TouchableOpacity
//         onPress={() => {
//           if (onBackPress && typeof onBackPress==='function' ) {
//             onBackPress();
//           } else {
//             navigation.goBack();
//           }
//         }}
//       >
//         <Ionicons name="arrow-back" size={24} color={Colors.grayWhite} />
//       </TouchableOpacity>

//       {/* Title */}
//       <Text className="text-xl font-extrabold text-grayWhite">{title}</Text>

//       {/* Notification Icon */}
//       <TouchableOpacity onPress={onMenuPress}>
//         <Ionicons name="menu" size={24} color={Colors.grayWhite} />
//       </TouchableOpacity>
//     </View>
//   );
// }


import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AppHeaderProps {
  title: string;
  onMenuPress?: () => void;
  onBackPress?: () => void;
  showBackButton?: boolean; // 👈 new prop
  showNotification?: boolean; // 👈 existing prop
  onNotificationPress?: () => void;
}

export default function AdminHeader({
  title,
  onMenuPress,
  onBackPress,
  showBackButton = true, // 👈 default true
  showNotification = false,
  onNotificationPress,
}: AppHeaderProps) {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-bg shadow-md">
      {/* Back Button (optional) */}
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => {
            if (onBackPress && typeof onBackPress === "function") {
              onBackPress();
            } else {
              navigation.goBack();
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.grayWhite} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} /> // 👈 keeps spacing consistent
      )}

      {/* Title */}
      <Text className="text-xl font-extrabold text-grayWhite">{title}</Text>

      {/* Right Icon: Notification OR Menu */}
      {showNotification ? (
        <TouchableOpacity
          onPress={() => {
            if (onNotificationPress) {
              onNotificationPress();
            } else {
              navigation.navigate("notifications" as never);
            }
          }}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.grayWhite}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu" size={24} color={Colors.grayWhite} />
        </TouchableOpacity>
      )}
    </View>
  );
}
