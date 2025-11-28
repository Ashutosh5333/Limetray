import { useState, useMemo, useCallback } from "react";
import { useTasks } from "../context/TaskProvider";

import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TaskList() {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    localStorage.setItem("tasks", JSON.stringify(reordered)); // persist order
  };

  return (
    <div className="mt-6">
      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-1 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-1 rounded ${filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          Pending
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                  {(draggableProvided) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <TaskItem
                        task={task}
                        onToggle={() => toggleTask(task.id)}
                        onDelete={() => deleteTask(task.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
