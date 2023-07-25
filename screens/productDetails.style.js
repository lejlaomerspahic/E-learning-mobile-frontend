import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    zIndex: 999,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    marginTop: -40,
    backgroundColor: COLORS.offwhite,
    width: SIZES.width,
    borderRadius: 30,
  },
  titleRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 15,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  price: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  priceWrapper: {
    padding: 7,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 10,
    top: 5,
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  ratingText: { marginLeft: 5 },
  count: {
    marginLeft: 5,
    marginRight: 5,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: "medium",
    fontSize: SIZES.large - 2,
  },
  desc: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    padding: 8,
    borderRadius: SIZES.large,
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
  },
  cartBtn: {
    width: SIZES.width * 0.7,
    height: 45,
    backgroundColor: COLORS.black,
    padding: SIZES.small,
    borderRadius: SIZES.large + 10,
    marginLeft: 12,
    marginTop: 10,
  },
  cartTitle: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.offwhite,
  },
  addCart: {
    width: 40,
    height: 40,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 50,
  },
});

export default styles;
