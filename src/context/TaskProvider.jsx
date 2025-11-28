import { createContext, useContext, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskContext = createContext(null);
export const useTasks = () => useContext(TaskContext);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  // Add Task
  const addTask = useCallback(
    (task) => {
      setTasks((prev) => [...prev, task]);
    },
    [setTasks]
  );

  // Update Task
  const updateTask = useCallback(
    (updatedTask) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    },
    [setTasks]
  );

  // Toggle completed <-> pending
  const toggleTask = useCallback(
    (id) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                status: t.status === "pending" ? "completed" : "pending",
              }
            : t
        )
      );
    },
    [setTasks]
  );

  // Delete task
  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks]
  );

  // Reorder tasks (within same column)
  const reorderTasks = useCallback(
    (newOrder) => {
      setTasks(newOrder);
    },
    [setTasks]
  );

  // Move task to another column
  const moveTaskToColumn = useCallback(
    (taskId, toColumn, destinationIndex) => {
      setTasks((prev) => {
        // update status
        const updated = prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                status: toColumn === "all" ? "pending" : toColumn,
              }
            : t
        );

        const removedIndex = updated.findIndex((t) => t.id === taskId);
        const removed = updated[removedIndex];
        const without = [
          ...updated.slice(0, removedIndex),
          ...updated.slice(removedIndex + 1),
        ];

        const belongsToColumn = (col, task) => {
          if (col === "all") return true;
          if (col === "pending") return task.status === "pending";
          return task.status === "completed";
        };

        let inserted = false;
        let count = 0;
        const result = [];

        for (let item of without) {
          const inTarget = belongsToColumn(toColumn, item);

          if (inTarget && count === destinationIndex && !inserted) {
            result.push(removed);
            inserted = true;
          }

          result.push(item);
          if (inTarget) count++;
        }

        if (!inserted) result.push(removed);
        return result;
      });
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
      moveTaskToColumn,
    }),
    [tasks, addTask, updateTask, toggleTask, deleteTask, reorderTasks, moveTaskToColumn]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}


// // src/context/TaskProvider.jsx
// import { createContext, useContext, useCallback, useMemo } from "react";
// import useLocalStorage from "../hooks/useLocalStorage";

// const TaskContext = createContext(null);
// export const useTasks = () => useContext(TaskContext);

// export function TaskProvider({ children }) {
//   const [tasks, setTasks] = useLocalStorage("tasks", []);

//   const addTask = useCallback((task) => {
//     setTasks((prev) => [...prev, task]);
//   }, [setTasks]);

//   const updateTask = useCallback((updatedTask) => {
//     setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
//   }, [setTasks]);

//   const toggleTask = useCallback((id) => {
//     setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
//   }, [setTasks]);

//   const deleteTask = useCallback((id) => {
//     setTasks((prev) => prev.filter((t) => t.id !== id));
//   }, [setTasks]);

//   // Replace full tasks array (used after reordering)
//   const reorderTasks = useCallback((newTasksArray) => {
//     setTasks(newTasksArray);
//   }, [setTasks]);

//   /**
//    * Move task to the target column (status) and insert at destinationIndex within that column.
//    * We'll compute the new full tasks array preserving other tasks order.
//    *
//    * toColumn: "all" | "pending" | "completed"
//    * Note: dropping into "all" will set task.status = "pending" (as requested)
//    */
//   const moveTaskToColumn = useCallback((taskId, toColumn, destinationIndex) => {
//     setTasks((prev) => {
//       // 1. update status for the dragged task
//       const updated = prev.map((t) =>
//         t.id === taskId ? { ...t, status: toColumn === "all" ? "pending" : toColumn } : t
//       );

//       // 2. Build arrays for each column in the current order
//       const allArr = updated; // full list order is the authoritative order
//       // We'll remove the dragged item and re-insert at the right place relative to other tasks of that column.

//       // Remove item
//       const removedIndex = allArr.findIndex((t) => t.id === taskId);
//       const removed = allArr[removedIndex];
//       const without = [...allArr.slice(0, removedIndex), ...allArr.slice(removedIndex + 1)];

//       // Build target column list (after removal)
//       const targetList = without.filter((t) =>
//         toColumn === "all" ? true : (toColumn === "pending" ? t.status !== undefined && t.status === "pending" : t.status === "completed")
//       );

//       // Now compute the new global array by inserting removed into proper position
//       // Strategy: iterate `without` and insert the removed before the item that is currently at the destinationIndex in targetList
//       let inserted = false;
//       let targetSeen = 0;
//       const result = [];

//       for (let i = 0; i < without.length; i++) {
//         const item = without[i];
//         // decide whether current item belongs to target column
//         const inTarget =
//           toColumn === "all" ? true : (toColumn === "pending" ? item.status === "pending" : item.status === "completed");

//         if (inTarget && targetSeen === destinationIndex && !inserted) {
//           // insert removed before this item
//           result.push(removed);
//           inserted = true;
//         }

//         result.push(item);

//         if (inTarget) targetSeen++;
//       }

//       if (!inserted) {
//         // append at end of the target column region
//         result.push(removed);
//       }

//       // result is the new global order
//       return result;
//     });
//   }, [setTasks]);

//   const value = useMemo(
//     () => ({
//       tasks,
//       addTask,
//       updateTask,
//       toggleTask,
//       deleteTask,
//       reorderTasks,
//       moveTaskToColumn,
//     }),
//     [tasks, addTask, updateTask, toggleTask, deleteTask, reorderTasks, moveTaskToColumn]
//   );

//   return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
// }
