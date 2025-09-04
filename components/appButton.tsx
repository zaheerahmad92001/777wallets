import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Platform, Pressable, PressableProps } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

interface AppButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
  buttonStyle?: string | (string | undefined)[];
  textStyle?: string | (string | undefined)[];
  blink?: boolean;
  isLoading?:boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  blink = false,
  isLoading=false,
  ...rest
}) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (blink) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0, duration: 1000, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [blink]);

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-md items-center justify-center px-5 
        ${Platform.OS === "web" ? "py-3" : "py-3"} ${buttonStyle ?? ""}`}
      {...rest}
    >
      {isLoading ? 
      <ActivityIndicator color={Colors.green} size={'small'}/>:
      <Animated.Text
        style={[blink ? { opacity } : {}, {color:Colors.white,},
          Platform.OS==='web'? {fontSize:responsiveFontSize(1.2)}:{}
        ]}
        className={`text-white text-base font-bold ${textStyle ?? ""}`}
      >
        {title}
      </Animated.Text>
      }
    </Pressable>
  );
};

export default AppButton;


// // import { Colors } from "@/constants/Colors";
// // import React from "react";
// // import {
// //   Pressable,
// //   PressableProps,
// //   StyleSheet,
// //   Text,
// //   TextStyle,
// //   ViewStyle,
// // } from "react-native";
// // import { responsiveHeight } from "react-native-responsive-dimensions";

// // interface AppButtonProps extends PressableProps {
// //   title: string;
// //   onPress: () => void;
// //   buttonStyle?: ViewStyle | ViewStyle[];
// //   textStyle?: TextStyle | TextStyle[];
// // }

// // const AppButton: React.FC<AppButtonProps> = ({
// //   title,
// //   onPress,
// //   buttonStyle,
// //   textStyle,
// //   ...rest
// // }) => {
// //   return (
// //     <Pressable
// //       onPress={onPress}
// //       style={[styles.buttonContainer, buttonStyle]}
// //       {...rest}
// //     >
// //       <Text style={[styles.buttonText, textStyle]}>{title}</Text>
// //     </Pressable>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   buttonContainer: {
// //     backgroundColor: Colors.green,
// //     paddingVertical: responsiveHeight(1.7),
// //     paddingHorizontal: 20,
// //     borderRadius: 5,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   buttonText: {
// //     color: Colors.light.white,
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// // });

// // export default AppButton;

// import { Colors } from "@/constants/Colors";
// import React, { useEffect, useRef } from "react";
// import {
//   Animated,
//   Platform,
//   Pressable,
//   PressableProps,
//   StyleSheet,
//   TextStyle,
//   ViewStyle
// } from "react-native";
// import { responsiveHeight } from "react-native-responsive-dimensions";

// interface AppButtonProps extends PressableProps {
//   title: string;
//   onPress: () => void;
//   buttonStyle?: ViewStyle | ViewStyle[];
//   textStyle?: TextStyle | TextStyle[];
//   blink?: boolean; // 👈 new prop to enable blinking
// }

// const AppButton: React.FC<AppButtonProps> = ({
//   title,
//   onPress,
//   buttonStyle,
//   textStyle,
//   blink = false,
//   ...rest
// }) => {
//   const opacity = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     if (blink) {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(opacity, {
//             toValue: 0,
//             duration: 1000,
//             useNativeDriver: true,
//           }),
//           Animated.timing(opacity, {
//             toValue: 1,
//             duration: 500,
//             useNativeDriver: true,
//           }),
//         ])
//       ).start();
//     }
//   }, [blink]);

//   return (
//     <Pressable
//       onPress={onPress}
//       style={[styles.buttonContainer, buttonStyle]}
//       {...rest}
//     >
//       <Animated.Text
//         style={[styles.buttonText, textStyle, blink && { opacity }]}
//       >
//         {title}
//       </Animated.Text>
//     </Pressable>
//   );
// };

// const styles = StyleSheet.create({
//   buttonContainer: {
//     backgroundColor: Colors.green,
//     paddingVertical: responsiveHeight(Platform.OS==='web'? 2.7:1.7),
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: Colors.light.white,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default AppButton;
