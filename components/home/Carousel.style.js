import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    marginTop: 10,
  },
  loading: {
    fontSize: 24,
    color: COLORS.gray,
    textAlign: "center",
  },
  headerTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.xLarge - 2,
    color: COLORS.gray,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
});
export default styles;
