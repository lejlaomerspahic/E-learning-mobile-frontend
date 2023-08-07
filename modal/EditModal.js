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

const EditProfile = ({ isVisible, onClose, user }) => {
  const { setUser, signOutUser } = useUser();
  const navigate = useNavigation();
  const [name, setName] = useState(user.user.name);
  const [email, setEmail] = useState(user.user.email);
  const [password, setPassword] = useState(user.user.password);
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
        "http://192.168.0.28:3001/api/user/update",
        newData,
        config
      );

      console.log("novi user");
      console.log(updatedUser.data.user);
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
      await updateUserOnBackend({
        name: name,
        email: email,
        password: password,
        location: location,
      });

      user.user.name = name;
      user.user.email = email;
      user.user.password = password;
      user.user.location = location;
      setUser(user);

      if (email !== user.user.email || password !== user.user.password) {
        signOutUser();
        navigate.navigate("LoginScreen");
      }

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
        <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
          <Ionicons name="close" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditProfile;