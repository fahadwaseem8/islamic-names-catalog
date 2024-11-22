import { Text, View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const navigateToNames = () => {
    // Navigate to the 'name-list' screen
    router.push("/name-list");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Islamic Names Catalog</Text>
      <Text style={styles.subtitle}>Welcome to the Islamic Names App!</Text>
      <Button title="View Names" onPress={navigateToNames} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: "#555",
  },
});
