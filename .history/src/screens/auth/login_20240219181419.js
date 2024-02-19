import { Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { colors } from "../../constants";
import { screens } from "../../routes/screens";
import { CheckBoxInput, TextInput } from "../../components/form";
import { useAuth } from "../../hooks";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [data, setData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleLogin = () => {
    login("token", { email: data.email, id: 1 });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: colors.primary,
          textAlign: "center",
        }}
      >
        Login
      </Text>
      <Text
        style={{ color: colors.grey, textAlign: "center", marginBottom: 20 }}
      >
        Please sign-up to your account
      </Text>

      <TextInput
        label="Email"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={data.email}
        onChangeText={(val) => setData({ ...data, email: val })}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        value={data.password}
        onChangeText={(val) => setData({ ...data, password: val })}
        type="password"
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CheckBoxInput
          label="Remember me"
          value={data.rememberMe}
          onChange={(val) => setData({ ...data, rememberMe: val })}
        />
        <TouchableOpacity
          style={{
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate(screens.forgetPass)}
        >
          <Text style={{ color: colors.primary }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        onPress={handleLogin}
        style={{
          paddingVertical: 5,
        }}
      >
        Sign In
      </Button>
    </View>
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
