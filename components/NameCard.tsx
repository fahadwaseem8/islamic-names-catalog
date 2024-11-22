import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { getCurrentTheme } from "../styles/theme"; // Import the theme function

interface NameCardProps {
  name: { name: string };
  onPress: () => void;
}

export default function NameCard({ name, onPress }: NameCardProps) {
  const theme = getCurrentTheme(); // Get the current theme

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.cardBackground }]}
      onPress={onPress}
    >
      <Text style={[styles.name, { color: theme.text }]}>{name.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 18,
  },
});
