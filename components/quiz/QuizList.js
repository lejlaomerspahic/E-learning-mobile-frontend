import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import styles from "./QuizList.style";

const data = [
  { id: 1, title: "English", icon: "ios-language" },
  { id: 2, title: "General", icon: "ios-book" },
  { id: 3, title: "Technology", icon: "ios-laptop" },
  { id: 4, title: "Math", icon: "ios-calculator" },
  { id: 5, title: "Chemistry", icon: "ios-flask" },
  { id: 6, title: "Physics", icon: "ios-rocket" },
];

const QuizList = () => {
  const navigation = useNavigation();

  const handleQuizPress = (quiz) => {
    navigation.navigate("QuizByCategory", { category: quiz.title });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleQuizPress(item)}
    >
      <Ionicons name={item.icon} size={22} color={COLORS.gray} />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {data.map((item) => (
          <React.Fragment key={item.id}>{renderItem({ item })}</React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default QuizList;
