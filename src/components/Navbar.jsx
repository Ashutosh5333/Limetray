import React from "react";
import { Link } from "react-router-dom";
import { useUI } from "../context/UIProvider";

export default function Navbar() {
  const { openTaskModal } = useUI();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">Task Manager</Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="px-3 py-1 rounded border dark:border-gray-600"
            title="Toggle theme"
          >
            Theme
          </button>

          <button
            onClick={() => openTaskModal()} 
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Add Task
          </button>
        </div>
      </div>
    </nav>
  );
}
