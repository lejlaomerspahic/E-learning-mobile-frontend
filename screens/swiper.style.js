import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 550,
    marginTop: -50,
  },
  slideTextOne: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -30,
    marginRight: 160,
    marginLeft: 25,
    color: "#0d9eff",
    textShadowColor: "gray",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 2,
  },
  slideTextTwo: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -30,
    marginRight: 120,
    marginLeft: 18,
    color: "#0d9eff",
    textShadowColor: "gray",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 2,
  },
  slideTextThree: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -30,
    marginRight: 180,
    marginLeft: 5,
    color: "#0d9eff",
    textShadowColor: "gray",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 2,
  },
  slideDescription: {
    marginLeft: 20,
    marginRight: 30,
    fontSize: 16,
    color: COLORS.gray,
  },
  dot: {
    backgroundColor: "#ccc",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#007bff",
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  skipButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  skipButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d9eff",
  },
});

export default styles;
