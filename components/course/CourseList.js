import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./CourseList.style";
import { useNavigation } from "@react-navigation/native";

const CourseList = () => {
  const navigation = useNavigation();

  const data = [
    { id: 1, title: "Technology" },
    { id: 2, title: "Math" },
    { id: 3, title: "Physic" },
    { id: 4, title: "Chemistry" },
    { id: 5, title: "English" },
  ];

  const handleCoursePress = (category) => {
    navigation.navigate("CoursesByCategory", { category });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, styles.shadow]}
      onPress={() => handleCoursePress(item.title)}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CourseList;
