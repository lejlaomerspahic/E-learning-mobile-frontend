import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ipAddress from "../variable";
import styles from "./signup.style";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");

  const navigation = useNavigation();
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [locationError, setLocationError] = useState("");

  const handleSignUp = () => {
    let hasError = false;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setLocationError("");
    if (!name) {
      setNameError("Name is required.");
      hasError = true;
    }

    if (!email) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!email.includes("@") || !email.endsWith(".com")) {
      setEmailError("Invalid email format.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      hasError = true;
    }

    if (!location) {
      setLocationError("Location is required.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    axios
      .post(`${ipAddress}/user/signup`, {
        name,
        email,
        password,
        location,
      })
      .then((response) => {
        navigation.navigate("LoginScreen");
        console.log("Sign Up Successful!", response.data);
      })
      .catch((error) => {
        console.error("Sign Up Error:", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <Text style={[styles.title, styles.buttonWithShadoww]}>Sign Up</Text>
        <TextInput
          style={[styles.input, styles.inputWithShadow]}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
          autoCapitalize="none"
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        <TextInput
          style={[styles.input, styles.inputWithShadow]}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={[styles.input, styles.inputWithShadow]}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <TextInput
          style={[styles.input, styles.inputWithShadow]}
          placeholder="Location"
          onChangeText={(text) => setLocation(text)}
          value={location}
        />
        {locationError ? (
          <Text style={styles.errorText}>{locationError}</Text>
        ) : null}
        <TouchableOpacity
          style={[styles.button, styles.buttonWithShadow]}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>
            Already have an account?
            <Text style={styles.boldBlueText}> Login here.</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require("../assets/images/a.png")}
        style={styles.imageStyle}
      ></ImageBackground>
    </View>
  );
};

export default SignUpScreen;
