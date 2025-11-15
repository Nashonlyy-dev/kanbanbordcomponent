import React, { useState } from "react";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDraggable,
  useDroppable,
  rectIntersection,
} from "@dnd-kit/core";

import { useKanbanBoard } from "../../hooks/useKanbanBoard";
import KanbanCard from "./KanbanCard";
import TaskModal from "./TaskModal";
import type { KanbanColumn, KanbanTask } from "./KanbanBoard.types";

interface KanbanBoardProps {
  initialColumns?: KanbanColumn[];
  initialTasks?: KanbanTask[];
}

const defaultColumns: KanbanColumn[] = [
  { id: "todo", title: "To Do", color: "bg-blue-200", taskIds: [] },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-yellow-200",
    taskIds: [],
  },
  { id: "done", title: "Done", color: "bg-green-200", taskIds: [] },
];

function DraggableCard({
  id,
  task,
  children,
}: {
  id: string;
  task: KanbanTask;
  children?: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const style: React.CSSProperties = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.8 : 1,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="bg-white p-3 rounded-md shadow mb-3 hover:bg-gray-50 transition w-full">
        {children ?? <KanbanCard task={task} />}
      </div>
    </div>
  );
}

function DroppableColumn({
  column,
  children,
}: {
  column: KanbanColumn;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: column.id });
  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-4 rounded-lg flex flex-col shadow min-h-[400px] ${
        column.color
      } transition-all duration-150 min-w-[250px] max-w-[350px] shrink-0 ${
        isOver ? "ring-2 ring-offset-2 ring-pink-400" : ""
      }`}
    >
      <h2 className="font-bold text-lg mb-4 text-gray-800 truncate">
        {column.title}
      </h2>
      <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
    </div>
  );
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialColumns,
  initialTasks,
}) => {
  const columnsToUse = initialColumns ?? defaultColumns;
  const { columns, tasks, createTask, moveTask, editTask, deleteTask } =
    useKanbanBoard(columnsToUse, initialTasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<KanbanTask | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const findColumnForTask = (taskId: string) =>
    columns.find((c) => c.taskIds.includes(taskId))?.id ?? null;

  const handleEditTask = (task: KanbanTask) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  };

  const handleDragStart = (event: DragStartEvent) =>
    setActiveId(String(event.active.id));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!active) return;

    const taskId = String(active.id);
    const fromColId = findColumnForTask(taskId);

    if (!fromColId) return;

    if (over && typeof over.id === "string") {
      const toColId = over.id;
      if (fromColId !== toColId) moveTask(taskId, fromColId, toColId, 0);
    }
  };

  const handleAddTask = (task: KanbanTask) => {
    if (taskToEdit) {
      // Only update editable fields, keep old id and createdAt
      editTask(taskToEdit.id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assignee: task.assignee,
        tags: task.tags,
      });
      setTaskToEdit(null);
    } else {
      createTask("todo", task);
    }
    setIsModalOpen(false);
  };

  const activeTask = activeId ? tasks[activeId] ?? null : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex w-screen p-6 h-full overflow-x-auto bg-gray-900">
        <div className="flex gap-5 w-full  ml-10">
          {columns.map((col) => (
            <DroppableColumn key={col.id} column={col}>
              {col.taskIds.map((taskId) => {
                const task = tasks[taskId];
                if (!task) return null;
                return (
                  <DraggableCard key={task.id} id={task.id} task={task}>
                    <KanbanCard
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                    />
                  </DraggableCard>
                );
              })}
            </DroppableColumn>
          ))}
        </div>

        <div
          onClick={() => setIsModalOpen(true)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setIsModalOpen(true);
          }}
          aria-label="Add Task"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-pink-600 flex items-center justify-center text-white text-4xl cursor-pointer shadow-lg z-50 hover:bg-pink-500 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
        >
          +
        </div>

        {isModalOpen && (
          <TaskModal
            onSave={handleAddTask}
            onClose={() => setIsModalOpen(false)}
            taskToEdit={taskToEdit}
          />
        )}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="w-64 p-3 bg-white rounded-md shadow">
            <KanbanCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
