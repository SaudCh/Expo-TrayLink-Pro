import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";

import { getAvatarUrl } from "../../utils";
import { colors } from "../../constants";
import Container from "../../components/container";
import Header from "../../components/header";
import { screens } from "../../routes/screens";
import { useAuth, useFirebase } from "../../hooks";
import { ButtonInput, TextInput } from "../../components/form";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { fire } from "react-native-alertbox";
import DecodeError from "../../utils/decodeError";

export default function EditProfileScreen({ navigation }) {
  const user = auth.currentUser;
  const { profile, logout, getProfile, team } = useAuth();
  const { updateDocument, uploadImage, deleteDocument } = useFirebase();

  const [data, setData] = React.useState({
    name: "",
    email: "",
    phone: "",
    username: "",
  });

  const [errors, setErrors] = React.useState({});
  const [avatar, setAvatar] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      teamName: profile.teamName,
    });
  }, []);

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

    const avatarRes = avatar
      ? await uploadImage(avatar, setLoading)
      : {
          status: 200,
          data: profile.avatar || "",
        };

    const res = await updateDocument(
      "users",
      profile.id,
      {
        ...data,
        avatar: avatarRes?.data,
      },
      setLoading
    );

    if (res?.error) return Alert.alert("Error", res.error);

    if (data.teamName !== profile.teamName) {
      const teamRes = await updateDocument(
        "teams",
        profile.teamId,
        {
          name: data.teamName,
        },
        setLoading
      );

      if (teamRes?.error) return Alert.alert("Error", teamRes.error);
    }

    Alert.alert("Success", "Profile updated successfully");

    getProfile(profile.id);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      logout();
    });
  };

  const handleDelete = async (password) => {
    console.log(password);
    try {
      setLoading(true);
      const credential = EmailAuthProvider.credential(profile.email, password);

      console.log(credential);

      await reauthenticateWithCredential(user, credential);

      if (!team?.id) throw new Error("An error occurred");

      const res = await updateDocument("teams", team?.id, {
        members: arrayRemove(profile.id),
      });

      if (res?.error) throw new Error("An error occurred");

      const res2 = await updateDocument("users", profile.id, { teamId: "" });

      if (res2?.error) {
        await updateDocument("teams", team?.id, {
          members: arrayUnion(profile.id),
        });
        throw new Error("An error occurred");
      }

      await user.delete().then(() => {
        setLoading(false);
        logout();
      });
    } catch (error) {
      const errorCode = error.code;
      Alert.alert("Error", DecodeError(errorCode));
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header title="Edit Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            borderRadius: 2,
            borderColor: "#fff",
            borderWidth: 2,
            width: 82,
            height: 82,
            borderRadius: 60,
            marginLeft: 20,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              width: 80,
              height: 80,
              borderRadius: 50,
              backgroundColor: "#rgba(0,0,0,0.5)",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          />
          <Image
            source={
              avatar ? { uri: avatar?.uri } : getAvatarUrl(profile.avatar)
            }
            style={{ width: 80, height: 80, borderRadius: 50 }}
          />
          <TouchableOpacity style={styles.icon} onPress={pickAvatar}>
            <Ionicons name="camera-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10 }}>
          <TextInput
            label="Name"
            value={data.name}
            onChangeText={(text) => setData({ ...data, name: text })}
            error={errors.name}
          />

          <TextInput
            label="Email"
            value={data.email}
            autoCapitalize={"none"}
            error={errors.email}
            disabled
          />

          {profile.role === "leader" && (
            <TextInput
              label="Team Name"
              value={data.teamName}
              onChangeText={(text) => setData({ ...data, teamName: text })}
              error={errors.teamName}
            />
          )}
          <TextInput
            label="Phone"
            value={data.phone}
            onChangeText={(text) => setData({ ...data, phone: text })}
            error={errors.phone}
            keyboardType="phone-pad"
          />

          <ButtonInput
            label="Password"
            onPress={() => {
              navigation.navigate(screens.updatePassword);
            }}
            iconText="Change"
            value={"*********"}
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

          <Button
            mode="text"
            style={{
              height: 54.3,
              borderRadius: 10,
              marginTop: 10,
              justifyContent: "center",
            }}
            textColor={colors.danger}
            onPress={() => {
              Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      handleLogout();
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            Logout
          </Button>

          <Button
            mode="text"
            style={{
              height: 54.3,
              borderRadius: 10,
              marginTop: 10,
              justifyContent: "center",
            }}
            textColor={colors.danger}
            onPress={() => {
              if (Platform.OS === "ios") {
                Alert.prompt(
                  "Delete Account",
                  "Enter your password to delete your account",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: (password) => {
                        handleDelete(password);
                      },
                    },
                  ],
                  "secure-text"
                );
              } else {
                fire({
                  title: "Delete Account",
                  message: "Enter your password to delete your account",
                  actions: [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: (data) => {
                        handleDelete(data.password);
                      },
                    },
                  ],
                  fields: [
                    {
                      name: "password",
                      label: "Password",
                      placeholder: "Enter your password",
                      secureTextEntry: true,
                    },
                  ],
                });
              }
            }}
          >
            Delete Account
          </Button>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </Container>
  );
}

const validateData = (data) => {
  const errors = {};

  if (!data.name) errors.firstname = "Name is required";
  if (!data.email) errors.email = "Email is required";
  if (!data.phone) errors.phone = "Phone number is required";
  if (!data.teamName) errors.teamName = "Team name is required";

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
