import React, { useEffect } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // const { getDocumentById } = useFirebase();
  const [appLoaded, setAppLoaded] = React.useState(false);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [profile, setProfile] = React.useState(null);
  const [team, setTeam] = React.useState(null);

  const login = async (user) => {
    setIsLoggedIn(true);
    setUser(user);

    await getProfile(user.uid);
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const getProfile = async (uid) => {
    try {
      const profileRef = await getDoc(doc(db, "users", uid));
      const profileData = profileRef.data();

      setProfile({
        ...profileData,
        id: profileRef.id,
      });

      const teamRef = await getDoc(doc(db, "teams", profileData.teamId));
      const teamData = teamRef.data();

      setTeam({
        ...teamData,
        id: teamRef.id,
      });
    } catch (error) {
      console.error("Error getting profile: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        profile,
        getProfile,
        appLoaded,
        setAppLoaded,
        team,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
