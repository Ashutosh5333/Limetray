import React, { memo } from "react";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { useUI } from "../context/UIProvider";

const TaskItem = memo(function TaskItem({
  task,
  onToggle,
  onDelete,
  dragHandleProps,
}) {
  const { openTaskModal } = useUI();

  return (
    <div
      className={`group flex flex-col gap-2 p-4 rounded-xl shadow-md 
      bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
      transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]`}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between">
        {/* Drag Handle */}
        <div
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <GripVertical size={18} />
        </div>

        {/* Status Badge */}
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold
            ${
              task.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {task.status === "completed" ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Title + Description */}
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={onToggle}
          className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer"
        />

        <div>
          <p
            className={`font-semibold text-gray-900 dark:text-gray-100 ${
              task.status === "completed" ? "line-through opacity-70" : ""
            }`}
          >
            {task.title}
          </p>

          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={() => openTaskModal(task)}
          className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Pencil className="text-blue-600 dark:text-blue-400" size={18} />
        </button>

        <button
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Trash2 className="text-red-600" size={18} />
        </button>
      </div>
    </div>
  );
});

export default TaskItem;
