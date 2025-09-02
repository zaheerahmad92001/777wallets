import { Colors } from "@/constants/Colors";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";

type LabeledInputButton = {
  label: string;
  value: string;
  containerStyle?: string; // Tailwind class
  inputStyle?: string;
  labelStyle?: string;
  errorText?: string;
  backgroundColor?: string;
  borderColor?: string;
  activeBorderColor?: string;
  errorColor?: string;
  onPress: () => void;
};

const LabeledButton: React.FC<LabeledInputButton> = ({
  label,
  value,
  containerStyle,
  inputStyle,
  labelStyle,
  errorText,
  backgroundColor = Colors.bg,
  borderColor = Colors.grayWhite,
  errorColor = "#D32F2F",
  onPress,
}) => {
  const hasError = !!errorText;

  return (
    <View className={`${containerStyle ?? ""}`}>
      <Text
        className={`text-grayWhite font-medium mb-2 ${
          Platform.OS === "web" ? "text-sm" : "text-base"
        }`}
      >
        Select Currency
      </Text>

      <Pressable
        onPress={onPress}
        className={`relative rounded-lg border px-4 py-3 ${
          hasError ? "border-red-600" : "border-grayWhite"
        }`}
        style={{
          borderColor: hasError ? errorColor : borderColor,
          backgroundColor,
        }}
      >
        {/* Floating label */}
        <View
          className="absolute px-1 z-10"
          style={{
            top: -10,
            left: 12,
            backgroundColor,
          }}
        >
          <Text
            className={`font-semibold ${
              hasError ? "text-red-600" : "text-grayWhite"
            } ${labelStyle ?? ""} ${
              Platform.OS === "web" ? "text-sm" : "text-base"
            }`}
          >
            {label}
          </Text>
        </View>

        {/* Value display */}
        <View className={`pt-1 ${inputStyle ?? ""}`}>
          <Text className="text-grayWhite text-base">{value}</Text>
        </View>
      </Pressable>

      {hasError && (
        <Text className="mt-1 text-xs text-red-600">{errorText}</Text>
      )}
    </View>
  );
};

export default LabeledButton;


// import { Colors } from "@/constants/Colors";
// import React from "react";
// import {
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInputProps,
//   TextStyle,
//   View,
//   ViewStyle
// } from "react-native";
// import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

// type LabeledInputButton = TextInputProps & {
//   label: string;
//   containerStyle?: ViewStyle;
//   inputStyle?: TextStyle;
//   labelStyle?: TextStyle;
//   errorText?: string;
//   backgroundColor?: string;
//   borderColor?: string;
//   activeBorderColor?: string;
//   errorColor?: string;
//   onPress: () => void;
//   value:string;


// };

// const LabeledButton: React.FC<LabeledInputButton> = ({
//   label,
//   containerStyle,
//   inputStyle,
//   labelStyle,
//   errorText,
//   backgroundColor = "#FFFFFF",
//   borderColor = Colors.grayWhite,
//   activeBorderColor = "#007AFF",
//   errorColor = "#D32F2F",
//   onPress,
//   value
// }) => {
//   const hasError = !!errorText;

//   return (
//     <View style={[styles.wrapper, containerStyle]}>
//       {/* Border container */}
//       <Text style={styles.selectCurrency}>{'Select Currency'}</Text>
//       <Pressable
//         onPress={() => onPress() }
//         style={[
//           styles.container,
//           { borderColor: hasError ? errorColor : borderColor },
//         ]}
//       >
//         {/* Label overlapping the top-left border */}
//         <View
//           style={[
//             styles.labelWrap,
//             { backgroundColor },
//           ]}
//         >
//           <Text
//             style={[
//               styles.label,
//               { color: hasError ? errorColor : Colors.grayWhite },
//               labelStyle,
//             ]}
//           >
//             {label}
//           </Text>
//         </View>

//         {/* Input */}
//         <View style={[styles.input, inputStyle]}>
//           <Text style={{fontSize:16, color:Colors.grayWhite}}>{value}</Text>
//         </View>
//       </Pressable>

//       {/* Helper / Error */}
//       {!!errorText && (
//         <Text style={[styles.helperText, { color: errorColor }]}>{errorText}</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     width: "100%",
//   },
//   selectCurrency:{
//     color: Colors.grayWhite,
//    marginBottom: responsiveHeight(Platform.OS ==='web'? 2.5 : 2.2),
//    fontSize: responsiveFontSize(Platform.OS==='web'?1.2: 1.8),
//    fontWeight: "500",
//   },
//   container: {
//     position: "relative",
//     borderWidth: 1.5,
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//   },
//   labelWrap: {
//     position: "absolute",
//     top: -10,
//     left: 12,
//     paddingHorizontal: 6,
//     zIndex: 1,
//   },
//   label: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: Colors.lightWhite,
//   },
//   input: {
//     paddingVertical: 4,
//   },
//   helperText: {
//     marginTop: 6,
//     fontSize: 12,
//   },
// });

// export default LabeledButton;
