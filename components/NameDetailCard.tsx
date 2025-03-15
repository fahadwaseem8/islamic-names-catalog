import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getCurrentTheme } from "../styles/theme"; // Ensure this file exists or adjust the import

interface NameDetailCardProps {
  name: string;
  meaning: string;
  gender: string;
}

export default function NameDetailCard({
  name,
  meaning,
  gender,
}: NameDetailCardProps) {
  const theme = getCurrentTheme(); // Get the current theme

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.details, { color: theme.text }]}>
        <Text style={styles.label}>Meaning: </Text>
        {meaning}
      </Text>
      <Text style={[styles.details, { color: theme.text }]}>
        <Text style={styles.label}>Gender: </Text>
        {gender}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
