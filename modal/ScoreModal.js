import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { COLORS } from "../constants/index";
import { Ionicons } from "@expo/vector-icons";
const ScoreModal = ({ isVisible, onClose, scores }) => {
  console.log(scores);
  const renderItem = ({ item }) => (
    <View style={styles.quizContainer}>
      <Image source={{ uri: item.quizId.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.quizId.name}</Text>
      <View style={styles.quizInfoContainer}>
        <View style={styles.quizInfo}>
          <Ionicons
            name="pricetag-outline"
            size={16}
            color={COLORS.gray}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.infoText}>{item.quizId.category}</Text>
        </View>
        <View style={styles.quizInfo}>
          <Ionicons
            name="barbell-outline"
            size={16}
            color={COLORS.gray}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.infoText}>{item.quizId.difficulty}</Text>
        </View>
      </View>

      <View style={styles.quizInfoContainerScore}>
        <Ionicons
          name="trophy"
          size={18}
          color={COLORS.primary}
          style={{ marginRight: 5 }}
        />
        <Text style={styles.infoTextScore}>
          Score: {item.score}/{item.quizId.totalPoints}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={scores}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={30} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
  },
  quizContainer: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 270,
    height: 150,
    borderRadius: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    color: COLORS.gray,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  quizInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    width: 250,
  },
  quizInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  quizInfoContainerScore: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 30,
    width: 150,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  infoTextScore: {
    fontSize: 16,
    color: COLORS.primary,
  },
});

export default ScoreModal;
