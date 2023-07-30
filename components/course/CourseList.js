import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../constants";

import { useNavigation } from "@react-navigation/native";
// ... (ostali importi)

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
      style={styles.itemContainer}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 5,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray,
  },
});

export default CourseList;
