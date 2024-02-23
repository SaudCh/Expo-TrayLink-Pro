import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";

import Modalize from "../modalize";
import { colors } from "../../constants";
import { useAuth, useFirebase } from "../../hooks";
import { where } from "firebase/firestore";

export default function FacilityModal({
  mdlRef,
  onPress,
  selected,
  facilities,
}) {
  return (
    <Modalize bsref={mdlRef}>
      {facilities.map((item, index) => (
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
        </TouchableOpacity>
      ))}
    </Modalize>
  );
}

const styles = StyleSheet.create({});
