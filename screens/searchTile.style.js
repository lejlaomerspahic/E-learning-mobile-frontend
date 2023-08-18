import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.secondary,
  },
  image: {
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
  },
  productImg: {
    width: 85,
    height: 100,
    borderRadius: 8,
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
  price: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontFamily: "semibold",
    marginLeft: 5,
  },
  iconPrice: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default styles;
