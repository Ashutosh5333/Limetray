import ModalWrapper from "../components/modal/ModalWrapper";
import { useSelector, useDispatch } from "react-redux";
import { closeTaskModal } from "../features/ui/uiSlice";
import TaskForm from "../pages/TaskForm";

export default function TaskModal() {
  const dispatch = useDispatch();
  const { taskModalOpen } = useSelector((s) => s.ui);

  if (!taskModalOpen) return null;

  return (
    <ModalWrapper onClose={() => dispatch(closeTaskModal())}>
      <TaskForm />
    </ModalWrapper>
  );
}
