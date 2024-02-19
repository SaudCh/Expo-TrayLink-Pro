import { Button } from "react-native-paper";

import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import { getAvatarUrl } from "../../utils/imageUrl";
import { colors } from "../../constants";
import { screens } from "../../routes/screens";

export default function ProfileDetailScreen({ navigation }) {
  const [storyModal, setStoryModal] = React.useState(null);

  const [stories, setStories] = React.useState([]);
  const [view, setView] = React.useState(false);

  return (
    <Container>
      <Header title={"Profile"} />
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

      <Text style={{ fontSize: 22, fontWeight: "600" }}>John Doe</Text>

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
