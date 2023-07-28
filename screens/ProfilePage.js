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
import ImagePicker from "react-native-image-picker";
import styles from "./profile.style";

const ProfilePage = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageSubmit = async () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.uri) {
        setImageUrl(response.uri); // Postavite URI slike u stanje komponente
      }
    });
  };

  const handleUploadImage = async () => {
    try {
      if (!imageUrl) {
        console.log("Please select an image first");
        return;
      }

      // Ovdje šaljete lokalni URI slike na backend
      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(
          "http://192.168.0.28:3001/api/products/upload",
          { imageUrl: imageUrl },
          config
        )
        .then((response) => {
          console.log("Image URL saved successfully!", response.data);
        })
        .catch((error) => {
          console.error("Error saving image URL:", error.message);
        });
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleImageSubmit}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleUploadImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePage;
