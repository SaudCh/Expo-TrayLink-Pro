import { where } from "firebase/firestore";

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
import { colors } from "../../constants";
import SearchBar from "../../components/seachBar";
import { screens } from "../../routes/screens";
import { useFirebase } from "../../hooks";
import EmptyData from "../../components/empty";

export default function TraysScreen({ navigation, route }) {
  const { facility = "", category } = route.params;

  const { getDocuments } = useFirebase();

  const [search, setSearch] = React.useState("");
  const [types, setTypes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const filterData = React.useMemo(() => {
    return types.filter((item) => {
      return item?.name?.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, types]);

  React.useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    const res = await getDocuments("types", setLoading, [
      where("category", "==", category),
    ]);

    if (res?.error) return Alert.alert("Error", res.error);

    setTypes(res.data);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getTypes();
    setRefreshing(false);
  };

  return (
    <Container>
      <Header title={"Tray Type"} />
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
            onPress={() =>
              navigation.navigate(screens.result, {
                facility,
                category,
                type: item.id,
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
            text="No tray type found"
            loading={loading}
            onPress={handleRefresh}
          />
        }
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
