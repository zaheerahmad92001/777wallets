import AdminHeader from "@/components/appHeader";
import FloatingButton from "@/components/floatingButton";
import UserCard from "@/components/userCard";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { Platform, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Users() {
  const router = useRouter();
  const navigation = useNavigation();
  const {isLoading , signIn , signOut} = useAuth();

  // const handleLogin = () => router.navigate("/(drawer)/(tabs)");

  const openMenu = () => {
    
    navigation.openDrawer();
  };

  return (
    <View className="flex-1 bg-bg px-4">
      <SafeAreaView className="flex-1 mt-12 px-4">
        <AdminHeader title="User" onMenuPress={() => openMenu()} />
        <ScrollView className="flex-1">
          <View className={`${Platform.OS === "web" ? "mt-20" : "mt-10"}`}>
            <UserCard
              name="Zaheer Khan"
              username="zaheer_dev"
              phone="+92 300 1234567"
              image="https://randomuser.me/api/portraits/men/32.jpg"
              containerStyle="w-[92%] md:w-[50%] self-center"
              onEdit={() => router.navigate("/(drawer)/(admin)/updateUser")}
              onDelete={() => alert("Delete User account")}
            />

            <UserCard
              name="Sarah Ahmed"
              username="sarah_a"
              phone="+92 301 7654321"
              image="https://randomuser.me/api/portraits/women/45.jpg"
              containerStyle="w-[92%] md:w-[50%] self-center"
              onEdit={() => router.navigate("/(drawer)/(admin)/updateUser")}
              onDelete={() => alert("Delete User account")}
            />
        
          </View>
        </ScrollView>
        <View className="mb-4">
          <FloatingButton
            icon={<Ionicons name="person-add" size={24} color="#fff" />}
            onPress={() => router.navigate("/(drawer)/(admin)/addUser")}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

