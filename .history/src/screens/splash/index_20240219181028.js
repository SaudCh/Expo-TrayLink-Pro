import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Animated,
} from "react-native";
import React, { useEffect } from "react";

import { colors } from "../../constants";
import { screens } from "../../routes/screens";

export default function SplashScreen({ navigation }) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(screens.login);
    }, 1000);
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/splash.png")}
    >
      <Animated.View
        style={{
          ...styles.card,
          opacity,
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              }),
            },
          ],
        }}
      >
        <Text style={styles.title}>COACH AND CLIENTS</Text>
        <Text style={styles.title}>COACH AND CLIENTS</Text>
        <Text style={styles.description}>Your Potential, Our Passion</Text>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  description: {
    fontSize: 16,
    color: colors.white,
    marginTop: 10,
  },
});
