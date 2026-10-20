import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Ionicons,
  Feather,
} from "@expo/vector-icons";

import Header from "../components/common/Header";
import AddTaskModal from "../components/AddTaskModal";

import TaskScreen from "./TaskScreen";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import { useTask } from "../hooks/useTask";


export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState("HOME");
  const [isDelightOpen, setIsDelightOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleAddNewTask } = useTask()

  const handleStartPomodoro = () => {
    Alert.alert(
      "Pomodoro Started! ⏱️",
      "25 minutes of deep focus initiated. Distractions muted.",
      [{ text: "Let's Focus" }]
    );
  };

  return (
    <View className="flex-1 bg-[#F9FAFE]">
      {/* Scrollable Body */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
        className="px-5 pt-3"
      >
        {/* Top Header */}
        <Header />

        {/* ==================== TAB 1: HOME ==================== */}
        {activeTab === "HOME" && (
          <HomeScreen
            isDelightOpen={isDelightOpen}
            setIsDelightOpen={setIsDelightOpen}
            handleStartPomodoro={handleStartPomodoro}
            setIsModalOpen={setIsModalOpen} />
        )}

        {/* ==================== TAB 2: TASKS  ==================== */}
        {activeTab === "TASKS" && (
          <TaskScreen handleStartPomodoro={handleStartPomodoro} setIsModalOpen={setIsModalOpen} />
        )}

        {/* ==================== TAB 3: PROFILE ==================== */}
        {activeTab === "PROFILE" && (
          <ProfileScreen />
        )}
      </ScrollView>

      {/* Fixed Bottom Navigation Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-3 px-6 flex-row items-center justify-around shadow-lg">
        {/* Home Tab */}
        <TouchableOpacity
          onPress={() => setActiveTab("HOME")}
          className="items-center"
        >
          <Ionicons
            name={activeTab === "HOME" ? "grid" : "grid-outline"}
            size={22}
            color={activeTab === "HOME" ? "#4F46E5" : "#94A3B8"}
          />
          <Text
            className={`text-[10px] mt-1 font-bold ${activeTab === "HOME" ? "text-indigo-600" : "text-gray-400 font-medium"
              }`}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Tasks Tab */}
        <TouchableOpacity
          onPress={() => setActiveTab("TASKS")}
          className="items-center"
        >
          <Ionicons
            name={activeTab === "TASKS" ? "checkmark-circle" : "checkmark-circle-outline"}
            size={22}
            color={activeTab === "TASKS" ? "#4F46E5" : "#94A3B8"}
          />
          <Text
            className={`text-[10px] mt-1 font-bold ${activeTab === "TASKS" ? "text-indigo-600" : "text-gray-400 font-medium"
              }`}
          >
            Tasks
          </Text>
        </TouchableOpacity>

        {/* Profile Tab */}
        <TouchableOpacity
          onPress={() => setActiveTab("PROFILE")}
          className="items-center"
        >
          <Feather
            name="user"
            size={22}
            color={activeTab === "PROFILE" ? "#4F46E5" : "#94A3B8"}
          />
          <Text
            className={`text-[10px] mt-1 font-bold ${activeTab === "PROFILE" ? "text-indigo-600" : "text-gray-400 font-medium"
              }`}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Manual Add Task Popup Modal */}
      <AddTaskModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddNewTask}
      />
    </View>
  );
}
