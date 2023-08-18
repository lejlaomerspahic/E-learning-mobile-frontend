import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS, SIZES } from "../../constants";

import { useFocusEffect } from "@react-navigation/native";
const Carousel = ({ favoriteList }) => {
  const imageUrls = [];
  favoriteList.forEach((item) => {
    imageUrls.push(item.imageUrl);
  });

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.headerTitle}>Something for you</Text>
      {imageUrls && imageUrls.length > 0 ? (
        <SliderBox
          images={imageUrls}
          dotColor={COLORS.gray}
          inactiveDotColor={COLORS.secondary}
          ImageComponentStyle={{
            borderRadius: 15,
            width: "40%",
            marginTop: 8,
          }}
          autoplay
          circleLoop
        />
      ) : (
        <Text style={styles.loading}>...</Text>
      )}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    marginTop: 10,
  },
  loading: {
    fontSize: 24,
    color: COLORS.gray2,
    textAlign: "center",
  },
  headerTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.xLarge - 2,
    color: COLORS.gray,
    marginLeft: 10,
    marginTop: 10,
  },
});
