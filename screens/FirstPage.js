import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "./FirstPage.style";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../hook/useUser";
import axios from "axios";
import ipAddress from "../variable";

const FirstPage = () => {
  const navigation = useNavigation();
  const { setUser } = useUser();
  const { user } = useUser();
  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`${ipAddress}/api/user/get`, config)
        .then((response) => {
          setUser(response.data);
          navigation.navigate("Bottom Navigation");
        })
        .catch((error) => {
          console.error("Login Error:", error.message);
        });
    };

    fetchToken();
  }, []);

  const handleLogin = () => {
    navigation.navigate("LoginScreen");
  };

  const handleRegistration = () => {
    navigation.navigate("SignupScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <ImageBackground
          source={require("../assets/images/welcome.png")}
          style={styles.imageStyle}
        ></ImageBackground>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subTitle}>Are you ready to learn?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.content}>
          This app contains a wealth of content that will make your learning
          easier
        </Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonWithShadow]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Sign in</Text>
          <View style={styles.buttonIcon}>
            <Ionicons name="log-in-outline" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonWithShadow]}
          onPress={handleRegistration}
        >
          <Text style={styles.buttonText}>Sign up</Text>
          <View style={styles.buttonIcon}>
            <Ionicons name="person-add-outline" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstPage;
