import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ipAddress from "../../variable";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"; // Import the Ionicons icons
import { COLORS, SIZES } from "../../constants";
import Blank from "../products/Blank";
import { useNavigation } from "@react-navigation/native";

const InstructorPage = ({ route }) => {
  const { instructorId } = route.params;
  const [instructor, setInstructor] = useState(null);
  const navigate = useNavigation();

  const handleCoursePress = (course) => {
    navigate.navigate("Course", { course: course });
  };

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
          `${ipAddress}/api/instructor/${instructorId}`,
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

  const callInstructor = () => {
    const phoneNumber = instructor.contact?.phone;
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };
  const sendEmail = () => {
    const email = instructor.contact?.email;
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };
  const openWebsite = () => {
    const websiteUrl = instructor.contact?.website;
    if (websiteUrl) {
      Linking.openURL(websiteUrl);
    }
  };

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
            <Ionicons
              name="location"
              size={24}
              color={COLORS.red}
              style={{ marginLeft: -5 }}
            />
            <Text style={styles.locationText}>{instructor.location}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={callInstructor}>
              <Ionicons name="call" size={26} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={sendEmail}>
              <Ionicons
                name="mail"
                size={26}
                color={COLORS.primary}
                style={{ marginLeft: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openWebsite}>
              <Ionicons
                name="globe"
                size={26}
                color={COLORS.primary}
                style={{ marginLeft: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[styles.section, styles.aboutMeSection]}>
        <Text style={styles.title}>About Me</Text>
        <Text style={styles.infoText}>{instructor.bio}</Text>
      </View>

      <View style={styles.workHourlyContainer}>
        <View style={[styles.section, styles.workModeContainer]}>
          <Text style={styles.subtitle}>Work Mode</Text>
          <Text style={styles.infoText}>{instructor.workingMode}</Text>
        </View>
        <View style={[styles.section, styles.hourlyRateContainer]}>
          <Text style={styles.subtitle}>Hourly Rate</Text>
          <Text style={(styles.infoText, styles.price)}>
            ${instructor.hourlyRate}
          </Text>
        </View>
      </View>

      <View style={[styles.section, styles.coursesSection]}>
        <Text style={styles.titleCourse}>Courses</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {instructor.courses.map((course) => (
            <TouchableOpacity
              key={course._id}
              style={styles.courseCard}
              onPress={() => handleCoursePress(course)}
            >
              <Image
                source={{ uri: course.imageUrl }}
                style={styles.courseImage}
              />
              <Text style={styles.courseTitle} numberOfLines={2}>
                {course.name}
              </Text>
              <Text style={styles.courseInfo}>{course.category}</Text>
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
    padding: 15,
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
    marginTop: 90,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  instructorInfo: {
    marginLeft: 16,
  },
  nameContainer: { flexDirection: "row", alignItems: "baseline" },
  occupation: { fontSize: 16 },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    color: COLORS.gray,
  },

  locationText: {
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
    padding: 10,
    borderRadius: 16,
  },
  coursesSection: {
    marginTop: -10,
  },
  aboutMeSection: {
    backgroundColor: COLORS.offwhite,
    marginTop: 20,
  },
  workHourlyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  workModeContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.secondary,
  },
  hourlyRateContainer: {
    flex: 1,
    marginLeft: 8,
    padding: 10,
    backgroundColor: COLORS.secondary,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.gray,
  },
  courseCard: {
    backgroundColor: COLORS.offwhite,
    marginRight: 15,
    borderRadius: 16,
    width: 160,
    height: 210,
    alignItems: "flex-start",
    padding: 10,
  },
  courseImage: {
    width: 130,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
  },
  courseInfo: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 15,
  },
  price: {
    color: COLORS.red,
    fontFamily: "semibold",
  },
  titleCourse: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.gray,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray,
  },
});

export default InstructorPage;
