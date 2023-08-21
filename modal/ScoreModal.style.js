import { StyleSheet } from "react-native";
import { COLORS } from "../constants/index";
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
    width: "85%",
    alignItems: "center",
  },
  quizContainer: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 270,
    height: 150,
    borderRadius: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    color: COLORS.gray,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  quizInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    width: 250,
  },
  quizInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  quizInfoContainerScore: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 30,
    width: 150,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  infoTextScore: {
    fontSize: 16,
    color: COLORS.primary,
  },
});

export default styles;
