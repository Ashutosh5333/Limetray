import React from "react";
import { FiLoader } from "react-icons/fi";

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const variants = {
  primary:
    "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90",
  secondary:
    "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600",
  danger:
    "bg-red-600 text-white hover:bg-red-700",
  outline:
    "border border-gray-400 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
};

export default function Button({
  children,
  loading,
  loadingText,
  size = "md",
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      disabled={loading}
      className={`
        flex items-center justify-center gap-2 w-full rounded-xl font-semibold
        transition-all duration-200
        ${sizes[size]}
        ${variants[variant]}
        ${loading ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {loading && <FiLoader className="animate-spin" size={18} />}

      {loading ? loadingText : children}
    </button>
  );
}
