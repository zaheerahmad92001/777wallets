import AdminHeader from "@/components/appHeader";
import ZoomImageModal from "@/components/imagePreviewModel";
import Loader from "@/components/Loader";
import PaymentCard from "@/components/paymentsCard";
import { Colors } from "@/constants/Colors";
import { fetchTransactions, updatePaymentStatus } from "@/redux/actions/paymentAction";
import { AppDispatch, RootState } from "@/redux/store";
import { UpdatePaymentPayload } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItem, Platform, RefreshControl, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
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



const loadAllTransactions = useCallback(
  async (searchData: string) => {
    try {
      await dispatch(fetchTransactions(searchData) as any).unwrap();
    } catch (error) {
      console.error("Failed to load transactions:", error);
    }
  },
  [dispatch]
);

useFocusEffect(
  React.useCallback(() => {
    // on focus: load initial data (empty search)
    loadAllTransactions("");

    // cleanup runs when screen loses focus (or unmounts)
    return () => {
      setSearchQuery("");
    };
  }, [loadAllTransactions])
);



  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadAllTransactions(searchQuery);
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
    loadAllTransactions(searchQuery)
    // 👉 later, filter PaymentCard list based on searchQuery
  };

  const renderItem: ListRenderItem<any> = ({ item, index }) => {
    return (

      <PaymentCard
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
        isSelectedIndex={selectedIndex === item.transactionId}
        containerStyle="w-[92%] md:w-[50%] self-center"
        onViewImage={() => {
          if (item?.imageUrl) {
            setSelectedImage(item.imageUrl);
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
    )
  }




  return (
    <View className="flex-1 bg-bg px-4">
      <SafeAreaView className="flex-1 mt-12 px-4">
        <AdminHeader title="Payments" onMenuPress={() => openMenu()} />
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
          {transactionLoading ?
            <Loader /> :
            Array.isArray(allTransactions) && allTransactions?.length > 0 ?

              <FlatList
                data={allTransactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
              /> :
              <View className="mt-[200] items-center justify-center">
                <Text className="text-grayWhite text-[16px] font-bold">
                  No Data Found
                </Text>
              </View>
          }
        </View>
        {/* <View className="mb-4">
          <FloatingButton
            icon={<Ionicons name="card-outline" size={24} color="#fff" />}
            onPress={() => router.navigate("/(drawer)/(admin)/addBankAccount")}
          />
        </View> */}

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