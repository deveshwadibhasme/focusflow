import { createContext, useState } from "react";
import { INITIAL_TASKS } from "../data/task";


export const TaskContext = createContext(null)


export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [activeFilter, setActiveFilter] = useState("ALL"); // 'ALL' | 'PENDING' | 'COMPLETED'
    const [selectedCategory, setSelectedCategory] = useState("ALL");

    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                activeFilter,
                setActiveFilter,
                selectedCategory,
                setSelectedCategory
            }}>
            {children}
        </TaskContext.Provider>)
}

