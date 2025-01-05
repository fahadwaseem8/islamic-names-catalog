import React, { useState, useEffect } from "react";
import { Stack, usePathname } from "expo-router";
import {
  Appearance,
  StatusBar,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { getCurrentTheme } from "../styles/theme";

export default function RootLayout() {
  const pathname = usePathname();
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const colorScheme = Appearance.getColorScheme(); // Fetch the current color scheme

  // Handle system theme changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      const newTheme = getCurrentTheme();
      setCurrentTheme(newTheme);
      StatusBar.setBarStyle(
        colorScheme === "dark" ? "light-content" : "dark-content"
      );
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor(newTheme.headerBackground);
      }
    });

    // Initial theme setup
    StatusBar.setBarStyle(
      colorScheme === "dark" ? "light-content" : "dark-content"
    );
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(currentTheme.headerBackground);
    }

    return () => listener.remove();
  }, [colorScheme]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {/* Optional View for iOS to simulate status bar background */}
      {Platform.OS === "ios" && (
        <View
          style={{
            height: StatusBar.currentHeight || 20, // Fallback for iOS default
            backgroundColor: currentTheme.headerBackground,
          }}
        />
      )}

      <View
        style={{
          flex: 1,
          backgroundColor: currentTheme.background,
        }}
      >
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: currentTheme.headerBackground,
            },
            headerTintColor: currentTheme.headerText,
            headerTitleStyle: {
              color: currentTheme.headerText,
            },
            contentStyle: {
              backgroundColor: currentTheme.background,
            },
            animation: "fade",
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: getHeaderTitle(pathname),
            }}
          />
          <Stack.Screen
            name="name-list"
            options={{
              title: getHeaderTitle("/name-list"),
            }}
          />
          <Stack.Screen
            name="name-detail"
            options={{
              title: getHeaderTitle("/name-detail"),
            }}
          />
          {Platform.OS === "web" && (
            <Stack.Screen
              name="privacypolicy"
              options={{
                title: "Privacy Policy",
              }}
            />
          )}
        </Stack>
      </View>
    </KeyboardAvoidingView>
  );
}

const getHeaderTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Home";
    case "/name-list":
      return "Names List";
    case "/name-detail":
      return "Name Detail";
    default:
      return "App";
  }
};
