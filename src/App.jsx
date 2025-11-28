import Navbar from "./components/Navbar";
import TaskForm from "./pages/TaskForm";
import { TaskProvider } from "./context/TaskProvider";
import { UIProvider, useUI } from "./context/UIProvider";
import {ModalWrapper} from "./components/modal/ModalWrapper";
import TaskBoard from "./components/TaskBoard";

function AppContent() {
  const { taskModalOpen, closeTaskModal, editTask, openTaskModal } = useUI();

  const AppNavbar = () => <Navbar openTaskModal={openTaskModal} />;

  //  console.log("taskModalOpen=====>",taskModalOpen)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AppNavbar />

      <div className="p-4 max-w-6xl mx-auto">
        <TaskBoard />
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