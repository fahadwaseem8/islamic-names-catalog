// /app/name-detail.tsx
import { router, SearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Appearance } from "react-native";
import { getCurrentTheme } from "../styles/theme"; // Import theme function
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
      setTheme(colorScheme === "dark" ? getCurrentTheme() : getCurrentTheme());
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
      <Text style={[styles.details, { color: theme.text }]}>
        Meaning: {nameDetails.meaning}
      </Text>
      <Text style={[styles.details, { color: theme.text }]}>
        Gender: {nameDetails.gender}
      </Text>
      <Text style={[styles.details, { color: theme.text }]}>
        Origin: {nameDetails.origin}
      </Text>
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
