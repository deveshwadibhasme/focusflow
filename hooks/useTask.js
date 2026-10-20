import { useContext, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import { Alert } from "react-native";

export function useTask() {

    const { tasks, setTasks,
        activeFilter, setActiveFilter,
        selectedCategory, setSelectedCategory } = useContext(TaskContext)

    // Add new task handler
    const handleAddNewTask = (newTask) => {
        setTasks((prevTasks) => [newTask, ...prevTasks]);
    };

    // Toggle task completion
    const handleToggleTask = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? { ...task, isCompleted: !task.isCompleted }
                    : task
            )
        );
    };

    // Delete task handler
    const handleDeleteTask = (taskId, taskTitle) => {
        Alert.alert("Delete Task", `Are you sure you want to delete "${taskTitle}"?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => setTasks((prev) => prev.filter((t) => t.id !== taskId)),
            },
        ]);
    };

    // Dynamic progress calculations
    const totalCount = tasks.length;
    const doneCount = useMemo(
        () => tasks.filter((t) => t.isCompleted).length,
        [tasks]
    );
    const remainingCount = totalCount - doneCount;
    const progressPercent =
        totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    // Filtered task list for Home & Tasks tab
    const visibleTasks = useMemo(() => {
        return tasks.filter((task) => {
            // Status filter
            if (activeFilter === "PENDING" && task.isCompleted) return false;
            if (activeFilter === "COMPLETED" && !task.isCompleted) return false;

            // Category filter (in Tasks tab)
            if (selectedCategory !== "ALL" && task.category !== selectedCategory) {
                return false;
            }

            return true;
        });
    }, [tasks, activeFilter, selectedCategory]);

    return {
        tasks, setTasks,
        activeFilter, setActiveFilter,
        selectedCategory, setSelectedCategory, handleAddNewTask,
        handleToggleTask,
        handleDeleteTask,
        totalCount,
        doneCount,
        remainingCount,
        progressPercent,
        visibleTasks
    }
}