export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  status?: "todo" | "in-progress" | "done";
  assignee?: string;
  tags?: string[];
  createdAt?: Date;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  taskIds: string[];
}