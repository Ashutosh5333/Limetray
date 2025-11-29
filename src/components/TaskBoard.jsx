import React, { useMemo, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskProvider";
import TaskItem from "./TaskItem";
import { List, Clock, CheckCircle2 } from "lucide-react";

export default function TaskBoard() {
  const { tasks, toggleTask, deleteTask, reorderTasks } = useTasks();
  const [filter, setFilter] = useState("all");

  const filterIcons = {
    all: <List className="w-4 h-4" />,
    pending: <Clock className="w-4 h-4" />,
    completed: <CheckCircle2 className="w-4 h-4" />,
  };

  const columns = useMemo(() => {
    if (filter === "all") return { all: tasks };
    return {
      pending: tasks.filter((t) => t.status === "pending"),
      completed: tasks.filter((t) => t.status === "completed"),
    };
  }, [tasks, filter]);

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination, draggableId } = result;
      if (!destination) return;

      if (filter === "all") {
        const arr = [...tasks];
        const [moved] = arr.splice(source.index, 1);
        arr.splice(destination.index, 0, moved);
        reorderTasks(arr);
        return;
      }

      const srcCol = source.droppableId;
      const destCol = destination.droppableId;

      const sourceTask = tasks.find((t) => String(t.id) === String(draggableId));
      if (!sourceTask) return;

      if (srcCol === destCol) {
        const colItems = tasks.filter((t) => t.status === srcCol);
        const newCol = [...colItems];

        const [moved] = newCol.splice(source.index, 1);
        newCol.splice(destination.index, 0, moved);

        let pointer = 0;
        const final = tasks.map((t) => {
          if (t.status === srcCol) return newCol[pointer++];
          return t;
        });

        reorderTasks(final);
        return;
      }

      const withoutSource = tasks.filter((t) => String(t.id) !== String(draggableId));
      const updated = { ...sourceTask, status: destCol };
      const destItems = withoutSource.filter((t) => t.status === destCol);

      let insertIndex = 0;

      if (destination.index >= destItems.length) {
        const lastDest = destItems[destItems.length - 1];
        const lastIndex = withoutSource.findIndex((t) => t.id === lastDest?.id);
        insertIndex = lastIndex + 1;
      } else {
        const beforeDest = destItems[destination.index];
        insertIndex = withoutSource.findIndex((t) => t.id === beforeDest.id);
      }

      const final = [...withoutSource];
      final.splice(insertIndex, 0, updated);
      reorderTasks(final);
    },
    [tasks, filter, reorderTasks]
  );

  return (
    <>
      <div className="flex gap-3 mb-4">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              flex items-center gap-2
              px-4 py-2 rounded-lg text-sm font-medium border transition-all
              ${
                filter === f
                  ? "bg-brand-gradient text-white border-transparent shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-brand-500 hover:text-brand-600"
              }
            `}
          >
            {filterIcons[f]}
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {filter === "all" ? (
          <Droppable droppableId="all">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-4 transition-all duration-300 ${
                  snapshot.isDraggingOver ? "react-column-active" : ""
                }`}
              >
                {columns.all.map((task, index) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                    {(prov, snap) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        className="react-draggable-item"
                      >
                        <TaskItem
                          task={task}
                          onToggle={() => toggleTask(task.id)}
                          onDelete={() => deleteTask(task.id)}
                          isDragging={snap.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {["pending", "completed"].map((colId) => (
              <Droppable key={colId} droppableId={colId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                      min-h-[150px] p-4 rounded-xl border shadow-md transition-all duration-300
                      ${
                        snapshot.isDraggingOver
                          ? "react-column-active ring-2 ring-brand-400"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      }
                    `}
                  >
                    <h3 className="text-xl font-bold mb-4 capitalize text-blue-600 dark:text-blue-400">
                      {colId} ({columns[colId].length})
                    </h3>

                    <div className="space-y-4">
                      {columns[colId].map((task, index) => (
                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                          {(prov, snap) => (
                            <div
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              {...prov.dragHandleProps}
                              className="react-draggable-item"
                            >
                              <TaskItem
                                task={task}
                                onToggle={() => toggleTask(task.id)}
                                onDelete={() => deleteTask(task.id)}
                                isDragging={snap.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}

                      {columns[colId].length === 0 && (
                        <p className="text-gray-400 text-center border border-dashed p-4 rounded-lg">
                          Drop here
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        )}
      </DragDropContext>
    </>
  );
}
