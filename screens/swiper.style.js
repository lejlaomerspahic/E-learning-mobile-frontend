import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "70%",
    marginBottom: 20,
  },
  slideText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 40,
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
    color: "#007bff",
  },
});
