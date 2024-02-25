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
import { colors } from "../../constants";
import SearchBar from "../../components/seachBar";
import { screens } from "../../routes/screens";
import { useAuth, useFirebase } from "../../hooks";
import { where } from "firebase/firestore";
import EmptyData from "../../components/empty";

export default function TraysScreen({ navigation }) {
  const { getDocuments } = useFirebase();
  const { team } = useAuth();
  const [search, setSearch] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const filterData = React.useMemo(() => {
    return categories.filter((item) => {
      return item?.name?.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, categories]);

  useEffect(() => {
    if (team?.id) getCategories();
  }, [team?.id]);

  const getCategories = async () => {
    const res = await getDocuments("categories", setLoading, [
      where("teamId", "==", team.id),
    ]);

    if (res?.error) return Alert.alert("Error", res.error);
    setCategories(res.data);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getCategories();
    setRefreshing(false);
  };

  return (
    <Container>
      <Header
        title={"Trays"}
        back={false}
        headerRight={() => (
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.addTray)}
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
        placeholder="Search Tray Category"
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
            onPress={() =>
              navigation.navigate(screens.trayType, {
                category: item.id,
              })
            }
          >
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: colors.grey,
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <EmptyData
            text={"No Tray Category found"}
            loading={loading}
            onPress={handleRefresh}
          />
        }
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
