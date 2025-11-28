import { createContext, useContext, useCallback, useMemo, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskContext = createContext(null);
export const useTasks = () => useContext(TaskContext);

export  function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", [
    { id: "1", title: "Design Landing Page", description: "Create mockups for the new website landing page.", status: "pending" },
    { id: "2", title: "Setup Database", description: "Configure the Firestore database collections and rules.", status: "pending" },
    { id: "3", title: "Refactor Authentication", description: "Update sign-in process to use custom token.", status: "completed" },
  ]);



  const addTask = useCallback(
    (task) => {
      const newTask = {
        ...task,
        id: String(Date.now() + Math.random()), 
        status: task.status || "pending",
      };
      setTasks((prev) => [newTask, ...prev]); 
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (updated) => {
      setTasks((prev) =>
        prev.map((t) =>
          String(t.id) === String(updated.id) ? { ...updated, id: String(updated.id) } : t
        )
      );
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (String(t.id) === String(id)) {
            const newStatus = t.status === "pending" ? "completed" : "pending";
            return { ...t, status: newStatus };
          }
          return t;
        })
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((t) => String(t.id) !== String(id)));
    },
    [setTasks]
  );

  const reorderTasks = useCallback(
    (newList) => {
      setTasks(newList);
    },
    [setTasks]
  );

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      updateTask,
      toggleTask,
      deleteTask,
      reorderTasks,
    }),
    [tasks, addTask, updateTask, toggleTask, deleteTask, reorderTasks]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}


