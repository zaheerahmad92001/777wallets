// import React, { useEffect, useRef, useState } from "react";
// import {
//     Animated,
//     Dimensions,
//     StyleSheet,
//     View
// } from "react-native";

// const { width } = Dimensions.get("window");

// type Props = {
//   text: string;
//   duration?: number; // speed control
// };

// const MarqueeText: React.FC<Props> = ({ text, duration = 8000 }) => {
//   const animatedValue = useRef(new Animated.Value(0)).current;
//   const [textWidth, setTextWidth] = useState(0);

//   useEffect(() => {
//     if (textWidth === 0) return;

//     const loopAnimation = () => {
//       animatedValue.setValue(width);
//       Animated.timing(animatedValue, {
//         toValue: -textWidth,
//         duration,
//         useNativeDriver: true,
//       }).start(() => loopAnimation());
//     };

//     loopAnimation();
//   }, [textWidth, duration]);

//   return (
//     <View style={styles.container}>
//       <Animated.Text
//         numberOfLines={1}
//         ellipsizeMode="clip"
//         onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
//         style={[
//           styles.text,
//           { transform: [{ translateX: animatedValue }] },
//         ]}
//       >
//         {text}
//       </Animated.Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     overflow: "hidden",
//     width: "100%",
//     backgroundColor: "#f0f0f0",
//   },
//   text: {
//     fontSize: 18,
//     color: "black",
//   },
// });

// export default MarqueeText;



import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    View
} from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  text: string;
  duration?: number; // speed control
};

const MarqueeText: React.FC<Props> = ({ text, duration = 100 }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textWidth === 0) return;

    const loopAnimation = () => {
      animatedValue.setValue(width);
      Animated.timing(animatedValue, {
        toValue: -textWidth,
        duration,
        useNativeDriver: true,
      }).start(() => loopAnimation());
    };

    loopAnimation();
  }, [textWidth, duration]);

  return (
    <View style={styles.container}>
      <Animated.Text
       numberOfLines={1}
        ellipsizeMode="clip"
        onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
        style={[
          styles.text,
          { transform: [{ translateX: animatedValue }] },
        ]}
      >
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: "100%",
    paddingVertical:10,
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 18,
    color: "black",
  },
});

export default MarqueeText;
