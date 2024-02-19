import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as React from "react";

import { screens } from "../screens";
import { colors } from "../../constants";

import ClientBottomTab from "./tab";
import EditProfileScreen from "../../screens/profile/edit";
import AddTeamScreen from "../../screens/team/add";
import AddFacilityScreen from "../../screens/facility/add";
import EditFacilityScreen from "../../screens/facility/edit";
import TrayCategoryScreen from "../../screens/tray/category";

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
        name={screens.trayCategory}
        component={TrayCategoryScreen}
      />

      <Stack.Screen
        name={screens.addTeam}
        component={AddTeamScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={screens.addFacility}
        component={AddFacilityScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={screens.editFacility}
        component={EditFacilityScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />

      <Stack.Screen name={screens.editProfile} component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
