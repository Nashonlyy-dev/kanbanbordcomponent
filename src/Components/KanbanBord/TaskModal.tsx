import React, { useState, useEffect } from "react";
import type { KanbanTask } from "./KanbanBoard.types";

interface TaskModalProps {
  onSave: (task: KanbanTask) => void;
  onClose?: () => void;
  taskToEdit?: KanbanTask;
}

const TaskModal: React.FC<TaskModalProps> = ({ onSave, onClose, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit?.title ?? "");
  const [description, setDescription] = useState(taskToEdit?.description ?? "");
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "urgent">(taskToEdit?.priority ?? "low");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">(taskToEdit?.status ?? "todo");
  const [assignee, setAssignee] = useState(taskToEdit?.assignee ?? "");
  const [tags, setTags] = useState(taskToEdit?.tags?.join(", ") ?? "");

  // Update state if taskToEdit changes (important for opening edit modal multiple times)
  useEffect(() => {
    setTitle(taskToEdit?.title ?? "");
    setDescription(taskToEdit?.description ?? "");
    setPriority(taskToEdit?.priority ?? "low");
    setStatus(taskToEdit?.status ?? "todo");
    setAssignee(taskToEdit?.assignee ?? "");
    setTags(taskToEdit?.tags?.join(", ") ?? "");
  }, [taskToEdit]);

  const handleSave = () => {
    const task: KanbanTask = {
      id: taskToEdit?.id ?? Date.now().toString(),
      title,
      description,
      priority,
      status,
      assignee: assignee || undefined,
      tags: tags ? tags.split(",").map((t) => t.trim()) : undefined,
      createdAt: taskToEdit?.createdAt ?? new Date(),
    };

    onSave(task);

    // Reset form after saving
    setTitle("");
    setDescription("");
    setPriority("low");
    setStatus("todo");
    setAssignee("");
    setTags("");

    onClose?.();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-80 flex flex-col gap-2 absolute top-52 right-52 z-50">
      <h3 className="text-sm font-semibold mb-2">{taskToEdit ? "Edit Task" : "Create Task"}</h3>

      <input
        className="border border-neutral-300 rounded w-full p-1 text-sm"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border border-neutral-300 rounded w-full p-1 text-sm"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="border border-neutral-300 rounded w-full p-1 text-sm"
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>

      <select
        className="border border-neutral-300 rounded w-full p-1 text-sm"
        value={status}
        onChange={(e) => setStatus(e.target.value as any)}
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <input
        className="border border-neutral-300 rounded w-full p-1 text-sm"
        placeholder="Assignee"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />

      <input
        className="border border-neutral-300 rounded w-full p-1 text-sm"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div className="flex justify-end gap-2 mt-2">
        {onClose && (
          <button
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
        )}
        <button
          className="bg-pink-600 text-white px-3 py-1 rounded text-sm hover:bg-pink-700"
          onClick={handleSave}
        >
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
