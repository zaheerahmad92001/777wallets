import React from "react";
import { Text, View } from "react-native";
import AppButton from "./appButton";

type BalanceDepositProps = {
  amount: number | string;
  heading?: string;
  title?: string;
  onPress?: () => void;
};

const BalanceDeposit: React.FC<BalanceDepositProps> = ({
  amount,
  heading,
  title,
  onPress,
}) => {
  return (
    <View className="bg-headerColor rounded-xl w-[92%] mx-auto">
      <View className="flex-row items-center justify-between py-3 px-4">
        {/* Left Section */}
        <View className="gap-1">
          <Text className="text-white text-lg font-semibold">RS: {amount}</Text>
          {heading && (
            <Text className="text-gray-300 text-sm font-normal">{heading}</Text>
          )}
        </View>

        {/* Button Section */}
        {title && (
          <View className="w-[35%] md:w-[10%]">
            <AppButton
              onPress={onPress}
              title={title}
              buttonStyle="w-full bg-green py-2"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default BalanceDeposit;

// import { Colors } from "@/constants/Colors";
// import React from "react";
// import {
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextStyle,
//   View,
//   ViewStyle,
// } from "react-native";
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";

// type BalanceDepositProps = {
//   amount: number | string;
//   heading?: string;
//   title?: string;
//   onPress?: () => void;
// };

// const BalanceDeposit: React.FC<BalanceDepositProps> = ({
//   amount,
//   heading,
//   title,
//   onPress,
// }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.rowContainer}>
//         <View style={styles.columnContainer}>
//           <Text style={styles.amountText}>RS: {amount}</Text>
//           {heading && <Text style={styles.balanceText}>{heading}</Text>}
//         </View>

//         {title && (
//           <Pressable style={styles.buttonStyle} onPress={onPress}>
//             <Text style={styles.buttonText}>{title}</Text>
//           </Pressable>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.lightBlack,
//     borderRadius: responsiveWidth(Platform.OS==='web'?1.5:3),
//   } as ViewStyle,
//   rowContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: responsiveWidth(Platform.OS==='web'?1 : 4),
//     paddingHorizontal: responsiveWidth(4),
//   } as ViewStyle,
//   buttonStyle: {
//     backgroundColor: Colors.green,
//     paddingVertical: responsiveWidth(Platform.OS==='web'?1: 2),
//     width:responsiveWidth(Platform.OS==='web'?15: 20),
//     // paddingHorizontal: responsiveWidth(5),
//     borderRadius: responsiveWidth(2),
//   } as ViewStyle,
//   columnContainer: {
//     gap: responsiveHeight(1),
//   } as ViewStyle,
//   amountText: {
//     fontSize: responsiveFontSize(2),
//     fontWeight: "600",
//     color: Colors.grayWhite,
//   } as TextStyle,
//   balanceText: {
//     color: Colors.grayWhite,
//     fontSize: responsiveFontSize(1.5),
//     fontWeight: "400",
//   } as TextStyle,
//   buttonText: {
//     color: Colors.light.white,
//     fontSize: responsiveFontSize(1.7),
//     textAlign:'center',
//     fontWeight: "500",
//   } as TextStyle,
// });

// export default BalanceDeposit;
