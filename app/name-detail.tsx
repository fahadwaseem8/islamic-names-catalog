import { Appearance } from "react-native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getCurrentTheme } from "../styles/theme";
import { useSearchParams } from "expo-router/build/hooks";
import NameDetailCard from "../components/NameDetailCard"; // Import the new component

const namesData = require("../data/names.json");

export default function NameDetailScreen() {
  const searchParams = useSearchParams(); // Get the search params
  const name = searchParams.get("name"); // Get the name from query params
  const [nameDetails, setNameDetails] = useState<any>(null); // State to hold the fetched details
  const [theme, setTheme] = useState(getCurrentTheme()); // State to store the current theme

  useEffect(() => {
    // Update theme dynamically when system theme changes
    const listener = Appearance.addChangeListener(() => {
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
      listener.remove(); // Clean up listener on unmount
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
      <Text style={[styles.name, { color: theme.text }]}>
        {nameDetails.name}
      </Text>
      <NameDetailCard
        name={nameDetails.name}
        meaning={nameDetails.meaning}
        gender={nameDetails.gender}
        origin={nameDetails.origin}
      />
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
});
