import React, { useEffect } from "react";

export default function Toast({ message, type = "error", clear }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => clear(), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-12 right-1 px-4 py-2 rounded shadow text-white 
      ${type === "error" ? "bg-red-600" : "bg-green-600"}
      `}
    >
      {message}
    </div>
  );
}
