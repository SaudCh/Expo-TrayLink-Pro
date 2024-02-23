import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { where } from "firebase/firestore";

import {
  FlatList,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useMemo } from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import { colors } from "../../constants";
import { screens } from "../../routes/screens";
import SearchBar from "../../components/seachBar";
import { useAuth, useFirebase } from "../../hooks";

export default function FacilityScreen({ navigation }) {
  const { profile } = useAuth();
  const { getDocuments, deleteDocument } = useFirebase();
  const [search, setSearch] = React.useState("");
  const [facilities, setFacilities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getFacilities();
    }, [])
  );

  const filterData = useMemo(() => {
    return facilities.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, facilities]);

  const handleDelete = async (id, setLoading) => {
    const res = await deleteDocument("facilities", id, setLoading);
    if (res?.error) return Alert.alert("Error", res.error);
    getFacilities();
  };

  const handleEdit = (data) => {
    navigation.navigate(screens.editFacility, { facility: data });
  };

  const handlePress = (item) => {
    navigation.navigate(screens.trayCategory, { facility: item.id });
  };

  const getFacilities = async () => {
    const res = await getDocuments("facilities", setLoading, [
      where("teamId", "==", profile.teamId),
    ]);
    if (res?.error) return Alert.alert("Error", res.error);
    setFacilities(res.data);
  };

  return (
    <Container>
      <Header
        title={"Facility"}
        back={false}
        headerRight={() =>
          profile.role === "leader" && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.addFacility);
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.secondary,
                  marginRight: 10,
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          )
        }
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
          <Card
            item={item}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handlePress={handlePress}
          />
        )}
        refreshing={loading}
        onRefresh={getFacilities}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});

const Card = ({ item, handleDelete, handleEdit, handlePress }) => {
  const [loading, setLoading] = React.useState(false);

  return (
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
        onPress={() => handlePress(item)}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, color: colors.primary }}>
            {item.name}
          </Text>
          <Text style={{ color: colors.grey }}>{item.address}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleEdit(item)}
          style={{ marginRight: 10 }}
        >
          <Feather name="edit" size={18} color={colors.secondary} />
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
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
                    onPress: () => handleDelete(item.id, setLoading),
                  },
                ]
              );
            }}
          >
            <Feather name="trash-2" size={18} color={colors.danger} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};
