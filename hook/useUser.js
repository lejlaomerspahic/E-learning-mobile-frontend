import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const UserContext = createContext();

export default UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signOutUser = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUser(null);
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, signOutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
