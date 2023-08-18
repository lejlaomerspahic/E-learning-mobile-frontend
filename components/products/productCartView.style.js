import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: 155,
    height: 220,
    marginEnd: 10,
    marginTop: 20,
    padding: 10,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
  },

  imageContainer: {
    width: 120,
    height: 130,
    alignItems: "center",
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: {
    width: 110,
    height: 130,
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    fontFamily: "bold",
    fontSize: 16,
    marginBottom: 2.5,
    marginTop: 1,
    color: COLORS.gray,
  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.xSmall + 3,
    color: COLORS.gray,
    marginLeft: 5,
  },
  addBtn: { marginLeft: 20, marginTop: -5 },
});

export default styles;
