export interface CreateBacklogData {
  title: string;
  description: string;
  priority: string;
  status: string;
  projectId: number;
  assignedTo?: string; // User ID
  estimatedHours?: number;
  tags?: string[];
}