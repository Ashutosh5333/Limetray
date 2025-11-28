export default function OverlayLoader() {
    return (
      <div className="
        fixed inset-0 z-[999] flex flex-col items-center justify-center 
        backdrop-blur-[3px] bg-white/20 dark:bg-gray-900/20
      ">
       
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 animate-pulse">
          Loading ...
        </h2>
  
        <svg
          className="animate-spin h-12 w-12 text-blue-600 drop-shadow-md"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-30"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v3l3-3-3-3v3a11 11 0 100 16v-3l-3 3 3 3v-3a8 8 0 01-8-8z"
          />
        </svg>
  
      </div>
    );
  }
  