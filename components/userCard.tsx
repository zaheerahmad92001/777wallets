// components/UserCard.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
interface UserCardProps {
  name: string;
  username: string;
  phone: string;
  containerStyle?:string;
  image: string; // image URL
  onDelete?: () => void; // delete handler
onEdit?: () => void;
}

export default function UserCard({
  name,
  username,
  phone,
  image,
  onDelete,
  onEdit,
  containerStyle = "",

}: UserCardProps) {
  return (
    <View className={`bg-headerColor p-4 rounded-lg shadow-md mb-4 relative ${containerStyle}`}>


      {/* Row: Image + Name */}
      <View className="flex-row items-center justify-between mb-3 ">

      <View className="flex-row items-center">
        <Image
          source={{ uri: image }}
          className="w-12 h-12 rounded-full mr-3"

          resizeMode="cover"
          />

        <Text className="text-lg font-semibold text-grayWhite">{name}</Text>
      </View>

       <View className="flex-row space-x-2 gap-6 self-start">
        {onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Ionicons name="create-outline" size={20} color={Colors.grayWhite} />
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name="trash-outline" size={20} color="red" />
          </TouchableOpacity>
        )}
      </View>

      </View>

      {/* Column: Username + Phone */}
      <View className="ml-15">
        <Text className="text-base text-grayWhite">{username}</Text>
        <Text className="text-base text-grayWhite">{phone}</Text>
      </View>
    </View>
  );
}
