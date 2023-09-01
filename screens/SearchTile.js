import React from "react";
import styles from "./searchTile.style";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/index";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const SearchTile = ({ item }) => {
  const navigate = useNavigation();
  return (
    <View style={{ margin: 10, alignItems: "center" }}>
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

          <View>
            <Text numberOfLines={4}>{item.description}</Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.gray2,
              marginVertical: 5,
            }}
          ></View>
          <View style={styles.iconPrice}>
            <Ionicons
              name="cash-outline"
              size={20}
              color={COLORS.green2}
              style={{ marginTop: 3, marginLeft: 3 }}
            />
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTile;
