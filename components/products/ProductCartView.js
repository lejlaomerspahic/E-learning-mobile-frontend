import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./ProductCartView.style";

const ProductCartView = () => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/R.b06025af27f12297726f33684d3109a3?rik=gPiWrh2oGN8Mkw&pid=ImgRaw&r=0",
            }}
            style={styles.image}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCartView;
