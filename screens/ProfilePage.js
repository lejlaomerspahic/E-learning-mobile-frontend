import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../hook/useUser";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import styles from "./profile.style";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EditModal from "../modal/EditModal";
import ScoreModal from "../modal/ScoreModal";
import FavoriteModal from "../modal/FavoriteModal";
import { useEffect } from "react";
import { useFavorites } from "../hook/useFavorites";

import { useToken } from "../hook/useToken";
import ipAddress from "../variable";
import CompletedPurchaseModal from "../modal/CompletedPurchaseModal";
const ProfilePage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { user, setUser, signOutUser } = useUser();
  const navigate = useNavigation();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalScore, setShowModalScore] = useState(false);
  const [showModalFavorites, setShowModalFavorites] = useState(false);
  const [showModalPurchase, setShowModalPurchase] = useState(false);
  const { favorites } = useFavorites();
  const { tokenExpired } = useToken();
  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.get(`${ipAddress}/api/user/get`, config).then((response) => {
        setUser(response.data);
      });
    } catch (error) {
      tokenExpired(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const toggleModalPurchase = () => {
    setShowModalPurchase(!showModalPurchase);
    if (!showModalPurchase) {
      fetchUserData();
    }
  };

  const toggleModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };

  const toggleModalScore = () => {
    setShowModalScore(!showModalScore);
  };

  const toggleModalFavorites = () => {
    setShowModalFavorites(!showModalFavorites);
  };

  const handleImageSubmit = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Potrebna je dozvola za pristup medijskoj biblioteci!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setImageUrl(pickerResult.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!imageUrl) {
        return;
      }

      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(`${ipAddress}/api/user/upload`, { imageUrl: imageUrl }, config)
        .then((response) => {
          user.user.imageUrl = imageUrl;
          setUser(user);
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate.navigate("Welcome")}>
        <Ionicons
          name="chevron-back-circle"
          size={30}
          color={COLORS.primary}
          style={{ top: SIZES.xxLarge, marginLeft: 20 }}
        ></Ionicons>
      </TouchableOpacity>
      <View style={styles.profileImageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        ) : user.user && user.user.imageUrl ? (
          <Image
            source={{ uri: user.user.imageUrl }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.PIhM1TUFbG1nHHrwpE9ZHwAAAA?pid=ImgDet&w=360&h=360&rs=1",
            }}
            style={styles.profileImage}
          />
        )}

        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.chooseIcon}
            onPress={handleImageSubmit}
          >
            <Ionicons name="image-outline" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadIcon}
            onPress={handleUploadImage}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.userInfo}>
        {user && user.user && user.user.name ? (
          <Text style={styles.userName}>{user.user.name}</Text>
        ) : null}
        {user && user.user && user.user.email ? (
          <Text style={styles.userEmail}>{user.user.email}</Text>
        ) : null}
      </View>
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => setShowModalEdit(true)}
        >
          <Ionicons name="create-outline" size={30} color={COLORS.primary} />
          <Text style={styles.sectionText}>Uredi profil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => setShowModalFavorites(true)}
        >
          <Ionicons name="heart-outline" size={30} color={COLORS.primary} />
          <Text style={styles.sectionText}>Favoriti</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => toggleModalPurchase()}
        >
          <Ionicons
            name="checkmark-done-outline"
            size={30}
            color={COLORS.primary}
          />
          <Text style={styles.sectionText}>Obavljene kupovine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => setShowModalScore(true)}
        >
          <Ionicons name="trophy-outline" size={30} color={COLORS.primary} />
          <Text style={styles.sectionText}>Kvizovi</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          signOutUser();
          navigate.navigate("LoginScreen");
        }}
      >
        <Text style={styles.logoutText}>ODJAVA</Text>
        <View style={styles.whiteIconContainer}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.gray2} />
        </View>
      </TouchableOpacity>
      {user.user ? (
        <>
          <EditModal
            isVisible={showModalEdit}
            onClose={toggleModalEdit}
            user={user}
          />

          <ScoreModal
            isVisible={showModalScore}
            onClose={toggleModalScore}
            scores={user.user.scores}
          />
          <FavoriteModal
            isVisible={showModalFavorites}
            onClose={toggleModalFavorites}
            favorites={favorites}
          />
          <CompletedPurchaseModal
            isVisible={showModalPurchase}
            onClose={toggleModalPurchase}
            products={user.user.products}
          />
        </>
      ) : null}
    </View>
  );
};

export default ProfilePage;
