import { Feather } from "@expo/vector-icons";

import {
  FlatList,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import { colors } from "../../constants";
import { screens } from "../../routes/screens";
import SearchBar from "../../components/seachBar";

export default function FacilityScreen({ navigation }) {
  const [search, setSearch] = React.useState("");
  const [facilities, setFacilities] = React.useState(FACILITIES);

  const filterData = useMemo(() => {
    return facilities.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, facilities]);

  const handleDelete = (index) => {
    const newData = [...facilities];
    newData.splice(index, 1);
    setFacilities(newData);
  };

  return (
    <Container>
      <Header
        title={"Facility"}
        back={false}
        headerRight={() => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screens.addFacility);
            }}
          >
            <Text
              style={{ fontSize: 16, color: colors.secondary, marginRight: 10 }}
            >
              Add
            </Text>
          </TouchableOpacity>
        )}
      />
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search Facility"
        width="90%"
        cusStyles={{ marginVertical: 10 }}
      />
      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.grey,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => navigation.navigate(screens)}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, color: colors.primary }}>
                  {item.name}
                </Text>
                <Text style={{ color: colors.grey }}>{item.address}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate(screens.editFacility)}
                style={{ marginRight: 10 }}
              >
                <Feather name="edit" size={18} color={colors.secondary} />
              </TouchableOpacity>
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
            </TouchableOpacity>
          </View>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});

const FACILITIES = [
  {
    name: "Facility",
    address: "123 Main St",
  },
  {
    name: "Office Building",
    address: "456 Oak Ave",
  },
  {
    name: "Business Park",
    address: "789 Pine Blvd",
  },
  {
    name: "Tech Hub",
    address: "101 Maple Ln",
  },
  {
    name: "Convention Center",
    address: "202 Cedar Dr",
  },
  {
    name: "Research Facility",
    address: "303 Elm Ct",
  },
  {
    name: "Community Center",
    address: "404 Birch Rd",
  },
  {
    name: "Sports Arena",
    address: "505 Walnut Pl",
  },
  {
    name: "Art Gallery",
    address: "606 Spruce Ave",
  },
  {
    name: "Medical Clinic",
    address: "707 Fir St",
  },
];
