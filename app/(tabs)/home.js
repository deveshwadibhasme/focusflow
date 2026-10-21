import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import HomeScreen from "../../screens/HomeScreen";
import AddTaskModal from "../../components/AddTaskModal";
import { useTask } from "../../hooks/useTask";

export default function HomeTab() {
  const [isDelightOpen, setIsDelightOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleAddNewTask } = useTask();

  const handleStartPomodoro = () => {
    Alert.alert(
      "Pomodoro Started! ⏱️",
      "25 minutes of deep focus initiated. Distractions muted.",
      [{ text: "Let's Focus" }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFE]" edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        className="px-5 pt-3"
      >
        <Header />
        <HomeScreen
          isDelightOpen={isDelightOpen}
          setIsDelightOpen={setIsDelightOpen}
          handleStartPomodoro={handleStartPomodoro}
          setIsModalOpen={setIsModalOpen}
        />
      </ScrollView>

      <AddTaskModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddNewTask}
      />
    </SafeAreaView>
  );
}

