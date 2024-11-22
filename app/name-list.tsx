import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter
import NameCard from "../components/NameCard"; // Reusable name card component
import RNPickerSelect from "react-native-picker-select"; // Import new picker

// Import names data
const namesData: {
  name: string;
  gender: string;
  origin: string;
}[] = require("../data/names.json");

export default function NameListScreen() {
  const router = useRouter(); // Initialize useRouter hook
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | null>("Any");
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>("Any");
  const [filteredNames, setFilteredNames] = useState<{ name: string }[]>([]);

  // Extract unique genders and origins from namesData
  const genders: string[] = [
    "Any",
    ...new Set(namesData.map((item) => item.gender)),
  ];
  const origins: string[] = [
    "Any",
    ...new Set(namesData.map((item) => item.origin)),
  ];

  useEffect(() => {
    // Filter names based on search query, gender, and origin
    const filterNames = namesData.filter((name) => {
      const matchesSearch = name.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGender =
        selectedGender && selectedGender !== "Any"
          ? name.gender === selectedGender
          : true;
      const matchesOrigin =
        selectedOrigin && selectedOrigin !== "Any"
          ? name.origin === selectedOrigin
          : true;
      return matchesSearch && matchesGender && matchesOrigin;
    });

    setFilteredNames(filterNames); // Update filtered names
  }, [searchQuery, selectedGender, selectedOrigin]); // Re-run filter when filters change

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search names..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      {/* Filters Section (Gender & Origin Side by Side) */}
      <View style={styles.filtersContainer}>
        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Gender:</Text>
          <RNPickerSelect
            value={selectedGender}
            onValueChange={(value) => setSelectedGender(value)}
            style={pickerSelectStyles}
            items={genders.map((gender) => ({
              label: gender,
              value: gender,
            }))}
          />
        </View>

        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Origin:</Text>
          <RNPickerSelect
            value={selectedOrigin}
            onValueChange={(value) => setSelectedOrigin(value)}
            style={pickerSelectStyles}
            items={origins.map((origin) => ({
              label: origin,
              value: origin,
            }))}
          />
        </View>
      </View>

      {/* Name List */}
      <FlatList
        data={filteredNames}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <NameCard
            name={item}
            onPress={() => router.push(`/name-detail?name=${item.name}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
  },
  filtersContainer: {
    flexDirection: "row", // Align filters horizontally (side by side)
    justifyContent: "space-between", // Space out the filters
    marginBottom: 20,
  },
  filterBox: {
    flex: 1, // Each filter takes equal space
    marginHorizontal: 8,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

// Picker styles for react-native-picker-select
const pickerSelectStyles = {
  inputIOS: {
    height: 55, // Increased height to prevent clipping
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10, // Added right padding for consistency
    color: "black", // Text color
    backgroundColor: "#fff", // Background color for IOS
    fontSize: 16, // Adjusted font size for better readability
    textAlign: "center" as "center", // Explicitly set textAlign to "center"
    lineHeight: 30, // Adjust line-height to avoid clipping of letters
  },
  inputAndroid: {
    height: 55, // Increased height to prevent clipping
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10, // Added right padding for consistency
    color: "black", // Text color
    backgroundColor: "#fff", // Background color for Android
    fontSize: 16, // Adjusted font size for better readability
    textAlign: "center" as "center", // Explicitly set textAlign to "center"
    lineHeight: 30, // Adjust line-height to avoid clipping of letters
  },
};
