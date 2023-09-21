import styles from "./headings.style";
import { View, Text } from "react-native";
import React from "react";

const HeadingsQuiz = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kvizovi</Text>
      </View>
    </View>
  );
};

export default HeadingsQuiz;
