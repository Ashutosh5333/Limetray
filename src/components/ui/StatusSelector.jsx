export default function StatusSelector({ value, onChange, disabled }) {
    return (
      <div className="space-y-2">
        <label className="font-medium">Status</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChange("pending")}
            className={`
            px-5 py-2 rounded-full border text-sm transition
            ${
              value === "pending"
                ? "bg-orange-500 text-white border-orange-500 shadow-md"
                : "border-gray-300 dark:border-gray-600"
            }
          `}
          >
            Pending
          </button>
  
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChange("completed")}
            className={`
            px-5 py-2 rounded-full border text-sm transition
            ${
              value === "completed"
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "border-gray-300 dark:border-gray-600"
            }
          `}
          >
            Completed
          </button>
        </div>
      </div>
    );
  }
  