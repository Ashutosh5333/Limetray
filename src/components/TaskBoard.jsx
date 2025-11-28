import React, { useMemo, useState, useCallback } from "react";
import { useTasks } from "../context/TaskProvider";
import TaskItem from "./TaskItem";

export default function TaskBoard() {
  const { tasks, toggleTask, deleteTask, reorderTasks } = useTasks();
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  const columns = useMemo(
    () => ({
      pending: tasks.filter((t) => t.status === "pending"),
      completed: tasks.filter((t) => t.status === "completed"),
    }),
    [tasks]
  );

  const columnStatuses = ["pending", "completed"];

  const handleDragStart = useCallback((e, task) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("sourceStatus", task.status);
    setDraggedId(task.id);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
    setDragOverId(null);
  }, []);

  const handleDragEnter = useCallback((e, taskId) => {
    e.preventDefault();
    setDragOverId(taskId);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e, targetStatus, targetOverId) => {
      e.preventDefault();
      setDraggedId(null);
      setDragOverId(null);

      const sourceId = e.dataTransfer.getData("taskId");
      const sourceStatus = e.dataTransfer.getData("sourceStatus");

      if (!sourceId || sourceId === targetOverId) return;

      const sourceTask = tasks.find((t) => String(t.id) === String(sourceId));
      if (!sourceTask) return;

      let newTasks = tasks.filter((t) => String(t.id) !== String(sourceId));

      let updatedTask = { ...sourceTask };

      const statusChanged = sourceStatus !== targetStatus;
      if (statusChanged) {
        updatedTask.status = targetStatus;
      }

      const targetList = newTasks.filter((t) => t.status === targetStatus);

      let insertionIndex = 0;
      if (targetOverId) {
        const targetIndexInList = targetList.findIndex(
          (t) => String(t.id) === String(targetOverId)
        );
        if (targetIndexInList !== -1) {
          insertionIndex = targetIndexInList;
        } else {
          insertionIndex = targetList.length;
        }
      } else {
        insertionIndex = targetList.length;
      }

      targetList.splice(insertionIndex, 0, updatedTask);

      const otherStatus =
        targetStatus === "pending" ? "completed" : "pending";
      const otherList = newTasks.filter((t) => t.status === otherStatus);

      let finalTaskList = [];
      let targetPointer = 0;
      let otherPointer = 0;

      tasks.forEach((task) => {
        if (String(task.id) === String(sourceId)) {
          return;
        }

        if (task.status === targetStatus) {
          if (targetPointer < targetList.length) {
            finalTaskList.push(targetList[targetPointer++]);
          }
        } else if (task.status === otherStatus) {
          if (otherPointer < otherList.length) {
            finalTaskList.push(otherList[otherPointer++]);
          }
        }
      });

      while (targetPointer < targetList.length) {
        finalTaskList.push(targetList[targetPointer++]);
      }

      reorderTasks(finalTaskList);
    },
    [tasks, reorderTasks]
  );

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {columnStatuses.map((colId) => (
        <div
          key={colId}
          onDrop={(e) => handleDrop(e, colId, null)}
          onDragOver={handleDragOver}
          className="flex-1 min-h-[150px] p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3
            className={`text-xl font-bold mb-4 capitalize ${
              colId === "pending"
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            {colId} ({columns[colId].length})
          </h3>

          <div className="min-h-[60px] space-y-4 p-1">
            {columns[colId].length > 0 ? (
              columns[colId].map((task) => (
                <TaskItem
                  key={String(task.id)}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                  onDragStart={(e) => handleDragStart(e, task)}
                  onDragEnter={(e) => handleDragEnter(e, task.id)}
                  onDragLeave={() => setDragOverId(null)}
                  onDrop={(e) => handleDrop(e, colId, task.id)}
                  isDragging={String(draggedId) === String(task.id)}
                  isOver={String(dragOverId) === String(task.id)}
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 p-4 border border-dashed rounded-lg text-center">
                No {colId} tasks yet! Drag tasks here.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
