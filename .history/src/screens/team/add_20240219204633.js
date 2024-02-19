import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { getAvatarUrl } from "../../utils";
import { colors } from "../../constants";
import Container from "../../components/container";
import Header from "../../components/header";
import { screens } from "../../routes/screens";
import { useAuth } from "../../hooks";
import { ButtonInput, TextInput } from "../../components/form";

export default function AddTeamScreen({ navigation }) {
  const { logout } = useAuth();
  const [data, setData] = React.useState({
    name: "John Doe",
    email: "john@gmail.com",
    phone: "",
    username: "johndoe",
  });

  const [errors, setErrors] = React.useState({});
  const [avatar, setAvatar] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  };

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
        />

        <Button
          mode="contained"
          style={{
            height: 54.3,
            borderRadius: 10,
            marginTop: 20,
            justifyContent: "center",
          }}
          textColor="#fff"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
        >
          Save Changes
        </Button>
      </View>
      <View style={{ height: 100 }} />
    </View>
  );
}

const validateData = (data) => {
  const errors = {};

  if (!data.firstname) errors.firstname = "First name is required";
  if (!data.lastname) errors.lastname = "Last name is required";
  if (!data.email) errors.email = "Email is required";

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
