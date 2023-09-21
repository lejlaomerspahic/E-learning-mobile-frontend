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
      setEmailError("Email je obavezno polje.");
      hasError = true;
    } else if (
      !email.includes("@") ||
      (!email.endsWith(".com") && !email.endsWith(".ba"))
    ) {
      setEmailError("Nevažeći e-mail format.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password je obavezno polje.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Lozinka mora sadržavati najmanje 6 karaktera.");
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
        setError("Korisnik ne postoji.");
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.roundedContainer}>
        <Text style={[styles.title, styles.buttonWithShadoww]}>Prijava</Text>
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
          placeholder="Lozinka"
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
          <Text style={styles.buttonText}>PRIJAVA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignupScreen")}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            Još nemate račun?
            <Text style={styles.boldBlueText}> Registrujte se ovdje.</Text>
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
