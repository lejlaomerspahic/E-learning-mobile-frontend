import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    position: "absolute",
    bottom: 405,
    right: 0,
    left: 185,
    height: "45%",
    width: "65%",
    resizeMode: "contain",
  },
  roundedContainer: {
    backgroundColor: "#f2f9ff",
    borderRadius: 20,
    paddingHorizontal: 20,
    width: "85%",
    height: 550,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0d9eff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#0d9eff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  errorText: {
    color: "#0d9eff",
    marginBottom: 8,
    marginTop: -3,
    marginLeft: 3,
  },
  button: {
    backgroundColor: "#0d9eff",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    width: "75%",
    height: 50,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  loginLink: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#999",
  },
  boldBlueText: {
    fontWeight: "bold",
    color: "#0d9eff",
  },
  inputWithShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonWithShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonWithShadoww: {
    textShadowColor: "gray",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 2,
  },
});

export default styles;
