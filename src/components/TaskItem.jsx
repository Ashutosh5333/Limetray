import React, { memo } from "react";
import { Trash2 } from "lucide-react";
import { useUI } from "../context/UIProvider";

const TaskItem = memo(function TaskItem({
  task,
  onToggle,
  onDelete,
  isDragging,
}) {
  const { openTaskModal } = useUI();

  return (
    <div
      onClick={(e) => {
        if (!isDragging) openTaskModal(task);
      }}
      className={`
        group flex flex-col gap-3 p-4 rounded-xl border
        bg-white dark:bg-gray-800 select-none cursor-grab
        transition-all duration-200 ease-out shadow-sm
        ${
          isDragging
            ? "opacity-75 scale-[1.02]"
            : "hover:shadow-md hover:scale-[1.01]"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold
          ${
            task.status === "completed"
              ? "bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-300"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={onToggle}
            className="w-4 h-4 accent-purple-500 cursor-pointer"
          />
        </div>

        <div className="flex-1">
          <p
            className={`font-semibold text-gray-900 dark:text-gray-100 leading-snug
            ${task.status === "completed" ? "line-through opacity-60" : ""}`}
          >
            {task.title}
          </p>

          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 transition-all"
        >
          <Trash2
            size={18}
            className="text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform"
          />
        </button>
      </div>
    </div>
  );
});

export default TaskItem;
