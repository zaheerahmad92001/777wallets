import AppHeader from "@/components/appHeader";
import ZoomImageModal from "@/components/imagePreviewModel";
import Loader from "@/components/Loader";
import NotificationsCard from "@/components/notificationsCard";
import { Colors } from "@/constants/Colors";
import { fetchTransactions, updatePaymentStatus } from "@/redux/actions/paymentAction";
import { AppDispatch, RootState } from "@/redux/store";
import { UpdatePaymentPayload } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, RefreshControl, SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
export default function Payments() {

  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, inProgress, allUser } = useSelector((state: RootState) => state.auth);
  const { allTransactions, loading: transactionLoading, inProgress: transactionInprogress } = useSelector(
    (state: RootState) => state.transactions
  );

  const [selectedIndex, setSelectedIndex] = useState<string>('');
  const [transStatus, setTransStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    loadAllTransactions();
  }, [dispatch]);

  const loadAllTransactions = async () => {
    try {
      await dispatch(fetchTransactions() as any).unwrap();
    } catch (error) {
      console.error("Failed to load transactions:", error);
    }
  };


  const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  try {
    await loadAllTransactions();
  } catch (err) {
    console.error("Refresh failed:", err);
  } finally {
    setRefreshing(false);
  }
};


  const updatePaymentTransactions = async (transactionId: string, transStatus: string) => {
    setTransStatus(transStatus)
    setSelectedIndex(transactionId)
    const payload: UpdatePaymentPayload = {
      transactionId: transactionId,
      transStatus: transStatus
    };
    try {
      await dispatch(updatePaymentStatus(payload) as any).unwrap();
      setTransStatus('')
      setSelectedIndex('')
    } catch (error) {
      console.error("Failed to update transactions:", error);
    }
  };



  const openMenu = () => {
    navigation.openDrawer();
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
    // 👉 later, filter PaymentCard list based on searchQuery
  };
  return (
    <View className="flex-1 bg-bg px-4">
      <SafeAreaView className="flex-1 mt-12 px-4">
        <AppHeader
                  title="Notifications"
                  showNotification
                   //onNotificationPress={() => Alert.alert("alert")}
                  
                />
        {/*Search Bar */}
        <View className="flex-row items-center mt-4 mb-4">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search payments..."
            placeholderTextColor="#ccc"
            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-l-lg"
          />
          <TouchableOpacity
            onPress={handleSearch}
            className="px-4 py-2 rounded-r-lg"
            style={{ backgroundColor: Colors.green }}
          >
            <Ionicons name="search-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>


        <View className={`${Platform.OS === "web" ? "mt-20" : "mt-10"}`}>
          {loading ?
            <Loader /> :
            <FlatList
              data={allTransactions}
              //keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 80, // space for floating button
              }}

                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#fff"            // iOS spinner color
                    colors={[Colors.green]}     // Android spinner color
                  />
                }

              renderItem={({ item , index }) => (
                <NotificationsCard
                  imageUrl={item?.imageUrl}
                  bankName={item.bankName}
                  accountTitle={item.accountTitle}
                  phoneNumber={item.phoneNumber}
                  accountNumber={item.accountNumber}
                  transactionType={item.transactionType}
                  accountType={item.accountType}
                  username={item.username}
                  transStatus={item.transStatus}
                  amount={item.amount}
                  datetime={item.createdAt}
                  onAccept={() => {
                    updatePaymentTransactions(item.transactionId, "accepted");
                  }}
                  onReject={() => {
                    updatePaymentTransactions(item.transactionId, "rejected");
                  }}
                  selectedStatus={transStatus}
                  isSelectedIndex={selectedIndex===item.transactionId}
                  containerStyle="w-[92%] md:w-[50%] self-center"
                  onViewImage={() => {
                    if (item?.imageUrl) {
                      setSelectedImage("https://storage.googleapis.com/bpwallets.firebasestorage.app/users/3fb6b49b-4821-426e-b131-efa406f62f25.jpg");
                      setVisible(true);
                    } else {
                      Toast.show({
                                type: "error",
                                text1: "Image receipt",
                                text2: "Receipt image is not found",
                              });
                    }
                  }}
                />
              )}
            />
          }
        </View>
      {selectedImage && (
        <ZoomImageModal
          imageUrl={selectedImage}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      )}

      </SafeAreaView>
    </View>
  )

}