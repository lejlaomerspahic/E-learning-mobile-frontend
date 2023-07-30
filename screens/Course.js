import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import YouTubeIframe from "react-native-youtube-iframe";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Course = ({ route }) => {
  const { course } = route.params;
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.28:3001/api/course/${course._id}`
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.videoContainer}>
        <YouTubeIframe videoId={courses.videoId} webViewStyle={styles.video} />
      </View>
      <Text style={styles.courseName}>{courses.name}</Text>
      <View style={styles.courseInfoContainer}>
        {courses.instructors.map((instructor, index) => (
          <View key={index} style={styles.instructorContainer}>
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
          </View>
        ))}

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{courses.description}</Text>
        </View>

        <View style={styles.additionalInfoContainer}>
          <View style={styles.additionalInfoBox}>
            <Ionicons name="stopwatch-outline" size={24} color={COLORS.gray} />
            <Text style={styles.additionalInfoText}>
              Duration: {courses.duration}
            </Text>
          </View>
          <View style={styles.additionalInfoBox}>
            <Ionicons name="barbell-outline" size={24} color={COLORS.gray} />
            <Text style={styles.additionalInfoText}>
              Level: {courses.level}
            </Text>
          </View>
          <View style={styles.additionalInfoBox}>
            <Ionicons name="list-outline" size={24} color={COLORS.gray} />
            <Text style={styles.additionalInfoText}>
              Category: {courses.category}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: COLORS.white,
  },
  videoContainer: {
    height: 210,
    overflow: "hidden",
    borderRadius: 20,
    borderColor: COLORS.secondary,
    borderWidth: 5,
  },
  video: {
    width: 380,
  },
  courseInfoContainer: {
    padding: SIZES.padding,
    borderRadius: 20,
    margin: 10,
  },
  courseName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginVertical: 20,
    marginTop: 10,
    marginLeft: -80,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  instructorImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    marginRight: 10,
    borderColor: COLORS.gray2,
    borderWidth: 1,
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
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: COLORS.gray,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 15,
    width: 360,
  },
  additionalInfoContainer: {
    flexDirection: "column",
  },
  additionalInfoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    height: 70,
    borderColor: COLORS.gray2,
    borderWidth: 1,
  },
  additionalInfoText: {
    fontSize: 16,
    color: COLORS.gray,
    marginLeft: 5,
  },
});

export default Course;
