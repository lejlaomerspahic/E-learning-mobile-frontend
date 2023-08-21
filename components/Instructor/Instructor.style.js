import { COLORS, SIZES } from "../../constants";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.white,
  },
  upperRow: {
    width: SIZES.width - 45,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    marginTop: 20,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
  instructorContainer: {
    marginTop: 90,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  instructorInfo: {
    marginLeft: 16,
  },
  nameContainer: { flexDirection: "row", alignItems: "baseline" },
  occupation: { fontSize: 16 },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    color: COLORS.gray,
  },

  locationText: {
    fontSize: 16,
    marginTop: 3,
    color: COLORS.gray,
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 16,
  },
  coursesSection: {
    marginTop: -10,
  },
  aboutMeSection: {
    backgroundColor: COLORS.offwhite,
    marginTop: 20,
  },
  workHourlyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  workModeContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.secondary,
  },
  hourlyRateContainer: {
    flex: 1,
    marginLeft: 8,
    padding: 10,
    backgroundColor: COLORS.secondary,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.gray,
  },
  courseCard: {
    backgroundColor: COLORS.offwhite,
    marginRight: 15,
    borderRadius: 16,
    width: 160,
    height: 210,
    alignItems: "flex-start",
    padding: 10,
  },
  courseImage: {
    width: 130,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
  },
  courseInfo: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 15,
  },
  price: {
    color: COLORS.red,
    fontFamily: "semibold",
  },
  titleCourse: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.gray,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
  },
});

export default styles;
