import { Feather } from "@expo/vector-icons";

import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import Container from "../../components/container";

export default function HomeScreen({ navigation }) {
  return (
    <Container>
      <View
        style={{
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Hello, Chris 👋
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({});
