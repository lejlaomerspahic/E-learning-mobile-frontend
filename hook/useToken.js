import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState, useContext, useEffect } from "react";

const TokenContext = createContext();

export default TokenProvider = ({ children }) => {
  const navigate = useNavigation();
  const tokenExpired = (err) => {
    if (err.response.status === 401) {
      AsyncStorage.removeItem("token");
      navigate.navigate("LoginScreen");
    }
  };
  return (
    <TokenContext.Provider value={{ tokenExpired }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
