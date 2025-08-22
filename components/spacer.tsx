import React from "react";
import { View } from "react-native";

type SpacerProps = {
  size?: number;   
  horizontal?: boolean;
};

const Spacer: React.FC<SpacerProps> = ({ size = 10, horizontal = false }) => {
  return <View style={horizontal ? { width: size } : { height: size }} />;
};

export default Spacer;
