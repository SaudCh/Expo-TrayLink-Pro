import { Button } from "react-native-paper";

import { StyleSheet, View } from "react-native";
import React from "react";

import { colors } from "../../constants";
import Header from "../../components/header";
import { ButtonInput, TextInput } from "../../components/form";
import CategoryModal from "../../components/tray/category";
import TypeModal from "../../components/tray/type";
import Container from "../../components/container";
import FacilityModal from "../../components/tray/facility";

export default function AddTeamScreen({ navigation }) {
  const categoryRef = React.useRef();
  const typeRef = React.useRef();
  const facilityRef = React.useRef();

  const [data, setData] = React.useState({
    email: "",
    number: "",
    category: "",
    type: "",
    facility: "",
  });

  const [errors, setErrors] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    const error = validateData(data);

    setErrors(error);
    if (Object.keys(error).length > 0) return;
  };

  return (
    <Container>
      <Header title="Add Tray" />

      <View style={{ padding: 10 }}>
        <TextInput
          label="Name"
          value={data.name}
          error={errors.name}
          onChangeText={(text) => setData({ ...data, name: text })}
        />

        <TextInput
          label="Number"
          value={data.number}
          autoCapitalize={"none"}
          error={errors.number}
          onChangeText={(text) => setData({ ...data, number: text })}
          keyboardType="numeric"
        />

        <ButtonInput
          label="Category"
          value={data.category}
          error={errors.category}
          onPress={() => {
            categoryRef.current.open();
          }}
        />

        {data.category && (
          <ButtonInput
            label="Type"
            value={data.type}
            error={errors.type}
            onPress={() => {
              typeRef.current.open();
            }}
          />
        )}

        <ButtonInput
          label="Facility"
          value={data.facility}
          error={errors.facility}
          onPress={() => {
            facilityRef.current.open();
          }}
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
          Submit
        </Button>
      </View>
      <CategoryModal
        mdlRef={categoryRef}
        selected={data.category}
        onPress={(item) => {
          setData({ ...data, category: item });
          categoryRef.current.close();
        }}
      />
      <TypeModal
        mdlRef={typeRef}
        selected={data.type}
        onPress={(item) => {
          setData({ ...data, type: item });
          typeRef.current.close();
        }}
      />
      <FacilityModal
        mdlRef={facilityRef}
        selected={data.facility}
        onPress={(item) => {
          setData({ ...data, facility: item });
          facilityRef.current.close();
        }}
      />
    </Container>
  );
}

const validateData = (data) => {
  const errors = {};

  if (!data.name) errors.name = "Email is required";

  return errors;
};

const styles = StyleSheet.create({});
