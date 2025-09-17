import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  label?: string;
  onImageSelected?: (data: { uri: string; imagebase64: string }) => void;
  imageUri: string | null;
  setImageUri: (uri: string | null) => void;
}

export default function ImagePickerComponent({
  label = "Upload Image",
  onImageSelected,
  imageUri,
  setImageUri
}: Props) {
console.log('here is image uri', imageUri)

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "You need to allow access to your photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true, // ✅ request base64
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImageUri(asset.uri);

      if (onImageSelected && asset.base64) {
        onImageSelected({
          uri: asset.uri,
          imagebase64: asset.base64,
        });
      }
    }
  };

return (
  <View className="my-5 items-center">
    {label ? (
      <Text className="text-lg font-semibold text-gray-200 mb-2">{label}</Text>
    ) : null}

    <TouchableOpacity
      className="w-40 h-40 border border-dashed border-gray-300 rounded-full items-center justify-center bg-gray-800 overflow-hidden"
      onPress={pickImage}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          className="w-full h-full rounded-full"
          resizeMode="cover"
        />
      ) : (
        <Text className="text-gray-400">Tap to upload</Text>
      )}
    </TouchableOpacity>
  </View>
);



}




// import * as ImagePicker from "expo-image-picker";
// import React, { useState } from "react";
// import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

// interface Props {
//   label?: string;
//   onImageSelected?: (data: { uri: string; imagebase64: string }) => void;
// }

// export default function ImagePickerComponent({ label = "Upload Image", onImageSelected }: Props) {
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   const pickImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permissionResult.granted) {
//       Alert.alert("Permission required", "You need to allow access to your photos.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       base64: true,
//     });

//     if (!result.canceled) {
//       const asset = result.assets[0];
//        setImageUri(asset.uri);
//       if (onImageSelected) onImageSelected({
//           uri: asset.uri,
//           imagebase64: asset.base64,
//         });
//     }
//   };

//   return (
//     <View className="my-5 items-center">
//       {label ? <Text className="text-lg font-semibold text-gray-200 mb-2">{label}</Text> : null}

//       <TouchableOpacity
//         className="w-[90%] max-w-[300px] h-40 border border-dashed border-gray-300 rounded-xl items-center justify-center bg-gray-800"
//         onPress={pickImage}
//       >
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} className="w-32 h-32 rounded-lg" />
//         ) : (
//           <Text className="text-gray-400">Tap to upload</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }
