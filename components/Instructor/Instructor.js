import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"; // Import the Ionicons icons
import { COLORS, SIZES } from "../../constants";
import Blank from "../products/Blank";

const InstructorPage = ({ route }) => {
  const { instructorId } = route.params;
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://192.168.0.28:3001/api/instructor/${instructorId}`,
          config
        );
        setInstructor(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInstructor();
  }, [instructorId]);

  if (!instructor) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.offwhite}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Instructor</Text>
      </View>

      <View style={styles.instructorContainer}>
        <Image
          source={{ uri: instructor.imageUrl }}
          style={styles.profileImage}
        />
        <View style={styles.instructorInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{instructor.name}</Text>
            <Text style={styles.occupation}>, {instructor.occupation}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="location" size={24} color={COLORS.red} />
            <Text style={styles.infoText}>{instructor.location}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="call" size={24} color={COLORS.primary} />
            <Ionicons
              name="mail"
              size={24}
              color={COLORS.primary}
              style={{ marginLeft: 20 }}
            />
            <Ionicons
              name="globe"
              size={24}
              color={COLORS.primary}
              style={{ marginLeft: 20 }}
            />
          </View>
        </View>
      </View>

      <View style={[styles.section, styles.aboutMeSection]}>
        <Text style={styles.title}>About Me</Text>
        <Text style={styles.infoText}>{instructor.bio}</Text>
      </View>

      <View style={styles.workHourlyContainer}>
        <View style={[styles.section, styles.workModeContainer]}>
          <Text style={styles.title}>Work Mode</Text>
          <Text style={styles.infoText}>{instructor.workingMode}</Text>
        </View>
        <View style={[styles.section, styles.hourlyRateContainer]}>
          <Text style={styles.title}>Hourly Rate</Text>
          <Text style={styles.infoText}>${instructor.hourlyRate}</Text>
        </View>
      </View>

      <View style={[styles.section, styles.coursesSection]}>
        <Text style={styles.title}>Courses</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {instructor.courses.map((course) => (
            <TouchableOpacity key={course._id} style={styles.courseCard}>
              <Image
                source={{ uri: course.imageUrl }}
                style={styles.courseImage}
              />
              <Text style={styles.courseTitle}>{course.name}</Text>
              <Text style={styles.courseInfo}>Category: {course.category}</Text>
              <Text style={styles.courseInfo}>Price: ${course.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.large,
    backgroundColor: COLORS.white,
  },
  upperRow: {
    width: SIZES.width - 45,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    marginTop: 20,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
  instructorContainer: {
    marginTop: 100,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  instructorInfo: {
    marginLeft: 16,
  },
  nameContainer: { flexDirection: "row", alignItems: "baseline" },
  occupation: { fontSize: 16 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    marginTop: 3,
    color: COLORS.gray,
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  section: {
    marginBottom: 10,
    padding: 16,
    borderRadius: 16,
  },
  coursesSection: {
    width: 400,
    marginLeft: -13,
  },
  aboutMeSection: {
    backgroundColor: COLORS.secondary,
    marginTop: 20,
  },
  workHourlyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    height: 70,
  },
  workModeContainer: {
    flex: 1,
    marginRight: 3,
    backgroundColor: COLORS.offwhite,
  },
  hourlyRateContainer: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: COLORS.offwhite,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLORS.gray,
  },
  courseCard: {
    backgroundColor: COLORS.offwhite,
    marginRight: 15,
    borderRadius: 16,
    width: 170,
    height: 250,
    alignItems: "center",
    padding: 10,
  },
  courseImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  courseInfo: {
    fontSize: 14,
    color: COLORS.gray,
  },
});

export default InstructorPage;
