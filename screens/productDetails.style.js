import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
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
    backgroundColor: COLORS.secondary,
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
    color: COLORS.gray,
  },
  price: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
    color: COLORS.gray,
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
    color: COLORS.gray,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: "medium",
    fontSize: SIZES.large - 2,
    color: COLORS.gray,
  },
  desc: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
    color: COLORS.gray,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderRadius: 15,
    color: COLORS.gray,
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
  },
  cartBtn: {
    width: 310,
    height: 45,
    padding: SIZES.small,
    borderRadius: 20,
    marginLeft: 12,
    marginTop: 10,
    backgroundColor: COLORS.primary,
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
  },
});

export default styles;
