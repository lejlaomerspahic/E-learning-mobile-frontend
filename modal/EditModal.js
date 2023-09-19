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
        user: { ...prevUser.user, ...updatedUser.data.user },
      }));
    } catch (error) {
      Alert.alert(
        "Greška",
        "Nije uspelo ažuriranje korisničkih podataka. Molimo pokušajte ponovo."
      );
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

      if (email !== user.user.email || password !== "") {
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
      Alert.alert(
        "Greška",
        "Nije uspelo ažuriranje korisničkih podataka. Molimo pokušajte ponovo."
      );
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
            Uredi profil
          </Text>
          <TextInput
            style={styles.modalInput}
            value={name}
            onChangeText={setName}
            placeholder="Ime"
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
            placeholder="Lozinka"
            secureTextEntry
          />

          <TextInput
            style={styles.modalInput}
            value={location}
            onChangeText={setLocation}
            placeholder="Lokacija"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
            <Text style={styles.modalButtonText}>SPREMI</Text>
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
