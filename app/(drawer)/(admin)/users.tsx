import AdminHeader from "@/components/appHeader";
import FloatingButton from "@/components/floatingButton";
import Loader from "@/components/Loader";
import UserCard from "@/components/userCard";
import { Colors } from "@/constants/Colors";
import { fetchAllUser } from "@/redux/actions/authActions";
import { AppDispatch, RootState } from "@/redux/store";
import { AllUser } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Users() {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, allUser } = useSelector((state: RootState) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllUser();
  }, [dispatch]);

  const getAllUser = async () => {
    const response = dispatch(fetchAllUser()).unwrap();
  };

  const openMenu = () => {
    navigation.openDrawer();
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
    // 👉 later, filter PaymentCard list based on searchQuery
  };

  const renderItem: ListRenderItem<AllUser> = ({ item, index }) => {
    return (
      <UserCard
        name={item.name}
        username={item.username}
        phone={item.phone}
        image={item.imageUrl} // fallback if null
        containerStyle="w-[92%] md:w-[50%] self-center"
        //onEdit={() => router.navigate("/(drawer)/(admin)/updateUser")}
        onEdit={() =>
        router.push({
          pathname: "/(drawer)/(admin)/updateUser",
          params: { user: JSON.stringify(item) }, // pass object as string
        })
      }
        onDelete={() => Alert.alert("Delete User account")}
      />
    );
  };

  return (
    <View className="flex-1 bg-bg px-4">
      <SafeAreaView className="flex-1 mt-12 px-4">
        <AdminHeader title="User" onMenuPress={() => openMenu()} />

        {/*Search Bar */}
        <View className="flex-row items-center mt-4 mb-4">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search User..."
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
        {loading ? (
          <Loader />
        ) : (
          <View className={`${Platform.OS === "web" ? "mt-20" : "mt-10"}`}>
            <FlatList
              data={allUser}
              keyExtractor={(item) => item?.userId}
              renderItem={renderItem}
            />
          </View>
        )}
      </SafeAreaView>
      <View className="mb-4">
        <FloatingButton
          icon={<Ionicons name="person-add" size={24} color="#fff" />}
          onPress={() => router.navigate("/(drawer)/(admin)/addUser")}
        />
      </View>
    </View>
  );
}
