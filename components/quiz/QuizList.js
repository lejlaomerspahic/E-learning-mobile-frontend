import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const data = [
  { id: 1, title: "English", icon: "ios-language" },
  { id: 2, title: "General", icon: "ios-book" },
  { id: 3, title: "Technology", icon: "ios-laptop" },
  { id: 4, title: "Math", icon: "ios-calculator" },
  { id: 5, title: "Chemistry", icon: "ios-flask" },
  { id: 6, title: "Physics", icon: "ios-rocket" },
];

const screenWidth = Dimensions.get("window").width;

const HorizontalList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {data.map((item) => (
          <TouchableOpacity key={item.id} style={styles.itemContainer}>
            <Ionicons name={item.icon} size={22} color={COLORS.gray} />
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },
  itemContainer: {
    alignItems: "center",
    padding: 5,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    width: screenWidth * 0.31,
    marginVertical: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    color: COLORS.gray,
    marginLeft: 5,
    marginBottom: 5,
  },
});

export default HorizontalList;
