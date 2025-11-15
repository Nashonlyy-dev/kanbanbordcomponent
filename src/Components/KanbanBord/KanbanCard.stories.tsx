import type { Meta, StoryObj } from "@storybook/react";
import KanbanCard from "./KanbanCard";

const meta: Meta<typeof KanbanCard> = {
  title: "Kanban/Card",
  component: KanbanCard,
  parameters: {
    layout: "centered",
    backgrounds: { default: "light" },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof KanbanCard>;

export const Default: Story = {
  args: {
    task: {
      id: "1",
      title: "Design Hero Section",
      description: "Create landing page header with animation.",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      tags: ["UI", "Frontend"],
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 86400000 * 2),
    },
  },
};

export const Urgent: Story = {
  args: {
    task: {
      id: "2",
      title: "Fix login issue",
      description: "Critical backend issue to resolve immediately.",
      status: "in-progress",
      priority: "urgent",
      assignee: "Jane Smith",
      tags: ["Backend", "Bug"],
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 86400000),
    },
  },
};

export const Done: Story = {
  args: {
    task: {
      id: "3",
      title: "Add API Docs",
      description: "Document all endpoints for internal usage.",
      status: "done",
      priority: "low",
      assignee: "Alex",
      tags: ["Docs", "API"],
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 86400000 * 3),
    },
  },
};
