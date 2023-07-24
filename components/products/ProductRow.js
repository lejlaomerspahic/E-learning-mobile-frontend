import { View, Text, FlatList } from "react-native";
import React from "react";
import styles from "./productRow.style";
import { SIZES } from "../../constants";
import ProductCartView from "./ProductCartView";

const ProductRow = () => {
  const products = [1, 2, 3, 4, 5];
  return (
    <View style={{ marginTop: SIZES.medium }}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCartView></ProductCartView>}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.medium }}
      ></FlatList>
    </View>
  );
};

export default ProductRow;
