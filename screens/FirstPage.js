import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/index";

const FirstPage = () => {
  const navigation = useNavigation();
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
          <View style={styles.buttonIcon}>
            <Ionicons name="log-in-outline" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Sign up</Text>
          <View style={styles.buttonIcon}>
            <Ionicons name="person-add-outline" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f9ff",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 300,
    marginLeft: -400,
  },
  imageStyle: {
    height: "98%",
    width: "70%",
    resizeMode: "contain",
  },
  textContainer: {
    position: "absolute",
    top: 470,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0d9eff",
  },
  subTitle: {
    fontSize: 20,
    color: "#0d9eff",
  },
  buttonContainer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: -30,
    alignItems: "center",
    width: "95%",
    height: 300,
    borderRadius: 50,
  },

  content: {
    fontSize: 16,
    color: "#0d9eff",
    paddingHorizontal: 50,
    paddingBottom: 30,
    paddingTop: 30,
  },
  button: {
    width: "75%",
    backgroundColor: "#0d9eff",
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 100,
  },
  buttonIcon: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FirstPage;
