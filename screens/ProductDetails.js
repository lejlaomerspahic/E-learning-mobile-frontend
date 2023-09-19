import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { React, useState } from "react";
import styles from "./productDetails.style";
import { Ionicons, SimpleLineIcons, Fontisto } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useUser } from "../hook/useUser";
import { executeNativeBackPress } from "react-native-screens";

import ipAddress from "../variable";
import { useToken } from "../hook/useToken";
const ProductDetails = () => {
  const route = useRoute();
  const { item } = route.params;
  const [count, setCount] = useState(1);
  const navigate = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUser();
  const id = item._id;
  const data = {
    id: item._id,
  };
  const { tokenExpired } = useToken();
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [numRatings, setNumRatings] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  const toggleFavorite = async () => {
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (isFavorite) {
        await axios.delete(`${ipAddress}/api/favorites/remove/${id}`, config);
        setIsFavorite(false);
      } else {
        await axios.post(`${ipAddress}/api/favorites`, data, config);
        setIsFavorite(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const checkFavorite = async () => {
      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          `${ipAddress}/api/favorites/check/${id}`,
          config
        );
        setIsFavorite(response.data.isFavorite);
      } catch (error) {}
    };

    checkFavorite();
  }, []);

  const saveCartToStorage = async (userId, cartStorage) => {
    try {
      const cartJson = await AsyncStorage.getItem("cart");
      const cartObj = JSON.parse(cartJson);
      if (cartObj == null) throw new Exception();
      const index = cartObj.cart.findIndex(
        (item) => item._id === cartStorage._id
      );
      if (index !== -1) {
        cartObj.cart[index].count += cartStorage.count;
      } else {
        cartObj.cart.push(cartStorage);
      }
      await AsyncStorage.setItem("cart", JSON.stringify(cartObj));
    } catch (error) {
      const cartWithUserId = { userId, cart: [cartStorage] };
      const cartJson = JSON.stringify(cartWithUserId);
      await AsyncStorage.setItem("cart", cartJson);
    }
  };

  const handleAddToCart = (product, count) => {
    saveCartToStorage(user.user._id, { ...product, count });
  };
  const checkRating = async () => {
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${ipAddress}/api/products/${id}/rating`,
        config
      );

      if (response.data.userRating !== undefined) {
        setRating(response.data.userRating.rating);
      }

      if (response.data.averageRating !== undefined) {
        setAverageRating(response.data.averageRating);
      }

      if (response.data.numRatings !== undefined) {
        setNumRatings(response.data.numRatings);
      }
    } catch (error) {
      tokenExpired(error);
    }
  };

  const submitRating = async (rating) => {
    if (rating > 0) {
      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios.post(
          `${ipAddress}/api/products/${id}/rate`,
          { rating },
          config
        );
        checkRating();
      } catch (error) {}
    }
  };

  useEffect(() => {
    checkRating();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          ></Ionicons>
        </TouchableOpacity>
        <View style={styles.favoriteContainer}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={30}
            color={isFavorite ? COLORS.red : COLORS.white}
            style={{ marginLeft: 290 }}
            onPress={toggleFavorite}
          />
        </View>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: item.imageUrl,
        }}
      ></Image>
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  Alert.alert(
                    "Ocjenjivanje proizvoda",
                    "Da li želite ocijeniti ovaj proizvod?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          submitRating(i);
                        },
                      },
                    ],
                    { cancelable: true }
                  );
                }}
                style={styles.starButton}
              >
                <Ionicons
                  name={i <= rating ? "star" : "star-outline"}
                  size={24}
                  color={i <= rating ? "gold" : "gray"}
                />
              </TouchableOpacity>
            ))}
            <Text style={styles.ratingText}>
              {`(${averageRating.toFixed(1)})`}
            </Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>

            <Text style={styles.count}>{count}</Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Opis proizvoda</Text>
          <Text style={styles.desc} numberOfLines={10}>
            {item.description}
          </Text>
        </View>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location" size={24} color={COLORS.red}></Ionicons>
              <Text style={{ marginTop: 3, color: COLORS.gray }}>
                {item.product_location}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={24}
                marginRight={5}
                color={COLORS.gray}
              ></MaterialCommunityIcons>
              <Text
                style={{ marginTop: 3, color: COLORS.gray, fontFamily: "bold" }}
              >
                {item.product_location === user.user.location
                  ? "Besplatna poštarina"
                  : "10KM"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity
            onPress={() => handleAddToCart(item, count)}
            style={styles.cartBtn}
          >
            <Text style={styles.cartTitle}>DODAJ U KORPU</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddToCart(item, count)}
            style={styles.addCart}
          >
            <Fontisto
              name="shopping-bag"
              size={22}
              color={COLORS.offwhite}
            ></Fontisto>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
