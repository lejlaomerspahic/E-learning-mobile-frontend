import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: 160,
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
    width: 120,
    height: 130,
    resizeMode: "cover",
  },
  title: {
    fontFamily: "bold",
    fontSize: 16,
    marginBottom: 3,
    marginTop: 2,
    color: COLORS.gray,
    height: 45,
    width: 122,
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
  addBtn: {
    marginLeft: 23,
    marginTop: -7,
  },
});

export default styles;
