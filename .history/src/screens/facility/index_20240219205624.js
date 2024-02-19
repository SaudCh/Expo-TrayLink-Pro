import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import { colors } from "../../constants";

export default function FacilityScreen({ navigation }) {
  return (
    <Container>
      <Header
        title={"Facility"}
        back={false}
        headerRight={() => (
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.addFacility)}
          >
            <Text
              style={{ fontSize: 16, color: colors.secondary, marginRight: 10 }}
            >
              Add
            </Text>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
