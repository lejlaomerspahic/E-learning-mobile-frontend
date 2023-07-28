import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../hook/useUser";
const ProfilePage = () => {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState("");

  const handleImageSubmit = async () => {
    if (!imageUrl) {
      console.log("Please enter the image URL");
      return;
    }
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        "http://192.168.0.28:3001/api/products/upload",
        { imageUrl },
        config
      )
      .then((response) => {
        console.log("Image URL saved successfully!", response.data);
      })
      .catch((error) => {
        console.error("Error saving image URL:", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Image URL"
        onChangeText={(text) => setImageUrl(text)}
        value={imageUrl}
      />
      <TouchableOpacity style={styles.button} onPress={handleImageSubmit}>
        <Text style={styles.buttonText}>Save Image URL</Text>
      </TouchableOpacity>
      <Text>{user.user.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfilePage;
