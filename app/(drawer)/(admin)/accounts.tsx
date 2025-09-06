import AdminHeader from "@/components/appHeader";
import BankAccountCard from "@/components/bankAccountCard";
import FloatingButton from "@/components/floatingButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { Platform, SafeAreaView, ScrollView, View } from "react-native";

export default function Accounts() {
  const navigation = useNavigation();
const router = useRouter();

  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View className="flex-1 bg-bg px-4">
      <SafeAreaView className="flex-1 mt-12 px-4">
        <AdminHeader title="Accounts" onMenuPress={() => openMenu()} />
        <ScrollView className="flex-1">
          <View className={`${Platform.OS === "web" ? "mt-20" : "mt-10"}`}>
            <BankAccountCard
              logo={require("../../../assets/images/easyPaisa.png")}
              bankName="Easy Paisa"
              accountHolder="Zaheer Khan"
              accountNumber="1234 5678 9012"
              iban="PK00HABB0000001234567890123"
              onEdit={() => router.navigate("/(drawer)/(admin)/updateAccount")}
              onDelete={() => alert("Delete bank account")}
              containerStyle="w-[92%] md:w-[50%] self-center"
            />
            <BankAccountCard
              logo={require("../../../assets/images/jazzCash.png")}
              bankName="Mobilink Account"
              accountHolder="Zaheer Khan"
              accountNumber="1234 5678 9012"
              iban="PK00HABB0000001234567890123"
              onEdit={() => router.navigate("/(drawer)/(admin)/updateAccount")}
              onDelete={() => alert("Delete bank account")}
              containerStyle="w-[92%] md:w-[50%] self-center"
            />
            <BankAccountCard
              logo={require("../../../assets/images/ubl.png")}
              bankName="UBL"
              accountHolder="Zaheer Khan"
              accountNumber="1234 5678 9012"
              iban="PK00HABB0000001234567890123"
              onEdit={() => router.navigate("/(drawer)/(admin)/updateAccount")}
              onDelete={() => alert("Delete bank account")}
              containerStyle="w-[92%] md:w-[50%] self-center"
            />
          </View>
        </ScrollView>
        <View className="mb-4">
          <FloatingButton
             icon={<Ionicons name="card-outline" size={24} color="#fff" />}
            onPress={() => router.navigate("/(drawer)/(admin)/addBankAccount")}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
