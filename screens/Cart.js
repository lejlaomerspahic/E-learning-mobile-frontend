import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "../hook/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useUser();

  const getCartFromStorage = async () => {
    try {
      const cartJson = await AsyncStorage.getItem("cart");
      if (cartJson !== null) {
        const cartObj = JSON.parse(cartJson);
        setCart(cartObj.cart);
      }
    } catch (error) {
      console.error("Error getting cart from AsyncStorage:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCartFromStorage();
    }, [])
  );

  const calculateTotalPrice = (price, count) => {
    return price * count;
  };

  return (
    <View style={styles.container}>
      {cart.map((item) => (
        <View style={styles.itemContainer} key={item._id}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>Price: {item.price}</Text>
            <Text style={styles.count}>Count: {item.count}</Text>
            <Text style={styles.totalPrice}>
              Total Price: ${calculateTotalPrice(item.price, item.count)}
            </Text>
            <Text style={styles.supplier}>Supplier: {item.supplier}</Text>
            <Text style={styles.product_location}>
              Product Location: {item.product_location}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    marginBottom: 4,
  },
  count: {
    fontSize: 16,
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 16,
    marginBottom: 4,
  },
  supplier: {
    fontSize: 16,
    marginBottom: 4,
  },
  product_location: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Cart;
