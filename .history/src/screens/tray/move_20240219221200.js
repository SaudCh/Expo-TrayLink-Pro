import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import SearchBar from "../../components/seachBar";
import { colors } from "../../constants";

export default function FacilityScreen() {
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
                {item.avatar ? (
                  <Image
                    source={{ uri: item.avatar }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                ) : (
                  <Text style={{ fontSize: 20, color: colors.white }}>
                    {item.name.charAt(0)}
                  </Text>
                )}
              </View>
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: 16, color: colors.primary }}>
                  {item.name}
                </Text>
                <Text style={{ color: colors.grey }}>{item.email}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Are you sure?",
                    "You want to delete this team member?",
                    [
                      {
                        text: "No",
                        onPress: () => {},
                      },
                      {
                        text: "Yes",
                        onPress: () => handleDelete(index),
                      },
                    ]
                  );
                }}
              >
                <Feather name="trash-2" size={18} color={colors.danger} />
              </TouchableOpacity>
            </View>
          </View>
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
