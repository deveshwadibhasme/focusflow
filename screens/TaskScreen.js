import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CATEGORIES, getCategoryStyle } from "../data/utils";
import { useTask } from "../hooks/useTask";
import { Feather, Ionicons } from "@expo/vector-icons";

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

export default function TaskScreen({ handleStartPomodoro, setIsModalOpen }) {

    const { totalCount, remainingCount, doneCount, setActiveFilter, activeFilter, setSelectedCategory, selectedCategory, visibleTasks, handleDeleteTask, handleToggleTask } = useTask()

    return (
        <View>
            {/* Tasks Workspace Header Banner */}
            <View className="bg-indigo-600 rounded-3xl p-5 mb-5 shadow-md">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-white text-xl font-black tracking-tight">
                            Tasks Workspace
                        </Text>
                        <Text className="text-indigo-100 text-xs font-medium mt-1">
                            Manage, filter, and execute focus sessions
                        </Text>
                    </View>
                    <View className="w-12 h-12 bg-white/10 rounded-2xl items-center justify-center">
                        <Ionicons name="checkbox" size={24} color="#FFFFFF" />
                    </View>
                </View>

                {/* Status Counters */}
                <View className="flex-row gap-2 mt-4 pt-3 border-t border-indigo-500/60">
                    <View className="flex-1 bg-white/10 rounded-xl p-2.5 items-center">
                        <Text className="text-white font-extrabold text-base">
                            {totalCount}
                        </Text>
                        <Text className="text-indigo-100 text-[10px] font-medium">
                            Total
                        </Text>
                    </View>
                    <View className="flex-1 bg-white/10 rounded-xl p-2.5 items-center">
                        <Text className="text-amber-300 font-extrabold text-base">
                            {remainingCount}
                        </Text>
                        <Text className="text-indigo-100 text-[10px] font-medium">
                            Pending
                        </Text>
                    </View>
                    <View className="flex-1 bg-white/10 rounded-xl p-2.5 items-center">
                        <Text className="text-emerald-300 font-extrabold text-base">
                            {doneCount}
                        </Text>
                        <Text className="text-indigo-100 text-[10px] font-medium">
                            Done
                        </Text>
                    </View>
                </View>
            </View>

            {/* Status Segment Filter: All / Pending / Completed */}
            <View className="flex-row bg-slate-100 p-1 rounded-2xl mb-4">
                <TouchableOpacity
                    onPress={() => setActiveFilter("ALL")}
                    className={`flex-1 py-2 items-center rounded-xl ${activeFilter === "ALL" ? "bg-white shadow-xs" : ""
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
                    onPress={() => setActiveFilter("PENDING")}
                    className={`flex-1 py-2 items-center rounded-xl ${activeFilter === "PENDING" ? "bg-white shadow-xs" : ""
                        }`}
                >
                    <Text
                        className={`text-xs font-bold ${activeFilter === "PENDING" ? "text-indigo-600" : "text-gray-500"
                            }`}
                    >
                        Pending ({remainingCount})
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setActiveFilter("COMPLETED")}
                    className={`flex-1 py-2 items-center rounded-xl ${activeFilter === "COMPLETED" ? "bg-white shadow-xs" : ""
                        }`}
                >
                    <Text
                        className={`text-xs font-bold ${activeFilter === "COMPLETED" ? "text-indigo-600" : "text-gray-500"
                            }`}
                    >
                        Completed ({doneCount})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Category Filter Horizontal Scroll */}
            <View className="mb-4">
                <Text className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Filter by Category
                </Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-row"
                >
                    <TouchableOpacity
                        onPress={() => setSelectedCategory("ALL")}
                        className={`mr-2 px-3.5 py-1.5 rounded-full border ${selectedCategory === "ALL"
                            ? "bg-indigo-600 border-indigo-600"
                            : "bg-white border-slate-200"
                            }`}
                    >
                        <Text
                            className={`text-xs font-bold ${selectedCategory === "ALL" ? "text-white" : "text-gray-700"
                                }`}
                        >
                            All Categories
                        </Text>
                    </TouchableOpacity>

                    {CATEGORIES.map((cat) => {
                        const isSelected = selectedCategory === cat.name;
                        return (
                            <TouchableOpacity
                                key={cat.name}
                                onPress={() => setSelectedCategory(cat.name)}
                                className={`mr-2 px-3.5 py-1.5 rounded-full border ${isSelected
                                    ? "bg-indigo-600 border-indigo-600"
                                    : "bg-white border-slate-200"
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
                </ScrollView>
            </View>

            {/* Tasks List */}
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
                                    <View className="w-6 h-6 rounded-full bg-emerald-600 items-center justify-center">
                                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                                    </View>
                                ) : (
                                    <View className="w-6 h-6 rounded-full border-2 border-indigo-300 bg-indigo-50/50" />
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
                                        className="p-1"
                                    >
                                        <Feather name="trash-2" size={16} color="#EF4444" />
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
                    <View className="bg-white rounded-3xl p-8 items-center border border-slate-100 mt-2">
                        <View className="w-14 h-14 rounded-2xl bg-indigo-50 items-center justify-center mb-3">
                            <Ionicons name="checkmark-done-circle-outline" size={32} color="#4F46E5" />
                        </View>
                        <Text className="text-base font-bold text-gray-800">
                            No Tasks Found
                        </Text>
                        <Text className="text-xs text-gray-400 text-center mt-1 max-w-[200px]">
                            No tasks match your selected status and category filter.
                        </Text>
                    </View>
                )}
            </View>

            {/* Add Task Button */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsModalOpen(true)}
                className="mt-5 bg-indigo-600 rounded-2xl py-4 flex-row items-center justify-center gap-2 shadow-md active:bg-indigo-700"
            >
                <Ionicons name="add-circle" size={20} color="#FFFFFF" />
                <Text className="text-white text-sm font-bold">
                    Add New Task
                </Text>
            </TouchableOpacity>
        </View>
    )
}