import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Swiper from "react-native-swiper";
import { COLORS } from "../constants/index";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ipAddress from "../variable";

const Quiz = ({ route }) => {
  const { quiz } = route.params;

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(150);
  const navigation = useNavigation();

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
      console.log(error);
      console.log("Failed to save score");
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  timerContainer: {
    alignItems: "center",
    paddingVertical: 30,
    marginLeft: 220,
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  swiper: {},
  quizImage: {
    width: 300,
    height: 200,
    alignSelf: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
  },
  questionHeader: {
    alignSelf: "stretch",
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  questionHeaderText: {
    color: COLORS.lightWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
  questionInnerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginHorizontal: 25,
  },
  optionsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -80,
  },
  optionContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    width: 300,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  nextButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.lightWhite,
    textAlign: "center",
  },
});

export default Quiz;
