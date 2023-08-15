import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: 175,
    height: 200,
    marginEnd: 10,
    marginTop: 20,
    padding: 5,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },

  imageContainer: {
    width: 160,
    height: 120,
    margin: SIZES.xSmall - 7,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    justifyContent: "center",
    marginTop: 5,
    marginHorizontal: 5,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large - 5,
    marginBottom: 2.5,
    marginTop: 1,
    color: COLORS.gray,
  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    marginBottom: 2,
    color: COLORS.gray,
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.xSmall + 3,
    color: COLORS.gray,
    marginLeft: 5,
  },
  addBtn: { marginLeft: 65, marginTop: -5 },
});

export default styles;
