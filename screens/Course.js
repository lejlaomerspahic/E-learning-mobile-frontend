import React from "react";
import { View, StyleSheet } from "react-native";
import YouTubeIframe from "react-native-youtube-iframe";

const Course = () => {
  const videoId = "w2ifba5_1qI"; // ID videa s YouTubea

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <YouTubeIframe videoId={videoId} webViewStyle={styles.video} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -500,
  },
  videoContainer: {
    height: 220,
    borderRadius: 30,
    overflow: "hidden",
  },
  video: {
    width: 390,
  },
});

export default Course;
