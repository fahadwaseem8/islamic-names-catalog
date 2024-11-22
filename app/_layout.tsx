// /app/_layout.tsx
import React, { useState, useEffect } from "react";
import { Stack, usePathname } from "expo-router";
import { Appearance } from "react-native";
import { getCurrentTheme } from "../styles/theme"; // Import the theme logic

export default function RootLayout() {
  const pathname = usePathname(); // Get the current route's pathname
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme()); // Set initial theme

  useEffect(() => {
    // Listen for system theme changes
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setCurrentTheme(
        colorScheme === "dark" ? getCurrentTheme() : getCurrentTheme()
      );
    });

    // Cleanup the listener when the component is unmounted
    return () => listener.remove();
  }, []);

  // Function to get the title based on the route
  const getHeaderTitle = (pathname: string) => {
    switch (pathname) {
      case "/":
        return "Home";
      case "/name-list":
        return "Names List";
      case "/name-detail":
        return "Name Detail";
      default:
        return "App"; // Default title for unknown routes
    }
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: currentTheme.headerBackground, // Use the header background color from the theme
        },
        headerTitleStyle: {
          color: currentTheme.headerText, // Use the header text color from the theme
        },
        headerTitle: getHeaderTitle(pathname), // Dynamically set the header title
      }}
    />
  );
}
