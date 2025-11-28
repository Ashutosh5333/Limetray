import React from "react";


export default function Button ({ children, onClick, variant = "primary", loading = false, loadingText = "Loading...", ...props })  {
  const baseStyle = "px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-md flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed";
  let style;

  if (variant === "outline") {
    style = "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700";
  } else {
    style = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50";
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${style}`} disabled={loading} {...props}>
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};