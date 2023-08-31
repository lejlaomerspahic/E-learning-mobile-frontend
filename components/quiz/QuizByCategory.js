import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ipAddress from "../../variable";
import styles from "./QuizByCategory.style";
import { useToken } from "../../hook/useToken";

const QuizByCategory = ({ route }) => {
  const [quizzes, setQuizzes] = useState([]);
  const { category } = route.params;
  const navigation = useNavigation();
  const { tokenExpired } = useToken();
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
        tokenExpired(err);
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

export default QuizByCategory;
