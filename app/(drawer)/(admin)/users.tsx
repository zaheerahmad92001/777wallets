import AdminHeader from "@/components/appHeader";
import CustomAlert from "@/components/customAlert";
import FloatingButton from "@/components/floatingButton";
import Loader from "@/components/Loader";
import UserCard from "@/components/userCard";
import { Colors } from "@/constants/Colors";
import { deleteUser, fetchAllUser } from "@/redux/actions/authActions";
import { AppDispatch, RootState } from "@/redux/store";
import { AllUser } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Platform,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

export default function Users() {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, inProgress, allUser } = useSelector(
    (state: RootState) => state.auth
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);



  const getAllUser = useCallback(
    async (searchData: string) => {
      try {
        await dispatch(fetchAllUser(searchData) as any).unwrap();
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    },
    [dispatch]
  );

  useFocusEffect(
    React.useCallback(() => {
      getAllUser("");
      return () => {
        setSearchQuery("");
      };
    }, [getAllUser])
  );


  useEffect(() => {
    if (searchQuery === "") {
      getAllUser(""); // fetch all users when input is cleared
    }
  }, [searchQuery, getAllUser]);


  // const getAllUser = async () => {
  //   const response = dispatch(fetchAllUser()).unwrap();
  // };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchAllUser("") as any).unwrap();
    } catch (err) {
      console.error("Refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  };
  const openMenu = () => {
    navigation.openDrawer();
  };

  const handleSearch = () => {

    getAllUser(searchQuery);
    //alert(`Searching for: ${searchQuery}`);
    // 👉 later, filter PaymentCard list based on searchQuery
  };

  const onDeleteHandler = (id: string) => {
    setUserId(id);
    setShowAlert(true);
  };
  const handleDelete = async () => {
    const response = await dispatch(deleteUser({ userId })).unwrap();
    setShowAlert(false);
    if (response?.message === "User deleted successfully") {
      Toast.show({
        type: "success",
        text1: "User Deleted",
        text2: response?.message,
      });
    }
  };

  const renderItem: ListRenderItem<AllUser> = ({ item, index }) => {
    return (
      <UserCard
        name={item.name}
        username={item.username}
        phone={item.phone}
        image={item.imageUrl} // fallback if null
        containerStyle="w-[92%] md:w-[50%] self-center"
        onEdit={() =>
          router.push({
            pathname: "/(drawer)/(admin)/updateUser",
            params: { userItem: JSON.stringify(item) },
          })
        }
        // onEdit={() => router.navigate("/(drawer)/(admin)/updateUser")}
        onDelete={() => onDeleteHandler(item?.userId)}
      />
    );
  };

  return (
    <View className="flex-1 bg-bg px-4">
      <SafeAreaView className="flex-1 mt-12 px-4">
        <AdminHeader title="User" onMenuPress={() => openMenu()} showBackButton={false} />

        {/*Search Bar */}
        <View className="w-[90%] md:w-[50%] mx-auto flex-row items-center mt-4 mb-4">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search User..."
            placeholderTextColor="#ccc"
            autoCapitalize='none'
            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-l-lg"
             style={{
            outlineStyle: "dashed",
            outlineWidth: 0,
          }}
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
        ) :
          Array.isArray(allUser) && allUser?.length > 0 ?
            (
              <View className={`${Platform.OS === "web" ? "mt-20" : "mt-10"}`}>
                <FlatList
                  data={allUser}
                  keyExtractor={(item) => item?.userId}
                  renderItem={renderItem}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      tintColor="#fff"            // iOS spinner color
                      colors={[Colors.green]}     // Android spinner color
                    />
                  }
                />
              </View>
            ) :
            <View className="mt-[200] items-center justify-center">
              <Text className="text-grayWhite text-[16px] font-bold">
                No Data Found
              </Text>
            </View>
        }
      </SafeAreaView>
      <CustomAlert
        loading={inProgress}
        visible={showAlert}
        title="Confirm Action"
        message="Are you sure you want to continue?"
        onCancel={() => setShowAlert(false)}
        onOk={handleDelete}
      />

      <View className="mb-4">
        <FloatingButton
          icon={<Ionicons name="person-add" size={24} color="#fff" />}
          onPress={() => router.navigate("/(drawer)/(admin)/addUser")}
        />
      </View>
    </View>
  );
}
