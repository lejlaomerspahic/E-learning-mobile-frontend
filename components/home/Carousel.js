import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";
const Carousel = () => {
  const slides = [
    "https://th.bing.com/th/id/R.b06025af27f12297726f33684d3109a3?rik=gPiWrh2oGN8Mkw&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/OIP.Y5NTKMokPuAIk03j4adOEgHaFZ?pid=ImgDet&w=900&h=656&rs=1",
    "https://i.pinimg.com/736x/e4/f1/e4/e4f1e44c191490f0a0a7af9ab5e07f7f.jpg",
  ];
  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{
          borderRadius: 15,
          width: "95%",
          marginTop: 8,
        }}
        autoplay
        circleLoop
      ></SliderBox>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
});
