import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from "react-native";
import { COLORS } from "../constants/index";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ScoreModal.style";

const ScoreModal = ({ isVisible, onClose, scores }) => {
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
          Rezultat: {item.score}/{item.quizId.totalPoints}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "semibold",
              color: COLORS.gray,
            }}
          >
            Rezultati kvizova
          </Text>
          <FlatList
            data={scores}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ScoreModal;
