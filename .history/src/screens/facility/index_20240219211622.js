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

const TEAMS = [
  {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/300",
    email: "john@gmail.com",
    phone: "1234567890",
  },
  {
    name: "Jane Smith",
    email: "jane@gmail.com",
    phone: "9876543210",
  },
  {
    name: "Bob Johnson",
    avatar: "https://i.pravatar.cc/300",
    email: "bob@gmail.com",
    phone: "5555555555",
  },
  {
    name: "Alice Williams",
    email: "alice@gmail.com",
    phone: "1112223333",
  },
  {
    name: "Eva Brown",
    avatar: "https://i.pravatar.cc/300",
    email: "eva@gmail.com",
    phone: "9998887777",
  },
  {
    name: "Michael Davis",
    email: "michael@gmail.com",
    phone: "4443332222",
  },
  {
    name: "Olivia Taylor",
    avatar: "https://i.pravatar.cc/300",
    email: "olivia@gmail.com",
    phone: "7776665555",
  },
  {
    name: "Ryan Miller",
    email: "ryan@gmail.com",
    phone: "3334445555",
  },
  {
    name: "Sophia Wilson",
    avatar: "https://i.pravatar.cc/300",
    email: "sophia@gmail.com",
    phone: "6667778888",
  },
  {
    name: "David Anderson",
    email: "david@gmail.com",
    phone: "2223334444",
  },
];
