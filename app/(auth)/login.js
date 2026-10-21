import React from "react";
import LoginScreen from "../../screens/LoginScreen";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLoginSuccess = (userData) => {
    login(userData);
    router.replace("/(tabs)/home");
  };

  return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
}

