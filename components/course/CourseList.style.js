import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 5,
  },

  itemContainer: {
    padding: 10,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray,
  },
});

export default styles;
