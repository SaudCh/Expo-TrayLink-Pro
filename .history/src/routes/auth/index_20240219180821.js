import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as React from "react";

import { screens } from "../screens";

import SplashScreen from "../../screens/splash";
import AuthScreen from "../../screens/auth";
import LoginScreen from "../../screens/auth/login";
import SignupScreen from "../../screens/auth/signup";
import SignupPromptScreen from "../../screens/auth/signupPrompt";
import CoachSignupScreen from "../../screens/auth/coachSignup";
import GoldAccountScreen from "../../screens/auth/goldAccount";
import ForgetPasswordScreen from "../../screens/auth/forgetPassword";
import SubSuccessScreen from "../../screens/auth/subSuccess";

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <Stack.Navigator
      initialRouteName={screens.splash}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={screens.splash} component={SplashScreen} />
      <Stack.Screen name={screens.login} component={LoginScreen} />
      <Stack.Screen
        name={screens.forgetPass}
        component={ForgetPasswordScreen}
      />
      <Stack.Screen name={screens.signup} component={SignupScreen} />
      <Stack.Screen
        name={screens.signupPrompt}
        component={SignupPromptScreen}
      />
      <Stack.Screen name={screens.coachSignup} component={CoachSignupScreen} />
      <Stack.Screen name={screens.goldAccount} component={GoldAccountScreen} />
      <Stack.Screen name={screens.subSuccess} component={SubSuccessScreen} />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
