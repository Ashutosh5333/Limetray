import { CheckCircle, XCircle } from "lucide-react";
import React, { useEffect } from "react";

export const Toast = ({ message, type = "success", clear }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => clear(), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, clear]);

  if (!message) return null;

  const styles =
    type === "error"
      ? "bg-red-500"
      : "bg-green-500";

  const Icon = type === "error" ? XCircle : CheckCircle;

  return (
    <div className="fixed top-0 right-20 z-100">
      <div className={`flex items-center p-4 ${styles} text-white rounded-lg shadow-xl`}>
        <Icon className="w-5 h-5 mr-2" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};
