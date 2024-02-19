// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
// import { io } from "socket.io-client";

import React, { useEffect } from "react";
import { Alert } from "react-native";
import { screens } from "../routes/screens";

// import { useNotifications } from "../hooks/useNotification";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();

  const [socket, setSocket] = React.useState(null);
  const [user, setUser] = React.useState({});
  const [role, setRole] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [onlineUsers, setOnlineUsers] = React.useState([]);
  //   const { AskForPermission, deactiveNotification } = useNotifications();

  const login = async (token, user) => {
    setToken(token);
    setUser(user);
    // setUser(user);
    // setToken(token);
    // setRole(user?.role);
    // await AsyncStorage.setItem("token", token);
    // await AsyncStorage.setItem("user", JSON.stringify(user));
    // checkLogin(user);
    // getProfile();
    // if (!socket) {
    //   const newSocket = io(process.env.EXPO_PUBLIC_API_URL, {
    //     query: {
    //       token: token,
    //       user: JSON.stringify({
    //         email: user.email,
    //         id: user.id || user.uid,
    //       }),
    //     },
    //   });
    //   setSocket(newSocket);
    // }
    // const tkn = await AskForPermission();
    // if (tkn) {
    //   await Api.addDevice(tkn);
    //   await AsyncStorage.setItem("device", tkn);
    // }
  };

  const logout = async () => {
    setToken(null);
    setUser({});

    // setUser({});
    // setToken(null);
    // setRole(null);
    // setProfile(null);
    // setJobs({
    //   customer: {},
    //   provider: {},
    // });
    // await AsyncStorage.removeItem("token");
    // await AsyncStorage.removeItem("user");
    // const token = await AsyncStorage.getItem("device");
    // if (token) {
    //   console.log("deactive");
    //   await deactiveNotification(token);
    // }
    // if (socket) {
    //   socket.disconnect();
    //   console.log("disconnect");
    //   setSocket(null);
    // }
  };

  useEffect(() => {
    // const bootstrapAsync = async () => {
    //   const token = await AsyncStorage.getItem("token");
    //   const user = await AsyncStorage.getItem("user");
    //   if (token && user) {
    //     login(token, JSON.parse(user));
    //   }
    // };
    // bootstrapAsync();
  }, []);

  const checkLogin = async (user) => {
    // if (user?.role === "provider" && !user?.isCompleted) {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: screens.completeProfile, params: { user } }],
    //   });
    // }
  };

  const getProfile = async () => {
    // const res = await Api.getProfile();
    // const user = res?.user;
    // setProfile(res?.user);
    // const { customer, provider } = res;
    // setJobs({ customer, provider });
    // if (user?.status === "blocked") {
    //   logout();
    //   Alert.alert("Your account has been blocked");
    // }
  };

  useEffect(() => {
    // if (socket) {
    //   socket.on("updateUserList", (connectedUsers) => {
    //     setOnlineUsers(connectedUsers.map((user) => user.id));
    //   });
    // }
  }, [socket]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login,
        logout,
        user,
        profile,
        role,
        getProfile,
        socket,
        onlineUsers,
        checkLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
