import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Dimensions, StyleSheet, View } from "react-native";

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
      backgroundColor: "#EEEEEE",
      paddingBottom: 0,
      height: 65,
      borderRadius: 33,
      width: "60%",
      marginHorizontal: "20%",
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
                focused && styles.selected,
              ]}
            >
              <AntDesign
                name="home"
                size={24}
                color={focused ? colors.white : colors.primary}
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
                focused && styles.selected,
              ]}
            >
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color={focused ? colors.white : colors.primary}
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
                focused && styles.selected,
              ]}
            >
              <AntDesign
                name="user"
                size={24}
                color={focused ? colors.white : colors.primary}
              />
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
  selected: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
});
