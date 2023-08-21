import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  upperRow: {
    width: SIZES.width - 45,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    marginTop: 40,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
  videoContainer: {
    marginTop: 60,
    marginHorizontal: 10,
    height: 225,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: 380,
  },
  courseInfoContainer: {
    padding: 20,
    marginTop: -15,
  },
  courseName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  courseInfo: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 10,
  },
  createdBy: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 5,
  },
  contLanguageUpdate: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  update: {
    fontSize: 16,
    color: COLORS.gray,
    marginLeft: 5,
  },

  language: {
    fontSize: 16,
    color: COLORS.gray,
    marginLeft: 5,
  },
  cont: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 20,
    borderColor: COLORS.gray2,
  },
  learnText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 30,
    color: COLORS.gray,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,

    backgroundColor: COLORS.lightGray,
    padding: 5,
  },
  descriptionText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.gray,
    marginLeft: 5,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  instructorImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    marginRight: 10,
    borderColor: COLORS.offwhite,
    borderWidth: 2,
  },
  instructorImage: {
    width: "100%",
    height: "100%",
  },
  instructorDetails: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  instructorOccupation: {
    fontSize: 16,
    color: COLORS.gray,
  },
  instructorLocation: {
    fontSize: 16,
    color: COLORS.gray,
  },
  instructor: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 18,
    fontFamily: "semibold",
    color: COLORS.gray,
  },
  iconContainer: { flexDirection: "row", alignItems: "center" },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 10,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  ratingText: { marginLeft: 5 },
});

export default styles;
