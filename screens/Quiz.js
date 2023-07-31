import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import YouTubeIframe from "react-native-youtube-iframe";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Blank from "../components/course/Blank";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Quiz = ({ route }) => {
  const { quiz } = route.params;
  const [quizzes, setQuizzes] = useState(null);
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://192.168.0.28:3001/api/quiz/${quiz._id}`,
          config
        );
        setQuizzes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseData();
  }, [quiz._id]);

  if (!quizzes) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: quiz.imageUrl }} style={styles.quizImage} />
      <Text style={styles.quizTitle}>{quiz.name}</Text>
      <Text style={styles.quizDescription}>{quiz.description}</Text>
      {/* Render questions and options here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  quizImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.gray,
    marginBottom: 10,
  },
  quizDescription: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
});

export default Quiz;
