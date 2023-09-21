import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "../hook/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import PaymentHandler from "./PaymentHandler";
import styles from "./Cart.style";
import { useToken } from "../hook/useToken";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { tokenExpired } = useToken();
  const getCartFromStorage = async () => {
    try {
      const cartJson = await AsyncStorage.getItem("cart");
      if (cartJson !== null) {
        const cartObj = JSON.parse(cartJson);

        if (cartObj.userId === user.user._id) {
          setCart(cartObj.cart);
        } else {
          setCart([]);
        }
      }
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      getCartFromStorage();
    }, [])
  );

  const remove = async (itemId) => {
    try {
      const itemIndex = cart.findIndex((item) => item._id === itemId);

      if (itemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart.splice(itemIndex, 1);
        setCart(updatedCart);

        const object = { userId: user.user._id, cart: [...updatedCart] };
        await AsyncStorage.setItem("cart", JSON.stringify(object));
        getCartFromStorage();
      }
    } catch (error) {}
  };

  const handleRemoveItem = (itemId) => {
    try {
      Alert.alert(
        "Brisanje proizvoda",
        "Jeste li sigurni da želite izbrisati ovaj proizvod?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              await remove(itemId);
              alert("Proizvod uspješno obrisan.");
            },
          },
        ]
      );
    } catch (error) {}
  };
  const calculateTotalPrice = (priceWithSign, count) => {
    const price = parseFloat(priceWithSign.replace("$", ""));
    return price * count;
  };

  const calculateDeliveryCost = (cart, userLocation) => {
    const deliveryItems = cart.filter(
      (item) => item.product_location !== userLocation
    );
    const deliveryCost = deliveryItems.length * 10;
    return deliveryCost;
  };
  const calculateTotalItemPrice = (cart) => {
    let totalItemPrice = 0;
    cart.forEach((item) => {
      totalItemPrice += calculateTotalPrice(item.price, item.count);
    });

    return totalItemPrice;
  };

  const userLocation = user.user.location;
  const calculateTotalOrderPrice = (cart, userLocation) => {
    const totalItemPrice = calculateTotalItemPrice(cart);
    const deliveryCost = calculateDeliveryCost(cart, userLocation);
    const totalOrderPrice = totalItemPrice + deliveryCost;
    return totalOrderPrice;
  };

  const calculatePriceForCart = (cart, userLocation) => {
    const totalPriceArray = cart.map((item) => {
      if (item.product_location !== userLocation) {
        return (
          calculateTotalPrice(item.price, item.count) +
          calculateDeliveryCost(cart, userLocation)
        );
      } else {
        return calculateTotalPrice(item.price, item.count);
      }
    });

    return totalPriceArray;
  };

  return (
    <View style={styles.container}>
      {cart !== undefined && cart.length > 0 ? (
        cart.map((item) => (
          <View style={styles.itemContainer} key={item._id}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.infoContainer}>
              <TouchableOpacity
                onPress={() => handleRemoveItem(item._id)}
                style={styles.closeButton}
              >
                <Ionicons
                  name="trash-outline"
                  style={styles.closeIcon}
                ></Ionicons>
              </TouchableOpacity>
              <View style={styles.iteminfoContainer}>
                <Text style={styles.name}>{item.title}</Text>
                <View style={styles.iconContainer}>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: COLORS.gray,
                      fontFamily: "bold",
                      fontSize: 16,
                    }}
                  >
                    {item.price}
                  </Text>
                </View>
              </View>
              <Text style={styles.count}>Količina: {item.count}</Text>

              <View style={styles.iconContainerLocation}>
                <Ionicons
                  name="location"
                  size={22}
                  color={COLORS.red}
                  style={{ marginLeft: -5 }}
                />
                <Text style={{ color: COLORS.gray }}>
                  {item.product_location}
                </Text>
              </View>
              <View style={styles.line} />
              <View style={styles.iconContainer}>
                <Text>Ukupna cijena:</Text>
                <View style={styles.cardContainer}>
                  <Ionicons name="card-outline" size={20} color={COLORS.gray} />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: COLORS.red,
                      fontFamily: "bold",
                      fontSize: 16,
                    }}
                  >
                    ${calculateTotalPrice(item.price, item.count)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.noItemsText}>
            ...trenutno nema dostupnih stavki u vašoj korpi za kupovinu
          </Text>
        </View>
      )}
      {cart !== undefined && cart.length > 0 && (
        <View style={styles.containerDPT}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Poštarina</Text>
            <Text style={styles.sectionValue}>
              ${calculateDeliveryCost(cart, user.user.location)}
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Cijena</Text>
            <Text style={styles.sectionValue}>
              ${calculateTotalItemPrice(cart)}
            </Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Ukupna cijena</Text>
            <Text style={styles.sectionValue}>
              ${calculateTotalOrderPrice(cart, user.user.location)}
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => setIsModalVisible(true)}
            >
              <View style={styles.buttonContent}>
                <Ionicons name="cart" size={24} color="white" />
                <Text style={styles.checkoutButtonText}>PLAĆANJE</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
          >
            <PaymentHandler
              cart={cart}
              onClose={() => setIsModalVisible(false)}
              calculateTotalOrderPrice={calculateTotalOrderPrice}
              setCart={setCart}
              getCartFromStorage={getCartFromStorage}
              calculatePriceForCart={calculatePriceForCart}
            />
          </Modal>
        </View>
      )}
    </View>
  );
};

export default Cart;
