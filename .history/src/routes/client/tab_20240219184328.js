import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Dimensions, StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants";
import HomeScreen from "../../screens/home";
import { screens } from "../screens";
import ChatScreen from "../../screens/chat";
import ProfileScreen from "../../screens/profile";

const Tab = createBottomTabNavigator();

export default function ClientBottomTab() {
  const screenOptions = {
    tabBarShowLabel: false,
    tabBarStyle: {
      paddingBottom: 0,
      height: 65,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={screens.home}
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                {
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <AntDesign
                name="home"
                size={24}
                color={focused ? colors.primary : colors.grey}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name={screens.chat}
        component={ChatScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                {
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color={focused ? colors.primary : colors.grey}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name={screens.profile}
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                {
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <AntDesign
                name="user"
                size={24}
                color={focused ? colors.primary : colors.grey}
              />
              <Text style={styles.text}>Profile</Text>
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.primary,
    marginTop: 8,
    fontSize: 10,
  },
});
