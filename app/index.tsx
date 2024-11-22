// /app/index.tsx
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { Appearance } from "react-native"; // Import Appearance
import { getCurrentTheme } from "../styles/theme"; // Import theme function

export default function Index() {
  const router = useRouter();
  const [theme, setTheme] = useState(getCurrentTheme()); // State to store the current theme

  useEffect(() => {
    // Listen for changes in system color scheme
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? getCurrentTheme() : getCurrentTheme()); // Update theme when the color scheme changes
    });

    return () => {
      subscription.remove(); // Clean up the listener when the component is unmounted
    };
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  const navigateToNames = () => {
    router.push("/name-list");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Islamic Names Catalog
      </Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Welcome to the Islamic Names App!
      </Text>
      <Button
        title="View Names"
        onPress={navigateToNames}
        color={theme.button} // Set button color based on the theme
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
