import { Feather } from "@expo/vector-icons";

import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import Modalize from "../modalize";
import { colors } from "../../constants";
import { useAuth, useFirebase } from "../../hooks";

export default function SubcategoryModal({
  mdlRef,
  onPress,
  selected,
  getTypes,
  types = [],
  category,
}) {
  const { team } = useAuth();
  const { updateDocument, addDocument, deleteDocument } = useFirebase();
  const [loading, setLoading] = React.useState(false);

  const editType = async (id, name) => {
    if (!name) return Alert.alert("Error", "Type name is required");

    const res = await updateDocument("types", id, { name: name }, setLoading);

    if (res?.error) return Alert.alert("Error", res.error);

    setLoading(true);
    await getTypes();
    setLoading(false);
  };

  const addType = async (name) => {
    if (!name) return Alert.alert("Error", "Type name is required");

    const res = await addDocument(
      "types",
      {
        name: name,
        category: category,
        teamId: team.id,
      },
      setLoading
    );

    if (res?.error) return Alert.alert("Error", res.error);

    setLoading(true);
    await getTypes();
    setLoading(false);
  };

  const deleteType = async (id) => {
    const res = await deleteDocument("types", id, setLoading);

    if (res?.error) return Alert.alert("Error", res.error);

    setLoading(true);
    await getTypes();
    setLoading(false);
  };

  return (
    <Modalize bsref={mdlRef}>
      {types.map((item, index) => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: colors.lightGrey,
            backgroundColor: selected === item.id ? colors.lightGrey : "white",
          }}
          onPress={() => {
            onPress(item.id);
          }}
          key={index}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: colors.grey,
              flex: 1,
            }}
          >
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Alert.prompt(
                "Edit Type",
                "Update type name",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: (text) => {
                      editType(item.id, text);
                    },
                  },
                ],
                "plain-text",
                item.name
              );
            }}
            style={{ marginRight: 10 }}
          >
            <Feather name="edit" size={18} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Are you sure?",
                "You want to delete this category?",
                [
                  {
                    text: "No",
                    onPress: () => {},
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      deleteType(item.id);
                    },
                  },
                ]
              );
            }}
          >
            <Feather name="trash-2" size={18} color={colors.danger} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={{
          padding: 10,
          paddingVertical: 15,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          Alert.prompt(
            "Add Type",
            "Enter new type name",
            [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "OK",
                onPress: (text) => {
                  addType(text);
                },
              },
            ],
            "plain-text"
          );
        }}
      >
        {loading && (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{ marginRight: 10 }}
          />
        )}
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: colors.primary,
            textAlign: "center",
          }}
        >
          Add New Type
        </Text>
      </TouchableOpacity>
      <View style={{ height: 50 }} />
    </Modalize>
  );
}

const styles = StyleSheet.create({});

const TRAY_TYPES = [
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
