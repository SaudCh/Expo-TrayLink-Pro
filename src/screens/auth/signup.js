import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-paper";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import React from "react";

import { colors } from "../../constants";
import { screens } from "../../routes/screens";
import { TextInput } from "../../components/form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import DecodeError from "../../utils/decodeError";
import { useAuth, useFirebase } from "../../hooks";
import { arrayUnion } from "firebase/firestore";

export default function SignupScreen({ navigation }) {
  const { login } = useAuth();
  const { addDocument, addDocumentWithId, deleteDocument } = useFirebase();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    email: "",
    phone: "",
    teamName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});
  const scrollRef = React.useRef();

  React.useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        scrollRef.current.scrollTo({ y: 0, animated: true });
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const setValue = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const signUp = async () => {
    const errors = validate(data);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const uid = user.user.uid;

      const team = {
        name: data.teamName,
        members: arrayUnion(uid),
      };

      const res = await addDocument("teams", team);

      if (res.error) {
        user.user.delete();
        Alert.alert("Error", res.error + ", rolling back changes");
        setLoading(false);
        return;
      }

      const profile = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        teamName: data.teamName,
        role: "leader",
        uid,
        teamId: res.data.id,
      };

      const res2 = await addDocumentWithId("users", uid, profile);

      if (res2.error) {
        user.user.delete();
        await deleteDocument("teams", res.data.id);
        Alert.alert("Error", res2.error + ", rolling back changes");
        setLoading(false);
        return;
      }

      login(user.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", DecodeError(error.code));
    }
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        style={{
          backgroundColor: colors.lightGrey,
          alignSelf: "flex-start",
          padding: 5,
          borderRadius: 20,
          position: "absolute",
          top: 58,
          left: 10,
          zIndex: 100,
        }}
        onPress={() => navigation.goBack()}
      >
        <Entypo name="chevron-thin-left" size={24} color={colors.primary} />
      </TouchableOpacity>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 20,
          paddingTop: 108,
        }}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: colors.primary,
            textAlign: "center",
          }}
        >
          Sign up
        </Text>
        <Text
          style={{ color: colors.grey, textAlign: "center", marginBottom: 20 }}
        >
          Please sign-up to create an account
        </Text>

        <TextInput
          label="Name"
          placeholder="Name"
          value={data.name}
          onChangeText={(val) => {
            setValue("name", val);
            required("name", val, setErrors, "Name");
          }}
          error={errors.name}
        />

        <TextInput
          label="Email Address"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={data.email}
          onChangeText={(val) => {
            setValue("email", val);
            email("email", val, setErrors);
          }}
          error={errors.email}
        />

        <TextInput
          label="Team Name"
          placeholder="Team Name"
          value={data.teamName}
          onChangeText={(val) => {
            setValue("teamName", val);
            required("teamName", val, setErrors, "Team Name");
          }}
          error={errors.teamName}
        />

        <TextInput
          label="Phone Number"
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={data.phone}
          onChangeText={(val) => {
            setValue("phone", val);
            required("phone", val, setErrors, "Phone Number", 10);
          }}
          error={errors.phone}
        />
        <TextInput
          label="Password"
          placeholder="Password"
          value={data.password}
          onChangeText={(val) => {
            setValue("password", val);
            required("password", val, setErrors, "Password", 6);
          }}
          type="password"
          error={errors.password}
        />

        <TextInput
          label="Confirm Password"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChangeText={(val) => {
            setValue("confirmPassword", val);
            required("confirmPassword", val, setErrors, "Confirm Password", 6);
          }}
          type="password"
          error={errors.confirmPassword}
        />

        <Button
          mode="contained"
          style={{
            paddingVertical: 5,
            marginTop: 10,
          }}
          onPress={() => {
            signUp();
          }}
          loading={loading}
          disabled={loading}
        >
          Create an account
        </Button>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: 20,
          }}
          onPress={() => navigation.navigate(screens.login)}
          disabled={loading}
        >
          <Text>
            Already have an account?
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              {" "}
              Sign in
            </Text>
          </Text>
        </TouchableOpacity>

        <View style={{ height: 350 }} />
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  toolTip: {
    backgroundColor: colors.primaryLight,
    padding: 5,
    marginLeft: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  toolTipText: {
    color: colors.primary,
    fontSize: 12,
  },
});

const validate = (data) => {
  const errors = {};

  if (!data.name) errors.name = "Name is required";
  if (!data.email) errors.email = "Email is required";
  if (!data.teamName) errors.teamName = "Team Name is required";
  if (!data.phone) errors.phone = "Phone Number is required";
  if (!data.password) errors.password = "Password is required";
  if (!data.confirmPassword)
    errors.confirmPassword = "Confirm Password is required";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Password does not match";

  return errors;
};

const required = (key, value, setErrors, label, min) => {
  if (!value) setErrors((prev) => ({ ...prev, [key]: label + " is Required" }));
  else if (min && value.length < min)
    setErrors((prev) => ({
      ...prev,
      [key]: label + " must be at least " + min + " characters",
    }));
  else setErrors((prev) => ({ ...prev, [key]: "" }));
};

const email = (key, value, setErrors) => {
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(value))
    setErrors((prev) => ({ ...prev, [key]: "Invalid Email" }));
  else setErrors((prev) => ({ ...prev, [key]: "" }));
};
