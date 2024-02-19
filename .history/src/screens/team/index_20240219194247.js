import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import { colors } from "../../constants";

export default function FacilityScreen() {
  return (
    <Container>
      <Header
        title={"My Team"}
        back={false}
        headerRight={() => (
          <TouchableOpacity>
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

const TEAMS = [
  {
    name: "John Doe",
    avatar: "https://randomuser.me/api/port",
    email: "john@gmail.com",
    phone: "1234567890",
  },
];
