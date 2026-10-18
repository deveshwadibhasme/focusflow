import "./global.css";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView
        className="flex-1 bg-[#F9FAFE]"
        edges={["top", "left", "right"]}
      >
        {currentUser ? (
          <DashboardScreen
            user={currentUser}
            onLogout={handleLogout}
          />
        ) : (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}