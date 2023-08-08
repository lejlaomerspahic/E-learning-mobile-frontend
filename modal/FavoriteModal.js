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

const FavoriteModal = ({ isVisible, onClose, favorites }) => {
  const navigation = useNavigation();

  const navigateToCourseDetails = (item) => {
    navigation.navigate("Course", { course: item });
  };

  const navigateToProductDetails = (item) => {
    navigation.navigate("ProductDetails", { product: item });
  };

  const renderFavoriteItem = ({ item }) => {
    const isCourse = item.videoId !== undefined;
    return (
      <TouchableOpacity
        onPress={() =>
          isCourse
            ? navigateToCourseDetails(item)
            : navigateToProductDetails(item)
        }
      >
        {isCourse ? (
          <View style={styles.courseContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.courseImage}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.courseTitle}>{item.name}</Text>
              <Text style={styles.courseDescription} numberOfLines={3}>
                {item.description}
              </Text>
              {item.instructors.map((instructor, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.instructorContainer}
                >
                  <View style={styles.instructorImageContainer}>
                    <Image
                      source={{ uri: instructor.imageUrl }}
                      style={styles.instructorImage}
                    />
                  </View>
                  <View style={styles.instructorDetails}>
                    <Text style={styles.instructorName}>{instructor.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.courseContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.courseImage}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.courseDescription} numberOfLines={3}>
                {item.description}
              </Text>
              <View style={styles.iconContainer}>
                <Ionicons name="cash-outline" size={24} color={COLORS.gray} />
                <Text
                  style={{
                    marginLeft: 5,
                    color: COLORS.red,
                    fontFamily: "bold",
                    fontSize: 16,
                  }}
                >
                  {item.price}
                </Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      style={{ backgroundColor: COLORS.white }}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <FlatList
            style={styles.items}
            data={favorites?.courses?.concat(favorites?.products) || []}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderFavoriteItem}
          />
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
    width: "90%",
  },
  courseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    padding: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  courseImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  instructorImageContainer: {
    marginRight: 10,
  },
  instructorImage: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    borderRadius: 20,
  },
  instructorDetails: {
    justifyContent: "center",
  },
  instructorName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default FavoriteModal;
