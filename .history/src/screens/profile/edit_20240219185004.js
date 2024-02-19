import { Button, Switch } from "react-native-paper";
import { Ionicons, FontAwesome6, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { getAvatarUrl } from "../../utils";
import { colors } from "../../constants";
import Container from "../../components/container";
import Header from "../../components/header";
import MapInput from "../../components/map";
import { screens } from "../../routes/screens";
import { useAuth } from "../../hooks";
import Modalize from "../../components/modalize";
import { ButtonInput, Label, TextInput } from "../../components/form";

export default function EditProfileScreen({ navigation }) {
  const { logout } = useAuth();
  const [data, setData] = React.useState({
    firstname: "",
    lastname: "",
    email: "john@gmail.com",
    phone: "",
    profession: "",
    address: "",
    profession: "",
    about: "",
    expertise: "",
  });
  const [expertises, setExpertises] = React.useState(["Expertise 1"]);

  const [errors, setErrors] = React.useState({});
  const [avatar, setAvatar] = React.useState(null);

  const [loading, setLoading] = React.useState(false);
  const [locationModal, setLocationModal] = React.useState(false);
  const [location, setLocation] = React.useState({});

  const [accountType, setAccountType] = React.useState("individual");
  const accountRef = React.useRef(null);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    const error = validateData(data);

    setErrors(error);
    if (Object.keys(error).length > 0) return;
  };

  return (
    <Container>
      <Header
        title="Edit Profile"
        headerRight={() => (
          <TouchableOpacity
            onPress={() => {
              accountRef.current.open();
            }}
            style={{
              height: 35,
              width: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome6 name="bars" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            borderRadius: 2,
            borderColor: "#fff",
            borderWidth: 2,
            width: 82,
            height: 82,
            borderRadius: 60,
            marginLeft: 20,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              width: 80,
              height: 80,
              borderRadius: 50,
              backgroundColor: "#rgba(0,0,0,0.5)",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          />
          <Image
            source={avatar ? { uri: avatar?.uri } : getAvatarUrl("")}
            style={{ width: 80, height: 80, borderRadius: 50 }}
          />
          <TouchableOpacity style={styles.icon} onPress={pickAvatar}>
            <Ionicons name="camera-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10 }}>
          <TextInput
            label="Name"
            value={data.firstname}
            onChangeText={(text) => setData({ ...data, firstname: text })}
            error={errors.firstname}
          />

          <TextInput
            label="Email"
            value={data.email}
            autoCapitalize={"none"}
            error={errors.email}
            disabled
          />

          <ButtonInput
            label="Password"
            onPress={() => {
              navigation.navigate(screens.updatePassword);
            }}
            iconText="Change"
            value={"*********"}
          />

          <TextInput
            label="Phone"
            value={data.phone}
            onChangeText={(text) => setData({ ...data, phone: text })}
            error={errors.phone}
            keyboardType="phone-pad"
          />

          <TextInput
            label="Profession"
            value={data.profession}
            onChangeText={(text) => setData({ ...data, profession: text })}
            error={errors.profession}
          />
          <TouchableOpacity
            onPress={() => {
              // setAccountType("organization");
              accountRef.current.open();
            }}
          >
            <Text
              style={{
                color: colors.grey,
                fontSize: 12,
                alignSelf: "flex-end",
              }}
            >
              Switch to{" "}
              {accountType === "individual" ? "Organization" : "Individual"}{" "}
              Account
            </Text>
          </TouchableOpacity>

          <TextInput
            label="Expertise"
            value={data.expertise}
            onChangeText={(text) => setData({ ...data, expertise: text })}
            error={errors.expertise}
            onPress={() => {
              if (!data.expertise) return;

              if (expertises.length === 3) {
                navigation.navigate(screens.subscription);
                return;
              }

              setExpertises([...expertises, data.expertise]);
              setData({ ...data, expertise: "" });
            }}
            icon={
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={colors.secondary}
              />
            }
          />

          {expertises.length > 0 && (
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {expertises.map((expertise, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: colors.secondary,
                    padding: 5,
                    borderRadius: 5,
                    margin: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff" }}>{expertise}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setExpertises(
                        expertises.filter((exp) => exp !== expertise)
                      );
                    }}
                    style={{ marginLeft: 5 }}
                  >
                    <AntDesign name="close" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <TextInput
            label="About me"
            value={data.about}
            onChangeText={(text) => setData({ ...data, about: text })}
            error={errors.about}
            multiline
            inputStyles={{ height: 80, textAlignVertical: "top" }}
          />

          <ButtonInput
            error={errors.address}
            label="Location"
            onPress={() => {
              setLocationModal(true);
            }}
            icon={
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.secondary}
              />
            }
            value={data.address ? data.address.substring(0, 42) : ""}
          />

          <Button
            mode="contained"
            style={{
              height: 54.3,
              borderRadius: 10,
              marginTop: 20,
              justifyContent: "center",
            }}
            textColor="#fff"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
          >
            Save Changes
          </Button>

          <Button
            mode="text"
            style={{
              height: 54.3,
              borderRadius: 10,
              marginTop: 10,
              justifyContent: "center",
            }}
            textColor={colors.danger}
            onPress={() => {
              Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      logout();
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            Logout
          </Button>

          <Button
            mode="text"
            style={{
              height: 54.3,
              borderRadius: 10,
              marginTop: 10,
              justifyContent: "center",
            }}
            textColor={colors.danger}
            onPress={() => {
              Alert.alert(
                "Delete Account",
                "Are you sure you want to delete your account?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      logout();
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            Delete Account
          </Button>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal
        visible={locationModal}
        animationType="slide"
        onRequestClose={() => setLocationModal(false)}
      >
        {locationModal && (
          <MapInput
            onClose={() => setLocationModal(false)}
            setLocationInfo={(address, location, address2) => {
              setData({ ...data, address: address2 });
              setLocation(location);
              setLocationModal(false);
            }}
            location={location}
          />
        )}
      </Modal>

      <Modalize
        bsref={accountRef}
        modalStyle={styles.modal}
        headerStyle={styles.modalHeader}
        adjustToContentHeight={true}
      >
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            minHeight: 150,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label label={"Organization Account"} mb={0} />
          <Switch
            value={accountType === "organization"}
            onValueChange={() =>
              setAccountType(
                accountType === "individual" ? "organization" : "individual"
              )
            }
          />
        </View>
      </Modalize>
    </Container>
  );
}

const validateData = (data) => {
  const errors = {};

  if (!data.firstname) errors.firstname = "First name is required";
  if (!data.lastname) errors.lastname = "Last name is required";
  if (!data.email) errors.email = "Email is required";

  return errors;
};

const styles = StyleSheet.create({
  coverCamera: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
    zIndex: 3,
  },
});
