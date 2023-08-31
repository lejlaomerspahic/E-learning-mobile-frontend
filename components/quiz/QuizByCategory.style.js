import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  courseContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    marginTop: 30,
  },
  courseImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContainer: {
    justifyContent: "space-between",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
    marginBottom: 5,
  },
  courseDescription: {
    color: "gray",
    marginBottom: 10,
  },
  quizInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  quizInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 5,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    elevation: 2,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  startButtonText: {
    color: COLORS.white,
    marginLeft: 5,
    fontFamily: "bold",
  },
  courses: { marginTop: 50 },
  upperRow: {
    width: SIZES.width - 45,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
    marginTop: 20,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
    marginTop: 5,
  },
});

export default styles;
