import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./productCartView.style";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const ProductCartView = () => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate("ProductDetails");
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/R.b06025af27f12297726f33684d3109a3?rik=gPiWrh2oGN8Mkw&pid=ImgRaw&r=0",
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            PROOOOOOOOOOOOOOOOOOOOO
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            Product
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            $240
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
