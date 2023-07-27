import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePage = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
  );
};

export default ProfilePage;
