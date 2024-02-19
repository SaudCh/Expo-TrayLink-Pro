import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as React from "react";

import { screens } from "../screens";
import { colors } from "../../constants";

import ClientBottomTab from "./tab";
import EditProfileScreen from "../../screens/profile/edit";
import AddTeamScreen from "../../screens/team/add";

const Stack = createNativeStackNavigator();

export default function ClientStack() {
  const screenOptions = {
    headerShown: true,
    headerTitleAlign: "center",
    headerTintColor: colors.primary,
    headerBackTitleVisible: false,
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={screens.client} component={ClientBottomTab} />

      <Stack.Screen
        name={screens.addTeam}
        component={AddTeamScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />

      <Stack.Screen name={screens.editProfile} component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
