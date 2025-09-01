// toastConfig.tsx
import { Colors } from "@/constants/Colors"; // your colors
import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

// Custom Toast styles
export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: Colors.green, backgroundColor: Colors.green }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
      text2Style={{ fontSize: 14, color: "white" }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: Colors.red, backgroundColor: Colors.red }}
      text1Style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
      text2Style={{ fontSize: 14, color: "white" }}
    />
  ),
};
