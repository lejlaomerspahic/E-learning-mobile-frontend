import React, { createContext, useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const UserContext = createContext();

export default UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
