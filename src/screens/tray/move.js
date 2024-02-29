import { Feather } from "@expo/vector-icons";
import { where } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";

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
import SearchBar from "../../components/seachBar";
import { colors } from "../../constants";
import { screens } from "../../routes/screens";
import { useAuth, useFirebase } from "../../hooks";
import { useFocusEffect } from "@react-navigation/native";
import EmptyData from "../../components/empty";
import { Button } from "react-native-paper";
import MoveFacilityModal from "../../components/tray/moveFacility";

export default function ResultScreen({ navigation, route }) {
  const { team } = useAuth();
  const { getDocuments, updateDocument } = useFirebase();
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [trays, setTrays] = React.useState([]);

  const [categories, setCategories] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [facilities, setFacilities] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const facilityRef = React.useRef();
  const [selected, setSelected] = React.useState([]);
  const [isSelect, setIsSelect] = React.useState(false);

  const filterData = React.useMemo(() => {
    return trays.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.number.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search, trays]);

  useFocusEffect(
    React.useCallback(() => {
      if (!team?.id) return;
      getTrays();
    }, [team?.id])
  );

  useEffect(() => {
    if (!team?.id) return;
    getCategories();
    getTypes();
    getFacilities();
  }, [team?.id]);

  const getTrays = async () => {
    const res = await getDocuments("trays", setLoading, [
      where("teamId", "==", team.id),
    ]);

    if (res?.error) return Alert.alert("Error", res.error);

    setTrays(res?.data || []);
  };

  const getCategories = async () => {
    const res = await getDocuments("categories", setLoading, [
      where("teamId", "==", team?.id),
    ]);
    if (res?.error) return Alert.alert("Error", res.error);
    setCategories(res?.data || []);
  };

  const getTypes = async () => {
    const res = await getDocuments("types", setLoading, [
      where("teamId", "==", team?.id),
    ]);
    if (res?.error) return Alert.alert("Error", res.error);
    setTypes(res?.data || []);
  };

  const getFacilities = async () => {
    const res = await getDocuments("facilities", setLoading, [
      where("teamId", "==", team?.id),
    ]);
    if (res?.error) return Alert.alert("Error", res.error);
    setFacilities(res?.data || []);
  };

  const getName = (id, data) => {
    if (!id) return "N/A";
    const item = data.find((item) => item.id === id);
    return item?.name || "N/A";
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getTrays();
    setRefreshing(false);
  };

  const moveArray = async (selected, facilityId) => {
    facilityRef.current?.close();
    for (let i = 0; i < selected.length; i++) {
      const tray = trays.find((item) => item.id === selected[i]);
      if (!tray) continue;
      const res = await updateDocument(
        "trays",
        tray.id,
        {
          facility: facilityId,
        },
        setLoading
      );
      if (res?.error) return Alert.alert("Error", res.error);

      if (i === selected.length - 1) {
        setIsSelect(false);
        setSelected([]);
        handleRefresh();
      }
    }
  };

  return (
    <Container>
      <Header back={false} title={"Move Tray"} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <SearchBar
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Search Tray"
          width="85%"
          cusStyles={{ marginVertical: 10 }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(screens.qrScanner)}
        >
          <MaterialIcons
            name="qr-code-scanner"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: colors.lightGrey,
              alignItems: "center",
            }}
            onPress={() => {
              if (isSelect) {
                if (selected.includes(item.id)) {
                  setSelected((prev) => prev.filter((id) => id !== item.id));
                  if (selected.length === 1) setIsSelect(false);
                  return;
                } else {
                  setSelected((prev) => [...prev, item.id]);
                  return;
                }

                return;
              }

              navigation.navigate(screens.trayDetail, {
                id: item.id,
                name: item.name,
                number: item.number,
                category: item.category,
                type: item.type,
                facility: item.facility,
              });
            }}
            onLongPress={() => {
              if (isSelect) return;

              setIsSelect(true);
              setSelected((prev) => {
                if (prev.includes(item.id)) {
                  return prev.filter((id) => id !== item.id);
                }
                return [...prev, item.id];
              });
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: colors.primary,
                }}
              >
                {item.name}
              </Text>
              <Text style={{ fontSize: 12, color: colors.grey }}>
                {getName(item.category, categories) +
                  " - " +
                  getName(item.type, types)}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: colors.grey,
                }}
              >
                {item.number}
              </Text>
              <Text style={{ fontSize: 12, color: colors.grey }}>
                {getName(item.facility, facilities)}
              </Text>
            </View>
            {isSelect ? (
              <Feather
                name={selected.includes(item.id) ? "check" : "circle"}
                size={16}
                color={colors.primary}
              />
            ) : (
              <Feather name="chevron-right" size={24} color={colors.grey} />
            )}
          </TouchableOpacity>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <EmptyData
            text="No tray found"
            loading={loading}
            onPress={handleRefresh}
          />
        }
      />

      {isSelect && (
        <View
          style={{
            position: "absolute",
            bottom: 20,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Button
            mode="contained"
            onPress={() => {
              setIsSelect(false);
              setSelected([]);
            }}
            style={{
              width: "40%",
            }}
            buttonColor={colors.primaryLight}
            textColor={colors.primary}
            disabled={loading}
            loading={loading}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              if (selected.length === 0) {
                setIsSelect(false);
                return;
              }
              facilityRef.current?.open();
              // setIsSelect(false);
              // setSelected([]);
            }}
            style={{
              width: "40%",
            }}
            loading={loading}
            disabled={loading}
          >
            Move
          </Button>
        </View>
      )}
      <MoveFacilityModal
        mdlRef={facilityRef}
        onPress={(id) => {
          console.log(id);
          console.log(selected);
          const facilityName = getName(id, facilities);
          Alert.alert(
            "Move",
            "Are you sure you want to move " +
              selected.length +
              " tray(s) to facility " +
              facilityName +
              "?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: async () => {
                  moveArray(selected, id);
                },
              },
            ]
          );
        }}
        // selected={selected}
        facilities={facilities}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
