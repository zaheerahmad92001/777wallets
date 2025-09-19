// import React from "react";
// import { Modal } from "react-native";
// import ImageViewer from "react-native-image-zoom-viewer";

// interface ZoomImageModalProps {
//   imageUrl: string;
//   visible: boolean;
//   onClose: () => void;
// }

// const ZoomImageModal: React.FC<ZoomImageModalProps> = ({ imageUrl, visible, onClose }) => {
//   return (
//     <Modal visible={visible} transparent={true}>
//       <ImageViewer
//         imageUrls={[{ url: imageUrl }]}
//         enableSwipeDown
//         onSwipeDown={onClose}
//         onCancel={onClose}
//         backgroundColor="rgba(0,0,0,0.95)"
//         saveToLocalByLongPress={false}
//       />
//     </Modal>
//   );
// };

// export default ZoomImageModal;
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

interface ZoomImageModalProps {
  imageUrl: string;
  visible: boolean;
  onClose: () => void;
}

const ZoomImageModal: React.FC<ZoomImageModalProps> = ({
  imageUrl,
  visible,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.95)" }}>
        {/* Close button */}
        <TouchableOpacity
          onPress={onClose}
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 8,
            borderRadius: 20,
          }}
        >
          <Entypo name="cross" size={28} color="#fff" />
        </TouchableOpacity>

        <ImageViewer
          imageUrls={[{ url: imageUrl }]}
          enableSwipeDown
          onSwipeDown={onClose}
          backgroundColor="transparent"
          saveToLocalByLongPress={false}
        />
      </View>
    </Modal>
  );
};

export default ZoomImageModal;
