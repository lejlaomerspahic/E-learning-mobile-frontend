import styles from "./headings.style";
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const HeadingsCourse = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
      </View>
    </View>
  );
};

export default HeadingsCourse;
