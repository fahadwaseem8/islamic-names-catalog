import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ImageBackground,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Appearance, StatusBar } from "react-native"; // Import StatusBar and Appearance
import { getCurrentTheme } from "../styles/theme"; // Import theme function

export default function Index() {
  const router = useRouter();
  const [theme, setTheme] = useState(getCurrentTheme()); // State to store the current theme

  useEffect(() => {
    // Listen for changes in system color scheme
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const newTheme = getCurrentTheme();
      setTheme(newTheme);

      // Only set background color on Android
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor(newTheme.headerBackground);
      }

      StatusBar.setBarStyle(
        colorScheme === "dark" ? "light-content" : "dark-content"
      );
    });

    // Initial setup for StatusBar
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(theme.headerBackground);
    }
    StatusBar.setBarStyle(
      Appearance.getColorScheme() === "dark" ? "light-content" : "dark-content"
    );

    return () => {
      subscription.remove(); // Clean up the listener when the component is unmounted
    };
  }, [theme]);

  const navigateToNames = () => {
    router.push("/name-list");
  };

  return (
    <ImageBackground
      source={require("../assets/images/app-background.png")} // Background image
      style={styles.background}
      resizeMode="cover" // Adjust image scaling
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          Islamic Names Catalog
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Welcome to the Islamic Names App!
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="View Names"
            onPress={navigateToNames}
            color={theme.button} // Set button color based on the theme
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12, // Add space below the title
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20, // Add space below the subtitle
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20, // Add space above the button
    width: "60%", // Optional: Adjust button width
  },
});
