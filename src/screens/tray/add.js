import { Button } from "react-native-paper";

import { Alert, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";

import Header from "../../components/header";
import { ButtonInput, TextInput } from "../../components/form";
import CategoryModal from "../../components/tray/category";
import TypeModal from "../../components/tray/type";
import Container from "../../components/container";
import FacilityModal from "../../components/tray/facility";
import { useAuth, useFirebase } from "../../hooks";
import { where } from "firebase/firestore";

export default function AddTrayScreen({ navigation }) {
  const categoryRef = React.useRef();
  const typeRef = React.useRef();
  const facilityRef = React.useRef();

  const { team } = useAuth();
  const { getDocuments, addDocument, getReferece } = useFirebase();

  const [data, setData] = React.useState({
    email: "",
    number: "",
    category: "",
    type: "",
    facility: "",
  });
  const [categories, setCategories] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [facilities, setFacilities] = React.useState([]);

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    getCategories();
    getFacilities();
  }, []);

  useEffect(() => {
    if (data.category) getTypes();
  }, [data.category]);

  const handleSubmit = async () => {
    const error = validateData(data);

    setErrors(error);
    if (Object.keys(error).length > 0) return;

    const res = await addDocument(
      "trays",
      {
        ...data,
        categoryRef: getReferece("categories", data.category),
        typeRef: getReferece("types", data.type),
        facilityRef: data.facility
          ? getReferece("facilities", data.facility)
          : "",
        teamId: team.id,
      },
      setLoading
    );

    if (res?.error) return Alert.alert("Error", res.error);

    Alert.alert("Success", "Tray added successfully");
    clearData();
  };

  const getCategories = async () => {
    const res = await getDocuments("categories", setLoading, [
      where("teamId", "==", team.id),
    ]);
    if (res?.error) return Alert.alert("Error", res.error);
    setCategories(res.data);
  };

  const getTypes = async () => {
    const res = await getDocuments("types", setLoading, [
      where("category", "==", data.category),
    ]);
    if (res?.error) return Alert.alert("Error", res.error);
    setTypes(res.data);
  };

  const getFacilities = async () => {
    const res = await getDocuments("facilities", setLoading, [
      where("teamId", "==", team.id),
    ]);
    if (res?.error) return Alert.alert("Error", res.error);
    setFacilities(res.data);
  };

  const clearData = () => {
    setData({
      email: "",
      number: "",
      category: "",
      type: "",
      facility: "",
    });
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
          // keyboardType="numeric"
        />

        <ButtonInput
          label="Category"
          value={categories.find((item) => item.id === data.category)?.name}
          error={errors.category}
          onPress={() => {
            categoryRef.current.open();
          }}
        />

        {data.category && (
          <ButtonInput
            label="Type"
            value={types.find((item) => item.id === data.type)?.name}
            error={errors.type}
            onPress={() => {
              typeRef.current.open();
            }}
          />
        )}

        <ButtonInput
          label="Facility"
          value={facilities.find((item) => item.id === data.facility)?.name}
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
          const type = item === data.category ? data.type : "";
          setData({ ...data, category: item, type });

          categoryRef.current.close();
        }}
        categories={categories}
        getCategories={getCategories}
      />
      <TypeModal
        mdlRef={typeRef}
        selected={data.type}
        onPress={(item) => {
          setData({ ...data, type: item });
          typeRef.current.close();
        }}
        types={types}
        getTypes={getTypes}
        category={data.category}
      />
      <FacilityModal
        mdlRef={facilityRef}
        selected={data.facility}
        onPress={(item) => {
          setData({ ...data, facility: item });
          facilityRef.current.close();
        }}
        facilities={facilities}
      />
    </Container>
  );
}

const validateData = (data) => {
  const errors = {};

  if (!data.name) errors.name = "Email is required";
  if (!data.number) errors.number = "Number is required";
  if (!data.category) errors.category = "Category is required";
  if (!data.type) errors.type = "Type is required";

  return errors;
};

const styles = StyleSheet.create({});
