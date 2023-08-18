import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useConfirmPayment } from "@stripe/stripe-react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { COLORS } from "../constants/index";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../hook/useUser";
import ipAddress from "../variable";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const PaymentHandler = ({
  cart,
  calculateTotalOrderPrice,
  onClose,
  setCart,
  getCartFromStorage,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCVC] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const { user } = useUser();
  const { confirmPayment, loading } = useConfirmPayment();
  const navigation = useNavigation();
  const price = calculateTotalOrderPrice(cart, user.user.location);
  const validateCardData = () => {
    if (cardNumber.length !== 16) {
      alert("Card number must have 16 digits");
      return false;
    }
    if (cvc.length !== 3) {
      alert("CVC must have 3 digits");
      return false;
    }
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [inputMonth, inputYear] = expiryDate.split("/").map(Number);

    if (
      inputYear + 2000 < currentYear ||
      (inputYear + 2000 === currentYear && inputMonth < currentMonth)
    ) {
      alert("Card expiration date is invalid");
      return false;
    }

    if (!cvc || !cardHolderName) {
      alert("Please fill in all fields");
      return false;
    }

    return true;
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${ipAddress}/api/stripe/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "usd",
        price: price,
      }),
    });

    const { clientSecret } = await response.json();

    return clientSecret;
  };

  const handlePayPress = async () => {
    const isValid = validateCardData();

    if (isValid) {
      const billingDetails = {
        name: cardHolderName,
      };

      const clientSecret = await fetchPaymentIntentClientSecret();

      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails,
        },
      });
      const token = await AsyncStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const productIds = cart.map((item) => item._id);
      const counts = cart.map((item) => item.count);
      const currentDate = new Date();

      try {
        const response = await axios.put(
          `${ipAddress}/api/user/update/products`,
          {
            productIds,
            date: currentDate.toISOString(),
            counts,
            price,
          },
          config
        );

        if (response.status === 200) {
          const updateCart = await AsyncStorage.removeItem("cart");
          setCart(updateCart);

          onClose();

          getCartFromStorage();

          alert("Purchase successful!");
        } else {
          alert("Failed to update products. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const renderCheckmarkIcon = (isValid) => {
    return (
      <Ionicons
        name={isValid ? "checkmark-circle-outline" : "alert-circle-outline"}
        size={24}
        color={isValid ? COLORS.green : COLORS.red}
        style={{ marginLeft: 10 }}
      />
    );
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButtonVisible} onPress={onClose}>
        <Ionicons name="close" size={30} color={COLORS.primary} />
      </TouchableOpacity>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Payment Details</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <Ionicons name="card-outline" size={24} color={COLORS.gray} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          {renderCheckmarkIcon(cardNumber.length === 16)}
        </View>
        <View style={styles.inputRow}>
          <View style={[styles.inputContainer, styles.expiryInput]}>
            <View style={styles.inputIcon}>
              <Ionicons name="calendar-outline" size={24} color={COLORS.gray} />
            </View>
            <TextInput
              style={[styles.input, styles.inputNoIcon]}
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={[styles.inputContainer, styles.cvcInput]}>
            <View style={styles.inputIcon}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={COLORS.gray}
              />
            </View>
            <TextInput
              style={[styles.input, styles.inputNoIcon]}
              placeholder="CVC"
              keyboardType="numeric"
              value={cvc}
              onChangeText={setCVC}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <Ionicons name="person-outline" size={24} color={COLORS.gray} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />
        </View>
        <TouchableOpacity
          onPress={() => handlePayPress()}
          style={styles.payButton}
        >
          <Text style={styles.payButtonText}>
            Pay ${calculateTotalOrderPrice(cart, user.user.location)}
          </Text>
        </TouchableOpacity>
      </View>
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

export default PaymentHandler;
