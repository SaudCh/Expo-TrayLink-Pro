import { Feather } from "@expo/vector-icons";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo } from "react";

import { colors } from "../../constants";
import SearchBar from "../../components/seachBar";
import { useAuth, useFirebase } from "../../hooks";
import EmptyData from "../../components/empty";
import { where } from "firebase/firestore";
import axios from "axios";

export default function InvitationScreen({ navigation }) {
  const { team, profile } = useAuth();
  const { getDocuments } = useFirebase();
  const [search, setSearch] = React.useState("");
  const [teams, setTeams] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (team?.id) getFacilities();
  }, [team?.id]);

  const filterData = useMemo(() => {
    return teams.filter((item) => {
      return item.email.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, teams]);

  const handleDelete = async (index, setLoading) => {
    setLoading(true);
    await axios
      .delete(`remove-invitation/${index}`)
      .then((res) => {
        Alert.alert("Success", "Invitation deleted successfully");
        getFacilities();
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", "An error occurred");
      })
      .finally(() => setLoading(false));
  };

  const getFacilities = async () => {
    const res = await getDocuments("invitation", setLoading, [
      where("teamId", "==", team?.id),
    ]);

    if (res.error) return Alert.alert("Error", res.error);

    setTeams(res.data);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getFacilities();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search Invitations"
        width="90%"
        cusStyles={{ marginVertical: 10 }}
      />
      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card
            item={item}
            index={index}
            handleDelete={handleDelete}
            leader={profile?.role === "leader"}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyData
            text="No invitation found"
            loading={loading}
            onPress={handleRefresh}
          />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

const Card = ({ item, handleDelete, leader }) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        margin: 5,
        borderBottomColor: colors.grey,
      }}
    >
      <Text style={{ color: colors.grey, flex: 1 }}>{item.email}</Text>
      {leader && (
        <>
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
                      onPress: () => handleDelete(item.email, setLoading),
                    },
                  ]
                );
              }}
            >
              <Feather name="trash-2" size={18} color={colors.danger} />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};
