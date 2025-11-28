export default function Card({ children, className = "" }) {
    return (
      <div
        className={
          "p-8 rounded-2xl shadow-xl bg-white/90 dark:bg-gray-800/60 " +
          "backdrop-blur-xl backdrop-saturate-150 border border-white/20 dark:border-gray-700 " +
          className
        }
      >
        {children}
      </div>
    );
  }
  