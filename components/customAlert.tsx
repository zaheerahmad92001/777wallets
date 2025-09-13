// components/CustomAlert.tsx
import React from "react";
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  title?: string;
  message: string;
  loading?: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const CustomAlert: React.FC<Props> = ({
  visible,
  title,
  message,
  onCancel,
  onOk,
  loading = false,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/70 justify-center items-center px-6">
        <View className="bg-headerColor rounded-2xl w-full max-w-md p-6">
          {title && (
            <Text className="text-grayWhite text-lg font-semibold text-center mb-2">
              {title}
            </Text>
          )}
          <Text className="text-grayWhite text-base text-center mb-6">{message}</Text>

          <View className="flex-row justify-between">
            {/* Cancel Button */}
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 border border-gray-400 rounded-[10px] py-2 mr-2"
            >
              <Text className="text-grayWhite text-center font-medium">
                Cancel
              </Text>
            </TouchableOpacity>

            {/* OK Button */}
            <TouchableOpacity
              onPress={onOk}
              disabled={loading} // prevent multiple presses
              className="flex-1 bg-green rounded-[10px] py-2 ml-2 items-center justify-center"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-center text-white font-medium">OK</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
