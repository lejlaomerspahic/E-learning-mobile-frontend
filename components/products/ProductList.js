import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProductCartView from "./ProductCartView";
import useFetch from "../../hook/useFetch";
import { useNavigation } from "@react-navigation/native";
import styles from "./productList.style";
import { ActivityIndicator } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { FlatList } from "react-native-gesture-handler";

const ProductList = () => {
  const { data, isLoading, error } = useFetch();
  console.log(data);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size={SIZES.xxLarge}
          color={COLORS.primary}
        ></ActivityIndicator>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCartView
            style={{ marginTop: 50 }}
            item={item}
          ></ProductCartView>
        )}
      ></FlatList>
    </View>
  );
};

export default ProductList;
