import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import styles from "../screens/profile.style";
import { useUser } from "../hook/useUser";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";

import ipAddress from "../variable";
const EditProfile = ({ isVisible, onClose, user }) => {
  const { setUser, signOutUser } = useUser();
  const navigate = useNavigation();
  const [name, setName] = useState(user.user.name);
  const [email, setEmail] = useState(user.user.email);
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(user.user.location);

  const updateUserOnBackend = async (newData) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const updatedUser = await axios.put(
        `${ipAddress}/api/user/update`,
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

  const handleSubmit = async () => {
    try {
      const updatedData = {
        name: name,
        email: email,
        location: location,
      };

      if (password.trim() !== "") {
        updatedData.password = password;
      } else {
        updatedData.password = user.user.password;
      }

      await updateUserOnBackend(updatedData);

      if (email !== user.user.email || password !== user.user.password) {
        signOutUser();
        navigate.navigate("LoginScreen");
      }

      user.user.name = name;
      user.user.email = email;
      user.user.password = password;
      user.user.location = location;

      setUser(user);

      onClose();
    } catch (error) {
      console.error("Error encrypting password:", error.message);
      Alert.alert("Error", "Failed to update user data. Please try again.");
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 25,
              fontFamily: "semibold",
              color: COLORS.gray,
            }}
          >
            Edit Profile
          </Text>
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
            placeholder="Password"
            secureTextEntry
          />

          <TextInput
            style={styles.modalInput}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
            <Text style={styles.modalButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
          <Ionicons name="close" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditProfile;
