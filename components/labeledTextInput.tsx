import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

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
  secureTextEntry,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(!!secureTextEntry); // track password visibility
  const hasError = !!errorText;

  return (
    <View className={`${containerStyle ?? ""}`}>
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
          borderColor: hasError ? errorColor : borderColor, // 👈 no active border color
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
                : "text-grayWhite"
            } ${labelStyle ?? ""} ${
              Platform.OS === "web" ? "text-sm" : "text-base"
            }`}
          >
            {label}
          </Text>
        </View>

        {/* TextInput with optional eye icon */}
        <TextInput
          className={`text-base text-grayWhite py-3 px-4 pr-10 ${inputStyle ?? ""}`}
          style={{
            outlineStyle: "dashed",
            outlineWidth: 0,
          }}
          secureTextEntry={isSecure}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />

        {/* 👁 Eye toggle (only for password fields) */}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={{ position: "absolute", right: 12, top: 14 }}
          >
            <Entypo
              name={isSecure ? "eye-with-line" : "eye"}
              size={20}
              color="#ccc"
            />
          </TouchableOpacity>
        )}
      </View>

      {errorText && (
        <Text className="mt-1 text-xs text-red-600">{errorText}</Text>
      )}
    </View>
  );
};

export default LabeledTextInput;









// import React, { useState } from "react";
// import { Platform, Text, TextInput, TextInputProps, View } from "react-native";

// type LabeledInputProps = TextInputProps & {
//   title?: string;
//   label: string;
//   containerStyle?: string; // Tailwind class
//   inputStyle?: string;
//   labelStyle?: string;
//   errorText?: string;
//   backgroundColor?: string;
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
//   backgroundColor = "#fff",
//   borderColor = "rgb(164,168,173)",
//   activeBorderColor = "#007AFF",
//   errorColor = "#D32F2F",
//   onFocus,
//   onBlur,
//   ...rest
// }) => {
//   const [focused, setFocused] = useState(false);
//   const hasError = !!errorText;

//   return (
//     <View className={`${containerStyle ?? ""}`}>
//       {title && (
//         <Text
//           className={`text-grayWhite font-medium mb-2 ${labelStyle ?? ""} ${
//             Platform.OS === "web" ? "text-sm" : "text-base"
//           }`}
//         >
//           {title}
//         </Text>
//       )}

//       <View
//         className="relative rounded-lg border"
//         style={{
//           borderWidth: 1.5,
//           borderColor: hasError
//             ? errorColor
//             : focused
//             ? activeBorderColor
//             : borderColor,
//           backgroundColor: backgroundColor,
//         }}
//       >
//         {/* Floating label */}
//         <View
//           className="absolute px-1 z-10"
//           style={{
//             top: -10,
//             left: 12,
//             backgroundColor,
//           }}
//         >
//           <Text
//             className={`font-semibold ${
//               hasError
//                 ? "text-red-600"
//                 : focused
//                 ? "text-blue-500"
//                 : "text-grayWhite"
//             } ${labelStyle ?? ""} ${Platform.OS === "web" ? "text-sm" : "text-base"}`}
//           >
//             {label}
//           </Text>
//         </View>

//         <TextInput
//           className={`text-base text-grayWhite py-3 px-4 ${inputStyle ?? ""}`}
//           style={{
//             outlineStyle:'dashed',
//             outlineWidth:0,
//           }}
//           // onFocus={(e) => {
//           //   setFocused(true);
//           //   onFocus?.(e);
//           // }}
//           // onBlur={(e) => {
//           //   setFocused(false);
//           //   onBlur?.(e);
//           // }}
//           {...rest}
//         />
//       </View>

//       {errorText && <Text className="mt-1 text-xs text-red-600">{errorText}</Text>}
//     </View>
//   );
// };

// export default LabeledTextInput;



