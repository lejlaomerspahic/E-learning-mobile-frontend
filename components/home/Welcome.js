import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import styles from "./welcome.style";
import { COLORS, SIZES } from "../../constants";
import { TextInput, ScrollView, FlatList } from "react-native-gesture-handler"; // Import ScrollView
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import SearchTile from "../../screens/SearchTile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Carousel from "./Carousel";
import Headings from "./Headings";
import ProductRow from "../products/ProductRow";
import Blank from "../products/Blank";

const Welcome = () => {
  const navigation = useNavigation();
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    setSearchResult([]);
    try {
      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://192.168.0.28:3001/api/products/search/${searchKey}`,
        config
      );
      setSearchResult(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      console.log("Failed to get product");
    }
  };
  const refresh = () => {
    setSearchResult([]);
    setSearchKey("");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.welcomeTxt(COLORS.gray)}>Embrace the Endless</Text>
        <Text style={styles.welcomeTxt(COLORS.primary, -10)}>
          World of Knowledge
        </Text>
      </View>
      <View style={styles.searchContariner}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => handleSearch()}
        >
          <Feather name="search" size={24} style={styles.searchIcon}></Feather>
        </TouchableOpacity>
        <View style={styles.searcWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="What are you looking for"
          ></TextInput>
        </View>

        <View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => refresh()}
          >
            <Ionicons
              name="refresh"
              size={SIZES.xLarge - 5}
              color={COLORS.offwhite}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      {searchResult.length === 0 ? (
        <>
          <Carousel />
          <Headings />
          <ProductRow />
          <ProductRow />
          <Blank />
        </>
      ) : (
        <View>
          {searchResult.map((item) => (
            <SearchTile key={item._id} item={item} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Welcome;
