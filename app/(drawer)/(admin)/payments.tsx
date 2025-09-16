import AdminHeader from "@/components/appHeader";
import FloatingButton from "@/components/floatingButton";
import PaymentCard from "@/components/paymentsCard";
import { Colors } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Payments(){

    const navigation = useNavigation();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, inProgress, allUser } = useSelector((state: RootState) => state.auth);


    const [searchQuery, setSearchQuery] = useState("");
      const openMenu = () => {
        navigation.openDrawer();
      };

        const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
    // 👉 later, filter PaymentCard list based on searchQuery
  };
    return(
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
        <FlatList
          data={[1,2,3,4,5,6]}
          //keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 80, // space for floating button
          }}
          renderItem={({ item }) => (
            <PaymentCard
              recepitimage={"item.recepitimage"}
              bankName={"item.bankName"}
              accountHolder={"item.accountHolder"}
              accountNumber={"item.accountNumber"}
              iban={"item.iban"}
              transStatus={"item.transStatus"}
              onAccept={() => alert("accept psyment ")}
              onReject={() => alert("reject psyment ")}
              containerStyle="w-[92%] md:w-[50%] self-center"
              onViewImage={() => alert("view receipt image ")}
            />
          )}
        />
        {/* <ScrollView className="flex-1">
          <View className={`${Platform.OS === "web" ? "mt-20" : "mt-10"}`}>
            <PaymentCard
                            recepitimage={require("../../../assets/images/easyPaisa.png")}
                            bankName="Easy Paisa"
                            accountHolder="Zaheer Khan"
                            accountNumber="1234 5678 9012"
                            iban="PK00HABB0000001234567890123"
                            onAccept={() => router.navigate("/(drawer)/(admin)/updateAccount")}
                            on={() => alert("Delete bank account")}
                            containerStyle="w-[92%] md:w-[50%] self-center" transStatus={""}            />
            <PaymentCard
                            recepitimage={require("../../../assets/images/jazzCash.png")}
                            bankName="Mobilink Account"
                            accountHolder="Zaheer Khan"
                            accountNumber="1234 5678 9012"
                            iban="PK00HABB0000001234567890123"
                            onEdit={() => router.navigate("/(drawer)/(admin)/updateAccount")}
                            onDelete={() => alert("Delete bank account")}
                            containerStyle="w-[92%] md:w-[50%] self-center" transStatus={""}            />
            <PaymentCard
                            recepitimage={require("../../../assets/images/ubl.png")}
                            bankName="UBL"
                            accountHolder="Zaheer Khan"
                            accountNumber="1234 5678 9012"
                            iban="PK00HABB0000001234567890123"
                            onEdit={() => router.navigate("/(drawer)/(admin)/updateAccount")}
                            onDelete={() => alert("Delete bank account")}
                            containerStyle="w-[92%] md:w-[50%] self-center" transStatus={""}            />
          </View>
        </ScrollView> */}
        <View className="mb-4">
          <FloatingButton
             icon={<Ionicons name="card-outline" size={24} color="#fff" />}
            onPress={() => router.navigate("/(drawer)/(admin)/addBankAccount")}
          />
        </View>
      </SafeAreaView>
    </View>
    )

}