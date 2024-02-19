import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import SearchBar from "../../components/seachBar";

export default function FacilityScreen() {
  return (
    <Container>
      <Header title={"Move Tray"} back={false} />
      <SearchBar />
    </Container>
  );
}

const styles = StyleSheet.create({});
