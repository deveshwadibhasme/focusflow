import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { CATEGORIES } from "../data/utils";



export default function AddTaskModal({ visible, onClose, onAddTask }) {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Product");
  const [dueTime, setDueTime] = useState("");
  const [isPomodoro, setIsPomodoro] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setTitle("");
    setSelectedCategory("Product");
    setDueTime("");
    setIsPomodoro(false);
    setErrorMessage("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setErrorMessage("Please enter a task title.");
      return;
    }

    const categoryObj = CATEGORIES.find((c) => c.name === selectedCategory);

    // Format display time or fallback to current hour
    const finalTime = dueTime.trim()
      ? dueTime.trim()
      : `Due ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      category: selectedCategory,
      categoryColor: categoryObj ? categoryObj.badgeBg : "bg-indigo-50 border-indigo-200",
      time: finalTime,
      isCompleted: false,
      hasPomodoro: isPomodoro || selectedCategory === "High Priority",
      pomodoroText: "25m Pomodoro ready",
    };

    onAddTask(newTask);
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      {/* Semi-transparent Backdrop */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end bg-black/50"
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleClose}
          className="flex-1"
        />

        {/* Bottom Sheet Modal Container */}
        <View className="bg-white rounded-t-3xl p-6 shadow-2xl border-t border-slate-100">
          {/* Header */}
          <View className="flex-row items-center justify-between pb-4 border-b border-slate-100">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-full bg-indigo-50 items-center justify-center">
                <Ionicons name="add-circle" size={20} color="#4F46E5" />
              </View>
              <Text className="text-lg font-black text-gray-900 tracking-tight">
                Add New Task
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center"
            >
              <Feather name="x" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            className="pt-4"
          >
            {/* Task Title Input */}
            <View className="mb-4">
              <Text className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Task Title *
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-3">
                <Feather name="check-square" size={16} color="#94A3B8" />
                <TextInput
                  value={title}
                  onChangeText={(text) => {
                    setTitle(text);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="e.g. Finalize quarterly metrics"
                  placeholderTextColor="#94A3B8"
                  className="flex-1 ml-2.5 text-sm font-semibold text-gray-900 p-0"
                  autoFocus={true}
                />
              </View>
              {errorMessage ? (
                <Text className="text-xs text-red-500 font-medium mt-1 ml-1">
                  {errorMessage}
                </Text>
              ) : null}
            </View>

            {/* Category Selection Chips */}
            <View className="mb-4">
              <Text className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Category
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <TouchableOpacity
                      key={cat.name}
                      onPress={() => setSelectedCategory(cat.name)}
                      activeOpacity={0.7}
                      className={`px-3.5 py-2 rounded-xl border ${isSelected
                        ? cat.activeColor
                        : "bg-slate-50 border-slate-200"
                        }`}
                    >
                      <Text
                        className={`text-xs font-bold ${isSelected ? "text-white" : "text-gray-700"
                          }`}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Due Time Input */}
            <View className="mb-4">
              <Text className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Due Time (Optional)
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-3">
                <Feather name="clock" size={16} color="#94A3B8" />
                <TextInput
                  value={dueTime}
                  onChangeText={setDueTime}
                  placeholder="e.g. 04:30 PM or Due Tomorrow"
                  placeholderTextColor="#94A3B8"
                  className="flex-1 ml-2.5 text-sm font-medium text-gray-900 p-0"
                />
              </View>
            </View>

            {/* Pomodoro Focus Option Toggle */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsPomodoro(!isPomodoro)}
              className="flex-row items-center justify-between bg-indigo-50/60 border border-indigo-100 rounded-2xl p-3.5 mb-6"
            >
              <View className="flex-row items-center gap-2.5 flex-1 pr-2">
                <Ionicons name="timer-outline" size={20} color="#4F46E5" />
                <View>
                  <Text className="text-xs font-bold text-gray-900">
                    Enable 25m Pomodoro Button
                  </Text>
                  <Text className="text-[11px] text-gray-500">
                    Adds a "Start Focus" timer button to this task
                  </Text>
                </View>
              </View>
              <View
                className={`w-6 h-6 rounded-lg items-center justify-center border ${isPomodoro || selectedCategory === "High Priority"
                  ? "bg-indigo-600 border-indigo-600"
                  : "border-slate-300 bg-white"
                  }`}
              >
                {(isPomodoro || selectedCategory === "High Priority") && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View className="flex-row gap-3 pb-6">
              <TouchableOpacity
                onPress={handleClose}
                activeOpacity={0.7}
                className="flex-1 py-3.5 rounded-2xl bg-slate-100 items-center justify-center"
              >
                <Text className="text-sm font-bold text-gray-600">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.8}
                className="flex-[2] py-3.5 rounded-2xl bg-indigo-600 active:bg-indigo-700 flex-row items-center justify-center gap-2 shadow-md"
              >
                <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                <Text className="text-white text-sm font-bold">
                  Create Task
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

