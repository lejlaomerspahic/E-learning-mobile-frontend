import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Welcome from "../components/home/Welcome";
import { COLORS } from "../constants";
import { useUser } from "../hook/useUser";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ipAddress from "../variable";
import { useFavorites } from "../hook/useFavorites";
import styles from "./home.style";
import { useToken } from "../hook/useToken";

const HomePage = () => {
  const { user } = useUser();
  const { favorites, setFavorites } = useFavorites();
  const [favoriteList, setFavoriteList] = useState([]);
  const [isFavoritesLoaded, setIsFavoritesLoaded] = useState(false);
  const { tokenExpired } = useToken();
  const defaultImageUrl =
    "https://th.bing.com/th/id/OIP.PIhM1TUFbG1nHHrwpE9ZHwAAAA?pid=ImgDet&w=360&h=360&rs=1";
  const [userImageUrl, setUserImageUrl] = useState("");
  const [userName, setUserName] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      if (user.user) {
        setUserImageUrl(user.user.imageUrl || defaultImageUrl);
        setUserName(user.user.name);
      }
    }, [user])
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchFavorites = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get(
            `${ipAddress}/api/favorites`,
            config
          );

          setFavorites(response.data);
          setIsFavoritesLoaded(true);
        } catch (err) {
          tokenExpired(err);
        }
      };
      fetchFavorites();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (isFavoritesLoaded) {
        const sendFavoritesToBackend = async () => {
          const token = await AsyncStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          try {
            const response = await axios.post(
              `${ipAddress}/api/favorites/personalization`,
              { favorites: favorites },
              config
            );
            setFavoriteList(response.data);
          } catch (error) {}
        };
        sendFavoritesToBackend();
      }
    }, [favorites, isFavoritesLoaded])
  );

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={styles.appBar}>
        <View style={styles.userWrapper}>
          <Text style={styles.greeting}>Zdravo, {userName}</Text>
          {userImageUrl ? (
            <View style={styles.userImageWrapper}>
              <Image source={{ uri: userImageUrl }} style={styles.userImage} />
            </View>
          ) : null}
        </View>
        <View style={styles.line} />
      </View>

      <Welcome favoriteList={favoriteList} />
    </SafeAreaView>
  );
};

export default HomePage;
