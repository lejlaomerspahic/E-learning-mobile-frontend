import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import YouTubeIframe from "react-native-youtube-iframe";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Blank from "../components/course/Blank";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
const Course = ({ route }) => {
  const { course } = route.params;
  const [courses, setCourses] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigation();

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://192.168.0.28:3001/api/course/${course._id}`,
          config
        );
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseData();
  }, [course._id]);

  if (!courses) {
    return null;
  }

  const splitDescriptionIntoSentences = (description) => {
    return description.split(". ");
  };

  const descriptionSentences = splitDescriptionIntoSentences(
    courses.description
  );

  const handleInstructorPress = (instructorId) => {
    navigate.navigate("InstructorDetails", { instructorId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.offwhite}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>{course.category}</Text>
      </View>

      <View style={styles.videoContainer}>
        <YouTubeIframe videoId={courses.videoId} webViewStyle={styles.video} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.courseInfoContainer}>
          <Text style={styles.courseName}>{courses.name}</Text>
          <Text style={styles.courseInfo}>{courses.info}</Text>

          {courses.instructors.map((instructor, index) => (
            <Text key={index} style={styles.createdBy}>
              Created by: {instructor.name}
            </Text>
          ))}

          <View style={styles.contLanguageUpdate}>
            <View style={styles.iconTextContainer}>
              <Ionicons name="time" size={22} color={COLORS.gray} />
              <Text style={styles.update}>
                Last Updated: {courses.lastUpdated}
              </Text>
            </View>
            <View style={styles.iconTextContainer}>
              <Ionicons name="globe-outline" size={22} color={COLORS.gray} />
              <Text style={styles.language}>{courses.language}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cont}>
          <Text style={styles.learnText}>What you'll learn?</Text>
          {descriptionSentences.map((sentence, index) => (
            <View key={index} style={styles.descriptionContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color={COLORS.gray}
              />
              <Text style={styles.descriptionText}>{sentence}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.instructor}>Instructor:</Text>
        {courses.instructors.map((instructor, index) => (
          <TouchableOpacity
            key={index}
            style={styles.instructorContainer}
            onPress={() => handleInstructorPress(instructor._id)}
          >
            <View style={styles.instructorImageContainer}>
              <Image
                source={{ uri: instructor.imageUrl }}
                style={styles.instructorImage}
              />
            </View>
            <View style={styles.instructorDetails}>
              <Text style={styles.instructorName}>{instructor.name}</Text>
              <Text style={styles.instructorOccupation}>
                {instructor.occupation}
              </Text>
              <Text style={styles.instructorLocation}>
                {instructor.location}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  upperRow: {
    width: SIZES.width - 45,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    marginTop: 40,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
  videoContainer: {
    marginTop: 60,
    marginHorizontal: 10,
    height: 225,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: 380,
  },
  courseInfoContainer: {
    padding: 20,
    marginTop: -15,
  },
  courseName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  courseInfo: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 10,
  },
  createdBy: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 5,
  },
  contLanguageUpdate: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  update: {
    fontSize: 16,
    color: COLORS.gray,
    marginLeft: 5,
  },

  language: {
    fontSize: 16,
    color: COLORS.gray,
    marginLeft: 5,
  },
  cont: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 20,
    borderColor: COLORS.gray2,
  },
  learnText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 30,
    color: COLORS.gray,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,

    backgroundColor: COLORS.lightGray,
    padding: 5,
  },
  descriptionText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.gray,
    marginLeft: 5,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  instructorImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 45,
    overflow: "hidden",
    marginRight: 10,
    borderColor: COLORS.offwhite,
    borderWidth: 2,
  },
  instructorImage: {
    width: "100%",
    height: "100%",
  },
  instructorDetails: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  instructorOccupation: {
    fontSize: 16,
    color: COLORS.gray,
  },
  instructorLocation: {
    fontSize: 16,
    color: COLORS.gray,
  },
  instructor: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 18,
    fontFamily: "semibold",
    color: COLORS.gray,
  },
});

export default Course;
