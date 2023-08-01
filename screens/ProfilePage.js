import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../hook/useUser";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import styles from "./profile.style";
import { useNavigation } from "@react-navigation/native";
import bcrypt from "bcryptjs";

const ProfilePage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useUser();
  const { setUser } = useUser();
  const { signOutUser } = useUser();
  const navigate = useNavigation();
  const [email, setEmail] = useState(user.user.email);
  const [password, setPassword] = useState(user.user.password);
  const [location, setLocation] = useState(user.user.location);
  const [name, setName] = useState(user.user.name);
  const [showModal, setShowModal] = useState(false);

  const updateUserOnBackend = async (newData) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const updatedUser = await axios.put(
        "http://192.168.0.28:3001/api/user/update",
        newData,
        config
      );

      setUser((prevUser) => ({
        ...prevUser,
        user: { ...prevUser.user, ...updatedUser.data.user },
      }));
    } catch (error) {
      console.error("Error updating user:", error.message);
      Alert.alert("Error", "Failed to update user data. Please try again.");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async () => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      updateUserOnBackend({
        name: name,
        email: email,
        password: hashedPassword,
        location: location,
      });

      if (email !== user.user.email || password !== user.user.password) {
        navigate.navigate("LoginScreen");
      }

      toggleModal();
    } catch (error) {
      console.error("Error encrypting password:", error.message);
      Alert.alert("Error", "Failed to update user data. Please try again.");
    }
  };

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
          "http://192.168.0.28:3001/api/user/upload",
          { imageUrl: imageUrl },
          config
        )
        .then((response) => {
          user.user.imageUrl = imageUrl;
          setUser(user);
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
      <TouchableOpacity onPress={() => navigate.goBack()}>
        <Ionicons
          name="chevron-back-circle"
          size={30}
          color={COLORS.primary}
          style={{ top: SIZES.xxLarge, marginLeft: 20 }}
        ></Ionicons>
      </TouchableOpacity>
      <View style={styles.profileImageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        ) : user.user.imageUrl ? (
          <Image
            source={{ uri: user.user.imageUrl }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.PIhM1TUFbG1nHHrwpE9ZHwAAAA?pid=ImgDet&w=360&h=360&rs=1",
            }}
            style={styles.profileImage}
          />
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

      <View style={styles.sectionContainer}>
        <TouchableOpacity style={styles.sectionItem} onPress={handleSubmit}>
          <Ionicons name="create-outline" size={30} color={COLORS.primary} />
          <Text style={styles.sectionText}>Edit profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons name="heart-outline" size={30} color={COLORS.primary} />
          <Text style={styles.sectionText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="checkmark-done-outline"
            size={30}
            color={COLORS.primary}
          />
          <Text style={styles.sectionText}>Completed Purchases</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons name="trophy-outline" size={30} color={COLORS.primary} />
          <Text style={styles.sectionText}>Quiz</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{
                uri:
                  user.user.imageUrl ||
                  "https://th.bing.com/th/id/OIP.PIhM1TUFbG1nHHrwpE9ZHwAAAA?pid=ImgDet&w=360&h=360&rs=1",
              }}
              style={styles.modalProfileImage}
            />

            <TextInput
              style={styles.modalInput}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
            <TextInput
              style={styles.modalInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
            <TextInput
              style={styles.modalInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Password"
              maxLength={10}
            />
            <TextInput
              style={styles.modalInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Location"
            />

            <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={toggleModal}
          >
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ProfilePage;
