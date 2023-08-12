import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { COLORS } from "../constants/index";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../hook/useUser";
const PaymentHandler = ({
  cart,
  calculateTotalOrderPrice,
  onClose,
  clientSecret,
}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`https://yourBackendApi/paymentIntent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { paymentIntentId, ephemeralKey, customerId } = await response.json();

    return {
      paymentIntent: paymentIntentId,
      ephemeralKey,
      customer: customerId,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Merchant",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });

    if (!error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };
};

export default PaymentHandler;
