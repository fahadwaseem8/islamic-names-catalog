// /styles/theme.ts
import { Appearance } from "react-native";

export interface Theme {
  background: string;
  text: string;
  button: string;
  cardBackground: string;
  headerBackground: string;
  headerText: string;
}

export const lightTheme: Theme = {
  background: "#ffffff",
  text: "#000000",
  button: "#007BFF",
  cardBackground: "#F9F9F9",
  headerBackground: "#ffffff",
  headerText: "#000000",
};

export const darkTheme: Theme = {
  background: "#121212",
  text: "#ffffff",
  button: "#6200EE",
  cardBackground: "#1E1E1E",
  headerBackground: "#121212",
  headerText: "#ffffff",
};

export const getCurrentTheme = (): Theme => {
  const currentTheme = Appearance.getColorScheme();
  return currentTheme === "dark" ? darkTheme : lightTheme;
};
