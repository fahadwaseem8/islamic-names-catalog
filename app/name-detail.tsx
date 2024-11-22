import { useSearchParams } from "expo-router/build/hooks";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// Assuming the names data is in a `names.json` file inside the `data` folder.
const namesData = require("../data/names.json");

export default function NameDetailScreen() {
  const searchParams = useSearchParams(); // Get the search params
  const name = searchParams.get("name"); // Get the name from query params
  const [nameDetails, setNameDetails] = useState<any>(null); // State to hold the fetched details

  useEffect(() => {
    // Filter the namesData to find the matching name
    const foundName = namesData.find(
      (item: { name: string }) => item.name === name
    );
    if (foundName) {
      setNameDetails(foundName); // Set the found name details
    }
  }, [name]); // Re-run whenever the name changes

  if (!nameDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Name not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>Meaning: {nameDetails.meaning}</Text>
      <Text style={styles.details}>Gender: {nameDetails.gender}</Text>
      <Text style={styles.details}>Origin: {nameDetails.origin}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  details: {
    fontSize: 16,
    marginTop: 10,
  },
});
