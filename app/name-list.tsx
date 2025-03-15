import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions,
  Appearance,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import NameCard from "../components/NameCard";
import { Picker } from "@react-native-picker/picker";
import { getCurrentTheme } from "../styles/theme"; // Import theme function

const namesData: {
  name: string;
  gender: string;
}[] = require("../data/names.json");

export default function NameListScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | undefined>(
    "Any"
  );
  const [filteredNames, setFilteredNames] = useState<{ name: string }[]>([]);
  const [theme, setTheme] = useState(getCurrentTheme()); // State to store the current theme

  const genders: string[] = [
    "Any",
    ...new Set(namesData.map((item) => item.gender)),
  ];

  useEffect(() => {
    // Filter names when search query or gender changes
    const filterNames = namesData
      .filter((name) => {
        const matchesSearch = name.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesGender =
          selectedGender === "Any" || name.gender === selectedGender;



        return matchesSearch && matchesGender;
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

    setFilteredNames(filterNames);
  }, [searchQuery, selectedGender]);

  useEffect(() => {
    // Listen for system theme changes
    const listener = Appearance.addChangeListener(() => {
      setTheme(getCurrentTheme()); // Update theme when system theme changes
    });

    return () => listener.remove(); // Cleanup listener on unmount
  }, []);

  const renderPicker = (
    value: string | undefined,
    onValueChange: (value: string) => void,
    items: string[]
  ) => {
    if (Platform.OS === "web") {
      return (
        <View style={styles.webPickerContainer}>
          <select
            value={value || ""}
            onChange={(e) => onValueChange(e.target.value)}
            style={{
              backgroundColor: theme.cardBackground,
              color: theme.text,
              width: "100%",
              height: "40px",
              borderRadius: 8,
              padding: "0 10px",
              border: `1px solid ${theme.text}`,
              outline: "none",
            }}
          >
            {items.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </View>
      );
    }

    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value || undefined}
          onValueChange={onValueChange}
          style={[styles.picker, { color: theme.text }]}
          itemStyle={styles.pickerItem}
          mode="dropdown"
        >
          {items.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[
          styles.searchInput,
          { backgroundColor: theme.cardBackground, color: theme.text },
        ]}
        placeholder="Search names..."
        placeholderTextColor={theme.text}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <View style={styles.filtersContainer}>
        <View style={styles.filterBox}>
          <Text style={[styles.filterLabel, { color: theme.text }]}>
            Gender:
          </Text>
          {renderPicker(selectedGender, setSelectedGender, genders)}
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
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    marginBottom: 20,
  },
  filterBox: {
    width: "50%", // Fixed width
    marginHorizontal: "auto", // Center horizontally
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center", // Center text
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    height: 60, // Increased height
    justifyContent: "center",
  },
  picker: {
    width: "100%", // Full width of the container
    height: 60, // Match container height
  },
  pickerItem: {
    fontSize: 14,
    height: 60, // Ensure full text visibility
  },
  webPickerContainer: {
    width: "100%",
  },
});
