import { Button } from "react-native-paper";

import { Alert, StyleSheet, View } from "react-native";
import React from "react";

import { colors } from "../../constants";
import Header from "../../components/header";
import { TextInput } from "../../components/form";
import axios from "axios";
import { useAuth, useFirebase } from "../../hooks";
import Container from "../../components/container";
import { where } from "firebase/firestore";

export default function AddTeamScreen({ navigation }) {
  const { getDocuments } = useFirebase();
  const { team, profile } = useAuth();
  const [data, setData] = React.useState({
    email: "",
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    const error = validateData(data);

    if (!team?.id) {
      Alert.alert("Team not found");
      return;
    } else if (profile?.role !== "leader") {
      Alert.alert("You are not authorized to invite team members");
      return;
    }

    setErrors(error);
    if (Object.keys(error).length > 0) return;

    const res = await getDocuments("users", setLoading, [
      where("email", "==", data.email),
      where("teamId", "!=", ""),
    ]);

    if (res.error) return Alert.alert("Error", res.error);

    if (res.data.length > 0) {
      Alert.alert("Error", "User is already a member of a team");
      return;
    }

    setLoading(true);
    await axios
      .post("invite-user", {
        email: data.email,
        teamId: team.id,
        name: profile?.name || "Team Leader",
      })
      .then(() => {
        setLoading(false);
        setData({ email: "" });
        Alert.alert("Invitation sent successfully");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Container modal={true}>
      <Header title="Add Team Member" />

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
    </Container>
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
