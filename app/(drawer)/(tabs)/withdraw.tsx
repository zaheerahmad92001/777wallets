import AppButton from "@/components/appButton";
import CurrencyModal from "@/components/currencyModal";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import React, { Fragment, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const WithdrawScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<
    "RS" | "USDT" | null
  >(null);

  // ✅ JazzCash default
  const [selectedMethod, setSelectedMethod] = useState<
    "JazzCash" | "EasyPaisa" | "Bank" | null
  >("JazzCash");

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView className="flex-1 mt-6">
        {/* <AppHeader
          userName="Withdraw"
          onPress={() => navigation.openDrawer()}
        /> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mx-[4%]"
        >
          <Spacer size={20} />

          <LabeledTextInput
            title="Username/ID"
            label="Username/ID"
            placeholder="Enter Username/ID"
            placeholderTextColor={Colors.grayWhite}
            keyboardType="default"
            autoCapitalize="none"
            backgroundColor={Colors.bg}
            containerStyle="w-[92%] md:w-[50%] mx-auto"
          />
          <Spacer size={20} />

          <LabeledTextInput
            title="Amount to Withdraw (Minimum RS: 1)"
            label="Amount"
            placeholder="Enter amount"
            placeholderTextColor={Colors.grayWhite}
            keyboardType="numeric"
            autoCapitalize="none"
            backgroundColor={Colors.bg}
            containerStyle="w-[92%] md:w-[50%] mx-auto"
          />

          <Spacer size={20} />
          <View className="w-[92%] md:w-[50%] mx-auto">
            <Text className="text-grayWhite font-semibold text-lg mb-3">
              Account Details
            </Text>
          </View>

          <View className="w-[92%] md:w-[50%] mx-auto border border-grayWhite rounded-2xl px-5 pt-3 pb-8">
            <View className="flex-row justify-between my-2">
              {["JazzCash", "EasyPaisa", "Bank"].map((method) => (
                <TouchableOpacity
                  key={method}
                  className={`flex-1 py-3 mx-1 border rounded-lg items-center ${
                    selectedMethod === method
                      ? "bg-green border-green"
                      : "border-grayWhite"
                  }`}
                  onPress={() => setSelectedMethod(method as any)}
                >
                  <Text
                    className={`text-sm font-medium ${
                      selectedMethod === method
                        ? "text-white"
                        : "text-grayWhite"
                    }`}
                  >
                    {method}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ✅ Bottom Border */}
            <View className="border-b border-grayWhite mt-1" />

            {selectedMethod === "Bank" && (
              <Fragment>
                <Spacer size={25} />
                <LabeledTextInput
                  label="Bank Name"
                  placeholder="Enter bank name"
                  placeholderTextColor={Colors.grayWhite}
                  autoCapitalize="words"
                  backgroundColor={Colors.bg}
                />
              </Fragment>
            )}

            {/* Input Fields */}
            <View className="mt-4">
              <Spacer size={10} />
              <LabeledTextInput
                label="Account Number"
                placeholder="Enter account number"
                placeholderTextColor={Colors.grayWhite}
                keyboardType="numeric"
                autoCapitalize="none"
                backgroundColor={Colors.bg}
              />
              <Spacer size={25} />
              <LabeledTextInput
                label="Account Title"
                placeholder="Enter account title"
                placeholderTextColor={Colors.grayWhite}
                autoCapitalize="words"
                backgroundColor={Colors.bg}
              />
            </View>
          </View>

          <Spacer size={20} />
          <AppButton
            title="Withdraw"
            onPress={() => {}}
            buttonStyle="w-[92%] md:w-[20%] mx-auto bg-green mb-4"
          />
        </ScrollView>

        <CurrencyModal
          visible={isModalVisible}
          selectedCurrency={selectedCurrency}
          onClose={() => setModalVisible(false)}
          onSelect={(currency) => {
            setSelectedCurrency(currency);
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default WithdrawScreen;


// import AppButton from "@/components/appButton";
// import CurrencyModal from "@/components/currencyModal";
// import LabeledTextInput from "@/components/labeledTextInput";
// import Spacer from "@/components/spacer";
// import { Colors } from "@/constants/Colors";
// import { useNavigation } from "expo-router";
// import React, { Fragment, useState } from "react";
// import {
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveScreenWidth,
// } from "react-native-responsive-dimensions";

// const WithdrawScreen = () => {
//   const navigation = useNavigation();
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [selectedCurrency, setSelectedCurrency] = useState<
//     "RS" | "USDT" | null
//   >(null);

//   // ✅ JazzCash is default
//   const [selectedMethod, setSelectedMethod] = useState<
//     "JazzCash" | "EasyPaisa" | "Bank" | null
//   >("JazzCash");

//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={styles.mainwrapper}>
//         {/* <AppHeader
//           userName="Withdraw"
//           onPress={() => navigation.openDrawer()}
//         /> */}

//         <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
//           <Spacer size={20} />

//           <LabeledTextInput
//            title="Username/ID"
//             label="Username/ID"
//             placeholder="Enter Username/ID"
//             placeholderTextColor={Colors.grayWhite}
//             keyboardType="default"
//             autoCapitalize="none"
//             backgroundColor={Colors.bg}
//            containerStyle="w-[89%] md:w-[50%] mx-auto"
//           />
//           <Spacer size={20} />

//           <LabeledTextInput
//            title="Amount to Withdraw (Minimum RS: 1)"
//             label="Amount"
//             placeholder="Enter amount"
//             placeholderTextColor={Colors.grayWhite}
//             keyboardType="numeric"
//             autoCapitalize="none"
//             backgroundColor={Colors.bg}
//             containerStyle="w-[89%] md:w-[50%] mx-auto"
//           />

//           <Spacer size={20} />
//           <View style={styles.inputContainer}>
//              <Text style={styles.depositTo}>{"Account Details"}</Text>
//           </View>

//           <View style={[styles.accountDetail,styles.inputContainer]}>
//             <View style={styles.buttonRow}>
//               {["JazzCash", "EasyPaisa", "Bank"].map((method) => (
//                 <TouchableOpacity
//                   key={method}
//                   style={[
//                     styles.button,
//                     selectedMethod === method && styles.selectedButton,
//                   ]}
//                   onPress={() => setSelectedMethod(method as any)}
//                 >
//                   <Text
//                     style={[
//                       styles.buttonText,
//                       selectedMethod === method && styles.selectedText,
//                     ]}
//                   >
//                     {method}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* ✅ Border below buttons */}
//             <View style={styles.buttonBottomBorder} />

//             {selectedMethod === "Bank" ? (
//               <Fragment>
//                 <Spacer size={25} />
//                 <LabeledTextInput
//                   label="Bank Name"
//                   placeholder="Enter bank name"
//                   placeholderTextColor={Colors.grayWhite}
//                   autoCapitalize="words"
//                   backgroundColor={Colors.bg}
//                 />
//               </Fragment>
//             ) : null}

//             {/* Input Fields */}
//             <View style={styles.inputsContainer}>
//               <Spacer size={10} />
//               <LabeledTextInput
//                 label="Account Number"
//                 placeholder="Enter account number"
//                 placeholderTextColor={Colors.grayWhite}
//                 keyboardType="numeric"
//                 autoCapitalize="none"
//                 backgroundColor={Colors.bg}
//               />
//               <Spacer size={25} />
//               <LabeledTextInput
//                 label="Account Title"
//                 placeholder="Enter account title"
//                 placeholderTextColor={Colors.grayWhite}
//                 autoCapitalize="words"
//                 backgroundColor={Colors.bg}
//               />
//             </View>
//           </View>
//           <Spacer size={20} />
//           <AppButton
//             title="Withdraw"
//             onPress={() => {}}
//             buttonStyle="w-[90%] md:w-[20%] mx-auto bg-green mb-4"
//           />
//         </ScrollView>

//         <CurrencyModal
//           visible={isModalVisible}
//           selectedCurrency={selectedCurrency}
//           onClose={() => setModalVisible(false)}
//           onSelect={(currency) => {
//             setSelectedCurrency(currency);
//           }}
//         />
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.bg,
//   },
//   mainwrapper: {
//     flex: 1,
//     marginTop: responsiveHeight(3),
//   },
//   wrapper: {
//     marginHorizontal: responsiveScreenWidth(4),
//   },
//   selectCurrency: {
//     color: Colors.grayWhite,
//     marginBottom: responsiveHeight(2),
//     fontSize: responsiveFontSize(1.8),
//     fontWeight: "500",
//   },
//   depositTo: {
//     color: Colors.grayWhite,
//     marginBottom: responsiveHeight(1.5),
//     fontSize: responsiveFontSize(2),
//     fontWeight: "600",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 10,
//   },
//   buttonBottomBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.grayWhite,
//     marginTop: 3,
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderColor: Colors.grayWhite,
//     borderRadius: 8,
//     marginHorizontal: 5,
//     alignItems: "center",
//     backgroundColor: "transparent",
//   },
//   selectedButton: {
//     backgroundColor: Colors.green,
//     borderColor: Colors.green,
//   },
//   buttonText: {
//     fontSize: 14,
//     color: Colors.grayWhite,
//     fontWeight: "500",
//   },
//   selectedText: {
//     color: Colors.white,
//   },
//   inputsContainer: {
//     marginTop: 15,
//   },
//   accountDetail: {
//     borderWidth: 1,
//     borderColor: Colors.grayWhite,
//     borderRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: responsiveHeight(1.2),
//     paddingBottom: responsiveHeight(3),
//   },
//   buttonStyle: {
//     marginBottom: Platform.OS === "web" ? responsiveHeight(2) : 10,
//     width:
//       Platform.OS === "web"
//         ? responsiveScreenWidth(20)
//         : responsiveScreenWidth(100),
//     alignSelf: "center",
//   },
//   inputContainer: {
//     width: responsiveScreenWidth(Platform.OS === "web" ? 50 : 90),
//     alignSelf: "center",
//   },
// });

// export default WithdrawScreen;
