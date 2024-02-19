import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import SearchBar from "../../components/seachBar";

export default function FacilityScreen() {
  const [search, setSearch] = React.useState("");
  return (
    <Container>
      <Header title={"Move Tray"} back={false} />
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search Tray"
        width="90%"
        cusStyles={{ marginVertical: 10 }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});

let TRAYS = [
  {
    name: "OrthoPro Surgical Tray",
    number: "TRAY001",
    category: "Orthopedic",
    type: "General",
    facility: "Hospital A",
  },
  {
    name: "NeuroCare Tray",
    number: "TRAY002",
    category: "Neurosurgery",
    type: "Specialized",
    facility: "Clinic B",
  },
  {
    name: "CardioVascu Tray",
    number: "TRAY003",
    category: "Cardiovascular",
    type: "Vascular",
    facility: "Medical Center C",
  },
  {
    name: "ENT Essentials Tray",
    number: "TRAY004",
    category: "Otolaryngology",
    type: "ENT",
    facility: "Surgery Center D",
  },
  {
    name: "DentalCare Kit",
    number: "TRAY005",
    category: "Dental",
    type: "General",
    facility: "Dental Clinic E",
  },
];
