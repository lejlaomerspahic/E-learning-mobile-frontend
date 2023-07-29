import React, { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
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
          <Text style={styles.slideTextOne}>Diverse Learning Materials</Text>
          <Text style={styles.slideDescription}>
            Explore an extensive collection of books, study notes, and learning
            resources tailored to your academic needs. From comprehensive
            textbooks to concise study guides, find everything you need to
            succeed in your studies.
          </Text>
        </View>

        <View style={styles.slide}>
          <Image
            source={require("../assets/images/welcomeinfo3.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.slideTextTwo}>
            Interactive Learning Experience
          </Text>
          <Text style={styles.slideDescription}>
            Immerse yourself in interactive video lessons and engaging quizzes.
            Learn at your own pace, track your progress, and reinforce your
            understanding of various topics through a dynamic and enjoyable
            learning experience.
          </Text>
        </View>

        <View style={styles.slide}>
          <Image
            source={require("../assets/images/welcomeinfo2.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.slideTextThree}>Expert Tutoring Services</Text>
          <Text style={styles.slideDescription}>
            Connect with skilled professors and experienced tutors ready to
            provide personalized instruction and academic support. Whether you
            need help with a specific subject or want to enhance your skills,
            our tutors are here to guide you.
          </Text>
        </View>
      </Swiper>

      {renderSkipButton()}
    </View>
  );
};

export default WelcomeScreen;
