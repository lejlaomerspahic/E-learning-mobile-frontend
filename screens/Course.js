import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import YouTubeIframe from "react-native-youtube-iframe";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Blank from "../components/course/Blank";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Course = ({ route }) => {
  const { course } = route.params;
  const [courses, setCourses] = useState(null);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cont}>
        <View style={styles.videoContainer}>
          <YouTubeIframe
            videoId={courses.videoId}
            webViewStyle={styles.video}
          />
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
              <Ionicons
                name="stopwatch-outline"
                size={24}
                color={COLORS.gray}
              />
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
        <Blank></Blank>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  cont: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginTop: 30,
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
    marginVertical: 10,
    marginTop: 10,
    marginLeft: -80,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 20,
    padding: 10,
  },
  instructorImageContainer: {
    width: 90,
    height: 90,
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
    height: 60,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
  },
  additionalInfoText: {
    fontSize: 16,
    color: COLORS.gray,
    marginLeft: 5,
    fontFamily: "semibold",
  },
});

export default Course;
