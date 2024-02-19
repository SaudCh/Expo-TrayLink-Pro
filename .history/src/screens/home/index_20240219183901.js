import { Feather } from "@expo/vector-icons";

import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Container from "../../components/container";
import { colors } from "../../constants";
import { screens } from "../../routes/screens";
import SeachBar from "../../components/seachBar";
import Slider from "../../components/slider";
import FeatureCard from "../../components/home/featureCard";
import SessionCard from "../../components/home/sessionCard";

export default function HomeScreen({ navigation }) {
  const [frontFeatureEvent, setFrontFeatureEvent] = useState(features[0]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const screenWidth = Dimensions.get("window").width;

    const index = Math.round(scrollPosition / screenWidth);

    if (index >= 0 && index < features.length) {
      setFrontFeatureEvent(features[index]);
    }
  };

  return (
    <Container>
      <View
        style={{
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Hello, Chris 👋
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({});

const features = [
  {
    image: require("../../assets/images/f3.png"),
    title: "Personal Training",
    description: "Training sessions with coaches",
    placeholder: "Search an Area or Post Code",
    session: [
      {
        avatar: "",
        name: "Michael",
        session: "PT Session, GYMBLOK",
        date: new Date(Date.now() + 100000000),
        startTime: new Date(Date.now() + 100000000),
        endTime: new Date(Date.now() + 100000000),
        status: "confirmed",
      },
    ],
  },
  {
    image: require("../../assets/images/f1.png"),
    title: "Local Events",
    description: "Explore events around you",
    placeholder: "Search for gyms and businesses",
    session: [
      {
        avatar: "",
        name: "Michael",
        session: "PT Session, GYMBLOK",
        date: new Date(Date.now() + 100000000),
        startTime: new Date(Date.now() + 100000000),
        endTime: new Date(Date.now() + 100000000),
        status: "confirmed",
      },
      {
        avatar: "",
        name: "Michael",
        session: "PT Session, GYMBLOK",
        date: new Date(Date.now() + 100000000),
        startTime: new Date(Date.now() + 100000000),
        endTime: new Date(Date.now() + 100000000),
        status: "pending confirmation",
      },
    ],
  },
  {
    image: require("../../assets/images/f2.png"),
    title: "Sport Coaching",
    description: "One to one coaching sessions",
    placeholder: "Search for PTS and Coaches",
    session: [],
  },
];

const images = [
  {
    image:
      "https://thumbs.dreamstime.com/z/beautiful-woman-lies-wild-flowers-field-reading-book-summer-holiday-rest-education-concept-horizontal-imagee-269649159.jpg",
  },
  {
    image:
      "https://thumbs.dreamstime.com/b/bright-pink-eucalyptus-flowers-sunbury-victoria-australia-october-macro-image-european-honey-bee-feeds-blossoms-european-honey-125068282.jpg",
  },
  {
    image:
      "https://images.template.net/wp-content/uploads/2019/04/Feature-imagee.jpg",
  },
];
