import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import styles from "./PaymentHandler.style";
import { useConfirmPayment } from "@stripe/stripe-react-native";
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
  calculatePriceForCart,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCVC] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const { user } = useUser();
  const { confirmPayment, loading } = useConfirmPayment();
  const price = calculateTotalOrderPrice(cart, user.user.location);
  const priceForDifferentLocation = calculatePriceForCart(
    cart,
    user.user.location
  );

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [inputMonth, inputYear] = expiryDate.split("/").map(Number);
  const validateCardData = () => {
    if (cardNumber.length !== 16) {
      alert("Card number must have 16 digits");
      return false;
    }
    if (cvc.length !== 3) {
      alert("CVC must have 3 digits");
      return false;
    }

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
    const places = cart.map((item) => item.product_location);
    try {
      const response = await axios.put(
        `${ipAddress}/api/user/update/products`,
        {
          productIds,
          date: currentDate.toISOString(),
          counts,
          price,
          status: "",
          places: places,
          priceForDifferentLocation: priceForDifferentLocation,
        },
        config
      );

      if (response.status === 200) {
        const updateCart = await AsyncStorage.removeItem("cart");
        setCart(updateCart);
        onClose();
        alert("Transaction successfully completed!");
        getCartFromStorage();
      } else {
        alert("Failed to update products. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTransaction = () => {
    const isValid = validateCardData();

    try {
      if (isValid) {
        Alert.alert(
          "Pay for the product",
          "Are you sure you want to proceed with the transaction?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: async () => {
                await handlePayPress();
                const scheduleResponse = await axios.get(
                  `${ipAddress}/api/user/statusUpdate`
                );
                console.log("scheduleResponse");
                console.log(scheduleResponse.data.message);
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error(`Error showing alert:`, error);
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

            {renderCheckmarkIcon(
              inputYear + 2000 > currentYear ||
                (inputYear + 2000 !== currentYear && inputMonth > currentMonth)
            )}
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
            {renderCheckmarkIcon(cvc.length === 3)}
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
          {renderCheckmarkIcon(cardHolderName !== "")}
        </View>
        <TouchableOpacity
          onPress={() => handleTransaction()}
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

export default PaymentHandler;
