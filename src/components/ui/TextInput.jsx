export default function TextInput({
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
        <input
          name={name}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
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
  