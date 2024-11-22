import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import NameCard from "../components/NameCard";
import { Picker } from "@react-native-picker/picker";

const namesData: {
  name: string;
  gender: string;
  origin: string;
}[] = require("../data/names.json");

export default function NameListScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | null>(
    "All Genders"
  );
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(
    "All Origins"
  );
  const [filteredNames, setFilteredNames] = useState<{ name: string }[]>([]);

  const genders: string[] = [
    "All Genders",
    ...new Set(namesData.map((item) => item.gender)),
  ];
  const origins: string[] = [
    "All Origins",
    ...new Set(namesData.map((item) => item.origin)),
  ];

  useEffect(() => {
    const filterNames = namesData.filter((name) => {
      const matchesSearch = name.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesGender =
        selectedGender === "All Genders" || name.gender === selectedGender;

      const matchesOrigin =
        selectedOrigin === "All Origins" || name.origin === selectedOrigin;

      return matchesSearch && matchesGender && matchesOrigin;
    });

    setFilteredNames(filterNames);
  }, [searchQuery, selectedGender, selectedOrigin]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search names..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <View style={styles.filtersContainer}>
        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Gender:</Text>
          <Picker
            selectedValue={selectedGender}
            onValueChange={(value) => setSelectedGender(value)}
            style={styles.picker}
          >
            {genders.map((gender) => (
              <Picker.Item key={gender} label={gender} value={gender} />
            ))}
          </Picker>
        </View>

        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Origin:</Text>
          <Picker
            selectedValue={selectedOrigin}
            onValueChange={(value) => setSelectedOrigin(value)}
            style={styles.picker}
          >
            {origins.map((origin) => (
              <Picker.Item key={origin} label={origin} value={origin} />
            ))}
          </Picker>
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
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
});
