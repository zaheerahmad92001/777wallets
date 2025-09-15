import AdminHeader from "@/components/appHeader";
import BankAccountCard from "@/components/bankAccountCard";
import CustomAlert from "@/components/customAlert";
import FloatingButton from "@/components/floatingButton";
import Loader from "@/components/Loader";
import {
  deleteBankAccount,
  fetchBankAccounts,
} from "@/redux/actions/bankAccountActions";
import { AppDispatch, RootState } from "@/redux/store";
import { BankAccount } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ListRenderItem, Platform, SafeAreaView, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

export default function Accounts() {
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { bankAccounts, loading, inProgress } = useSelector(
    (state: RootState) => state.bankAccounts
  );

  const [showAlert, setShowAlert] = useState(false);
  const [bankId, setBankId] = useState<string>("");

  useEffect(() => {
    loadBankAccounts();
  }, [dispatch]);

  const loadBankAccounts = async () => {
    try {
      await dispatch(fetchBankAccounts() as any);
    } catch (error) {
      console.error("Failed to load bank accounts:", error);
    }
  };

  const openMenu = () => {
    navigation.openDrawer();
  };

  const onDeleteHandler = async (id: string) => {
    setBankId(id);
    setShowAlert(true);
  };

  const handleDelete = async () => {
    const response = await dispatch(
      deleteBankAccount({ bankId: bankId })).unwrap();
    setShowAlert(false);
    if (response?.response?.message === "Bank account deleted successfully") {
      Toast.show({
        type: "success",
        text1: "Bank Account Deleted",
        text2: response?.response?.message,
      });
    }
  };

  const renderItem: ListRenderItem<BankAccount> = ({ item, index }) => {
    return (
      <BankAccountCard
        logo={item.bankLogoUrl}
        bankName={item.bankName}
        accountHolder={item.accountHolderName}
        accountNumber={item.accountNumber}
        iban={item.iban}
        onEdit={() => 
           router.navigate({
            pathname: "/(drawer)/(admin)/updateAccount",
            params: { bankItem: JSON.stringify(item) },
          })
        }
        onDelete={() => onDeleteHandler(item?.id)}
        containerStyle="w-[92%] md:w-[50%] self-center"
      />
    );
  };

  return (
    <View className="flex-1 bg-bg px-4">
      <SafeAreaView className="flex-1 mt-12 px-4">
        <AdminHeader title="Accounts" onMenuPress={() => openMenu()} />

        <View className={`${Platform.OS === "web" ? "mt-20" : "mt-10"}`}>
          {loading ? (
            <Loader />
          ) : (
            <FlatList
              data={bankAccounts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>

        <CustomAlert
          loading={inProgress}
          visible={showAlert}
          title="Confirm Action"
          message="Are you sure you want to continue?"
          onCancel={() => setShowAlert(false)}
          onOk={() => {
            handleDelete();
          }}
        />
      </SafeAreaView>
      <View className="mb-4">
        <FloatingButton
          icon={<Ionicons name="card-outline" size={24} color="#fff" />}
          onPress={() => router.navigate("/(drawer)/(admin)/addBankAccount")}
        />
      </View>
    </View>
  );
}
