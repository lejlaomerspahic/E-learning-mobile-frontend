import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const CoursesByCategory = ({ route }) => {
  const [courses, setCourses] = useState([]);
  const { category } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://192.168.0.28:3001/api/course/search/${category}`,
          config
        );
        setCourses(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
        console.log("Failed to get courses");
      }
    };
    handleSearch();
  }, [category]);

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
            <Text style={styles.courseTitle}>{item.name}</Text>
            <Text style={styles.courseDescription}>{item.description}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    marginTop: 20,
  },
  courseContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
  },
  courseImage: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  courseDescription: {
    color: "gray",
  },
  courses: { marginTop: 50 },
  upperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
});

export default CoursesByCategory;
