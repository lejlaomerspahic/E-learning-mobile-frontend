import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  welcomeTxt: (color, top) => ({
    fontFamily: "bold",
    fontSize: SIZES.xxLarge - 9,
    marginTop: top,
    marginLeft: SIZES.xSmall,
    color: color,
  }),
  searchContariner: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  touchableOpacity: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
  },
  searcWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
    height: 40,
  },
  searchInput: {
    fontFamily: "regular",
    paddingHorizontal: SIZES.small,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
});

export default styles;
