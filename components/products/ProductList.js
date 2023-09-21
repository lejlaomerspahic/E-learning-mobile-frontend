import { View } from "react-native";
import React from "react";
import ProductCartView from "./ProductCartView";
import useFetch from "../../hook/useFetch";
import styles from "./productList.style";
import { ActivityIndicator } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { FlatList } from "react-native-gesture-handler";

const ProductList = () => {
  const { data, isLoading, error } = useFetch();

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
        showsVerticalScrollIndicator={false}
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCartView item={item}></ProductCartView>
        )}
      ></FlatList>
    </View>
  );
};

export default ProductList;
