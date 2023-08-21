import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../hook/useUser";
import { COLORS } from "../constants";
import styles from "./CompletedPurchase.style";

const CompletedPurchaseModal = ({ isVisible, onClose, products }) => {
  const { user } = useUser();
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

export default CompletedPurchaseModal;
