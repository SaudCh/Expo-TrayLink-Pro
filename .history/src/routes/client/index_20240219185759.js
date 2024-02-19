import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as React from "react";

import { screens } from "../screens";
import { colors } from "../../constants";
import ClientBottomTab from "./tab";
import SubscriptionScreen from "../../screens/subscription";
import BoostScreen from "../../screens/boost";
import PaymentMethodScreen from "../../screens/payment/method";
import NotificationSettingScreen from "../../screens/notification/setting";
import YourReviewScreen from "../../screens/review/your";
import AimsScreen from "../../screens/general/aims";
import AddStory from "../../screens/story/add";
import ConnectedPeopleStack from "../../screens/connected";
import EditProfileScreen from "../../screens/profile/edit";

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

      <Stack.Screen name={screens.editProfile} component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
