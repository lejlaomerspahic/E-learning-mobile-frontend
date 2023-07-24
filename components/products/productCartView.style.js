import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 200,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },

  imageContainer: {
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
    paddingLeft: SIZES.small,
  },
});

export default styles;
