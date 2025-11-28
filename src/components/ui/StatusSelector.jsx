export const StatusSelector = ({ value, onChange }) => {
  const options = [
    { label: "Pending", value: "pending", color: "text-yellow-600 border-yellow-300 bg-yellow-50 dark:bg-yellow-900/50 dark:text-yellow-300" },
    { label: "Completed", value: "completed", color: "text-green-600 border-green-300 bg-green-50 dark:bg-green-900/50 dark:text-green-300" },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Status
      </label>
      <div className="flex gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              px-3 py-1 text-sm font-medium rounded-full border 
              ${option.value === value ? option.color + " ring-2 ring-offset-2 ring-blue-500/50" : "text-gray-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"}
              transition-all
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};