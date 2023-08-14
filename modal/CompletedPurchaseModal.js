import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../hook/useUser";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";

import ipAddress from "../variable";
const CompletedPurchaseModal = ({ isVisible, onClose, user }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          {user.user.products.map((product) => (
            <View key={product._id} style={styles.productContainer}>
              <Image
                source={{ uri: product.productsId.imageUrl }}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>
                  {product.productsId.title}
                </Text>
                <Text>Count: {product.count}</Text>
                <Text>Price: ${product.price}</Text>
                <Text>Date: {new Date(product.date).toDateString()}</Text>
              </View>
            </View>
          ))}
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
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
export default CompletedPurchaseModal;
