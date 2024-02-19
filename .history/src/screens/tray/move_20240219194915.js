import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import SearchBar from "../../components/seachBar";

export default function FacilityScreen() {
  const [search, setSearch] = React.useState("");
  return (
    <Container>
      <Header title={"Move Tray"} back={false} />
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search Team"
        width="90%"
        cusStyles={{ marginVertical: 10 }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
