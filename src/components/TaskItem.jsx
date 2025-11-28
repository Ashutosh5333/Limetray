import React, { memo } from "react";

const TaskItem = memo(function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div
      className={`
        flex justify-between items-center p-3 rounded-lg mb-3 bg-white shadow-sm
        transition-all duration-300 ease-in-out
        ${task.completed ? "opacity-70 line-through" : ""}
      `}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="w-4 h-4"
        />
        <div>
          <p className="font-medium">{task.title}</p>
          {task.description && (
            <p className="text-sm text-gray-500">{task.description}</p>
          )}
        </div>
      </div>

      <button
        onClick={onDelete}
        className="text-red-500 hover:scale-110 transition-transform"
      >
        ✖
      </button>
    </div>
  );
});

export default TaskItem;
