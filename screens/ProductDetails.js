import { View, Text, Image, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import styles from "./productDetails.style";
import { Ionicons, SimpleLineIcons, Fontisto } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProductDetails = () => {
  const route = useRoute();
  const { item } = route.params;
  console.log(item);
  const [count, setCount] = useState(1);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Ionicons name="chevron-back-circle" size={30}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary}></Ionicons>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: item.imageUrl,
        }}
      ></Image>
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{item.price}</Text>
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
          <Text style={styles.desc}>{item.description}</Text>
        </View>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location-outline" size={24}></Ionicons>
              <Text style={{ marginTop: 3 }}>{item.product_location}</Text>
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
