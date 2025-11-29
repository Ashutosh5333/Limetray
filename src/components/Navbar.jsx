import React from "react";
import { Link } from "react-router-dom";
import { useUI } from "../context/UIProvider";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const { openTaskModal } = useUI();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4">
      <div className="max-w-6xl mx-auto">
        {/* FLEX → STACK ON MOBILE → ROW ON DESKTOP */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-gradient-br rounded-2xl shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>

            <div>
              <Link to="/">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">
                  Task Manager
                </h1>
              </Link>
              <p className="text-muted-foreground text-sm md:text-base">
                Organize your work, achieve your goals
              </p>
            </div>
          </div>

          {/* RIGHT SECTION – BUTTONS */}
          <div className="flex items-center gap-3 sm:gap-4 justify-end">
            <button
              onClick={() =>
                document.documentElement.classList.toggle("dark")
              }
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 
                         hover:bg-purple-200 hover:border-purple-400
                         dark:hover:bg-gray-700 dark:hover:border-purple-500
                         transition-all text-sm md:text-base"
            >
              Theme
            </button>

            <button
              onClick={openTaskModal}
              className="px-3 py-1 rounded text-white bg-brand-gradient
                         hover:scale-[1.03] active:scale-[0.97]
                         shadow-md hover:shadow-lg transition-all
                         text-sm md:text-base"
            >
              Add Task
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
