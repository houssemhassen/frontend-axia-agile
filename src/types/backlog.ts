
// Shared types for backlog functionality
export type BacklogItemType = {
  id: string;
  title: string;
  description: string;
  type: "story" | "bug" | "task" | "epic";
  priority: "highest" | "high" | "medium" | "low" | "lowest";
  businessValue: number;
  effort: number;
  status: "unassigned" | "assigned" | "blocked" | "in-progress" | "done";
  assignee?: string;
  createdAt: string;
  tags: string[];
  order: number;
};

export type BacklogItemCreate = Omit<BacklogItemType, 'id' | 'createdAt' | 'order'>;

export type BacklogItemUpdate = Partial<BacklogItemCreate> & { id: string };

export type BacklogFilters = {
  status?: string;
  priority?: string;
  search?: string;
  project?: string;
};

export type BacklogResponse = {
  items: BacklogItemType[];
  totalCount: number;
};
