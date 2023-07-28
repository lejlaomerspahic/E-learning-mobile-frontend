import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../hook/useUser";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import styles from "./profile.style";

const ProfilePage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useUser();

  const handleImageSubmit = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setImageUrl(pickerResult.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    console.log("Image URI:", imageUrl);

    try {
      if (!imageUrl) {
        console.log("Please select an image first");
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
      <View style={styles.profileImageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        ) : user.user.imageUrl ? (
          <Image
            source={{ uri: user.user.imageUrl }}
            style={styles.profileImage}
          />
        ) : (
          <Ionicons name="person-circle-outline" size={200} color="gray" />
        )}

        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.chooseIcon}
            onPress={handleImageSubmit}
          >
            <Ionicons name="image-outline" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadIcon}
            onPress={handleUploadImage}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.user.name}</Text>
        <Text style={styles.userEmail}>{user.user.email}</Text>
      </View>
    </View>
  );
};

export default ProfilePage;
