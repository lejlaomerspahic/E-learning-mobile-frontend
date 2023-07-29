import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./home.style";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Welcome from "../components/home/Welcome";

const HomePage = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24}></Ionicons>
          <Text style={styles.location}>Zenica, Bosina and Herzegovina</Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>8</Text>
            </View>
            <TouchableOpacity>
              <Fontisto name="shopping-bag" size={24}></Fontisto>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Welcome></Welcome>
    </SafeAreaView>
  );
};

export default HomePage;
