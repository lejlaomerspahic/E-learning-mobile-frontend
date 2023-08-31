import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 1,
  },
  image: {
    width: 100,
    height: 120,
    marginRight: 5,
    margin: 5,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  price: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.gray,
  },
  count: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.gray,
  },
  totalPrice: {
    fontSize: 16,
    marginBottom: 4,
  },
  product_location: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.gray,
  },
  iteminfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainerLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: -5,
    right: 0,
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 24,
    color: COLORS.primary,
    left: 5,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray,
    marginTop: 3,
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: "bold",
    fontSize: 18,
    color: COLORS.gray,
  },
  sectionValue: {
    fontFamily: "semibold",
    fontSize: 18,
    color: COLORS.red,
  },
  separator: {
    height: 0.5,
    backgroundColor: COLORS.gray,
    marginVertical: 10,
  },
  containerDPT: { marginTop: 30 },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    width: 150,
    height: 50,
    justifyContent: "flex-end",
    elevation: 5,
    shadowColor: "black",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    flex: 1,
    marginLeft: 7,
    marginTop: 4,
    fontFamily: "bold",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.gray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    color: COLORS.gray,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: COLORS.gray2,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expiryInput: {
    flex: 1,
    marginRight: 20,
  },
  cvcInput: {
    flex: 1,
    marginLeft: 8,
  },
  inputNoIcon: {
    marginLeft: 0,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: 150,
  },
  payButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButtonVisible: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default styles;
