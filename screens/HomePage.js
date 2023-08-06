import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Welcome from "../components/home/Welcome";
import { COLORS } from "../constants";
import { useUser } from "../hook/useUser";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { useFavorites } from "../hook/useFavorites";
const HomePage = () => {
  const { user } = useUser();
  const { favorites, setFavorites } = useFavorites();
  const [favoriteList, setFavoriteList] = useState([]);
  const [isFavoritesLoaded, setIsFavoritesLoaded] = useState(false);

  const defaultImageUrl =
    "https://th.bing.com/th/id/OIP.PIhM1TUFbG1nHHrwpE9ZHwAAAA?pid=ImgDet&w=360&h=360&rs=1";
  const [userImageUrl, setUserImageUrl] = useState("");
  const [userName, setUserName] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setUserImageUrl(user.user.imageUrl || defaultImageUrl);
      setUserName(user.user.name);
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
            "http://192.168.0.28:3001/api/favorites",
            config
          );

          setFavorites(response.data);
          setIsFavoritesLoaded(true);
        } catch (err) {
          console.log(err);
          console.log("Failed to get favorites");
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
              "http://192.168.0.28:3001/api/favorites/personalization",
              { favorites: favorites },
              config
            );
            setFavoriteList(response.data);
          } catch (error) {
            console.error(
              "An error occurred while fetching personalized favorites.",
              error
            );
          }
        };
        sendFavoritesToBackend();
      }
    }, [favorites, isFavoritesLoaded])
  );

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={styles.appBar}>
        <View style={styles.userWrapper}>
          <Text style={styles.greeting}>Hello, {userName}</Text>
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

const styles = StyleSheet.create({
  appBar: {
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  userImageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 190,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.secondary,
    width: 370,
    marginTop: 3,
    marginLeft: 25,
    marginRight: 25,
  },
});

export default HomePage;
