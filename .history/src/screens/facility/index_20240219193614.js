import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import { colors } from "../../constants";

export default function FacilityScreen() {
  return (
    <Container>
      <Header
        title={"Facility"}
        back={false}
        headerRight={() => (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 16, color: colors.secondary, marginRight: 10 }}
            >
              Add
            </Text>
          </View>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
