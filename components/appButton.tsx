import { Colors } from "@/constants/Colors";
import React from "react";
import {
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";

interface AppButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  ...rest
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonContainer, buttonStyle]}
      {...rest}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.green,
    paddingVertical: responsiveHeight(1.7),
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppButton;
