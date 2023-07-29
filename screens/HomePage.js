import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Welcome from "../components/home/Welcome";
import { COLORS } from "../constants";
import { useUser } from "../hook/useUser";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const HomePage = () => {
  const { user } = useUser();
  const [userImageUrl, setUserImageUrl] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      setUserImageUrl(user.user.imageUrl);
    }, [user])
  );

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={styles.appBar}>
        <View style={styles.userWrapper}>
          <Text style={styles.greeting}>Hello, {user.user.name}</Text>
          <View style={styles.userImageWrapper}>
            <Image source={{ uri: userImageUrl }} style={styles.userImage} />
          </View>
        </View>
        <View style={styles.line} />
      </View>

      <Welcome></Welcome>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  appBar: {
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  userImageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 190,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
    width: 370,
    marginTop: 5,
    marginLeft: 25,
    marginRight: 25,
  },
});
