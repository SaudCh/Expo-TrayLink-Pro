import { Feather } from "@expo/vector-icons";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import Modalize from "../modalize";
import { colors } from "../../constants";

export default function CategoryModal({ categoryRef, onPress, selected }) {
  return (
    <Modalize bsref={categoryRef}>
      {CATEGORIES.map((item, index) => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: colors.lightGrey,
            backgroundColor:
              selected === item.item ? colors.lightGrey : "white",
          }}
          onPress={() => {
            onPress(item.item);
          }}
          key={index}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: colors.grey,
            }}
          >
            {item.item}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.editFacility)}
            style={{ marginRight: 10 }}
          >
            <Feather name="edit" size={18} color={colors.secondary} />
          </TouchableOpacity>
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
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={{
          padding: 10,
          paddingVertical: 15,
          backgroundColor: "white",
        }}
        onPress={() => {}}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: colors.primary,
            textAlign: "center",
          }}
        >
          Add New Category
        </Text>
      </TouchableOpacity>
      <View style={{ height: 50 }} />
    </Modalize>
  );
}

const styles = StyleSheet.create({});

const CATEGORIES = [
  { item: "Knee" },
  { item: "Hip" },
  { item: "Trauma" },
  { item: "Spine" },
  { item: "Cranial" },
  { item: "Maxillofacial" },
  { item: "Neurosurgery" },
  { item: "Cardiothoracic" },
  { item: "Vascular" },
  { item: "Orthopedic" },
  { item: "Plastic" },
  { item: "General" },
];
