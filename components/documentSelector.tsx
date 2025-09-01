import { PickedFile } from "@/constants/types";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import AppButton from "./appButton";

type FileTypeProps = {
  file: PickedFile | null;
  setFile: React.Dispatch<React.SetStateAction<PickedFile | null>>;
};

const ExpoDocumentPickerComponent = ({ file, setFile }: FileTypeProps) => {
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf", // PDF
          "application/msword", // DOC
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
          "image/*", // All images (png, jpg, etc.)
        ],
        multiple: false,
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        console.log("User cancelled file picker");
        return;
      }

      const pickedFile = result.assets[0];
      setFile({
        name: pickedFile.name,
        size: pickedFile.size,
        mimeType: pickedFile.mimeType,
        uri: pickedFile.uri,
      });
    } catch (error) {
      console.error("Error picking document: ", error);
    }
  };
const isImage = file?.mimeType?.startsWith("image/")


  return (
    <View style={styles.container}>
      <AppButton title="Select File" onPress={pickDocument} buttonStyle={styles.buttonStyle} />

      {file && (
        <View style={
          file.mimeType?.startsWith("image/")?
          [styles.fileInfoImg]
        :[styles.fileInfo]
        }>
          <View style={isImage?
            [styles.fileTextWrapper]:
            [styles.fileTextWrapper,{marginRight:10}]
            }>
            {/* Show image if file is an image */}
            {isImage ? (
              <Image source={{ uri: file.uri }} style={styles.previewImage} />
            ) : (
              <>
                <Text style={styles.fileName}>📄 {file.name}</Text>
                <Text style={styles.fileSize}>
                  Size: {file.size ? (file.size / 1024).toFixed(2) : "?"} KB
                </Text>
                <Text style={styles.fileType}>Type: {file.mimeType}</Text>
              </>
            )}
          </View>

          <TouchableOpacity
            style={
              isImage?
              [styles.closeButton,{position:'absolute',right:0}]:
              [styles.closeButton]
            }
            onPress={() => setFile(null)}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ExpoDocumentPickerComponent;

const styles = StyleSheet.create({
  container: {
    paddingBottom: responsiveHeight(3),
  },
  fileInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileInfoImg:{
    marginTop: 16,
    // padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    alignItems: "center",
    width:100,
    height:100,
  },
  fileTextWrapper: {
    flex: 1,
    // paddingRight: 10,
  },
  fileName: {
    fontSize: 16,
    fontWeight: "500",
  },
  fileSize: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  fileType: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  closeButton: {
    backgroundColor: "#FF3B30",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
   buttonStyle: {
      marginBottom: Platform.OS==='web' ? responsiveHeight(2) : 10,
      width: Platform.OS==='web' ? responsiveScreenWidth(20) : responsiveScreenWidth(100),
      alignSelf: "center",
    },
});




// import { PickedFile } from "@/constants/types";
// import * as DocumentPicker from "expo-document-picker";
// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { responsiveHeight } from "react-native-responsive-dimensions";
// import AppButton from "./appButton";

// type FileTypeProps = {
//   file: PickedFile | null;
//   setFile: React.Dispatch<React.SetStateAction<PickedFile | null>>;
// };

// const ExpoDocumentPickerComponent = ({ file, setFile }: FileTypeProps) => {
//   const pickDocument = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: [
//           "application/pdf", // PDF
//           "application/msword", // DOC
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
//         ],
//         multiple: false,
//         copyToCacheDirectory: true,
//       });

//       if (result.canceled) {
//         console.log("User cancelled file picker");
//         return;
//       }

//       const pickedFile = result.assets[0];
//       setFile({
//         name: pickedFile.name,
//         size: pickedFile.size,
//         mimeType: pickedFile.mimeType,
//         uri: pickedFile.uri,
//       });
//     } catch (error) {
//       console.error("Error picking document: ", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//         <AppButton 
//          title="Select PDF or DOC"
//          onPress={pickDocument}
//         />
//       {/* <TouchableOpacity style={styles.button} onPress={pickDocument}>
//         <Text style={styles.buttonText}>Select PDF or DOC</Text>
//       </TouchableOpacity> */}

//       {file && (
//         <View style={styles.fileInfo}>
//           <View style={styles.fileTextWrapper}>
//             <Text style={styles.fileName}>📄 {file.name}</Text>
//             <Text style={styles.fileSize}>
//               Size: {file.size ? (file.size / 1024).toFixed(2) : "?"} KB
//             </Text>
//             <Text style={styles.fileType}>Type: {file.mimeType}</Text>
//           </View>

//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => setFile(null)}
//           >
//             <Text style={styles.closeText}>✕</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default ExpoDocumentPickerComponent;

// const styles = StyleSheet.create({
//   container: {
//     paddingBottom:responsiveHeight(3),
//   },
//   button: {
//     backgroundColor: "#007AFF",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   fileInfo: {
//     marginTop: 16,
//     padding: 12,
//     backgroundColor: "#F5F5F5",
//     borderRadius: 8,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   fileTextWrapper: {
//     flex: 1,
//     paddingRight: 10,
//   },
//   fileName: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   fileSize: {
//     fontSize: 14,
//     color: "#555",
//     marginTop: 4,
//   },
//   fileType: {
//     fontSize: 14,
//     color: "#777",
//     marginTop: 2,
//   },
//   closeButton: {
//     backgroundColor: "#FF3B30",
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   closeText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });