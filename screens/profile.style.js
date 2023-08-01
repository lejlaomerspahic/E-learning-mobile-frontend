import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 100,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 175,
    height: 175,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: -100,
    marginLeft: 160,
    padding: 5,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  chooseIcon: {
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  uploadIcon: {
    backgroundColor: COLORS.secondary,
    padding: 5,
    borderRadius: 5,
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
  },
});

export default styles;
