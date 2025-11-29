import { FiX } from "react-icons/fi";

export const ModalWrapper = ({ children, onClose }) => (
  <div
    className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <div
      className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-200 p-2 rounded-full transition-colors"
        aria-label="Close"
      >
        <FiX size={24} />
      </button>
    </div>
  </div>
);
