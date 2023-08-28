import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/index";
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: "90%",
    height: "70%",
  },
  courseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    padding: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  courseImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  instructorImageContainer: {
    marginRight: 10,
  },
  instructorImage: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    borderRadius: 20,
  },
  instructorDetails: {
    justifyContent: "center",
  },
  instructorName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  productImage: {
    width: 70,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  iconTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
