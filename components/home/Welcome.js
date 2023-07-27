import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import styles from "./welcome.style";
import { COLORS, SIZES } from "../../constants";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeTxt(COLORS.black, SIZES.xSmall + 10)}>
          Embrace the Endless
        </Text>
        <Text style={styles.welcomeTxt(COLORS.primary, -10)}>
          World of Knowledge
        </Text>
      </View>
      <View style={styles.searchContariner}>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Feather name="search" size={24} style={styles.searchIcon}></Feather>
        </TouchableOpacity>
        <View style={styles.searcWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onPressIn={() => navigation.navigate("Search")}
            placeholder="What are you looking for"
          ></TextInput>
        </View>

        <View>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
