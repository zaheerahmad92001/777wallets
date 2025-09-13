import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="small" color={Colors.green} />
    </View>
  );
};

export default Loader;
