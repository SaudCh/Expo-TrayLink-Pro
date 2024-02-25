import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import { CameraView, Camera } from "expo-camera/next";

import Header from "../../components/header";
import Container from "../../components/container";
import { screens } from "../../routes/screens";
import { colors } from "../../constants";
import { Button } from "react-native-paper";

export default function QRCodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();

    return () => {
      setHasPermission(null);
      setScanned(false);
    };
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    if (data.includes("https://trylinkpro.com/trayDetails/")) {
      const trayId = data.split("/").pop();
      navigation.replace(screens.trayDetail, { id: trayId });

      return;
    }

    Alert.alert("Invalid QR Code", "Please scan a valid QR code", [
      {
        text: "OK",
        onPress: () => {
          setScanned(false);
        },
      },
    ]);
  };

  if (hasPermission === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: colors.primary,
          }}
        >
          Requesting for camera permission
        </Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: colors.primary,
          }}
        >
          No access to camera
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            Linking.openSettings();
          }}
          style={{ marginTop: 20 }}
        >
          Open Settings
        </Button>
      </View>
    );
  }

  return (
    <Container modal={true}>
      <Header title={"Scan QR Code"} modal />

      <View style={styles.container}>
        <CameraView
          onModrenBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: ["qr"],
          }}
          style={{
            width: Dimensions.get("window").width / 1.3,
            height: Dimensions.get("window").width / 1.3,
            alignSelf: "center",
            borderRadius: 10,
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
