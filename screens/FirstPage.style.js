import { StyleSheet } from "react-native";
import { COLORS } from "../constants/index";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 300,
    marginLeft: -400,
  },
  imageStyle: {
    height: "98%",
    width: "70%",
    resizeMode: "contain",
  },
  textContainer: {
    position: "absolute",
    top: 470,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0d9eff",
  },
  subTitle: {
    fontSize: 20,
    color: "#0d9eff",
  },
  buttonContainer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: -30,
    alignItems: "center",
    width: "95%",
    height: 300,
    borderRadius: 50,
  },

  content: {
    fontSize: 16,
    color: "#0d9eff",
    paddingHorizontal: 50,
    paddingBottom: 30,
    paddingTop: 30,
  },
  button: {
    width: "75%",
    backgroundColor: "#0d9eff",
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 85,
  },
  buttonIcon: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
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
});

export default styles;
