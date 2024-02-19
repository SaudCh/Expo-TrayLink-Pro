import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../components/container";
import Header from "../../components/header";

export default function FacilityScreen() {
  return (
    <Container>
      <Header
        title={"Facility"}
        back={false}
        headerRight={() => (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16, color: "#29B6F6", marginRight: 10 }}>
              Add
            </Text>
          </View>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
