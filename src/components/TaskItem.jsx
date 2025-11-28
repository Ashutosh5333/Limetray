import React, { memo } from "react";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { useUI } from "../context/UIProvider";

const TaskItem = memo(function TaskItem({
  task,
  onToggle,
  onDelete,
  onDragStart,
  onDragEnter,
  isDragging,
  isOver
}) {
  const { openTaskModal } = useUI();

  return (
    <div
      id={`task-${task.id}`}
      draggable="true"
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      className={`
        group flex flex-col gap-3 p-4 rounded-xl shadow-sm 
        bg-white dark:bg-gray-800 border 
        hover:shadow-md transition-all duration-200 cursor-grab
        ${isDragging ? 'opacity-30 border-dashed border-4 border-blue-400' : 'border-gray-200 dark:border-gray-700'}
        ${isOver ? 'border-4 border-red-500' : ''}
      `}
      onClick={() => openTaskModal(task)}
    >
      <div className="flex items-center justify-between">
        <span
          className={`
            text-xs px-2 py-1 rounded-full font-medium
            ${
              task.status === "completed"
                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
            }
          `}
        >
          {task.status === "completed" ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="pt-0.5" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={onToggle}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={`
              font-semibold text-gray-900 dark:text-gray-100 break-words
              ${task.status === "completed" ? "line-through opacity-60" : ""}
            `}
          >
            {task.title}
          </p>

          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 break-words">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 transition-all">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Trash2 className="text-red-600 dark:text-red-400" size={18} />
        </button>
      </div>
    </div>
  );
});

export default TaskItem;
