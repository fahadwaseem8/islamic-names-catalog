import React, { useState, useEffect } from "react";
import { Stack, usePathname } from "expo-router";
import { Appearance, StatusBar } from "react-native";
import { getCurrentTheme, Theme, lightTheme, darkTheme } from "../styles/theme"; // Import the theme logic

export default function RootLayout() {
  const pathname = usePathname(); // Get the current route's pathname
  const [currentTheme, setCurrentTheme] = useState<Theme>(getCurrentTheme()); // Set initial theme

  useEffect(() => {
    // Listen for system theme changes
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      const newTheme = getCurrentTheme(); // Fetch the new theme
      setCurrentTheme(newTheme);

      // Set the StatusBar style based on the new theme mode
      StatusBar.setBarStyle(
        newTheme === darkTheme ? "light-content" : "dark-content"
      );
      StatusBar.setBackgroundColor(newTheme.headerBackground); // Set status bar background color to match theme
    });

    // Set initial StatusBar style and background color based on the initial theme mode
    StatusBar.setBarStyle(
      currentTheme === darkTheme ? "light-content" : "dark-content"
    );
    StatusBar.setBackgroundColor(currentTheme.headerBackground); // Set initial background color

    // Cleanup the listener when the component is unmounted
    return () => listener.remove();
  }, [currentTheme]);

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
        headerTintColor: currentTheme.headerText, // Set back arrow color to match header text
      }}
    />
  );
}
