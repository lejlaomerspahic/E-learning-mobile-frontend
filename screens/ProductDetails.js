import { View, Text, Image, TouchableOpacity } from "react-native";
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

const ProductDetails = () => {
  const route = useRoute();
  const { item } = route.params;
  const [count, setCount] = useState(1);
  const navigate = useNavigation();

  const { user } = useUser();
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const id = item._id;

  const toggleFavorite = async () => {
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      id: item._id,
    };
    try {
      if (isFavorite) {
        await axios.delete(
          `http://192.168.0.28:3001/api/favorites/remove/${id}`,
          config
        );
        setIsFavorite(false);
      } else {
        await axios.post(
          `http://192.168.0.28:3001/api/favorites`,
          data,
          config
        );
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
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
          `http://192.168.0.28:3001/api/favorites/check/${id}`,
          config
        );
        setIsFavorite(response.data.isFavorite);
        console.log(response.data);
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    checkFavorite();
  }, []);

  const [cart, setCart] = useState([]);

  const saveCartToStorage = async (userId, cart) => {
    try {
      const cartWithUserId = { userId, cart };
      const cartJson = JSON.stringify(cartWithUserId);
      await AsyncStorage.setItem("cart", cartJson);
      console.log("Cart successfully saved to AsyncStorage.");
    } catch (error) {
      console.error("Error saving cart to AsyncStorage:", error);
    }
  };

  const handleAddToCart = async (product, count) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].count += count;
    } else {
      updatedCart.push({ ...product, count });
    }

    setCart(updatedCart);
    await saveCartToStorage(user.user._id, updatedCart);
  };

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
            color={isFavorite ? COLORS.red : COLORS.gray}
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
              <Ionicons key={i} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
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
          <Text style={styles.description}>Description</Text>
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
                marginRight={10}
                color={COLORS.gray}
              ></MaterialCommunityIcons>
              <Text style={{ marginTop: 3, color: COLORS.gray }}>
                Free Delivery
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity
            onPress={() => handleAddToCart(item, count)}
            style={styles.cartBtn}
          >
            <Text style={styles.cartTitle}>ADD TO CART</Text>
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
