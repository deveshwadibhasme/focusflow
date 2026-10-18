import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { ALLOWED_CREDENTIALS } from "../data/auth";

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleQuickDemoFill = () => {
    setEmail("guest@focusflow.app");
    setPassword("password123");
    setErrorMessage("");
  };

  // 2 & 3. Social login handlers for Google and Apple
  const handleSocialLogin = (provider) => {
    const isGoogle = provider === "Google";
    const targetEmail = isGoogle ? "google.user@focusflow.app" : "apple.user@focusflow.app";
    const targetName = isGoogle ? "Google User" : "Apple User";

    setEmail(targetEmail);
    setPassword("password123");
    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          email: targetEmail,
          name: targetName,
        });
      }
    }, 800);
  };

  // 4. Manual sign-in handler with strict validation
  const handleSignIn = () => {
    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    // Check credentials: only ALLOWED_CREDENTIALS are valid
    const enteredEmail = email.trim().toLowerCase();
    const matchedAccount = ALLOWED_CREDENTIALS.find(
      (acc) => acc.email.toLowerCase() === enteredEmail && acc.password === password
    );

    if (!matchedAccount) {
      setErrorMessage("Invalid credentials. Try Quick Demo Access.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          email: matchedAccount.email,
          name: matchedAccount.name,
        });
      }
    }, 1000);
  };

  const isFormValid =
    email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    password.length >= 6;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-[#F9FAFE]"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        className="px-5 pt-4"
      >
        {/* Top FocusFlow Branding */}
        <View className="items-center mt-3">
          {/* Logo with status dot */}
          <View className="relative mb-3">
            <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center border border-indigo-100 shadow-sm">
              <View className="w-9 h-9 rounded-full border-4 border-indigo-600 items-center justify-center">
                <View className="w-3 h-3 rounded-full bg-indigo-600" />
              </View>
            </View>
            {/* Active online/ready dot */}
            <View className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
          </View>

          {/* App Title & Version Pill */}
          <View className="flex-row items-center gap-2">
            <Text className="text-2xl font-black text-gray-900 tracking-tight">
              FocusFlow
            </Text>
            <View className="bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full">
              <Text className="text-indigo-600 text-xs font-bold">V2.4</Text>
            </View>
          </View>

          {/* Welcome Heading */}
          <Text className="text-3xl font-extrabold text-gray-900 mt-4 tracking-tight">
            Welcome back
          </Text>
          <Text className="text-gray-500 text-sm mt-1 text-center font-normal">
            Your focus session starts here.
          </Text>
        </View>

        {/* Quick Demo Access banner */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleQuickDemoFill}
          className="mt-6 bg-indigo-50/80 border border-indigo-200/70 rounded-2xl px-4 py-3.5 flex-row items-center justify-between shadow-xs"
        >
          <View className="flex-row items-center gap-2.5">
            <Ionicons name="flash" size={17} color="#D97706" />
            <Text className="text-indigo-900 text-xs font-semibold">
              <Text className="font-bold text-indigo-700">Quick Demo Access</Text>
              {" • Tap to pre-fill"}
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={16} color="#4338CA" />
        </TouchableOpacity>

        {/* Main Form Card */}
        <View className="bg-white rounded-3xl p-5 mt-5 border border-slate-100 shadow-sm">
          {/* Email Field */}
          <View className="mb-4">
            <Text className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">
              Email Address
            </Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-200/70 rounded-2xl px-3.5 py-3">
              <Feather name="mail" size={18} color="#94A3B8" />
              <TextInput
                className="flex-1 ml-3 text-sm text-gray-900 font-medium p-0"
                placeholder="app@dev.com"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errorMessage) setErrorMessage("");
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password Field */}
          <View className="mb-3">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                Password
              </Text>
              <TouchableOpacity
                onPress={() => alert("Credentials: Use manual (app@dev.com / 123456) or tap Quick Demo Access.")}
              >
                <Text className="text-xs font-semibold text-indigo-600">
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center bg-slate-50 border border-slate-200/70 rounded-2xl px-3.5 py-3">
              <Feather name="lock" size={18} color="#94A3B8" />
              <TextInput
                className="flex-1 ml-3 text-sm text-gray-900 font-medium p-0"
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errorMessage) setErrorMessage("");
                }}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Feather
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={18}
                  color="#94A3B8"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Error / Validation Feedback */}
          {errorMessage ? (
            <View className="flex-row items-center gap-1.5 mt-1 mb-4">
              <Ionicons name="alert-circle" size={16} color="#EF4444" />
              <Text className="text-xs font-medium text-red-500">
                {errorMessage}
              </Text>
            </View>
          ) : isFormValid ? (
            <View className="flex-row items-center gap-1.5 mt-1 mb-4">
              <Ionicons name="checkmark-circle" size={16} color="#059669" />
              <Text className="text-xs font-semibold text-emerald-700">
                Ready for high-clarity focus
              </Text>
            </View>
          ) : (
            <View className="h-5 mb-2" />
          )}

          {/* Sign In Primary Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSignIn}
            disabled={isLoading}
            className={`rounded-2xl py-4 flex-row items-center justify-center shadow-md ${isLoading
              ? "bg-indigo-400"
              : "bg-indigo-600 active:bg-indigo-700"
              }`}
          >
            {isLoading ? (
              <View className="flex-row items-center gap-2">
                <ActivityIndicator color="#FFFFFF" size="small" />
                <Text className="text-white text-base font-bold">
                  Signing in...
                </Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-2">
                <Text className="text-white text-base font-bold">
                  Sign in to FocusFlow
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-5">
            <View className="flex-1 h-[1px] bg-slate-200" />
            <Text className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Or continue with
            </Text>
            <View className="flex-1 h-[1px] bg-slate-200" />
          </View>

          {/* Social Sign-in Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSocialLogin("Apple")}
              className="flex-1 bg-slate-50 border border-slate-200/80 rounded-2xl py-3 flex-row items-center justify-center gap-2"
            >
              <FontAwesome name="apple" size={18} color="#111827" />
              <Text className="text-sm font-bold text-gray-800">Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSocialLogin("Google")}
              className="flex-1 bg-slate-50 border border-slate-200/80 rounded-2xl py-3 flex-row items-center justify-center gap-2"
            >
              <FontAwesome name="google" size={16} color="#EA4335" />
              <Text className="text-sm font-bold text-gray-800">Google</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Streak Card */}
        <View className="mt-5 bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5 flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-xl bg-indigo-100/80 items-center justify-center">
            <Ionicons name="timer-outline" size={22} color="#4F46E5" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-bold text-gray-900">
              Daily Streak Intact
            </Text>
            <Text className="text-[11px] text-gray-500 font-normal mt-0.5">
              Sign in today to preserve your 6-day flow record
            </Text>
          </View>
        </View>

        {/* Footer Link */}
        <View className="flex-row items-center justify-center mt-6">
          <Text className="text-xs text-gray-500">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => alert("Registration will be available in the full release!")}
          >
            <Text className="text-xs font-bold text-indigo-600">
              Create free profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

