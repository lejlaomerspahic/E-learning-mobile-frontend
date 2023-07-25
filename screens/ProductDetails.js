import { View, Text, Image, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import styles from "./productDetails.style";
import { Ionicons, SimpleLineIcons, Fontisto } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductDetails = () => {
  const [count, setCount] = useState(1);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="chevron-back-circle" size={30}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary}></Ionicons>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: "https://th.bing.com/th/id/R.b06025af27f12297726f33684d3109a3?rik=gPiWrh2oGN8Mkw&pid=ImgRaw&r=0",
        }}
      ></Image>
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Product</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$249.95</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Ionicons key={i} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>

            <Text style={styles.count}>{count}</Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.desc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location-outline" size={24}></Ionicons>
              <Text style={{ marginTop: 3 }}>Zenica</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={24}
                marginRight={10}
              ></MaterialCommunityIcons>
              <Text style={{ marginTop: 3 }}>Free Delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.addCart}>
            <Fontisto
              name="shopping-bag"
              size={22}
              color={COLORS.offwhite}
            ></Fontisto>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
