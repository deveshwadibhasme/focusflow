import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useTask } from "../hooks/useTask";

export default function ProfileScreen() {
    const auth = useAuth();
    const { doneCount, totalCount } = useTask();

    const handleProfilePress = () => {
        Alert.alert(
            "FocusFlow Account",
            `Logged in as ${auth?.currentUser?.email || "app@dev.com"}`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Log Out",
                    style: "destructive",
                    onPress: () => auth?.logout(),
                },
            ]
        );
    };

    return (
        <View>
            <View className="bg-white rounded-3xl p-6 items-center border border-slate-100 shadow-sm mb-5">
                <View className="w-20 h-20 rounded-full bg-indigo-600 items-center justify-center shadow-md mb-3 border-4 border-indigo-100">
                    <Text className="text-white text-2xl font-black">
                        {(auth?.currentUser?.name || "User").charAt(0).toUpperCase()}
                    </Text>
                </View>

                <Text className="text-xl font-black text-gray-900 tracking-tight">
                    {auth?.currentUser?.name || "Focus User"}
                </Text>
                <Text className="text-xs text-gray-400 font-medium mt-0.5">
                    {auth?.currentUser?.email || "app@dev.com"}
                </Text>

                <View className="mt-4 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 rounded-full flex-row items-center gap-1.5">
                    <View className="w-2 h-2 rounded-full bg-emerald-500" />
                    <Text className="text-emerald-700 text-xs font-bold">
                        Active Focus Session
                    </Text>
                </View>
            </View>

            {/* Performance Stats */}
            <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-5">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Focus Statistics
                </Text>
                <View className="flex-row gap-3">
                    <View className="flex-1 bg-indigo-50/60 rounded-2xl p-3.5 items-center">
                        <Ionicons name="flame" size={20} color="#EA580C" />
                        <Text className="text-lg font-black text-gray-900 mt-1">6 Days</Text>
                        <Text className="text-[10px] text-gray-500 font-semibold">Streak</Text>
                    </View>

                    <View className="flex-1 bg-indigo-50/60 rounded-2xl p-3.5 items-center">
                        <Ionicons name="time" size={20} color="#4F46E5" />
                        <Text className="text-lg font-black text-gray-900 mt-1">1h 45m</Text>
                        <Text className="text-[10px] text-gray-500 font-semibold">Deep Focus</Text>
                    </View>

                    <View className="flex-1 bg-indigo-50/60 rounded-2xl p-3.5 items-center">
                        <Ionicons name="checkmark-circle" size={20} color="#059669" />
                        <Text className="text-lg font-black text-gray-900 mt-1">
                            {doneCount}/{totalCount}
                        </Text>
                        <Text className="text-[10px] text-gray-500 font-semibold">Tasks</Text>
                    </View>
                </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleProfilePress}
                className="bg-red-50 border border-red-200 rounded-2xl py-4 flex-row items-center justify-center gap-2"
            >
                <Feather name="log-out" size={18} color="#DC2626" />
                <Text className="text-red-600 text-sm font-bold">
                    Log Out of FocusFlow
                </Text>
            </TouchableOpacity>
        </View>
    );
}

