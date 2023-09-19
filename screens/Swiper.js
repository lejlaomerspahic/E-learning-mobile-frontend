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
          <Text style={styles.skipButtonText}>Preskoči</Text>
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
          <Text style={styles.slideTextOne}>
            Raznoliki materijali za učenje
          </Text>
          <Text style={styles.slideDescription}>
            Istražite obimnu kolekciju knjiga, bilješki za učenje i resursa
            prilagođenih vašim akademskim potrebama. Od sveobuhvatnih udžbenika
            do sažetih vodiča za učenje, pronađite sve što vam je potrebno za
            uspjeh u vašem učenju.
          </Text>
        </View>

        <View style={styles.slide}>
          <Image
            source={require("../assets/images/welcomeinfo3.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.slideTextTwo}>
            Interaktivno iskustvo u učenju
          </Text>
          <Text style={styles.slideDescription}>
            Zaronite u interaktivne video lekcije i angažirajuće kvizove. Učite
            u svom ritmu, pratite svoj napredak i učvrstite svoje razumijevanje
            različitih tema putem dinamičnog i uživajućeg iskustva u učenju.
          </Text>
        </View>

        <View style={styles.slide}>
          <Image
            source={require("../assets/images/welcomeinfo2.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.slideTextThree}>Usluge stručnih instruktora</Text>
          <Text style={styles.slideDescription}>
            Povežite se s iskusnim profesorima i stručnim instruktorima spremnim
            da pruže personaliziranu nastavu i akademsku podršku. Bez obzira
            trebate li pomoć za određeni predmet ili želite unaprijediti svoje
            vještine, naši instruktori su ovdje da vas vode.
          </Text>
        </View>
      </Swiper>

      {renderSkipButton()}
    </View>
  );
};

export default WelcomeScreen;
