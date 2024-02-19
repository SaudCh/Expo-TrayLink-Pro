import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, Button } from "react-native-paper";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import { getAvatarUrl } from "../../utils/imageUrl";
import { colors } from "../../constants";
import GoldenTicket from "../../components/general/gold";
import StoryModal from "../../components/story/modal";
import ViewStory from "../../components/story/cusView";
import { LadderSvg } from "../../svg";
import { screens } from "../../routes/screens";
import { Border, Option } from "../../components/profile";

export default function ProfileDetailScreen({ navigation }) {
  const [storyModal, setStoryModal] = React.useState(null);
  //
  const [stories, setStories] = React.useState([]);
  const [view, setView] = React.useState(false);

  useEffect(() => {
    setStories([
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      "https://media.istockphoto.com/id/1386446426/photo/badshahi-mosque.jpg?s=612x612&w=0&k=20&c=vShhc9rb17q_5k-tx_HJnlDvlE4YjCNNlOCEWplI2_Y=",
    ]);
  }, []);

  return (
    <Container>
      <Header
        title={"Profile"}
        headerRight={() => {
          return (
            <TouchableOpacity onPress={() => setStoryModal(true)}>
              <AntDesign name="pluscircle" size={24} color={colors.grey} />
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={{
          alignSelf: "center",
          width: 103,
          height: 103,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        disabled={stories.length === 0}
        onPress={() => setView(true)}
      >
        <LinearGradient
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 103,
            height: 103,
            borderRadius: 50,
            backgroundColor: colors.primary,
          }}
          colors={["#d62976", "#fa7e1e", "#feda75"]}
        />
        <Image
          source={getAvatarUrl("")}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 5,
            right: 0,
            backgroundColor: colors.primary,
            padding: 2,
            borderRadius: 20,
            borderColor: colors.white,
            borderWidth: 1,
          }}
          onPress={() => setStoryModal(true)}
        >
          <AntDesign name="plus" size={20} color={colors.white} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "600" }}>John Doe</Text>
        <GoldenTicket />
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Option
          title={"Followers"}
          value={"02"}
          onPress={() =>
            navigation.navigate(screens.connectedPeopleStack, {
              screen: screens.myfollowers,
            })
          }
        />
        <Border />
        <Option
          title={"Following"}
          value={"03"}
          onPress={() =>
            navigation.navigate(screens.connectedPeopleStack, {
              screen: screens.myfollowings,
            })
          }
        />
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
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <LadderSvg />
        <Text style={{ color: colors.grey }}>
          Please add information about yourself
        </Text>
        <Text style={{ color: colors.grey }}>
          so the people can explore your profile
        </Text>
      </View>
      <StoryModal
        open={storyModal}
        onClose={() => setStoryModal(false)}
        onAdd={() => {}}
      />

      <ViewStory stories={stories} onClose={() => setView(false)} open={view} />
    </Container>
  );
}

const styles = StyleSheet.create({});
