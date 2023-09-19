import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import styles from "./Carousel.style";
import { useNavigation } from "@react-navigation/native";

const CarouselComponent = ({ favoriteList }) => {
  const navigate = useNavigation();
  const renderItem = ({ item }) => {
    const imageWidth = item.videoId ? 330 : 150;
    const contain = item.videoId ? null : "contain";

    const hadleCourseQuiz = () => {
      if (item.videoId) {
        navigate.navigate("Course", { course: item });
      } else {
        navigate.navigate("ProductDetails", { item: item });
      }
    };

    return (
      <TouchableOpacity
        onPress={() => {
          hadleCourseQuiz();
        }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            borderRadius: 10,
            resizeMode: contain,
            width: imageWidth,
            height: 200,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.headerTitle}>Nešto za vas</Text>
      {favoriteList.length > 0 ? (
        <Carousel
          data={favoriteList}
          renderItem={renderItem}
          sliderWidth={400}
          itemWidth={400}
          autoplay
          loop
          autoplayInterval={3000}
        />
      ) : (
        <Text style={styles.loading}>...</Text>
      )}
    </View>
  );
};

export default CarouselComponent;
