import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  label?: string;
  onImageSelected?: (uri: string) => void;
}

export default function ImagePickerComponent({ label = "Upload Image", onImageSelected }: Props) {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "You need to allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      if (onImageSelected) onImageSelected(uri);
    }
  };

  return (
    <View className="my-5 items-center">
      {label ? <Text className="text-lg font-semibold text-gray-200 mb-2">{label}</Text> : null}

      <TouchableOpacity
        className="w-[90%] max-w-[300px] h-40 border border-dashed border-gray-300 rounded-xl items-center justify-center bg-gray-800"
        onPress={pickImage}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="w-32 h-32 rounded-lg" />
        ) : (
          <Text className="text-gray-400">Tap to upload</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
