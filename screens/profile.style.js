import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileImageContainer: {
    marginTop: 60,
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 175,
    height: 175,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: -100,
    marginLeft: 160,
    padding: 5,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  chooseIcon: {
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  uploadIcon: {
    backgroundColor: COLORS.secondary,
    padding: 5,
    borderRadius: 5,
  },
  userInfo: {
    alignItems: "center",
    marginTop: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 18,
    color: COLORS.gray,
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 30,
  },
  sectionItem: {
    alignItems: "center",
    width: "48%",
    backgroundColor: COLORS.lightWhite,
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 2,
  },
  sectionText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.gray,
    fontFamily: "semibold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    elevation: 4,
  },
  modalButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  logoutButton: {
    backgroundColor: COLORS.gray2,
    borderRadius: 7,
    alignSelf: "flex-end",
    flexDirection: "row",
    marginTop: 30,
    marginRight: 30,
    paddingLeft: 10,
    elevation: 4,
    height: 45,
  },
  whiteIconContainer: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 5,
    padding: 12,
    marginLeft: 15,
  },
  blueIcon: {
    color: COLORS.blue,
  },
  logoutText: {
    margin: 12,
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "bold",
  },
});

export default styles;
