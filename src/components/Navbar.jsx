import React from "react";
import { Link } from "react-router-dom";
import { useUI } from "../context/UIProvider";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const { openTaskModal } = useUI();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4">
      <div>
        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-gradient-br rounded-2xl shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>

            <div>
              <Link to="/">
                <h1 className="text-3xl sm:text-4xl font-bold text-gradient">
                  Task Manager
                </h1>
              </Link>
              <p className="text-muted-foreground text-sm sm:text-base">
                Organize your work, achieve your goals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => document.documentElement.classList.toggle("dark")}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 
                         hover:bg-purple-200 hover:border-purple-400
                         dark:hover:bg-gray-700 dark:hover:border-purple-500
                         transition-all"
            >
              Theme
            </button>

            <button
              onClick={() => openTaskModal()}
              className="px-3 py-1 rounded text-white bg-brand-gradient
                         hover:scale-[1.03] active:scale-[0.97]
                         shadow-md hover:shadow-lg transition-all"
            >
              Add Task
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
