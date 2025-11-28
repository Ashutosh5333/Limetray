import React from "react";
import { FiAlertCircle } from "react-icons/fi";

export default function Input({
  label,
  icon: Icon,
  error,
  ...props
}) {
  return (
    <div className="w-full">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className={`mt-1 flex items-center border rounded px-3 py-2 bg-transparent
        ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
      `}>
        {Icon && <Icon className="text-gray-500 mr-2" size={18} />}
        <input
          {...props}
          className="w-full bg-transparent outline-none"
        />
      </div>

      {error && (
        <div className="flex items-center mt-1 text-red-500 text-xs">
          <FiAlertCircle size={14} className="mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}
