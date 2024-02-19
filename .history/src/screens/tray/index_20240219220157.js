import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import { colors } from "../../constants";
import SearchBar from "../../components/seachBar";
import { screens } from "../../routes/screens";

export default function TraysScreen({ navigation }) {
  const [search, setSearch] = React.useState("");

  const filterData = React.useMemo(() => {
    return MEDICAL_TRAY.filter((item) => {
      return item.item.toLowerCase().includes(search.toLowerCase());
    });
  }, [search]);

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
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search Tray Category"
        width="90%"
        cusStyles={{ marginVertical: 10 }}
      />
      <FlatList
        data={filterData}
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
            onPress={() => navigation.navigate(screens.trayType)}
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
    </Container>
  );
}

const styles = StyleSheet.create({});

const MEDICAL_TRAY = [
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
  { item: "Gynecology" },
  { item: "Urology" },
  { item: "Ophthalmic" },
  { item: "Dental" },
  { item: "ENT" },
  { item: "Anesthesia" },
  { item: "Endoscopy" },
  { item: "Laparoscopy" },
  { item: "Arthroscopy" },
  { item: "Microsurgery" },
  { item: "Laser" },
  { item: "Cryo" },
  { item: "Ultrasound" },
  { item: "X-ray" },
  { item: "CT" },
  { item: "MRI" },
  { item: "PET" },
  { item: "SPECT" },
  { item: "Angiography" },
  { item: "Fluoroscopy" },
  { item: "Mammography" },
  { item: "Dexa" },
  { item: "ECG" },
  { item: "EEG" },
  { item: "EMG" },
  { item: "EKG" },
  { item: "Holter" },
  { item: "ABPM" },
  { item: "Spirometry" },
  { item: "Treadmill" },
  { item: "Echo" },
  { item: "Stress" },
  { item: "Pacemaker" },
  { item: "Defibrillator" },
  { item: "Ventilator" },
  { item: "Anesthesia" },
  { item: "Suction" },
  { item: "Infusion" },
  { item: "Syringe" },
  { item: "Pump" },
  { item: "Monitor" },
  { item: "ECG" },
  { item: "EEG" },
  { item: "EMG" },
  { item: "EKG" },
  { item: "Holter" },
  { item: "ABPM" },
  { item: "Spirometry" },
  { item: "Treadmill" },
  { item: "Echo" },
];
