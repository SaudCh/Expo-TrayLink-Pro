import { Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "../../constants";
import { TextInput } from "../../components/form";

export default function ForgetPasswordScreen({ navigation }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: colors.lightGrey,
          alignSelf: "flex-start",
          padding: 5,
          borderRadius: 20,
          marginBottom: 37,
          position: "absolute",
          top: 58,
          left: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <Entypo name="chevron-thin-left" size={24} color={colors.primary} />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: colors.primary,
          textAlign: "center",
        }}
      >
        Forget Password
      </Text>

      <Text
        style={{ color: colors.grey, textAlign: "center", marginBottom: 20 }}
      >
        Please enter your email to reset your password
      </Text>

      <TextInput
        label="Email"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={data.email}
        onChangeText={(val) => setData({ ...data, email: val })}
      />

      <Button
        mode="contained"
        // onPress={() => navigation.navigate(screens.signup)}
        style={{
          paddingVertical: 5,
        }}
      >
        Send Email
      </Button>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          marginTop: 20,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: colors.primary }}>Login Here</Text>
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
