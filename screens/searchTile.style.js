import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    shadowColor: COLORS.lightWhite,
    margin: 10,
  },
  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
  },
  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },
  supplierandprice: {
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
    fontFamily: "regular",
    marginTop: -2,
  },
});

export default styles;
