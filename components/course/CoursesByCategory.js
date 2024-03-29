import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ipAddress from "../../variable";
import styles from "./CoursesByCategory.style";
import { COLORS } from "../../constants/index";
import { useToken } from "../../hook/useToken";

const CoursesByCategory = ({ route }) => {
  const [courses, setCourses] = useState([]);
  const { category } = route.params;
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState({});
  const { tokenExpired } = useToken();
  useFocusEffect(
    React.useCallback(() => {
      const handleSearch = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            `${ipAddress}/api/course/search/${category}`,
            config
          );

          const favoriteStatus = {};
          const checkFavoriteStatus = async (id) => {
            try {
              const response = await axios.get(
                `${ipAddress}/api/favorites/check/${id}`,
                config
              );

              return response.data.isFavorite;
            } catch (error) {
              return false;
            }
          };

          for (const course of response.data) {
            const isFavorite = await checkFavoriteStatus(course._id);
            favoriteStatus[course._id] = isFavorite;
          }

          setFavorites(favoriteStatus);
          setCourses(response.data);
        } catch (err) {
          tokenExpired(err);
        }
      };
      handleSearch();
    }, [category])
  );

  const toggleFavorite = async (id) => {
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      id,
    };
    try {
      if (favorites[id]) {
        await axios.delete(`${ipAddress}/api/favorites/remove/${id}`, config);
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [id]: false,
        }));
      } else {
        await axios.post(`${ipAddress}/api/favorites`, data, config);
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [id]: true,
        }));
      }
    } catch (error) {}
  };

  const renderCourseItem = ({ item }) => {
    const handleCoursePress = () => {
      navigation.navigate("Course", { course: item });
    };

    return (
      <TouchableOpacity onPress={handleCoursePress}>
        <View style={styles.courseContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.courseImage} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.courseTitle} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.courseDescription} numberOfLines={3}>
              {item.description}
            </Text>
          </View>
          <View style={styles.favoriteContainer}>
            <Ionicons
              name={favorites[item._id] ? "heart" : "heart-outline"}
              size={30}
              color={favorites[item._id] ? COLORS.red : COLORS.gray}
              style={{ margin: 10 }}
              onPress={() => toggleFavorite(item._id)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.offwhite}
            style={{ marginLeft: 5 }}
          ></Ionicons>
        </TouchableOpacity>
        <Text style={styles.heading}>{category}</Text>
      </View>
      <FlatList
        style={styles.courses}
        data={courses}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderCourseItem}
      />
    </View>
  );
};

export default CoursesByCategory;
