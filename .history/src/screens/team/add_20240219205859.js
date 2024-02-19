import { Button } from "react-native-paper";

import { StyleSheet, View } from "react-native";
import React from "react";

import { colors } from "../../constants";
import Header from "../../components/header";
import { TextInput } from "../../components/form";

export default function AddTeamScreen({ navigation }) {
  const [data, setData] = React.useState({
    email: "",
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
      <Header title="Edit Profile" />

      <View style={{ padding: 10 }}>
        <TextInput
          label="Email"
          value={data.email}
          autoCapitalize={"none"}
          error={errors.email}
          onChangeText={(text) => setData({ ...data, email: text })}
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
          Invite
        </Button>
      </View>
      <View style={{ height: 100 }} />
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

const styles = StyleSheet.create({
  coverCamera: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
    zIndex: 3,
  },
});
