export default function ModalWrapper({ children, onClose }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={onClose}
        />
        <div className="relative z-50 w-full max-w-2xl mx-4 animate-fadeIn">
          {children}
        </div>
      </div>
    );
  }
  