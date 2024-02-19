import { Button } from "react-native-paper";

import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import { getAvatarUrl } from "../../utils/imageUrl";
import { colors } from "../../constants";
import { screens } from "../../routes/screens";

export default function ProfileDetailScreen({ navigation }) {
  return (
    <Container>
      <View
        style={{
          alignSelf: "center",
          width: 103,
          height: 103,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={getAvatarUrl("")}
          style={{
            width: 100,
            height: 100,
          }}
        />
      </View>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        John Doe
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: colors.grey,
          textAlign: "center",
        }}
      >
        @johndoe
      </Text>

      {/* email, phone number */}
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: colors.grey,
          }}
        >
          Email:
        </Text>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          chris@gmail.com
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: colors.grey,
          }}
        >
          Phone Number:
        </Text>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          1234567890
        </Text>
      </View>

      <Button
        mode="contained"
        style={{
          marginTop: 20,
        }}
        buttonColor={colors.primaryLight}
        textColor={colors.primary}
        onPress={() => navigation.navigate(screens.editProfile)}
      >
        Edit Profile
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({});
