import "./global.css";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { login, logout, isAuthenticated } = useAuth()


  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView
        className="flex-1 bg-[#F9FAFE]"
        edges={["top", "left", "right"]}
      >
        {isAuthenticated ? (
          <DashboardScreen
            onLogout={logout}
          />
        ) : (
          <LoginScreen onLoginSuccess={login} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}