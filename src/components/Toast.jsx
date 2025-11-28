import { CheckCircle } from "lucide-react";
import React, { useEffect } from "react";

export const Toast = ({ message, clear }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => clear(), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, clear]);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center p-4 bg-green-500 text-white rounded-lg shadow-xl">
        <CheckCircle className="w-5 h-5 mr-2" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};