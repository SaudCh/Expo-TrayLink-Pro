import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import { colors } from "../../constants";

export default function FacilityScreen() {
  return (
    <Container>
      <Header
        title={"Trays"}
        back={false}
        headerRight={() => (
          <TouchableOpacity>
            <Text
              style={{ fontSize: 16, color: colors.secondary, marginRight: 10 }}
            >
              Add
            </Text>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});

const MEDICAL_TRAY = [
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
