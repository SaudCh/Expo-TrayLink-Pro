import { Feather } from "@expo/vector-icons";
import { where } from "firebase/firestore";

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import SearchBar from "../../components/seachBar";
import { colors } from "../../constants";
import { screens } from "../../routes/screens";
import { useAuth, useFirebase } from "../../hooks";

export default function ResultScreen({ navigation, route }) {
  console.log("route.params", route.params);

  const { facility = "", category, type } = route.params;
  const { team } = useAuth();
  const { getDocuments } = useFirebase();
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [trays, setTrays] = React.useState([]);

  const [categories, setCategories] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [facilities, setFacilities] = React.useState([]);

  const filterData = React.useMemo(() => {
    return trays.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, trays]);

  useEffect(() => {
    getTrays();
    getCategories();
    getTypes();
    getFacilities();
  }, []);

  const getTrays = async () => {
    const wheres = [
      where("teamId", "==", team.id),
      where("category", "==", category),
      where("type", "==", type),
    ];

    if (facility) {
      wheres.push(where("facility", "==", facility));
    }

    const res = await getDocuments("trays", setLoading, wheres);

    if (res?.error) return Alert.alert("Error", res.error);

    setTrays(res.data);
  };

  const getCategories = async () => {
    const res = await getDocuments("categories", setLoading, [
      where("teamId", "==", team.id),
    ]);
    if (res?.error) return Alert.alert("Error", res.error);
    setCategories(res.data);
  };

  const getTypes = async () => {
    const res = await getDocuments("types", setLoading, [
      where("teamId", "==", team.id),
    ]);
    if (res?.error) return Alert.alert("Error", res.error);
    setTypes(res.data);
  };

  const getFacilities = async () => {
    const res = await getDocuments("facilities", setLoading, [
      where("teamId", "==", team.id),
    ]);
    if (res?.error) return Alert.alert("Error", res.error);
    setFacilities(res.data);
  };

  const getName = (id, data) => {
    if (!id) return "N/A";
    const item = data.find((item) => item.id === id);
    return item?.name || "N/A";
  };

  return (
    <Container>
      <Header title={"Tray"} />
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
              navigation.navigate(screens.trayDetail, {
                id: item.id,
                name: item.name,
                number: item.number,
                category: item.category,
                type: item.type,
                facility: item.facility,
              });
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
                {getName(item.category, categories) +
                  " - " +
                  getName(item.type, types)}
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
                {getName(item.facility, facilities)}
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color={colors.grey} />
          </TouchableOpacity>
        )}
        refreshing={loading}
        onRefresh={() => {
          getTrays();
          getCategories();
          getTypes();
          getFacilities();
        }}
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
