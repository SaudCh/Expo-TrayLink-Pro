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
import SearchBar from "../../components/seachBar";

export default function FacilityScreen() {
  const [search, setSearch] = React.useState("");

  const filterData = useMemo(() => {
    return TEAMS.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search]);

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
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, color: colors.primary }}>
                  {item.name}
                </Text>
                <Text style={{ color: colors.grey }}>{item.email}</Text>
              </View>
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
    avatar: "https://i.pravatar.cc/300",
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
    avatar: "https://i.pravatar.cc/300",
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
    avatar: "https://i.pravatar.cc/300",
    email: "david@gmail.com",
    phone: "2223334444",
  },
];
