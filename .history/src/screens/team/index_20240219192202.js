import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";

export default function HomeScreen({ navigation }) {
  return (
    <Container>
      <Header title={"My Team"} back={false} />
    </Container>
  );
}

const styles = StyleSheet.create({});
