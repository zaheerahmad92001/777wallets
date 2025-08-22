import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const BalanceDeposit = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <Text style={styles.amountText}>RS: 0</Text>
          <Text style={styles.balanceText}>Account Balance</Text>
        </View>
      
          <Pressable style={styles.buttonStyle}>
            <Text style={{color: Colors.light.white}}>Deposit</Text>
          </Pressable>
       
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightBlack,
    borderRadius: responsiveWidth(3),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
  },
  buttonStyle:{
    backgroundColor: Colors.green,
    paddingVertical: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: responsiveWidth(2),
  },
  columnContainer:{
    gap: responsiveHeight(1)
  },
  amountText:{
    fontSize: responsiveFontSize(2),
    fontWeight:'600',
    color:Colors.grayWhite,
  },
  balanceText:{
    color:Colors.grayWhite,
    fontSize: responsiveFontSize(1.5),
    fontWeight:'400',
  }
});

export default BalanceDeposit;
