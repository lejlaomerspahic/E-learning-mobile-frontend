import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 40,
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
    backgroundColor: COLORS.secondary,
  },
  placeText: {
    fontSize: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  itemImage: {
    width: 80,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTimeContainer: {
    top: -17,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  dateTimeText: {
    fontSize: 15,
  },
  line: { height: 0.5, backgroundColor: COLORS.gray },
  upperRow: {
    width: 360,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
    marginTop: 3,
  },
  cont: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  activeStepText: {
    color: COLORS.primary,
  },
  shape: {
    borderRadius: 30,
    backgroundColor: COLORS.red,
    width: 25,
    height: 25,
    marginRight: 20,
  },
});
export default styles;
