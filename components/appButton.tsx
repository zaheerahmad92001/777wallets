import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  Pressable,
  PressableProps,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

interface AppButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
  buttonStyle?: string | (string | undefined)[];
  textStyle?: string | (string | undefined)[];
  blink?: boolean;
  isLoading?: boolean;
  disabled?: boolean; // ✅ added
  bgColor?:string;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  blink = false,
  isLoading = false,
  disabled = false, // ✅ default false
  bgColor=Colors.green,
  ...rest
}) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (blink && !disabled) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [blink, disabled]);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled} // ✅ block press when disabled
      className={`rounded-md items-center justify-center px-5 
        ${Platform.OS === "web" ? "py-3" : "py-3"} ${buttonStyle ?? ""}`}
      style={{
        backgroundColor: disabled ? "gray" : bgColor?bgColor:undefined, // ✅ force gray background
        opacity: disabled ? 0.5 : 1, // ✅ lower opacity if disabled
      }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.white} size={"small"} />
      ) : (
        <Animated.Text
          style={[
            blink && !disabled ? { opacity } : {}, // only blink if not disabled
            { color: Colors.white },
            Platform.OS === "web" ? { fontSize: responsiveFontSize(1.2) } : {},
          ]}
          className={`text-white text-base font-bold ${textStyle ?? ""}`}
        >
          {title}
        </Animated.Text>
      )}
    </Pressable>
  );
};

export default AppButton;



// import { Colors } from "@/constants/Colors";
// import React, { useEffect, useRef } from "react";
// import { ActivityIndicator, Animated, Platform, Pressable, PressableProps } from "react-native";
// import { responsiveFontSize } from "react-native-responsive-dimensions";

// interface AppButtonProps extends PressableProps {
//   title: string;
//   onPress: () => void;
//   buttonStyle?: string | (string | undefined)[];
//   textStyle?: string | (string | undefined)[];
//   blink?: boolean;
//   isLoading?:boolean;
// }

// const AppButton: React.FC<AppButtonProps> = ({
//   title,
//   onPress,
//   buttonStyle,
//   textStyle,
//   blink = false,
//   isLoading=false,
//   ...rest
// }) => {
//   const opacity = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     if (blink) {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(opacity, { toValue: 0, duration: 1000, useNativeDriver: true }),
//           Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
//         ])
//       ).start();
//     }
//   }, [blink]);

//   return (
//     <Pressable
//       onPress={onPress}
//       className={`rounded-md items-center justify-center px-5 
//         ${Platform.OS === "web" ? "py-3" : "py-3"} ${buttonStyle ?? ""}`}
//       {...rest}
//     >
//       {isLoading ? 
//       <ActivityIndicator color={Colors.white} size={'small'}/>:
//       <Animated.Text
//         style={[blink ? { opacity } : {}, {color:Colors.white,},
//           Platform.OS==='web'? {fontSize:responsiveFontSize(1.2)}:{}
//         ]}
//         className={`text-white text-base font-bold ${textStyle ?? ""}`}
//       >
//         {title}
//       </Animated.Text>
//       }
//     </Pressable>
//   );
// };

// export default AppButton;
