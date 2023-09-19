import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ipAddress from "../../variable";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import styles from "./Instructor.style";

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
      } catch (error) {}
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
        <Text style={styles.heading}>Instruktor</Text>
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
        <Text style={styles.title}>O meni</Text>
        <Text style={styles.infoText}>{instructor.bio}</Text>
      </View>

      <View style={styles.workHourlyContainer}>
        <View style={[styles.section, styles.workModeContainer]}>
          <Text style={styles.subtitle}>Režim rada</Text>
          <Text style={styles.infoText}>{instructor.workingMode}</Text>
        </View>
        <View style={[styles.section, styles.hourlyRateContainer]}>
          <Text style={styles.subtitle}>Cijena časa</Text>
          <Text style={(styles.infoText, styles.price)}>
            ${instructor.hourlyRate}
          </Text>
        </View>
      </View>

      <View style={[styles.section, styles.coursesSection]}>
        <Text style={styles.titleCourse}>Kursevi</Text>
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

export default InstructorPage;
