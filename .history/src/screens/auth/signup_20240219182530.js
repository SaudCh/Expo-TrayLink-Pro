import { Entypo, Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { colors } from "../../constants";
import Modal from "../../components/modal";
import { screens } from "../../routes/screens";
import { TextInput } from "../../components/form";

export default function SignupScreen({ navigation }) {
  const [data, setData] = React.useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [successModal, setSuccessModal] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: colors.lightGrey,
          alignSelf: "flex-start",
          padding: 5,
          borderRadius: 20,
          position: "absolute",
          top: 58,
          left: 20,
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
        }}
        contentContainerStyle={{
          justifyContent: "center",
          flexGrow: 1,
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

        <Text style={{ color: colors.grey, fontSize: 12, marginBottom: 5 }}>
          At least 9 characters, containing a letter and a number
        </Text>

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
          onPress={() => setSuccessModal(true)}
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
        <Modal
          visible={successModal}
          onClose={() => setSuccessModal(false)}
          containerStyle={{
            justifyContent: "flex-end",
            paddingBottom: 40,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(17, 197, 35, 0.1)",
              borderRadius: 100,
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={50}
              color="#11C523"
              style={{ marginLeft: 2 }}
            />
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
              textAlign: "center",
              color: colors.primary,
            }}
          >
            Account created Successfully!
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 20,
              fontSize: 16,
              color: colors.grey,
            }}
          >
            You can now explore the features of Coach & Clients
          </Text>
          <Button
            mode="contained"
            style={{
              width: "100%",
              paddingVertical: 5,
            }}
            onPress={() => setSuccessModal(false)}
          >
            Go to home
          </Button>
        </Modal>
      </ScrollView>
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
