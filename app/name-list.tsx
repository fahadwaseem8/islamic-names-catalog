import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions,
  Appearance,
} from "react-native";
import { useRouter } from "expo-router";
import NameCard from "../components/NameCard";
import { Picker } from "@react-native-picker/picker";
import { getCurrentTheme } from "../styles/theme"; // Import theme function

const namesData: {
  name: string;
  gender: string;
  origin: string;
}[] = require("../data/names.json");

export default function NameListScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | null>("Any");
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>("Any");
  const [filteredNames, setFilteredNames] = useState<{ name: string }[]>([]);
  const [theme, setTheme] = useState(getCurrentTheme()); // State to store the current theme

  const genders: string[] = [
    "Any",
    ...new Set(namesData.map((item) => item.gender)),
  ];
  const origins: string[] = [
    "Any",
    ...new Set(namesData.map((item) => item.origin)),
  ];

  useEffect(() => {
    // Filter names when search query, gender, or origin changes
    const filterNames = namesData
      .filter((name) => {
        const matchesSearch = name.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesGender =
          selectedGender === "Any" || name.gender === selectedGender;

        const matchesOrigin =
          selectedOrigin === "Any" || name.origin === selectedOrigin;

        return matchesSearch && matchesGender && matchesOrigin;
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

    setFilteredNames(filterNames);
  }, [searchQuery, selectedGender, selectedOrigin]);

  useEffect(() => {
    // Listen for system theme changes
    const listener = Appearance.addChangeListener(() => {
      setTheme(getCurrentTheme()); // Update theme when system theme changes
    });

    return () => listener.remove(); // Cleanup listener on unmount
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[
          styles.searchInput,
          { backgroundColor: theme.cardBackground, color: theme.text },
        ]}
        placeholder="Search names..."
        placeholderTextColor={theme.text} // Change placeholder text color
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <View style={styles.filtersContainer}>
        <View style={styles.filterBox}>
          <Text style={[styles.filterLabel, { color: theme.text }]}>
            Gender:
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedGender}
              onValueChange={(value) => setSelectedGender(value)}
              style={[styles.picker, { color: theme.text }]}
              itemStyle={styles.pickerItem}
              mode="dropdown"
            >
              {genders.map((gender) => (
                <Picker.Item key={gender} label={gender} value={gender} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.filterBox}>
          <Text style={[styles.filterLabel, { color: theme.text }]}>
            Origin:
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedOrigin}
              onValueChange={(value) => setSelectedOrigin(value)}
              style={[styles.picker, { color: theme.text }]}
              itemStyle={styles.pickerItem}
              mode="dropdown"
            >
              {origins.map((origin) => (
                <Picker.Item key={origin} label={origin} value={origin} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

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

const { width } = Dimensions.get("window");

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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterBox: {
    flex: 1,
    marginHorizontal: 8,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    height: 60, // Increased height
    justifyContent: "center",
  },
  picker: {
    width: width * 0.4,
    height: 60, // Match container height
  },
  pickerItem: {
    fontSize: 14,
    height: 60, // Ensure full text visibility
  },
});
