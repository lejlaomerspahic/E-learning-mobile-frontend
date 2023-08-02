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
import { useUser } from "../hook/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants";

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
      .post("http://192.168.0.28:3001/user/signin", { email, password })
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
        console.error("Login Error:", error.message);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    position: "absolute",
    bottom: 300,
    right: 0,
    left: 130,
    height: "50%",
    width: "80%",
    resizeMode: "contain",
  },
  roundedContainer: {
    marginTop: 100,
    backgroundColor: "#f2f9ff",
    borderRadius: 20,
    paddingHorizontal: 20,
    width: "85%",
    height: 400,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0d9eff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#0d9eff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "#0d9eff",
    marginBottom: 8,
    marginTop: -3,
    marginLeft: 3,
  },
  button: {
    backgroundColor: "#0d9eff",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    width: "75%",
    height: 50,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  registerLink: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: "#999",
  },
  boldBlueText: {
    fontWeight: "bold",
    color: "#0d9eff",
  },
  inputWithShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonWithShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonWithShadoww: {
    textShadowColor: "gray",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 2,
  },
});

export default LoginScreen;
