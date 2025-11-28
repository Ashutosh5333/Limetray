export default function TextArea({
    label,
    name,
    value,
    onChange,
    error,
    disabled,
    placeholder,
  }) {
    return (
      <div className="space-y-1">
        <label className="font-medium">{label}</label>
        <textarea
          name={name}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          rows={4}
          className="
            w-full px-4 py-3 rounded-xl
            bg-white/60 dark:bg-gray-800/60
            border border-gray-300 dark:border-gray-600
            focus:ring-2 focus:ring-blue-500
            outline-none transition
          "
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
  