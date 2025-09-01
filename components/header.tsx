import { Colors } from "@/constants/Colors";
import React from "react";
import { GestureResponderEvent, Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";


interface AppHeaderProps {
  onPress?: (event: GestureResponderEvent) => void;
  userName: string;
  greetings?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onPress, userName, greetings }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.rowContainer}>
        <View>
          {greetings &&
          <Text style={styles.textStyle}>{`${greetings},`}</Text>
          }
          <Text style={styles.textStyle}>{userName}</Text>
        </View>
        <Pressable onPress={onPress} style={styles.imageContainer}>
          <Image
            source={require("../assets/images/user.png")}
            style={styles.imageStyle}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: responsiveWidth(2),
    paddingTop: responsiveWidth(3),
    paddingBottom: responsiveWidth(5),
    backgroundColor: Colors.headerColor,
    borderBottomLeftRadius: responsiveWidth(7),
    borderBottomRightRadius: responsiveWidth(7),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: responsiveWidth(2),
  },
  imageContainer: {
    height: 50,
    width: 50,
    backgroundColor: "blue",
    borderRadius: 25,
    overflow: "hidden",
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  textStyle: {
    color: Colors.grayWhite,
    fontSize: responsiveFontSize(2.5),
    fontWeight: "600",
  },
});

export default AppHeader;
