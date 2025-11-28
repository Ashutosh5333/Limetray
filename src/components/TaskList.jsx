import { useState, useMemo } from "react";
import { useTasks } from "../context/TaskProvider";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskBoard from "./TaskBoard";

export default function TaskList() {
  const { tasks, toggleTask, deleteTask, reorderTasks } = useTasks();
  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    if (filter !== "all") return;

    const newOrder = Array.from(tasks);
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed);

    reorderTasks(newOrder);
  };

  return (
    <div className="mt-10">

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["all", "completed", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg border transition-colors
              ${
                filter === f
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Drag disabled message */}
      {filter !== "all" && (
        <p className="text-sm text-gray-500 mb-3">
          Drag & drop works only in <strong>All</strong> view.
        </p>
      )}

      {/* List Container */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        {filter === "all" ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="taskList">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                      {(draggableProvided) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                        >
                          <TaskItem
                            task={task}
                            dragHandleProps={draggableProvided.dragHandleProps}
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
        ) : (
          // no drag in filtered mode
          <div>
            {filteredTasks.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-6">
                No tasks found
              </p>
            ) : (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
}
