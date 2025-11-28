import { createContext, useContext, useState, useCallback } from "react";

const UIContext = createContext(null);

export const useUI = () => useContext(UIContext);

export function UIProvider({ children }) {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null); // holds task data when editing

  const openTaskModal = useCallback((task = null) => {
    setEditTask(task);
    setTaskModalOpen(true);
  }, []);

  const closeTaskModal = useCallback(() => {
    setTaskModalOpen(false);
    setEditTask(null);
  }, []);

  return (
    <UIContext.Provider value={{ taskModalOpen, openTaskModal, closeTaskModal, editTask }}>
      {children}
    </UIContext.Provider>
  );
}
