import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import Swiper from "react-native-swiper";
import { COLORS } from "../constants/index";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ipAddress from "../variable";
import styles from "./Quiz.style";
import { useToken } from "../hook/useToken";

const Quiz = ({ route }) => {
  const { quiz } = route.params;

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(150);
  const navigation = useNavigation();
  const { tokenExpired } = useToken();

  useEffect(() => {
    setQuestions(quiz.questions);
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      handleTimeUp();
    }
  }, [remainingTime]);

  const handleOptionSelect = (optionIndex) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentIndex] = optionIndex;
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleTimeUp = () => {
    Alert.alert("Time Up", "Your time has expired.", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const handleQuizFinish = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctOptionIndex) {
        score += 2;
      }
    });

    saveScoreToBackend(quiz._id, score);

    Alert.alert(
      "Quiz Completed",
      `Your score: ${score}/${questions.length * 2}`,
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const saveScoreToBackend = async (quizId, score) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${ipAddress}/api/user/update/scores`,
        { quizId, score },
        config
      );
    } catch (error) {
      tokenExpired(error);
    }
  };

  const renderOptions = (options) => {
    return options.map((option, optionIndex) => (
      <TouchableOpacity
        key={optionIndex}
        style={[
          styles.optionContainer,
          {
            backgroundColor:
              userAnswers[currentIndex] === optionIndex
                ? COLORS.primary
                : COLORS.secondary,
          },
        ]}
        onPress={() => handleOptionSelect(optionIndex)}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  const renderQuestions = () => {
    return questions.map((question, index) => (
      <View key={index} style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionHeaderText}>Question {index + 1}</Text>
        </View>
        <View style={styles.questionInnerContainer}>
          <Image source={{ uri: quiz.imageUrl }} style={styles.quizImage} />
          <Text style={styles.questionText}>{question.questionText}</Text>
        </View>
        <View style={styles.optionsContainer}>
          {renderOptions(question.options)}
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{remainingTime} seconds</Text>
      </View>
      <Swiper
        style={styles.swiper}
        loop={false}
        showsPagination={false}
        index={currentIndex}
        onIndexChanged={setCurrentIndex}
      >
        {renderQuestions()}
      </Swiper>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={
          currentIndex < questions.length - 1
            ? handleNextQuestion
            : handleQuizFinish
        }
      >
        <Text style={styles.nextButtonText}>
          {currentIndex < questions.length - 1 ? "Next" : "Finish Quiz"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quiz;
