import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  searchContariner: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  touchableOpacity: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
  },
  searcWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
    height: 40,
  },
  searchInput: {
    fontFamily: "regular",
    paddingHorizontal: SIZES.small,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  searchImage: {
    resizeMode: "contain",
    width: SIZES.width - 80,
    height: SIZES.height - 300,
    opacity: 0.9,
    marginTop: 50,
  },
});

export default styles;
