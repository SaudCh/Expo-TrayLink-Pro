import { StyleSheet, View } from "react-native";
import React from "react";

export default function Container({ children, cusStyles }) {
  return <View style={[containerStyles.container, cusStyles]}>{children}</View>;
}

export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 7,
    paddingTop: 48,
  },
});
