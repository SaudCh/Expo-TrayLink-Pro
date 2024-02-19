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
import SearchBar from "../../components/seachBar";
import { screens } from "../../routes/screens";

export default function TraysScreen({ navigation }) {
  const [search, setSearch] = React.useState("");

  const filterData = React.useMemo(() => {
    return MEDICAL_TRAY.filter((item) => {
      return item.item.toLowerCase().includes(search.toLowerCase());
    });
  }, [search]);

  return (
    <Container>
      <Header
        title={"Tray Type"}
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
        placeholder="Search Tray Type"
        width="90%"
        cusStyles={{ marginVertical: 10 }}
      />
      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: colors.lightGrey,
            }}
            onPress={() => navigation.navigate(screens.trayType)}
          >
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: colors.grey,
                }}
              >
                {item.item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});

const MEDICAL_TRAY = [
  {
    item: "Sterile Gloves",
    quantity: 100,
    expiryDate: "2024-12-31",
  },
  {
    item: "Bandages",
    quantity: 50,
    expiryDate: "2024-10-15",
  },
  {
    item: "Antiseptic Solution",
    quantity: 200,
    expiryDate: "2025-02-28",
  },
  {
    item: "Disposable Syringes",
    quantity: 75,
    expiryDate: "2024-11-30",
  },
  {
    item: "Painkillers",
    quantity: 30,
    expiryDate: "2024-09-20",
  },
  {
    item: "First Aid Manual",
    quantity: 10,
    expiryDate: "N/A", // Assuming no expiry for manual
  },
  {
    item: "Thermometer",
    quantity: 5,
    expiryDate: "N/A", // Assuming no expiry for thermometer
  },
  {
    item: "Medical Masks",
    quantity: 100,
    expiryDate: "2024-11-15",
  },
  {
    item: "Blood Pressure Cuff",
    quantity: 15,
    expiryDate: "N/A", // Assuming no expiry for cuff
  },
  {
    item: "Medical Scissors",
    quantity: 20,
    expiryDate: "N/A", // Assuming no expiry for scissors
  },
];
