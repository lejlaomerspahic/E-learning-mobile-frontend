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
      setNameError("Ime je obavezno polje.");
      hasError = true;
    }

    if (!email) {
      setEmailError("Email je obavezno polje.");
      hasError = true;
    } else if (!email.includes("@") || !email.endsWith(".com")) {
      setEmailError("Nevažeći e-mail format.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Lozinka je obavezno polje.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Lozinka mora sadržavati najmanje 6 karaktera.");
      hasError = true;
    }

    if (!location) {
      setLocationError("Lokacija je obavezno polje.");
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
      })
      .catch((error) => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <Text style={[styles.title, styles.buttonWithShadoww]}>
          Registracija
        </Text>
        <TextInput
          style={[styles.input, styles.inputWithShadow]}
          placeholder="Ime"
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
          placeholder="Lozinka"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <TextInput
          style={[styles.input, styles.inputWithShadow]}
          placeholder="Lokacija"
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
          <Text style={styles.buttonText}>REGISTRACIJA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>
            Već imate račun?
            <Text style={styles.boldBlueText}> Prijavite se ovdje.</Text>
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
