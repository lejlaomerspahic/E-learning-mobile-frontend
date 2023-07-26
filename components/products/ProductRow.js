import { View, Text, FlatList } from "react-native";
import React from "react";
import styles from "./productRow.style";

import { SIZES } from "../../constants";
import ProductCartView from "./ProductCartView";
import useFetch from "../../hook/useFetch";
import { ActivityIndicator } from "react-native";

const ProductRow = () => {
  const { data, isLoading, error } = useFetch();
  return (
    <View style={{ marginTop: SIZES.small - 10 }}>
      {isLoading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : error ? (
        <Text>Something went wrong</Text>
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
        ></FlatList>
      )}
    </View>
  );
};

export default ProductRow;