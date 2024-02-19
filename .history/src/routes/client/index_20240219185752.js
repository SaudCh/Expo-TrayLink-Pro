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
import UpdatePassword from "../../screens/general/password";
import NotificationsScreen from "../../screens/notification";
import MessagesScreen from "../../screens/message";
import CoachReviewScreen from "../../screens/coach/reviews";
import SessionDetailScreen from "../../screens/session/detail";
import SearchScreen from "../../screens/search";
import ResultScreen from "../../screens/search/result";
import CoachProfileScreen from "../../screens/coach/profile";
import BookSessionScreen from "../../screens/session/book";
import AddPaymentScreen from "../../screens/payment/add";

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
