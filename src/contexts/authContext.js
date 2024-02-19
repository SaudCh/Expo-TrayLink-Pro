import React from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [role, setRole] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const login = async (token, user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser({});
  };

  const getProfile = async () => {};

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        profile,
        role,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
