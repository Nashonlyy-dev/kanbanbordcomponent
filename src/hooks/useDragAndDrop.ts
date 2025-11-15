import { useState } from "react";

interface DragAndDropHook {
  handleDragStart: (taskId: string, fromColumn: string) => void;
  handleDragOver: (columnId: string) => void;
  handleDrop: (columnId: string) => void;
}

export const useDragAndDrop = (
  moveTask: (taskId: string, fromColumn: string, toColumn: string, newIndex: number) => void
): DragAndDropHook => {
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [fromColumn, setFromColumn] = useState<string | null>(null);

  const handleDragStart = (taskId: string, startColumn: string) => {
    setDraggingTaskId(taskId);
    setFromColumn(startColumn);
  };

  const handleDragOver = (columnId: string) => {
    // Optional: highlight drop column
  };

  const handleDrop = (toColumnId: string) => {
    if (draggingTaskId && fromColumn) {
      moveTask(draggingTaskId, fromColumn, toColumnId, 0); // append to top
    }
    setDraggingTaskId(null);
    setFromColumn(null);
  };

  return { handleDragStart, handleDragOver, handleDrop };
};
