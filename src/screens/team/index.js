import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from "react-native";

import { colors } from "../../constants";
import { screens } from "../../routes/screens";
import Header from "../../components/header";
import MembersScreen from "./team";
import InvitationScreen from "./invitation";
import { useAuth } from "../../hooks";

const Tab = createMaterialTopTabNavigator();

function CustomTabBar({ state, descriptors, navigation, profile, team }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "ios" ? 48 : 30,
        paddingBottom: 10,
        paddingHorizontal: 10,
      }}
    >
      <Header
        back={false}
        title={team?.name}
        headerRight={() =>
          profile?.role === "leader" ? (
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.addTeam)}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.secondary,
                  marginRight: 10,
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={[
                styles.tabButton,
                {
                  width: "50%",
                  backgroundColor: isFocused
                    ? colors.primaryLight
                    : "#ffffff00",
                },
              ]}
              onPress={onPress}
            >
              <Text style={[styles.tabText, { color: colors.primary }]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function MyTeamScreen() {
  const { profile, team } = useAuth();

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <CustomTabBar {...props} profile={profile} team={team} />
      )}
    >
      <Tab.Screen
        name={screens.members}
        component={MembersScreen}
        options={{
          tabBarLabel: "Team Members",
        }}
      />
      <Tab.Screen
        name={screens.invitation}
        component={InvitationScreen}
        options={{
          tabBarLabel: "Invitations",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  tabButton: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  tabText: {
    fontSize: 13,
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    marginHorizontal: 20,
    color: colors.primary,
  },
});
