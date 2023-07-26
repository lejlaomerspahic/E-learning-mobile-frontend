import styles from "./headings.style";
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants";

const Headings = () => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Rivals</Text>
        <TouchableOpacity onPress={() => navigate.navigate("ProductList")}>
          <Ionicons name="ios-grid" size={24} color={COLORS.primary}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Headings;
