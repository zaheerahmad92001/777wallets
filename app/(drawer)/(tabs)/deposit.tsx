import AppHeader from "@/components/header";
import LabeledTextInput from "@/components/labeledTextInput";
import Spacer from "@/components/spacer";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";

const DepositScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
         <AppHeader
          userName="Deposit"
          onPress={() => navigation.openDrawer()}
        />
  
<View style={styles.wrapper}>
  <Spacer size={20} />
<LabeledTextInput
  label="Email"
  placeholder="you@example.com"
  keyboardType="email-address"
  autoCapitalize="none"
  backgroundColor={Colors.bg}
/>
  </View>
        {/* <Button title="Open Drawer" onPress={() => navigation.openDrawer()} /> */}
      
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.bg,
    },
     wrapper:{
         marginHorizontal:responsiveScreenWidth(4) 
      },
})


export default DepositScreen;
