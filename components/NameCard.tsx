import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface NameCardProps {
  name: { name: string };
  onPress: () => void;
}

export default function NameCard({ name, onPress }: NameCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{name.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 18,
  },
});
