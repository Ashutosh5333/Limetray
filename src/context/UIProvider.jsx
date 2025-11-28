import { createContext, useContext, useState, useCallback, useMemo } from "react";

const UIContext = createContext(null);
export const useUI = () => useContext(UIContext);

export  function UIProvider({ children }) {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const openTaskModal = useCallback((task = null) => {
    setEditTask(task);
    setTaskModalOpen(true);
  }, []);

  const closeTaskModal = useCallback(() => {
    setTaskModalOpen(false);
    setEditTask(null);
  }, []);

  const value = useMemo(() => ({
    taskModalOpen,
    editTask,
    openTaskModal,
    closeTaskModal,
  }), [taskModalOpen, editTask, openTaskModal, closeTaskModal]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
