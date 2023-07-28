import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const ProfilePage = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageSubmit = () => {
    if (!imageUrl) {
      console.log("Please enter the image URL");
      return;
    }

    axios
      .post("http://192.168.0.28:3001/api/products/upload", { imageUrl })
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
