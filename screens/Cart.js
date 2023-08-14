import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "../hook/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import PaymentHandler from "./PaymentHandler";
const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getCartFromStorage = async () => {
    try {
      const cartJson = await AsyncStorage.getItem("cart");
      if (cartJson !== null) {
        const cartObj = JSON.parse(cartJson);
        setCart(cartObj.cart);
        console.log(cartObj.cart);
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

  const remove = async (itemId) => {
    try {
      const itemIndex = cart.findIndex((item) => item._id === itemId);

      if (itemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart.splice(itemIndex, 1);
        setCart(updatedCart);

        await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error(`Error removing data with key ${itemId}:`, error);
    }
  };

  const navigation = useNavigation();
  const handleRemoveItem = async (itemId) => {
    try {
      Alert.alert(
        "Delete Product",
        "Are you sure you want to delete this product?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              remove();
              alert("Product successfully deleted");
              setTimeout(() => {
                navigation.goBack();
              }, 2000);
            },
          },
        ]
      );
    } catch (error) {
      console.error(`Error showing alert:`, error);
    }
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

  const calculateTotalOrderPrice = (cart, userLocation) => {
    const totalItemPrice = calculateTotalItemPrice(cart);
    const deliveryCost = calculateDeliveryCost(cart, userLocation);
    const totalOrderPrice = totalItemPrice + deliveryCost;
    return totalOrderPrice;
  };

  const [displayText, setDisplayText] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      if (cart === undefined || cart.length === 0) {
        console.log(cart);
        setDisplayText("...no items currently available in your shopping cart");
      }
    }, [cart])
  );

  return (
    <View style={styles.container}>
      {cart !== undefined ? (
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
                <Ionicons name="close" style={styles.closeIcon}></Ionicons>
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
              <Text style={styles.count}>Quantity: {item.count}</Text>

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
                <Text>Total price:</Text>
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
          <Text style={styles.noItemsText}>{displayText}</Text>
        </View>
      )}
      {cart !== undefined && cart.length > 0 && (
        <View style={styles.containerDPT}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Delivery</Text>
            <Text style={styles.sectionValue}>
              ${calculateDeliveryCost(cart, user.user.location)}
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Price</Text>
            <Text style={styles.sectionValue}>
              ${calculateTotalItemPrice(cart)}
            </Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Total price</Text>
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
                <Ionicons name="cart-outline" size={24} color="white" />
                <Text style={styles.checkoutButtonText}>Checkout</Text>
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
              remove={remove}
              setCart={setCart}
            />
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 1,
  },
  image: {
    width: 130,
    height: 120,
    marginRight: 5,
    margin: 5,
  },
  infoContainer: {
    flex: 1,
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  price: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.gray,
  },
  count: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.gray,
  },
  totalPrice: {
    fontSize: 16,
    marginBottom: 4,
  },
  product_location: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.gray,
  },
  iteminfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainerLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: -5,
    right: 0,
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 24,
    color: COLORS.primary,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray,
    marginTop: 3,
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: "bold",
    fontSize: 18,
    color: COLORS.gray,
  },
  sectionValue: {
    fontFamily: "semibold",
    fontSize: 18,
    color: COLORS.red,
  },
  separator: {
    height: 0.5,
    backgroundColor: COLORS.gray,
    marginVertical: 10,
  },
  containerDPT: { marginTop: 30 },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    width: 130,
    justifyContent: "flex-end",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    flex: 1,
    marginLeft: 5,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.gray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    color: COLORS.gray,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: COLORS.gray2,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expiryInput: {
    flex: 1,
    marginRight: 20,
  },
  cvcInput: {
    flex: 1,
    marginLeft: 8,
  },
  inputNoIcon: {
    marginLeft: 0,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: 150,
  },
  payButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButtonVisible: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default Cart;
