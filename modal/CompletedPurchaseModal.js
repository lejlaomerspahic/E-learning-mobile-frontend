import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../hook/useUser";
import { COLORS } from "../constants";
import styles from "./CompletedPurchase.style";

const CompletedPurchaseModal = ({ isVisible, onClose, products }) => {
  const { user } = useUser();

  console.log("products");
  console.log(products);
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
            <FlatList
              data={products}
              keyExtractor={(product) => product._id}
              renderItem={({ item }) => (
                <View style={styles.productContainer}>
                  <FlatList
                    data={item.items}
                    keyExtractor={(item) => item.productId._id}
                    renderItem={({ item }) => (
                      <View style={styles.itemContainer}>
                        <Image
                          source={{ uri: item.productId.imageUrl }}
                          style={styles.itemImage}
                        />
                        <View>
                          <Text style={styles.itemText}>
                            {item.productId.title}
                          </Text>
                          <Text style={{ marginLeft: 10, fontSize: 14 }}>
                            Quantity: {item.count}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                  <View>
                    <View style={styles.iconContainer}>
                      <Ionicons name="location" size={22} color={COLORS.red} />
                      <Text
                        style={{
                          color: COLORS.gray,
                          fontFamily: "semibold",
                          fontSize: 14,
                          marginTop: 4,
                        }}
                      >
                        {item.place}
                      </Text>
                    </View>

                    <View style={{ marginLeft: 180, marginTop: -25 }}>
                      <Text style={{ fontSize: 14 }}>Bought:</Text>
                      <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateTimeText}>
                          {formatDate(item.date)}
                        </Text>
                        <Text style={styles.dateTimeText}>
                          {formatTime(item.date)}
                        </Text>
                      </View>
                    </View>
                    <Text>Status: {item.status}</Text>
                    <View style={styles.line}></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Price:</Text>
                      <View style={styles.iconContainer}>
                        <Ionicons
                          name="cash-outline"
                          size={22}
                          color={COLORS.red}
                          style={{ marginRight: 5 }}
                        />
                        <Text
                          style={{
                            color: COLORS.gray,
                            fontFamily: "semibold",
                            fontSize: 14,
                          }}
                        >
                          ${item.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CompletedPurchaseModal;
