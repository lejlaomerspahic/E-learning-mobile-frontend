import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { COLORS, SIZES } from "../../constants";
const CarouselComponent = ({ favoriteList }) => {
  const renderItem = ({ item }) => {
    const imageWidth = item.videoId ? 330 : 150;
    const contain = item.videoId ? null : "contain";

    return (
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
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.headerTitle}>Something for you</Text>
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

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    marginTop: 10,
  },
  loading: {
    fontSize: 24,
    color: COLORS.gray,
    textAlign: "center",
  },
  headerTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.xLarge - 2,
    color: COLORS.gray,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default CarouselComponent;
