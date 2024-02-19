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
        paddingTop: 58,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: colors.lightGrey,
          alignSelf: "flex-start",
          padding: 5,
          borderRadius: 20,
          marginBottom: 37,
        }}
        onPress={() => navigation.goBack()}
      >
        <Entypo name="chevron-thin-left" size={24} color={colors.primary} />
      </TouchableOpacity>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          Login
        </Text>
        <View style={styles.toolTip}>
          <Text style={styles.toolTipText}>Client/Coach</Text>
        </View>
      </View>
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
      <CheckBoxInput
        label="Remember me"
        value={data.rememberMe}
        onChange={(val) => setData({ ...data, rememberMe: val })}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={{
          paddingVertical: 5,
        }}
      >
        Sign In
      </Button>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          marginTop: 20,
        }}
        onPress={() => navigation.navigate(screens.forgetPass)}
      >
        <Text style={{ color: colors.primary }}>Forgot Password?</Text>
      </TouchableOpacity>
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
