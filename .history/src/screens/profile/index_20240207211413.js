import { Avatar } from "react-native-paper";
import { Entypo, AntDesign } from "@expo/vector-icons";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { getAvatarUrl } from "../../utils/imageUrl";
import { colors } from "../../constants";
import { data } from "./data";
import GoldenTicket from "../../components/general/gold";
import { screens } from "../../routes/screens";
import StoryModal from "../../components/story/modal";

export default function ProfileScreen({ navigation }) {
  const [storyModal, setStoryModal] = React.useState(null);

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Option
            title={item.name}
            onPress={() => navigation.navigate(item.screen)}
            gold={item.name === "Explore the Gold Account advantage"}
          >
            {item.icon}
          </Option>
        )}
        ListHeaderComponent={() => (
          <ProfileCard
            name="John Doe"
            account="Gold coach account"
            gold
            onPress={() => navigation.navigate(screens.profileDetail)}
            addStory={() => {
              navigation.navigate(screens.subscription, {
                reach: true,
              });
            }}
          />
        )}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 20,
          paddingTop: 68,
        }}
      />
      <StoryModal
        open={storyModal}
        onClose={() => setStoryModal(false)}
        onAdd={() => {}}
      />
    </>
  );
}

const styles = StyleSheet.create({});

const ProfileCard = ({
  avatar = "",
  name = "",
  account,
  gold,
  onPress,
  addStory,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 15,
      }}
      onPress={onPress}
    >
      <View>
        <Avatar.Image size={60} source={getAvatarUrl(avatar)} />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: colors.primary,
            padding: 2,
            borderRadius: 20,
            borderColor: colors.white,
            borderWidth: 1,
          }}
          onPress={addStory}
        >
          <AntDesign name="plus" size={15} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 20, flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{name}</Text>
          <GoldenTicket />
        </View>
        <Text
          style={[gold ? { color: colors.secondary } : { color: colors.grey }]}
        >
          {account}
        </Text>
      </View>
      <Entypo name="chevron-thin-right" size={15} color="black" />
    </TouchableOpacity>
  );
};

const Option = ({ children, title = "", onPress, gold }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderTopWidth: 0.5,
        borderTopColor: colors.grey,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.lightGrey,
          borderRadius: 100,
          width: 45,
          height: 45,
          justifyContent: "center",
        }}
      >
        {children}
      </View>
      <View style={{ marginLeft: 10, flex: 1 }}>
        {!gold ? (
          <Text style={{ fontSize: 14, fontWeight: "400" }}>{title}</Text>
        ) : (
          <Text style={{ fontSize: 14, fontWeight: "400" }}>
            Explore the{" "}
            <Text style={{ color: colors.secondary }}>Gold Account</Text>{" "}
            advantage
          </Text>
        )}
      </View>
      <Entypo name="chevron-thin-right" size={15} color="black" />
    </TouchableOpacity>
  );
};
