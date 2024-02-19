import { Feather } from "@expo/vector-icons";

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import SearchBar from "../../components/seachBar";
import { colors } from "../../constants";
import { screens } from "../../routes/screens";

export default function FacilityScreen({ navigation }) {
  const [search, setSearch] = React.useState("");

  const filterData = React.useMemo(() => {
    return TRAYS.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search]);

  return (
    <Container>
      <Header title={"Move Tray"} back={false} />
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search Tray"
        width="90%"
        cusStyles={{ marginVertical: 10 }}
      />
      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: colors.lightGrey,
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate(screens.trayDetail, { item });
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: colors.primary,
                }}
              >
                {item.name}
              </Text>
              <Text style={{ fontSize: 12, color: colors.grey }}>
                {item.category + " - " + item.type}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: colors.grey,
                }}
              >
                {item.number}
              </Text>
              <Text style={{ fontSize: 12, color: colors.grey }}>
                {item.facility}
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color={colors.grey} />
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});

let TRAYS = [
  {
    name: "OrthoPro Surgical Tray",
    number: "TRAY001",
    category: "Orthopedic",
    type: "General",
    facility: "Hospital A",
  },
  {
    name: "NeuroCare Tray",
    number: "TRAY002",
    category: "Neurosurgery",
    type: "Specialized",
    facility: "Clinic B",
  },
  {
    name: "CardioVascu Tray",
    number: "TRAY003",
    category: "Cardiovascular",
    type: "Vascular",
    facility: "Medical Center C",
  },
  {
    name: "ENT Essentials Tray",
    number: "TRAY004",
    category: "Otolaryngology",
    type: "ENT",
    facility: "Surgery Center D",
  },
  {
    name: "DentalCare Kit",
    number: "TRAY005",
    category: "Dental",
    type: "General",
    facility: "Dental Clinic E",
  },
];
