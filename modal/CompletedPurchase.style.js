import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    height: "80%",
  },
  container: {
    padding: 10,
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
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
    fontSize: 16,
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
    fontSize: 13,
  },
  line: { height: 0.5, backgroundColor: COLORS.gray },
});
export default styles;
