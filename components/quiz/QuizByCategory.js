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
import ipAddress from "../../variable";
const QuizByCategory = ({ route }) => {
  const [quizzes, setQuizzes] = useState([]);
  const { category } = route.params;
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };
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
          `${ipAddress}/api/quiz/search/${category}`,
          config
        );
        setQuizzes(response.data);
      } catch (err) {
        console.log(err);
        console.log("Failed to get courses");
      }
    };
    handleSearch();
  }, [category]);

  const renderCourseItem = ({ item }) => {
    const handleCoursePress = () => {
      navigation.navigate("Quiz", { quiz: item });
    };

    return (
      <View style={styles.courseContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.courseImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.courseTitle}>{item.name}</Text>
          <Text style={styles.courseDescription} numberOfLines={3}>
            {item.description}
          </Text>
          <View style={styles.quizInfoContainer}>
            <View style={styles.quizInfo}>
              <Ionicons name="time-outline" size={16} color={COLORS.gray} />
              <Text style={styles.infoText}>150 seconds</Text>
            </View>
            <View style={styles.quizInfo}>
              <Ionicons name="barbell-outline" size={16} color={COLORS.gray} />
              <Text style={styles.infoText}>{item.difficulty}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleCoursePress}
        >
          <Ionicons name="play" size={24} color={COLORS.white} />
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
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
        data={quizzes}
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
  },
  courseContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    marginTop: 30,
  },
  courseImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContainer: {
    justifyContent: "space-between",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
    marginBottom: 5,
  },
  courseDescription: {
    color: "gray",
    marginBottom: 10,
  },
  quizInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  quizInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 5,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  startButtonText: {
    color: COLORS.white,
    marginLeft: 5,
  },
  courses: { marginTop: 50 },
  upperRow: {
    width: SIZES.width - 45,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
    marginTop: 20,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
});

export default QuizByCategory;
