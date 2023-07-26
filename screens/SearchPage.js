import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./search.style";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const SearchPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.searchContariner}>
        <View style={styles.searcWrapper}>
          <TextInput
            style={styles.searchInput}
            onPressIn={() => {}}
            placeholder="What are you looking for"
          ></TextInput>
        </View>

        <View>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons
              name="search"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;
