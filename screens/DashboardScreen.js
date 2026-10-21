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


      {/* Manual Add Task Popup Modal */}
      <AddTaskModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddNewTask}
      />
    </View>
  );
}
