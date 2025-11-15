// File: KanbanBoard.stories.tsx
import KanbanBoard from "./KanbanBoard";
import type { KanbanColumn, KanbanTask } from "./KanbanBoard.types";

// --- Base Columns ---
const baseColumns: KanbanColumn[] = [
  { id: "todo", title: "To Do", color: "bg-blue-200", taskIds: [] },
  { id: "in-progress", title: "In Progress", color: "bg-yellow-200", taskIds: [] },
  { id: "done", title: "Done", color: "bg-green-200", taskIds: [] },
];

// --- Sample Tasks ---
const sampleTasks: KanbanTask[] = [
  {
    id: "task-1",
    title: "Setup project",
    description: "Initialize the Kanban board UI & logic",
    priority: "medium",
    status: "todo",
    createdAt: new Date(),
  },
  {
    id: "task-2",
    title: "Implement DnD",
    description: "Integrate drag-and-drop using dnd-kit",
    priority: "high",
    status: "in-progress",
    assignee: "Nash",
    createdAt: new Date(),
  },
  {
    id: "task-3",
    title: "Final UI cleanup",
    description: "Polish component spacing, shadows, and responsive behavior",
    priority: "low",
    status: "done",
    createdAt: new Date(),
  },
];

// --- Generate Many Tasks ---
const generateTasks = (count: number): KanbanTask[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `gen-${i + 1}`,
    title: `Task ${i + 1}`,
    description: `Auto-generated task ${i + 1}`,
    status: i % 3 === 0 ? "todo" : i % 3 === 1 ? "in-progress" : "done",
    priority: ["low", "medium", "high", "urgent"][i % 4],
    assignee: ["Nash", "Alex", "Mira", "Sam"][i % 4],
    tags: ["frontend", "backend", "bug", "ui"].slice(0, (i % 3) + 1),
    createdAt: new Date(Date.now() - i * 86400000),
    dueDate: new Date(Date.now() + (i % 5) * 86400000),
  }));
};


export default {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
};

export const Default = {
  name: "Default — Basic Board",
  render: () => (
    <KanbanBoard initialColumns={baseColumns} initialTasks={sampleTasks} />
  ),
};

export const Empty = {
  name: "Empty State — No Tasks",
  render: () => <KanbanBoard initialColumns={baseColumns} initialTasks={[]} />,
};

export const Many = {
  name: "With Many Tasks — Stress Test",
  render: () => (
    <KanbanBoard initialColumns={baseColumns} initialTasks={generateTasks(30)} />
  ),
};

export const Priorities = {
  name: "Priority Showcase",
  render: () => (
    <KanbanBoard
      initialColumns={baseColumns}
      initialTasks={[
        {
          id: "low-1",
          title: "Low priority",
          description: "Low priority example",
          priority: "low",
          status: "todo",
        },
        {
          id: "med-1",
          title: "Medium priority",
          description: "Medium priority example",
          priority: "medium",
          status: "todo",
        },
        {
          id: "high-1",
          title: "High priority",
          description: "High priority example",
          priority: "high",
          status: "in-progress",
        },
        {
          id: "urgent-1",
          title: "Urgent task",
          description: "Urgent priority example",
          priority: "urgent",
          status: "done",
        },
      ]}
    />
  ),
};

export const Responsive = {
  name: "Mobile View — Narrow Layout",
  render: () => (
    <div className="w-80">
      <KanbanBoard initialColumns={baseColumns} initialTasks={sampleTasks} />
    </div>
  ),
};

export const Interactive = {
  name: "Interactive Demo — Drag & Drop",
  render: () => (
    <KanbanBoard initialColumns={baseColumns} initialTasks={sampleTasks} />
  ),
};

export const TaskCreation = {
  name: "Task Creation — Open Modal & Add",
  render: () => <KanbanBoard initialColumns={baseColumns} initialTasks={[]} />,
};

export const TaskEditing = {
  name: "Task Editing — Edit Existing Task",
  render: () => <KanbanBoard initialColumns={baseColumns} initialTasks={sampleTasks} />,
};

export const TaskDeletion = {
  name: "Task Deletion — Delete a Task",
  render: () => <KanbanBoard initialColumns={baseColumns} initialTasks={sampleTasks} />,
};
