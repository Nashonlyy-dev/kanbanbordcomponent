import React from "react";
import { FaCalendarAlt, FaEdit, FaTag, FaTrash } from "react-icons/fa";
// import { motion } from "framer-motion";

interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: "low" | "medium" | "high" | "urgent";
  assignee?: string;
  tags?: string[];
  createdAt: Date;
  dueDate?: Date;
}

interface KanbanCardProps {
  task: KanbanTask;
  onEdit: (task: KanbanTask) => void;
  onDelete: (taskId: string) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task, onEdit, onDelete }) => {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  // Priority colors
  const PRIORITY_COLORS: Record<string, string> = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-orange-500",
    urgent: "bg-red-500",
    default: "bg-gray-300",
  };

  // Generate DiceBear avatar dynamically using assignee or task id as seed

  const avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${task.assignee}`;

  return (
    <div
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") onEdit(task);
    }}
    className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing flex flex-col justify-between group">
      {/* Title + Priority */}
      <div className="flex w-full justify-between items-center opacity-0 group-hover:opacity-100 mb-0 group-hover:mb-5 md:opacity-0">
        <span
          tabIndex={0}
          className="cursor-pointer text-gray-500 hover:text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
          onClick={() => onEdit(task)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onDelete(task.id);
          }}
          aria-label="Edit Task"
        >
          <FaEdit />
        </span>
        <span
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onDelete(task.id);
          }}
          className="cursor-pointer text-gray-500 hover:text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
          onClick={() => onDelete(task.id)}
          aria-label="Delete Task"
        >
          <FaTrash />
        </span>
      </div>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-neutral-900 text-sm line-clamp-2">
          {task.title}
        </h4>

        <span
          className={`w-3 h-3 rounded-full mt-1 ${
            PRIORITY_COLORS[task.priority || "default"]
          }`}
          title={task.priority || "No priority"}
        ></span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-neutral-600 mb-3 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Tags + Due Date */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-wrap gap-1">
          {task.tags?.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 text-xs bg-neutral-100 px-2 py-0.5 rounded"
            >
              <FaTag className="text-gray-400 w-3 h-3" /> {tag}
            </div>
          ))}
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <FaCalendarAlt className="w-3 h-3" />
            {task.dueDate.toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Assignee */}
      {task.assignee && (
        <div className="mt-2 flex items-center gap-2">
          <img
            src={avatarUrl}
            alt={task.assignee}
            className="w-7 h-7 rounded-full object-cover border border-gray-200"
          />
          <span className="text-xs text-gray-700">{task.assignee}</span>
        </div>
      )}
    </div>
  );
};

export default KanbanCard;
