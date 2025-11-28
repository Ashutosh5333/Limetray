export const TextArea = ({ label, name, value, onChange, error, placeholder }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="3"
      className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
        error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);