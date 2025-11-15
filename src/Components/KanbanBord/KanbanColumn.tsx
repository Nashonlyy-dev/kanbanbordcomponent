import { useState } from "react";
import type { KanbanColumn, KanbanTask } from "../KanbanBord/KanbanBoard.types";

type TaskMap = Record<string, KanbanTask>;

export const useKanbanBoard = (initialColumns: KanbanColumn[]) => {
  
  const initialTasks: TaskMap = {
    'task-1': { id: 'task-1', title: 'Setup Kanban Board', description: 'Create DndContext and SortableContexts.' },
    'task-2': { id: 'task-2', title: 'Implement Cross-Column Drag', description: 'Ensure moveTask handles array updates correctly.' },
  };

  const [tasks, setTasks] = useState<TaskMap>(initialTasks);

 
  const [columns, setColumns] = useState<KanbanColumn[]>(() =>
    initialColumns.map((col, idx) => ({
      ...col,
      taskIds:
        idx === 0 
          ? ['task-1', 'task-2']
          : [],
    }))
  );

  const createTask = (columnId: string, task: KanbanTask) => {
    setTasks((prev) => ({ ...prev, [task.id]: task }));
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, taskIds: [task.id, ...col.taskIds] }
          : col
      )
    );
  };

  const moveTask = (
    taskId: string,
    fromColId: string,
    toColId: string,
    newIndex: number
  ) => {
    setColumns((prevCols) => {
      const fromColumn = prevCols.find((c) => c.id === fromColId);
      const toColumn = prevCols.find((c) => c.id === toColId);
      if (!fromColumn || !toColumn) return prevCols;

      // Copy arrays
      const fromTaskIds = [...fromColumn.taskIds];
      const toTaskIds = [...toColumn.taskIds];

      // Remove from source
      const oldIndex = fromTaskIds.indexOf(taskId);
      if (oldIndex > -1) fromTaskIds.splice(oldIndex, 1);

      // Insert into destination
      toTaskIds.splice(newIndex, 0, taskId);

      return prevCols.map((col) => {
        if (col.id === fromColId) return { ...col, taskIds: fromTaskIds };
        if (col.id === toColId) return { ...col, taskIds: toTaskIds };
        return col;
      });
    });
  };

  return { columns, tasks, createTask, moveTask };
};
