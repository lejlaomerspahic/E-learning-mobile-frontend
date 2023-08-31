import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hook/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ipAddress from "../variable";
import styles from "./login.style";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    let hasError = false;

    if (!email) {
      setEmailError("Email is required.");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    await axios
      .post(`${ipAddress}/user/signin`, { email, password })
      .then((response) => {
        navigation.navigate("Welcome");
        const token = response.data.token;
        AsyncStorage.setItem("token", token);
        setUser(response.data);
        setEmail("");
        setPassword("");
        setEmailError("");
        setPasswordError("");
      })
      .catch((error) => {
        setEmailError("");
        setPasswordError("");
        setError("User does not exist.");
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <Text style={[styles.title, styles.buttonWithShadoww]}>Login</Text>
        <TextInput
          style={[styles.input, styles.inputWithShadow]}
          placeholder="Email"
          placeholderTextColor="#999"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={[styles.input, styles.inputWithShadow]}
          placeholder="Password"
          placeholderTextColor="#999"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignupScreen")}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            Don't have an account?
            <Text style={styles.boldBlueText}> Register here.</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require("../assets/images/login.png")}
        style={styles.imageStyle}
      ></ImageBackground>
    </View>
  );
};

export default LoginScreen;
