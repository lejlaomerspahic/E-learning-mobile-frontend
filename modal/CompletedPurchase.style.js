import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    padding: 15,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  productContainer: {
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    margin: 10,
  },
  productImage: {
    width: 70,
    height: 100,
    borderRadius: 10,
    margin: 15,
  },
  productDetails: {
    flex: 1,
    marginRight: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    width: 100,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconPrice: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dateTimeContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: -17,
  },
  dateTimeText: {
    fontSize: 13,
  },
});

export default styles;
