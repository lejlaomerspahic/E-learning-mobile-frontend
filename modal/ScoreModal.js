import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "../screens/profile.style";
import { COLORS } from "../constants/index";
import { Ionicons } from "@expo/vector-icons";
const ScoreModal = ({ isVisible, onClose, scores }) => {
  console.log(scores);
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {scores.map((scoreItem, index) => (
            <View key={index} style={{ marginTop: 10 }}>
              <Text>Quiz ID: {scoreItem.quizId}</Text>
              <Text>Score: {scoreItem.score}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
          <Ionicons name="close" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ScoreModal;
