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
      ))}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGrey,
          backgroundColor: "white",
        }}
        onPress={() => {
          onPress("");
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: colors.grey,
            }}
          >
            Add New Category
          </Text>
        </View>
      </TouchableOpacity>
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
