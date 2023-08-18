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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>{item.title}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Ionicons name="location" size={20} color={COLORS.red}></Ionicons>
            <Text style={{ color: COLORS.gray }}>{item.product_location}</Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigate.navigate("ProductDetails", { item })}
            >
              <Ionicons
                name="add-circle"
                size={30}
                color={COLORS.primary}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCartView;
