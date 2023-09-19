import { View, Text, FlatList } from "react-native";
import React from "react";
import styles from "./productRow.style";

import { COLORS, SIZES } from "../../constants";
import ProductCartView from "./ProductCartView";
import useFetch from "../../hook/useFetch";
import { ActivityIndicator } from "react-native";

const ProductRow = () => {
  const { data, isLoading, error } = useFetch();
  return (
    <View style={{ marginTop: -10, marginLeft: 5 }}>
      {isLoading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : error ? (
        <Text style={{ marginLeft: 10 }}>Nešto je pošlo po zlu</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <ProductCartView item={item} />;
          }}
          horizontal
          contentContainerStyle={{
            marginLeft: SIZES.small - 5,
          }}
          showsHorizontalScrollIndicator={false}
        ></FlatList>
      )}
    </View>
  );
};

export default ProductRow;
