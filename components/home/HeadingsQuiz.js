import styles from "./headings.style";
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants";

const HeadingsQuiz = () => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz</Text>
      </View>
    </View>
  );
};

export default HeadingsQuiz;
