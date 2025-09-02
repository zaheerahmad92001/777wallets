import React, { useState } from "react";
import { Platform, Text, TextInput, TextInputProps, View } from "react-native";

type LabeledInputProps = TextInputProps & {
  title?: string;
  label: string;
  containerStyle?: string; // Tailwind class
  inputStyle?: string;
  labelStyle?: string;
  errorText?: string;
  backgroundColor?: string;
  borderColor?: string;
  activeBorderColor?: string;
  errorColor?: string;
};

const LabeledTextInput: React.FC<LabeledInputProps> = ({
  title,
  label,
  containerStyle,
  inputStyle,
  labelStyle,
  errorText,
  backgroundColor = "#fff",
  borderColor = "rgb(164,168,173)",
  activeBorderColor = "#007AFF",
  errorColor = "#D32F2F",
  onFocus,
  onBlur,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const hasError = !!errorText;

  return (
    <View className={`w-full ${containerStyle ?? ""}`}>
      {title && (
        <Text
          className={`text-grayWhite font-medium mb-2 ${labelStyle ?? ""} ${
            Platform.OS === "web" ? "text-sm" : "text-base"
          }`}
        >
          {title}
        </Text>
      )}

      <View
        className="relative rounded-lg border"
        style={{
          borderWidth: 1.5,
          borderColor: hasError
            ? errorColor
            : focused
            ? activeBorderColor
            : borderColor,
          backgroundColor: backgroundColor,
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
              hasError
                ? "text-red-600"
                : focused
                ? "text-blue-500"
                : "text-grayWhite"
            } ${labelStyle ?? ""} ${Platform.OS === "web" ? "text-sm" : "text-base"}`}
          >
            {label}
          </Text>
        </View>

        <TextInput
          className={`text-base text-grayWhite py-3 px-4 ${inputStyle ?? ""}`}
          style={{
            outlineStyle:'dashed',
            outlineWidth:0,
          }}
          // onFocus={(e) => {
          //   setFocused(true);
          //   onFocus?.(e);
          // }}
          // onBlur={(e) => {
          //   setFocused(false);
          //   onBlur?.(e);
          // }}
          {...rest}
        />
      </View>

      {errorText && <Text className="mt-1 text-xs text-red-600">{errorText}</Text>}
    </View>
  );
};

export default LabeledTextInput;




// import { Colors } from "@/constants/Colors";
// import React, { useState } from "react";
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TextInputProps,
//   TextStyle,
//   View,
//   ViewStyle,
// } from "react-native";
// import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

// type LabeledInputProps = TextInputProps & {
//   title?:string;
//   label: string;
//   containerStyle?: ViewStyle;
//   inputStyle?: TextStyle;
//   labelStyle?: TextStyle;
//   errorText?: string;
//   backgroundColor?: string; // background behind the label to mask the border
//   borderColor?: string;
//   activeBorderColor?: string;
//   errorColor?: string;
// };

// const LabeledTextInput: React.FC<LabeledInputProps> = ({
//   title,
//   label,
//   containerStyle,
//   inputStyle,
//   labelStyle,
//   errorText,
//   backgroundColor = "#FFFFFF",
//   borderColor = Colors.grayWhite,
//   activeBorderColor = "#007AFF",
//   errorColor = "#D32F2F",
//   onFocus,
//   onBlur,
//   ...rest
// }) => {
//   const [focused, setFocused] = useState(false);
//   const hasError = !!errorText;

//   return (
//     <View style={[styles.wrapper, containerStyle]}>
//       {/* Border container */}
//       {title &&
//        <Text style={styles.selectCurrency}>{title}</Text>
//        }
//       <View
//         style={[
//           styles.container,
//           { borderColor: hasError ? errorColor : focused ? activeBorderColor : borderColor },
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
//               { color: hasError ? errorColor : focused ? activeBorderColor : Colors.grayWhite },
//               labelStyle,
//             ]}
//           >
//             {label}
//           </Text>
//         </View>

//         {/* Input */}
//         <TextInput
//           style={[styles.input, inputStyle]}
//           // onFocus={(e) => {
//           //   setFocused(true);
//           //   onFocus?.(e);
//           // }}
//           onBlur={(e) => {
//             setFocused(false);
//             onBlur?.(e);
//           }}
//           {...rest}
//         />
//       </View>

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
//   container: {
//     position: "relative",
//     borderWidth: 1.5,
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//   },
//   labelWrap: {
//     position: "absolute",
//     top: -10,       // lifts label above the border
//     left: 12,
//     paddingHorizontal: 6, // background padding so border is hidden behind
//     zIndex: 1,
//   },
//   label: {
//     fontSize: Platform.OS==='web'? 12:14,
//     fontWeight: "600",
//     color:'red'
//   },
//   input: {
//     fontSize: 16,
//     paddingVertical: 4,
//     outlineStyle:'dashed',
//     outlineWidth:0,
//     color:Colors.grayWhite, 
//   },
//   helperText: {
//     marginTop: 6,
//     fontSize: 12,
//   },
//   selectCurrency:{
//       color: Colors.grayWhite,
//       marginBottom: responsiveHeight(Platform.OS ==='web'? 2.5 : 2.2),
//       fontSize: responsiveFontSize(Platform.OS==='web'?1.2: 1.8),
//       fontWeight: "500",
//     },
// });

// export default LabeledTextInput;
