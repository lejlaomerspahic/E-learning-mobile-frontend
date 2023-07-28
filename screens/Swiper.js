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

export default WelcomeScreen;
