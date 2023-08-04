import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES } from "../constants/index";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const FavouriteModal = ({ isVisible, onClose, favorites }) => {
  const navigation = useNavigation();

  const navigateToCourseDetails = (courseId) => {};

  const navigateToProductDetails = (productId) => {};

  const renderFavoriteItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.favoriteItem}
        onPress={() =>
          item.__t === "Course"
            ? navigateToCourseDetails(item._id)
            : navigateToProductDetails(item._id)
        }
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.courseImage}
          resizeMode="cover"
        />
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{item.name}</Text>
          <Text style={styles.courseDescription}>{item.category}</Text>
          {item.__t === "Course" && (
            <Text style={styles.courseType}>Course</Text>
          )}
          {item.__t === "Product" && (
            <Text style={styles.courseType}>Product</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.modalScrollView}>
            <FlatList
              style={styles.items}
              data={favorites.courses.concat(favorites.products)}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderFavoriteItem}
            />
          </ScrollView>
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
  modalScrollView: {
    maxHeight: SIZES.height * 0.7,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  courseImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 5,
  },
  courseDescription: {
    color: COLORS.gray,
    marginBottom: 5,
  },
  courseType: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default FavouriteModal;
