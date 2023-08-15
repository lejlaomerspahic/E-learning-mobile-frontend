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
const CompletedPurchaseModal = ({ isVisible, onClose, products }) => {
  console.log(products[0]);

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();

    return `${formattedDate}`;
  };

  const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    const formattedTime = dateTime.toLocaleTimeString();
    return `${formattedTime}`;
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            {products.map((product) => (
              <View key={product._id} style={styles.productContainer}>
                <Image
                  source={{ uri: product.productsId.imageUrl }}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.productName}>
                      {product.productsId.title}
                    </Text>
                    <View style={styles.iconPrice}>
                      <Ionicons
                        name="cash-outline"
                        size={20}
                        color={COLORS.gray}
                        style={{ marginTop: 3, marginLeft: 3 }}
                      />
                      <Text
                        style={{
                          marginLeft: 5,
                          color: COLORS.red,
                          fontFamily: "bold",
                          fontSize: 16,
                        }}
                      >
                        ${product.price}
                      </Text>
                    </View>
                  </View>
                  <Text>Quantity: {product.count}</Text>
                  <Text>Bought:</Text>
                  <View style={styles.dateTimeContainer}>
                    <Text style={styles.dateTimeText}>
                      {formatDate(product.date)}
                    </Text>
                    <Text style={styles.dateTimeText}>
                      {formatTime(product.date)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
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
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  container: {
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: "center",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconPrice: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dateTimeContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: -17,
  },
  dateTimeText: {
    fontSize: 13,
  },
});
export default CompletedPurchaseModal;
