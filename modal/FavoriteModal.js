import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { COLORS, SIZES } from "../constants/index";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./FavouriteModal.style";
import { useUser } from "../hook/useUser";
const FavoriteModal = ({ isVisible, onClose, favorites }) => {
  const navigation = useNavigation();
  const { user } = useUser();

  const navigateToCourseDetails = (item) => {
    navigation.navigate("Course", { course: item });
    onClose();
  };
  const navigateToProductDetails = (item) => {
    navigation.navigate("ProductDetails", { item: item });
    onClose();
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
            <View style={styles.infoContainer}>
              <View style={styles.iconTitle}>
                <Text style={styles.courseTitle}>{item.name}</Text>
                <Image
                  style={{ width: 28, height: 25, marginLeft: 3 }}
                  source={{ uri: item.icon }}
                ></Image>
              </View>

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
                style={styles.productImage}
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
          <Text
            style={{
              textAlign: "center",
              marginVertical: 10,
              fontSize: 16,
              fontFamily: "semibold",
              color: COLORS.gray,
            }}
          >
            Favourites
          </Text>
          {favorites.user === user.user._id ? (
            <FlatList
              style={styles.items}
              data={favorites?.courses?.concat(favorites?.products) || []}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderFavoriteItem}
            />
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default FavoriteModal;
