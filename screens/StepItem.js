import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import styles from "./OrderTracking.style";

const StepItem = ({ step, index, activeStep }) => {
  return (
    <View key={index} style={styles.cont}>
      <View
        style={{
          borderRadius: 30,
          backgroundColor: index <= activeStep ? COLORS.green2 : COLORS.gray,
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
            <Ionicons name={step.icon} size={25} color={COLORS.white} />
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
  );
};

export default StepItem;
