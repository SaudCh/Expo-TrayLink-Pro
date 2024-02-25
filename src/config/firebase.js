import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgUTS3yHVN8ZykNSzK4cAu3pmClNUNhrQ",
  authDomain: "traylink-pro.firebaseapp.com",
  projectId: "traylink-pro",
  storageBucket: "traylink-pro.appspot.com",
  messagingSenderId: "497617122642",
  appId: "1:497617122642:web:38c64b198e54f23444f68b",
  measurementId: "G-GLVXLHWMBM",
};

let app, auth;

if (getApps()?.length == 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
