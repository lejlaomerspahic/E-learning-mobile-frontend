import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import styles from "./welcome.style";
import { COLORS, SIZES } from "../../constants";
import { TextInput, ScrollView, FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import SearchTile from "../../screens/SearchTile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Carousel from "./Carousel";
import Headings from "./Headings";
import ProductRow from "../products/ProductRow";
import Blank from "../products/Blank";
import CourseList from "../course/CourseList";
import HeadingsCourse from "./HeadingsCourse";
import HeadingsQuiz from "./HeadingsQuiz";
import QuizList from "../quiz/QuizList";
import ipAddress from "../../variable";

const Welcome = ({ favoriteList }) => {
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
        `${ipAddress}/api/products/search/${searchKey}`,
        config
      );
      setSearchResult(response.data);
    } catch (err) {}
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
          <HeadingsCourse></HeadingsCourse>
          <CourseList></CourseList>
          <Carousel favoriteList={favoriteList} />

          <Headings />
          <ProductRow />
          <HeadingsQuiz></HeadingsQuiz>
          <QuizList></QuizList>

          <View
            style={{
              marginHorizontal: 10,
              borderRadius: 10,
              padding: 5,
              elevation: 1,
              backgroundColor: COLORS.lightWhite,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,

                fontFamily: "bold",
                color: COLORS.gray,
              }}
            >
              Support
            </Text>
            <View
              style={{
                height: 0.5,
                backgroundColor: COLORS.gray2,
                marginBottom: 7,
              }}
            ></View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                width: 148,
              }}
            >
              <Ionicons
                name="call"
                size={24}
                style={{ width: 30, marginLeft: 5 }}
                color={COLORS.primary}
              ></Ionicons>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "semibold",
                  color: COLORS.gray,
                }}
              >
                060 000 0000
              </Text>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                width: 223,
              }}
            >
              <Ionicons
                name="mail"
                size={24}
                style={{ width: 30, marginLeft: 5 }}
                color={COLORS.primary}
              ></Ionicons>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "semibold",
                  color: COLORS.gray,
                }}
              >
                elearning@gmail.com
              </Text>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                width: 225,
              }}
            >
              <Ionicons
                name="location"
                size={24}
                style={{ width: 30, marginLeft: 5 }}
                color={COLORS.primary}
              ></Ionicons>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "semibold",
                  color: COLORS.gray,
                }}
              >
                Dolac na Lašvi, Travnik
              </Text>
            </View>
          </View>
          <Blank />
        </>
      ) : (
        <View style={{ margin: 10 }}>
          {searchResult.map((item) => (
            <SearchTile key={item._id} item={item} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Welcome;
