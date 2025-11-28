import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import TextArea from "../components/ui/TextArea";
import StatusSelector from "../components/ui/StatusSelector";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { useTasks } from "../context/TaskProvider";

export default function TaskForm({ editTask, onClose }) {
  const { addTask, updateTask } = useTasks();

  const isEdit = Boolean(editTask);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  // Load edit task values
  useEffect(() => {
    if (isEdit && editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status || "pending",
      });
    }
  }, [isEdit, editTask]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);

    try {
      if (isEdit) {
        updateTask({
          id: editTask.id,
          ...form,
        });
        setToast("Task updated");
      } else {
        addTask({
          id: Date.now(),
          ...form,
        });
        setToast("Task created");
      }

      setTimeout(() => {
        setLoading(false);
        onClose && onClose();
      }, 300);
    } catch (error) {
      setLoading(false);
      setToast("Failed to save task");
    }
  };

  return (
    <Card>
      <h2 className="text-3xl font-bold mb-7 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {isEdit ? "Edit Task" : "Create Task"}
      </h2>

      <form onSubmit={submit} className="space-y-6">
        <TextInput
          label="Title"
          name="title"
          value={form.title}
          onChange={onChange}
          error={errors.title}
          placeholder="Enter task title"
        />

        <TextArea
          label="Description"
          name="description"
          value={form.description}
          onChange={onChange}
          error={errors.description}
          placeholder="Describe the task"
        />
        
        <StatusSelector
          value={form.status}
          onChange={(v) => setForm({ ...form, status: v })}
        />

        <div className="flex flex-col gap-3">
          <Button loading={loading} loadingText={isEdit ? "Saving..." : "Creating..."}>
            {isEdit ? "Save Changes" : "Create Task"}
          </Button>

          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>

      <Toast message={toast} clear={() => setToast("")} />
    </Card>
  );
}
