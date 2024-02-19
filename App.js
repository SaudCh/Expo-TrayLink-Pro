import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as React from "react";

import AppNavigation from "./src/routes/app";
import { AuthProvider } from "./src/contexts/authContext";

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#29B6F6",
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActionSheetProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AuthProvider>
              <AppNavigation />
            </AuthProvider>
          </NavigationContainer>
        </PaperProvider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}
