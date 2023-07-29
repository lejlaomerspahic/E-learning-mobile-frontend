import React, { useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { useState } from "react";
import styles from "./swiper.style";

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
            source={require("../assets/images/welcomeinfo1.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.slideText}>Dobrodošli na našu aplikaciju!</Text>
        </View>

        <View style={styles.slide}>
          <Image
            source={require("../assets/images/welcomeinfo3.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.slideText}>
            Ovdje možete učiti različite teme.
          </Text>
        </View>

        <View style={styles.slide}>
          <Image
            source={require("../assets/images/welcomeinfo2.png")}
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

export default WelcomeScreen;
