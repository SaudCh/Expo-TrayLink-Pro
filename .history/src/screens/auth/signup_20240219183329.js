import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-paper";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { colors } from "../../constants";
import { screens } from "../../routes/screens";
import { TextInput } from "../../components/form";

export default function SignupScreen({ navigation }) {
  const [data, setData] = React.useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const scrollRef = React.useRef();

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
          label="Full Name"
          placeholder="Full Name"
          value={data.name}
          onChangeText={(val) => setData({ ...data, name: val })}
        />

        <TextInput
          label="Email Address"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={data.email}
          onChangeText={(val) => setData({ ...data, email: val })}
        />
        <TextInput
          label="Phone Number"
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={data.phone}
          onChangeText={(val) => setData({ ...data, phone: val })}
        />
        <TextInput
          label="Password"
          placeholder="Password"
          value={data.password}
          onChangeText={(val) => setData({ ...data, password: val })}
          type="password"
        />

        <TextInput
          label="Confirm Password"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChangeText={(val) => setData({ ...data, confirmPassword: val })}
          type="password"
        />

        <Button
          mode="contained"
          style={{
            paddingVertical: 5,
            marginTop: 10,
          }}
          onPress={() => Alert.alert("Sign up")}
        >
          Create an account
        </Button>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: 20,
          }}
          onPress={() => navigation.navigate(screens.login)}
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
