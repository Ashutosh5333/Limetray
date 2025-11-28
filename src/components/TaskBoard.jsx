import React, { useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTasks } from "../context/TaskProvider";
import TaskItem from "./TaskItem";


export default function TaskBoard() {
  const { tasks, toggleTask, deleteTask, reorderTasks, moveTaskToColumn } = useTasks();

  const columns = useMemo(() => {
    return {
      all: tasks,
      pending: tasks.filter((t) => t.status === "pending"),
      completed: tasks.filter((t) => t.status === "completed"),
    };
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceDroppable = source.droppableId; 
    const destDroppable = destination.droppableId;
    const sourceIndex = source.index;
    const destIndex = destination.index;


    if (sourceDroppable === destDroppable) {
     
      const draggedId = draggableId;
      const newGlobal = (() => {
        const without = tasks.filter((t) => t.id !== draggedId);

        const targetColPredicate = (col, t) => {
          if (col === "all") return true;
          if (col === "pending") return t.status === "pending";
          return t.status === "completed";
        };

     
        let targetSeen = 0;
        let inserted = false;
        const res = [];

        for (let i = 0; i < without.length; i++) {
          const item = without[i];
          const inTarget = targetColPredicate(sourceDroppable, item);

          if (inTarget && targetSeen === destIndex && !inserted) {
          
            const draggedItem = tasks.find((t) => t.id === draggedId);
            const newTask = {
              ...draggedItem,
              status: sourceDroppable === "all" ? draggedItem.status : (sourceDroppable === "pending" ? "pending" : "completed"),
            };
            res.push(newTask);
            inserted = true;
          }

          res.push(item);
          if (inTarget) targetSeen++;
        }

        if (!inserted) {
          const draggedItem = tasks.find((t) => t.id === draggedId);
          res.push(draggedItem);
        }
        return res;
      })();

      reorderTasks(newGlobal);
      return;
    }

    moveTaskToColumn(draggableId, destDroppable, destIndex);
  };

  // column style
  const colClass = "flex-1 min-h-[150px] p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700";

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {["all", "pending", "completed"].map((colId) => (
          <div key={colId} className={colClass}>
            <h3 className="text-sm font-semibold mb-3">
              {colId === "all" ? `All (${columns.all.length})` : colId === "pending" ? `Pending (${columns.pending.length})` : `Completed (${columns.completed.length})`}
            </h3>

            <Droppable droppableId={colId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[60px] space-y-3 ${snapshot.isDraggingOver ? "ring-2 ring-dashed ring-blue-400" : ""}`}
                >
                  {(colId === "all" ? columns.all : (colId === "pending" ? columns.pending : columns.completed)).map((task, index) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          style={dragProvided.draggableProps.style}
                        >
                          <TaskItem
                            task={task}
                            onToggle={() => toggleTask(task.id)}
                            onDelete={() => deleteTask(task.id)}
                            dragHandleProps={dragProvided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}
