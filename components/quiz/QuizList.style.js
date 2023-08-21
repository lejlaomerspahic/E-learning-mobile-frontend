import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/index";

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },
  itemContainer: {
    alignItems: "center",
    padding: 5,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    width: screenWidth * 0.31,
    marginVertical: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    color: COLORS.gray,
    marginLeft: 5,
    marginBottom: 5,
  },
});

export default styles;
