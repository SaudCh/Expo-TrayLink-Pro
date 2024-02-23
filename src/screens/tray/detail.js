import { Button } from "react-native-paper";

import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";

import Header from "../../components/header";
import { ButtonInput, TextInput } from "../../components/form";
import CategoryModal from "../../components/tray/category";
import TypeModal from "../../components/tray/type";
import Container from "../../components/container";
import FacilityModal from "../../components/tray/facility";
import { useAuth, useFirebase } from "../../hooks";
import { where } from "firebase/firestore";
import QRCode from "react-native-qrcode-svg";
import { downloadBase64 } from "../../utils";

export default function AddTrayScreen({ navigation, route }) {
  const { id } = route.params;
  const categoryRef = React.useRef();
  const typeRef = React.useRef();
  const facilityRef = React.useRef();

  const { getDocuments, updateDocument, getReferece, getDocumentById } =
    useFirebase();
  const { team } = useAuth();

  const [data, setData] = React.useState({
    email: "",
    number: "",
    category: "",
    type: "",
    facility: "",
  });

  const qrRef = React.useRef();
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [facilities, setFacilities] = React.useState([]);

  useEffect(() => {
    getCategories();
    getFacilities();
  }, []);

  useEffect(() => {
    const { category, type, facility, name, number } = route.params;
    setData({
      category,
      type,
      facility,
      name,
      number,
    });
    getTray();
  }, [id]);

  useEffect(() => {
    if (data.category) getTypes();
  }, [data.category]);

  const handleSubmit = async () => {
    const error = validateData(data);

    setErrors(error);
    if (Object.keys(error).length > 0) return;

    const res = await updateDocument(
      "trays",
      route.params.id,
      {
        ...data,
        categoryRef: getReferece("categories", data.category),
        typeRef: getReferece("types", data.type),
        facilityRef: data.facility
          ? getReferece("facilities", data.facility)
          : "",
      },
      setLoading
    );

    if (res?.error) return Alert.alert("Error", res.error);

    Alert.alert("Success", "Tray updated successfully");
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

  const getTray = async () => {
    const res = await getDocumentById("trays", id);
    if (res?.error) return Alert.alert("Error", res.error);
    setData(res.data);
  };

  const saveQRCode = async () => {
    // save QR Code in gallery
    qrRef.current.toDataURL((data) => {
      downloadBase64(data, setLoading);
    });
  };

  return (
    <Container>
      <Header title="Update Tray" />

      <ScrollView style={{ padding: 10 }}>
        <View style={{ alignItems: "center" }}>
          <QRCode
            getRef={(ref) => (qrRef.current = ref)}
            value={"https://trylinkpro.com/TrayDetailScreen/" + id}
            // value={"trylinkpro://details/" + id}
            size={150}
            color="black"
            backgroundColor="white"
          />
        </View>
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
          Update
        </Button>

        <Button
          mode="text"
          style={{
            borderRadius: 10,
            marginTop: 20,
            justifyContent: "center",
          }}
          onPress={() => {
            // Save QR Code
            saveQRCode();
          }}
          loading={loading}
          disabled={loading}
        >
          Save QR Code
        </Button>
      </ScrollView>
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

  return errors;
};

const styles = StyleSheet.create({});
