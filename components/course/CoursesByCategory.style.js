import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/index";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  courseContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    marginTop: 10,
  },
  imageContainer: {
    width: 100,
    height: 110,
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
  },
  courseImage: {
    width: 100,
    height: 110,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    height: 60,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
    padding: 5,
  },
  courseDescription: {
    color: "gray",
    paddingLeft: 5,
    width: 215,
  },
  courses: { marginTop: 70 },
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
