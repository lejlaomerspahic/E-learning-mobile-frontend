import React from "react";
import styles from "./searchTile.style";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/index";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
const SearchTile = ({ item }) => {
  const navigate = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => navigate.navigate("ProductDetails", { item })}
      >
        <View style={styles.image}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.productImg}
          ></Image>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.supplierandprice}>{item.supplier}</Text>
          <Text style={styles.supplierandprice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTile;
