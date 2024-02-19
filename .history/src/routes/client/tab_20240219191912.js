import {
  AntDesign,
  Ionicons,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StyleSheet, Text, View } from "react-native";

import { screens } from "../screens";
import { colors } from "../../constants";
import TeamScreen from "../../screens/team";
import ProfileScreen from "../../screens/profile";
import TrayScreen from "../../screens/tray";
import MoveTrayScreen from "../../screens/tray/move";
import FacilityScreen from "../../screens/facility";

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
        name={screens.team}
        component={TeamScreen}
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
                name="team"
                size={24}
                color={focused ? colors.primary : colors.grey}
              />
              <Text
                style={[
                  styles.text,
                  { color: focused ? colors.primary : colors.grey },
                ]}
              >
                My Team
              </Text>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name={screens.moveTray}
        component={MoveTrayScreen}
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
              <Fontisto
                name="arrow-move"
                size={24}
                color={focused ? colors.primary : colors.grey}
              />
              <Text
                style={[
                  styles.text,
                  { color: focused ? colors.primary : colors.grey },
                ]}
              >
                Move Tray
              </Text>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name={screens.facility}
        component={FacilityScreen}
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
              <FontAwesome5
                name="building"
                size={24}
                color={focused ? colors.primary : colors.grey}
              />
              <Text
                style={[
                  styles.text,
                  { color: focused ? colors.primary : colors.grey },
                ]}
              >
                Facility
              </Text>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name={screens.tray}
        component={TrayScreen}
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
                name="file-tray-full-outline"
                size={24}
                color={focused ? colors.primary : colors.grey}
              />
              <Text
                style={[
                  styles.text,
                  { color: focused ? colors.primary : colors.grey },
                ]}
              >
                Trays
              </Text>
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
                size={22}
                color={focused ? colors.primary : colors.grey}
              />
              <Text
                style={[
                  styles.text,
                  { color: focused ? colors.primary : colors.grey },
                ]}
              >
                Profile
              </Text>
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
    fontSize: 10,
    marginTop: 5,
  },
});
