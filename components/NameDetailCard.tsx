import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

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
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name.name}</Text>
      <Text style={styles.detail}>Meaning: {name.meaning}</Text>
      <Text style={styles.detail}>Gender: {name.gender}</Text>
      <Text style={styles.detail}>Origin: {name.origin}</Text>
      <Button title="Back to List" onPress={onBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 10,
    backgroundColor: "#f0f0f0",
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
