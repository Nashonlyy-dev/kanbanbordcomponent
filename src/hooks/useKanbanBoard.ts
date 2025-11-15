import { useState } from "react";
import type { KanbanColumn, KanbanTask } from "../Components/KanbanBord/KanbanBoard.types";

type TaskMap = Record<string, KanbanTask>;

export const useKanbanBoard = (
  initialColumns: KanbanColumn[],
  initialTasks: KanbanTask[] = []
) => {

  
  const initialTaskMap: TaskMap = {};
  for (const t of initialTasks) initialTaskMap[t.id] = t;

  const [tasks, setTasks] = useState<TaskMap>(initialTaskMap);

 
  const [columns, setColumns] = useState<KanbanColumn[]>(() => {
    const cloned = initialColumns.map(col => ({ ...col, taskIds: [] }));

    
    initialTasks.forEach(task => {
      const targetCol = cloned.find(c => c.id === task.status);
      if (targetCol) targetCol.taskIds.push(task.id);
    });

    return cloned;
  });

  
  const createTask = (columnId: string, task: KanbanTask) => {
    setTasks(prev => ({ ...prev, [task.id]: task }));
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId
          ? { ...col, taskIds: [task.id, ...col.taskIds] }
          : col
      )
    );
  };
  
const editTask = (taskId: string, updatedFields: Partial<KanbanTask>) => {
  setTasks(prev => {
    const oldTask = prev[taskId];
    const updatedTask = { ...oldTask, ...updatedFields };

    
    if (updatedFields.status && updatedFields.status !== oldTask.status) {
      setColumns(prevCols =>
        prevCols.map(col => {
          let taskIds = col.taskIds.filter(id => id !== taskId);
          if (col.id === updatedFields.status) taskIds = [taskId, ...taskIds];
          return { ...col, taskIds };
        })
      );
    }

    return { ...prev, [taskId]: updatedTask };
  });
};

const deleteTask = (taskId: string) => {
  setTasks(prev => {
    const newTasks = { ...prev };
    delete newTasks[taskId];
    return newTasks;
  });

  setColumns(prevCols =>
    prevCols.map(col => ({
      ...col,
      taskIds: col.taskIds.filter(id => id !== taskId),
    }))
  );
};
  
  const moveTask = (taskId: string, fromColId: string, toColId: string, newIndex: number) => {
    setColumns(prevCols => {
      const fromColumn = prevCols.find(c => c.id === fromColId);
      const toColumn = prevCols.find(c => c.id === toColId);
      if (!fromColumn || !toColumn) return prevCols;

      const fromTasks = [...fromColumn.taskIds];
      const toTasks   = [...toColumn.taskIds];

      const oldIndex = fromTasks.indexOf(taskId);
      if (oldIndex > -1) fromTasks.splice(oldIndex, 1);

      toTasks.splice(newIndex, 0, taskId);

      return prevCols.map(col => {
        if (col.id === fromColId) return { ...col, taskIds: fromTasks };
        if (col.id === toColId)   return { ...col, taskIds: toTasks };
        return col;
      });
    });
  };

  return { columns, tasks, createTask, moveTask, editTask, deleteTask };
};
