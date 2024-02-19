import { Button } from "react-native-paper";

import { StyleSheet, View } from "react-native";
import React from "react";

import { colors } from "../../constants";
import Header from "../../components/header";
import { TextInput } from "../../components/form";

export default function AddFacilityScreen({ navigation }) {
  const [data, setData] = React.useState({
    name: "",
    address: "",
  });

  const [errors, setErrors] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    const error = validateData(data);

    setErrors(error);
    if (Object.keys(error).length > 0) return;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
      }}
    >
      <Header title="Add Facility" />

      <View style={{ padding: 10 }}>
        <TextInput
          label="Name"
          value={data.name}
          error={errors.name}
          onChangeText={(text) => setData({ ...data, name: text })}
        />

        <TextInput
          label="Address"
          value={data.address}
          error={errors.address}
          onChangeText={(text) => setData({ ...data, address: text })}
        />

        <Button
          mode="contained"
          style={{
            borderRadius: 10,
            marginTop: 20,
            justifyContent: "center",
          }}
          textColor="#fff"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
        >
          Add
        </Button>
      </View>
      <View style={{ height: 100 }} />
    </View>
  );
}

const validateData = (data) => {
  const errors = {};

  if (!data.name) errors.name = "Name is required";

  if (!data.address) errors.address = "Address is required";

  return errors;
};

const styles = StyleSheet.create({});
