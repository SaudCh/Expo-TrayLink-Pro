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
      <FlatList
        data={CATEGORIES}
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
            onPress={() => {
              onPress(item.item);
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
                {item.item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
