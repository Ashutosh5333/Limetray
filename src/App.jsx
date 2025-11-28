import Navbar from "./components/Navbar";
import TaskForm from "./pages/TaskForm";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskProvider";
import { UIProvider, useUI } from "./context/UIProvider";
import ModalWrapper from "./components/modal/ModalWrapper";
import TaskBoard from "./components/TaskBoard";

function AppContent() {
  const { taskModalOpen, closeTaskModal, editTask } = useUI();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="p-2 max-w-6xl mx-auto">
        {/* <TaskList /> */}
        <TaskBoard/>
      </div>

      {taskModalOpen && (
        <ModalWrapper onClose={closeTaskModal}>
          <TaskForm editTask={editTask} onClose={closeTaskModal} />
        </ModalWrapper>
      )}
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <UIProvider>
        <AppContent />
      </UIProvider>
    </TaskProvider>
  );
}
