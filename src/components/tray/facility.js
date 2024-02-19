import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import Modalize from "../modalize";
import { colors } from "../../constants";

export default function FacilityModal({ mdlRef, onPress, selected }) {
  return (
    <Modalize bsref={mdlRef}>
      {TRAY_TYPES.map((item, index) => (
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
              flex: 1,
            }}
          >
            {item.item}
          </Text>
        </TouchableOpacity>
      ))}
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
