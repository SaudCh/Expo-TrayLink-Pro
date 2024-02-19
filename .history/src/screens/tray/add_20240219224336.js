import { Button } from "react-native-paper";

import { FlatList, StyleSheet, View } from "react-native";
import React from "react";

import { colors } from "../../constants";
import Header from "../../components/header";
import { ButtonInput, TextInput } from "../../components/form";
import Modalize from "../../components/modalize";

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
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
      }}
    >
      <Header title="Add Tray" />

      <View style={{ padding: 10 }}>
        <TextInput
          label="Name"
          value={data.email}
          autoCapitalize={"none"}
          error={errors.email}
          onChangeText={(text) => setData({ ...data, email: text })}
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
            onPress={() => {}}
          />
        )}

        <ButtonInput
          label="Facility"
          value={data.facility}
          error={errors.facility}
          onPress={() => {}}
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
    </View>
  );
}

const validateData = (data) => {
  const errors = {};

  if (!data.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(data.email))
    errors.email = "Email is not valid";

  return errors;
};

const styles = StyleSheet.create({});

const CATEGORIES = [
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
];
