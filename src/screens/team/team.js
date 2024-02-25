import { Feather } from "@expo/vector-icons";

import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo } from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import { colors } from "../../constants";
import SearchBar from "../../components/seachBar";
import { screens } from "../../routes/screens";
import { useAuth, useFirebase } from "../../hooks";
import EmptyData from "../../components/empty";
import { arrayRemove, where } from "firebase/firestore";

export default function MembersScreen({ navigation }) {
  const { team, profile } = useAuth();
  const { getDocuments, updateDocument } = useFirebase();
  const [search, setSearch] = React.useState("");
  const [teams, setTeams] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (team?.id) getFacilities();
  }, [team?.id]);

  const filterData = useMemo(() => {
    return teams.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search, teams]);

  const handleDelete = async (uid) => {
    if (profile?.role !== "leader") {
      return Alert.alert(
        "Error",
        "You are not authorized to perform this action"
      );
    }

    const res = await updateDocument("users", uid, { teamId: "" });

    if (res?.error) return Alert.alert("Error", "An error occurred");

    const res2 = await updateDocument("teams", team?.id, {
      members: arrayRemove(uid),
    });

    if (res2?.error) {
      await updateDocument("users", uid, { teamId: team?.id });
      return Alert.alert("Error", "An error occurred");
    }

    Alert.alert("Success", "Team member removed successfully");
    getFacilities();
  };

  const getFacilities = async () => {
    const res = await getDocuments("users", setLoading, [
      where("teamId", "==", team?.id),
    ]);

    if (res?.error) return;

    setTeams(res?.data);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getFacilities();
    setRefreshing(false);
  };

  const makeAdmin = async (uid) => {
    if (profile?.role !== "leader") {
      return Alert.alert(
        "Error",
        "You are not authorized to perform this action"
      );
    }

    const res = await updateDocument("users", uid, { role: "leader" });

    if (res?.error) return Alert.alert("Error", "An error occurred");

    Alert.alert("Success", "User is now an admin");
    getFacilities();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
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
          <Card
            item={item}
            handleDelete={(id) => handleDelete(id)}
            leader={profile?.role === "leader"}
            makeAdmin={(id) => makeAdmin(id)}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyData
            text="No team member found"
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

const Card = ({ item, handleDelete, leader, makeAdmin }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
      }}
      disabled={!leader}
      onLongPress={() => {
        // make admin
        if (item.role === "leader")
          return Alert.alert("Error", "User is admin");
        Alert.alert("Are you sure?", "You want to make this user an admin?", [
          {
            text: "No",
            onPress: () => {},
          },
          {
            text: "Yes",
            onPress: () => makeAdmin(item?.id),
          },
        ]);
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
              {item?.name?.charAt(0)}
            </Text>
          )}
        </View>
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={{ fontSize: 16, color: colors.primary }}>
            {item.name}
          </Text>
          <Text style={{ color: colors.grey }}>{item.email}</Text>
        </View>
        {leader && (
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
                    onPress: () => handleDelete(item?.id),
                  },
                ]
              );
            }}
          >
            <Feather name="trash-2" size={18} color={colors.danger} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};
