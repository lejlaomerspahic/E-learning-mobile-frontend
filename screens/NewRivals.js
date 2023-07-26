import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import styles from "./newRivals.style";
import { COLORS } from "../constants";
import ProductList from "../components/products/ProductList";
const NewRivals = () => {
  const navigate = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.offwhite}
            ></Ionicons>
          </TouchableOpacity>
          <Text style={styles.heading}>Products</Text>
        </View>
        <ProductList></ProductList>
      </View>
    </SafeAreaView>
  );
};

export default NewRivals;
