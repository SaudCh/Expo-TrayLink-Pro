import { Feather } from "@expo/vector-icons";

import {
  FlatList,
  Image,
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
  const [teams, setTeams] = React.useState(TEAMS);

  const filterData = useMemo(() => {
    return teams.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search, teams]);

  const handleDelete = (index) => {
    const newData = [...teams];
    newData.splice(index, 1);
    setTeams(newData);
  };

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
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search Team"
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
            </View>
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
    address: "123 Main St",
  },
];
