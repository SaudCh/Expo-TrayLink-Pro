import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modalize from "../modalize";

export default function CategoryModal({ categoryRef, data, setData }) {
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
              setData({ ...data, category: item.item });
              categoryRef.current.close();
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
