import { Appearance } from "react-native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getCurrentTheme } from "../styles/theme";
import { useSearchParams } from "expo-router/build/hooks";

// Assuming the names data is in a `names.json` file inside the `data` folder.
const namesData = require("../data/names.json");

export default function NameDetailScreen() {
  const searchParams = useSearchParams(); // Get the search params
  const name = searchParams.get("name"); // Get the name from query params
  const [nameDetails, setNameDetails] = useState<any>(null); // State to hold the fetched details
  const [theme, setTheme] = useState(getCurrentTheme()); // State to store the current theme

  useEffect(() => {
    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(getCurrentTheme());
    });

    // Filter the namesData to find the matching name
    const foundName = namesData.find(
      (item: { name: string }) => item.name === name
    );
    if (foundName) {
      setNameDetails(foundName); // Set the found name details
    }

    return () => {
      subscription.remove(); // Clean up the listener
    };
  }, [name]); // Re-run whenever the name changes

  if (!nameDetails) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.name, { color: theme.text }]}>Name not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.details, { color: theme.text }]}>
          <Text style={styles.label}>Meaning: </Text>
          {nameDetails.meaning}
        </Text>
        <Text style={[styles.details, { color: theme.text }]}>
          <Text style={styles.label}>Gender: </Text>
          {nameDetails.gender}
        </Text>
        <Text style={[styles.details, { color: theme.text }]}>
          <Text style={styles.label}>Origin: </Text>
          {nameDetails.origin}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24, // Space below the title
  },
  card: {
    width: "90%", // Card width
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000", // Shadow for better elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
    marginBottom: 16,
  },
  details: {
    fontSize: 18,
    marginBottom: 12, // Space between each detail
    textAlign: "left", // Align text inside the card
    lineHeight: 24,
  },
  label: {
    fontWeight: "bold", // Highlight labels like "Meaning:"
  },
});
