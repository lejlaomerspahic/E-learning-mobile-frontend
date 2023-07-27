import React, { useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { useState } from "react";

const WelcomeScreen = ({ navigation }) => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFinishWelcome = () => {
    navigation.navigate("Bottom Navigation");
  };

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const renderSkipButton = () => {
    if (currentIndex === 2) {
      return (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleFinishWelcome}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        showsButtons={false}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        onMomentumScrollEnd={(e, state, context) => {
          handleIndexChanged(state.index);
        }}
      >
        <View style={styles.slide}>
          <Image
            source={{
              uri: "https://i.ytimg.com/vi/HLP14KIsX2E/maxresdefault.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.slideText}>Dobrodošli na našu aplikaciju!</Text>
        </View>

        <View style={styles.slide}>
          <Image
            source={{
              uri: "https://i0.wp.com/discoveringbelgium.com/wp-content/uploads/2016/05/voerstreek-teuven-new.jpg?resize=1067%2C800&is-pending-load=1#038;ssl=1",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.slideText}>
            Ovdje možete učiti različite teme.
          </Text>
        </View>

        <View style={styles.slide}>
          <Image
            source={{
              uri: "https://live.staticflickr.com/8164/7148811531_ce6c4292e6.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.slideText}>
            Kupite knjige, skripte i pristupite kursevima.
          </Text>
        </View>
      </Swiper>

      {renderSkipButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "70%",
    marginBottom: 20,
  },
  slideText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  dot: {
    backgroundColor: "#ccc",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#007bff",
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  skipButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  skipButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
});

export default WelcomeScreen;
