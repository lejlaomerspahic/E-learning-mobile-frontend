import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./productCartView.style";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const ProductCartView = ({ item }) => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate("ProductDetails", { item });
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.supplier}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            {item.price}
          </Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons
            name="add-circle"
            size={30}
            color={COLORS.primary}
          ></Ionicons>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCartView;
