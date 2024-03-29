import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as React from "react";

import { screens } from "../screens";

import SplashScreen from "../../screens/splash";
import LoginScreen from "../../screens/auth/login";
import SignupScreen from "../../screens/auth/signup";
import ForgetPasswordScreen from "../../screens/auth/forgetPassword";

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
    </Stack.Navigator>
  );
}

export default AuthRoutes;
