import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTask } from "../hooks/useTask";
import { getCategoryStyle } from "../data/utils";

export default function HomeScreen({ isDelightOpen, setIsDelightOpen, handleStartPomodoro, setIsModalOpen }) {

    const { totalCount, remainingCount, doneCount, setActiveFilter, activeFilter, setSelectedCategory, progressPercent, visibleTasks, handleDeleteTask, handleToggleTask } = useTask()

    function CategoryBadge({ category }) {
        const catStyle = getCategoryStyle(category);
        return (
            <View className={`px-2 py-0.5 rounded-md border ${catStyle.badgeBg}`}>
                <Text className={`text-[10px] font-bold ${catStyle.badgeText}`}>
                    {category === "High Priority" ? "! " : ""}
                    {category}
                </Text>
            </View>
        );
    }

    return (
        <View>
            {/* Peak Focus Insight Banner */}
            <View className="bg-indigo-50/60 border border-indigo-100/80 rounded-2xl p-3 flex-row items-center justify-between mb-4 shadow-xs">
                <View className="flex-row items-center gap-2.5 flex-1 pr-2">
                    <View className="w-7 h-7 rounded-lg bg-amber-100 items-center justify-center">
                        <Ionicons name="bulb-outline" size={16} color="#D97706" />
                    </View>
                    <Text className="text-xs font-semibold text-gray-700 flex-1">
                        Peak focus predicted between 10 AM & 12 PM
                    </Text>
                </View>
                <View className="bg-indigo-100/80 px-2 py-0.5 rounded-md">
                    <Text className="text-[11px] font-bold text-indigo-700">2h left</Text>
                </View>
            </View>

            {/* "Today's Focus" Card */}
            <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-5">
                <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center gap-2">
                        <View className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                        <Text className="text-base font-extrabold text-gray-900">
                            Today's Focus
                        </Text>
                    </View>
                    <View className="bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                        <Text className="text-xs font-bold text-indigo-700">
                            {doneCount} of {totalCount} completed ({progressPercent}%)
                        </Text>
                    </View>
                </View>

                {/* Progress Bar */}
                <View className="h-2.5 bg-slate-100 rounded-full overflow-visible mb-4 relative justify-center">
                    <View
                        style={{ width: `${progressPercent}%` }}
                        className="h-2.5 bg-indigo-600 rounded-full"
                    />
                    {progressPercent > 0 && (
                        <View
                            style={{
                                left: `${Math.min(Math.max(progressPercent - 1, 0), 96)}%`,
                            }}
                            className="absolute w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow-xs"
                        />
                    )}
                </View>

                {/* 3 Metrics */}
                <View className="flex-row gap-2.5 pt-1">
                    <View className="flex-1 bg-indigo-50/50 rounded-2xl p-3 items-center border border-indigo-50">
                        <Text className="text-xl font-black text-indigo-600">
                            {doneCount}
                        </Text>
                        <Text className="text-[11px] font-semibold text-gray-500 mt-0.5">
                            Done
                        </Text>
                    </View>

                    <View className="flex-1 bg-amber-50/40 rounded-2xl p-3 items-center border border-amber-50">
                        <Text className="text-xl font-black text-amber-600">
                            {remainingCount}
                        </Text>
                        <Text className="text-[11px] font-semibold text-gray-500 mt-0.5">
                            Remaining
                        </Text>
                    </View>

                    <View className="flex-1 bg-emerald-50/40 rounded-2xl p-3 items-center border border-emerald-50">
                        <Text className="text-xl font-black text-emerald-700">
                            1h 45m
                        </Text>
                        <Text className="text-[11px] font-semibold text-gray-500 mt-0.5">
                            Focused
                        </Text>
                    </View>
                </View>
            </View>

            {/* Quick Tasks Section Header */}
            <View className="flex-row items-center justify-between mb-3.5">
                <Text className="text-lg font-black text-gray-900 tracking-tight">
                    Today's tasks{" "}
                    <Text className="text-sm font-semibold text-gray-400">
                        ({totalCount})
                    </Text>
                </Text>

                <View className="flex-row bg-slate-100 p-1 rounded-xl">
                    <TouchableOpacity
                        onPress={() => {
                            setActiveFilter("ALL");
                            setSelectedCategory("ALL");
                        }}
                        className={`px-3 py-1 rounded-lg ${activeFilter === "ALL" ? "bg-white shadow-xs" : ""
                            }`}
                    >
                        <Text
                            className={`text-xs font-bold ${activeFilter === "ALL" ? "text-indigo-600" : "text-gray-500"
                                }`}
                        >
                            All ({totalCount})
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setActiveFilter("PENDING");
                            setSelectedCategory("ALL");
                        }}
                        className={`px-3 py-1 rounded-lg ${activeFilter === "PENDING" ? "bg-white shadow-xs" : ""
                            }`}
                    >
                        <Text
                            className={`text-xs font-bold ${activeFilter === "PENDING"
                                ? "text-indigo-600"
                                : "text-gray-500"
                                }`}
                        >
                            Pending ({remainingCount})
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Task Items */}
            <View className="gap-3">
                {visibleTasks.map((task) => (
                    <View
                        key={task.id}
                        className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs"
                    >
                        <View className="flex-row items-start gap-3">
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => handleToggleTask(task.id)}
                                className="mt-0.5"
                            >
                                {task.isCompleted ? (
                                    <View className="w-6 h-6 rounded-full bg-indigo-600 items-center justify-center">
                                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                                    </View>
                                ) : (
                                    <View className="w-6 h-6 rounded-full border-2 border-indigo-200 bg-indigo-50/50" />
                                )}
                            </TouchableOpacity>

                            <View className="flex-1">
                                <View className="flex-row items-center justify-between">
                                    <Text
                                        className={`text-sm font-bold flex-1 pr-2 ${task.isCompleted
                                            ? "line-through text-gray-400 font-medium"
                                            : "text-gray-900"
                                            }`}
                                    >
                                        {task.title}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => handleDeleteTask(task.id, task.title)}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    >
                                        <Feather name="trash-2" size={15} color="#94A3B8" />
                                    </TouchableOpacity>
                                </View>

                                <View className="flex-row items-center gap-2 mt-2">
                                    <CategoryBadge category={task.category} />

                                    <View className="flex-row items-center gap-1">
                                        <Feather name="clock" size={11} color="#94A3B8" />
                                        <Text className="text-[11px] text-gray-400 font-medium">
                                            {task.time}
                                        </Text>
                                    </View>
                                </View>

                                {task.hasPomodoro && !task.isCompleted && (
                                    <View className="mt-3 bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 flex-row items-center justify-between">
                                        <View className="flex-row items-center gap-2">
                                            <Ionicons name="timer-outline" size={18} color="#4F46E5" />
                                            <Text className="text-xs font-semibold text-gray-800">
                                                {task.pomodoroText}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={handleStartPomodoro}
                                            className="bg-indigo-600 rounded-xl px-3.5 py-1.5 flex-row items-center gap-1.5 shadow-xs"
                                        >
                                            <Ionicons name="play" size={12} color="#FFFFFF" />
                                            <Text className="text-white text-xs font-bold">
                                                Start Focus
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                ))}

                {visibleTasks.length === 0 && (
                    <View className="bg-white rounded-2xl p-6 items-center border border-slate-100">
                        <Ionicons name="sparkles-outline" size={32} color="#4F46E5" />
                        <Text className="text-sm font-bold text-gray-800 mt-2">
                            All caught up!
                        </Text>
                        <Text className="text-xs text-gray-400 text-center mt-1">
                            No tasks match this filter.
                        </Text>
                    </View>
                )}
            </View>

            {/* Add Task Button */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsModalOpen(true)}
                className="mt-4 bg-indigo-100/70 border border-indigo-200/80 rounded-2xl py-3.5 flex-row items-center justify-center gap-2 active:bg-indigo-200"
            >
                <Ionicons name="add-circle-outline" size={20} color="#4338CA" />
                <Text className="text-indigo-700 text-sm font-bold">
                    Add new task
                </Text>
            </TouchableOpacity>

            {/* Moment of Delight Collapsible */}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsDelightOpen(!isDelightOpen)}
                className="mt-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 shadow-xs"
            >
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2.5">
                        <MaterialCommunityIcons
                            name="leaf-maple"
                            size={18}
                            color="#059669"
                        />
                        <Text className="text-xs font-bold text-gray-800">
                            Moment of Delight Preview
                        </Text>
                    </View>
                    <Feather
                        name={isDelightOpen ? "chevron-up" : "chevron-down"}
                        size={16}
                        color="#64748B"
                    />
                </View>

                {isDelightOpen && (
                    <View className="mt-3 pt-3 border-t border-indigo-100/80">
                        <Text className="text-xs text-gray-600 leading-relaxed font-normal">
                            🎉{" "}
                            <Text className="font-bold text-gray-800">
                                Daily Flow State Achieved!
                            </Text>{" "}
                            You have maintained clarity across 3 consecutive focus blocks.
                            Keep up this high-performance rhythm!
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}