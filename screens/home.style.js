import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";
const styles = StyleSheet.create({
  appBar: {
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  userImageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 190,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.secondary,
    width: 370,
    marginTop: 3,
    marginLeft: 25,
    marginRight: 25,
  },
});
export default styles;
