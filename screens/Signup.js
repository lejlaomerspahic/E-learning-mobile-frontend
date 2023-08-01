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
      .post("http://192.168.0.28:3001/user/signup", {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    position: "absolute",
    bottom: 405,
    right: 0,
    left: 185,
    height: "45%",
    width: "65%",
    resizeMode: "contain",
  },
  roundedContainer: {
    backgroundColor: "#f2f9ff",
    borderRadius: 20,
    paddingHorizontal: 20,
    width: "85%",
    height: 550,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 60,
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
    width: "100%",
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
  loginLink: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
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

export default SignUpScreen;
