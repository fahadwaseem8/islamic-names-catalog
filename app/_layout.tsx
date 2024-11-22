import React from "react";
import { Stack, usePathname } from "expo-router";

export default function RootLayout() {
  const pathname = usePathname(); // Get the current route's pathname

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
        headerTitle: getHeaderTitle(pathname), // Dynamically set the header title
      }}
    />
  );
}
