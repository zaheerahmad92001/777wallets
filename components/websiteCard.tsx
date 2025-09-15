// components/WebsiteCard.tsx
import { Colors } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import AppButton from "./appButton";
import LabeledTextInput from "./labeledTextInput";
import Spacer from "./spacer";

interface WebsiteCardProps {
  url: string;
  label?:string;
  placeholder?:string;
  keybarodType?:string;
  isEditing:boolean,
   setIsEditing: (value: boolean) => void;
  onUpdate: (newUrl: string) => void;
}

export default function WebsiteCard({ url, onUpdate , label , placeholder , keybarodType, isEditing, setIsEditing }: WebsiteCardProps) {
   const {inProgress } = useSelector((state: RootState) => state.auth);
  // const [isEditing, setIsEditing] = useState(false);
  const [newUrl, setNewUrl] = useState(url);

  return (
    <View className="w-[90%] md:w-[50%] mx-auto mb-4">
      {!isEditing ? (
        // ✅ Display Mode
        <View className="flex-row justify-between items-center bg-headerColor p-4 rounded-lg ">
          <Text className="text-grayWhite text-lg font-semibold">{url}</Text>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Ionicons name="create-outline" size={20} color={Colors.grayWhite} />
          </TouchableOpacity>
        </View>
      ) : (
        // ✏️ Edit Mode
        <View>
            <LabeledTextInput
             value={newUrl}
              label={label?label:"Enter website URL"}
              placeholder={placeholder? placeholder : "Enter website URL"}
              placeholderTextColor={Colors.grayWhite}
              onChangeText={setNewUrl}
              keyboardType={keybarodType? keybarodType: "default"}
              autoCapitalize="none"
              backgroundColor={Colors.bg}
            />

           <Spacer size={Platform.OS === "web" ? 40 : 30} />

          <AppButton
              title="Update"
               onPress={() => {
              onUpdate(newUrl);
              // setIsEditing(false);
            }}
            isLoading={inProgress}
              buttonStyle="w-[100%] md:w-[30%] mx-auto bg-green mb-4"
              textStyle="text-white text-lg font-bold"
            />
        </View>
      )}
    </View>
  );
}
