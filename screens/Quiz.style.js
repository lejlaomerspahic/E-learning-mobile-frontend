import { StyleSheet } from "react-native";
import { COLORS } from "../constants/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  timerContainer: {
    alignItems: "center",
    paddingVertical: 30,
    marginLeft: 220,
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  swiper: {},
  quizImage: {
    width: 300,
    height: 200,
    alignSelf: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
  },
  questionHeader: {
    alignSelf: "stretch",
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  questionHeaderText: {
    color: COLORS.lightWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
  questionInnerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginHorizontal: 25,
  },
  optionsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -80,
  },
  optionContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    width: 300,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  nextButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.lightWhite,
    textAlign: "center",
  },
});

export default styles;
