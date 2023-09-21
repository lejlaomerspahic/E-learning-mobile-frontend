import styles from "./headings.style";
import { View, Text } from "react-native";
import React from "react";

const HeadingsCourse = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kursevi</Text>
      </View>
    </View>
  );
};

export default HeadingsCourse;
