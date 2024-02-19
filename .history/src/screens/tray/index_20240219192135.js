import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../components/container";
import Header from "../../components/header";

export default function TrayScreen() {
  return (
    <Container>
      <Header title={"Tray"} back={false} />
    </Container>
  );
}

const styles = StyleSheet.create({});
