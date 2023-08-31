import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

class GlobalExceptionHandler extends Component {
  componentDidCatch(error) {
    console.log("error.message");
    console.log(error.message);
    if (error.message.includes("401")) {
      console.log("Token expired or invalid. Logging out...");

      AsyncStorage.removeItem("token")
        .then(() => {
          const navigation = useNavigation();
          navigation.navigate("LoginScreen");
        })
        .catch((error) => {
          console.error("Error signing out:", error.message);
        });
    }
  }

  render() {
    return this.props.children;
  }
}

export default GlobalExceptionHandler;
