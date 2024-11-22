import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getCurrentTheme } from "../styles/theme"; // Import the theme function

interface NameDetailCardProps {
  name: {
    name: string;
    meaning: string;
    gender: string;
    origin: string;
  };
  onBack: () => void;
}

export default function NameDetailCard({ name, onBack }: NameDetailCardProps) {
  const theme = getCurrentTheme(); // Get the current theme

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.name, { color: theme.text }]}>{name.name}</Text>
      <Text style={[styles.detail, { color: theme.text }]}>
        Meaning: {name.meaning}
      </Text>
      <Text style={[styles.detail, { color: theme.text }]}>
        Gender: {name.gender}
      </Text>
      <Text style={[styles.detail, { color: theme.text }]}>
        Origin: {name.origin}
      </Text>
      <Button title="Back to List" onPress={onBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 6,
  },
});
