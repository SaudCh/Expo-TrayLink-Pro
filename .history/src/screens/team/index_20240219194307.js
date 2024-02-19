import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
      <FlatList
        data={TEAMS}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: colors.grey,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: colors.grey,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: colors.white }}>{item.name[0]}</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, color: colors.primary }}>
                  {item.name}
                </Text>
                <Text style={{ color: colors.grey }}>{item.email}</Text>
              </View>
            </View>
            <Text style={{ color: colors.primary }}>{item.phone}</Text>
          </View>
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
