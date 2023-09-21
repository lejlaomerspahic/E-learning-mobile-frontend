import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export default UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signOutUser = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUser(null);
    } catch (error) {}
  };

  return (
    <UserContext.Provider value={{ user, setUser, signOutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
