import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import styles from "./OrderTracking.style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { useState } from "react";
import { useEffect } from "react";
import ipAddress from "../variable";
import axios from "axios";
import { useToken } from "../hook/useToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
const OrderTracking = () => {
  const route = useRoute();
  const { item } = route.params;
  const navigate = useNavigation();
  const [activeStep, setActiveStep] = useState(0);
  const [orderStatus, setOrderStatus] = useState("Narudžba primljena");

  const { tokenExpired } = useToken();
  const steps = [
    { text: "Narudžba primljena", icon: "archive-check-outline" },
    { text: "Narudžba poslata", icon: "truck-delivery" },
    { text: "Narudžba stigla na odredište", icon: "package-variant-closed" },
    { text: "Narudžba u procesu dostave", icon: "truck-fast" },
    { text: "Narudžba isporučena", icon: "check-all" },
  ];
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log(item._id);
        const response = await axios.get(
          `${ipAddress}/api/user/get/status/${item._id}`,
          config
        );

        setOrderStatus(response.data.status);
        if (response.data.status === "Narudžba isporučena") {
          setActiveStep(4);
        } else if (response.data.status === "Narudžba u procesu dostave") {
          setActiveStep(3);
        } else if (response.data.status === "Narudžba stigla na odredište") {
          setActiveStep(2);
        } else if (response.data.status === "Narudžba poslata") {
          setActiveStep(1);
        } else if (response.data.status === "Narudžba primljena") {
          setActiveStep(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${ipAddress}/api/user/get/status/${item._id}`,
          config
        );
        setOrderStatus(response.data.status);
        if (response.data.status === "Narudžba isporučena") {
          setActiveStep(5);
        } else if (response.data.status === "Narudžba u procesu dostave") {
          setActiveStep(4);
        } else if (response.data.status === "Narudžba stigla na odredište") {
          setActiveStep(3);
        } else if (response.data.status === "Narudžba u tranzitu") {
          setActiveStep(2);
        } else if (response.data.status === "Narudžba poslata") {
          setActiveStep(1);
        } else if (response.data.status === "Narudžba primljena") {
          setActiveStep(0);
        }
      } catch (error) {
        tokenExpired(error);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();
    return `${formattedDate}`;
  };

  const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedTime = dateTime.toLocaleTimeString();
    return `${formattedTime}`;
  };

  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.offwhite}
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Go back</Text>
        </View>
        <View style={styles.productContainer}>
          <FlatList
            data={item.items}
            keyExtractor={(itemInner) => itemInner._id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image
                  source={{ uri: item.productId.imageUrl }}
                  style={styles.itemImage}
                />
                <View>
                  <Text style={styles.itemText}>{item.productId.title}</Text>
                  <Text style={{ marginLeft: 10, fontSize: 16 }}>
                    Quantity: {item.count}
                  </Text>
                </View>
              </View>
            )}
          />
          <View>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={22} color={COLORS.red} />
              <Text
                style={{
                  color: COLORS.gray,
                  fontFamily: "semibold",
                  fontSize: 16,
                  marginTop: 4,
                }}
              >
                {item.place}
              </Text>
            </View>

            <View style={{ marginLeft: 180, marginTop: -25 }}>
              <Text style={{ fontSize: 16 }}>Bought:</Text>
              <View style={styles.dateTimeContainer}>
                <Text style={styles.dateTimeText}>{formatDate(item.date)}</Text>
                <Text style={styles.dateTimeText}>{formatTime(item.date)}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 16 }}>Status: {item.status}</Text>
            <View style={styles.line}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16 }}>Price:</Text>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="cash-outline"
                  size={22}
                  color={COLORS.red}
                  style={{ marginRight: 5 }}
                />
                <Text
                  style={{
                    color: COLORS.gray,
                    fontFamily: "semibold",
                    fontSize: 16,
                  }}
                >
                  ${item.price}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            marginTop: -20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              padding: 10,
            }}
          >
            Track Order
          </Text>
          <View
            style={{
              height: 0.5,
              backgroundColor: COLORS.gray2,
              marginBottom: 5,
            }}
          ></View>
          {steps.map((step, index) => (
            <View key={index} style={styles.cont}>
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor:
                    index <= activeStep ? COLORS.green2 : COLORS.gray,
                  width: 45,
                  height: 45,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderRadius: 30,
                    backgroundColor: COLORS.white,
                    width: 35,
                    height: 35,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      borderRadius: 30,
                      backgroundColor:
                        index <= activeStep ? COLORS.green : COLORS.gray3,
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name={step.icon}
                      size={25}
                      color={COLORS.white}
                    />
                  </View>
                </View>
              </View>
              <Text
                style={{
                  marginTop: 15,
                  marginLeft: 10,
                  color: index <= activeStep ? COLORS.green : COLORS.gray,

                  fontSize: 15,
                }}
              >
                {step.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default OrderTracking;
