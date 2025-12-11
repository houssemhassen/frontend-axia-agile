import api from "./api";
import {
  WorkItem,
  AcceptanceCriteria,
  WorkItemFilters,
  PaginatedResponse,
  PaginationParams,
} from "@/types/api";

export class WorkItemService {
  // --------------------------
  // WORK ITEM CRUD
  // --------------------------
  async getWorkItems(
    filters?: WorkItemFilters & PaginationParams
  ): Promise<PaginatedResponse<WorkItem>> {
    const { data } = await api.get<PaginatedResponse<WorkItem>>("/api/v1/workitems", {
      params: filters,
    });
    return data;
  }

  async getWorkItem(id: number): Promise<WorkItem> {
    const { data } = await api.get<WorkItem>(`/api/v1/workitems/${id}`);
    return data;
  }

  async createWorkItem(data: {
    projectId: number;
    title: string;
    description: string;
    type: "Epic" | "UserStory" | "Task" | "Bug" | "Spike";
    priority: "Low" | "Medium" | "High" | "Critical";
    storyPoints?: number;
    assigneeId?: string;
    sprintId?: number;
    parentId?: number;
    tags?: string[];
    dueDate?: string;
  }): Promise<WorkItem> {
    const { data: result } = await api.post<WorkItem>("/api/v1/workitems", data);
    return result;
  }

  async updateWorkItem(
    id: number,
    data: {
      title?: string;
      description?: string;
      status?: "New" | "InProgress" | "Testing" | "Done" | "Blocked";
      priority?: "Low" | "Medium" | "High" | "Critical";
      assigneeId?: string;
      storyPoints?: number;
      sprintId?: number;
      tags?: string[];
      dueDate?: string;
    }
  ): Promise<WorkItem> {
    const { data: result } = await api.put<WorkItem>(`/api/v1/workitems/${id}`, data);
    return result;
  }

  async deleteWorkItem(id: number): Promise<void> {
    await api.delete(`/api/v1/workitems/${id}`);
  }

  // --------------------------
  // ACCEPTANCE CRITERIA
  // --------------------------
  async getAcceptanceCriteria(workItemId: number): Promise<AcceptanceCriteria[]> {
    const { data } = await api.get<AcceptanceCriteria[]>(
      `/api/v1/workitems/${workItemId}/acceptance-criteria`
    );
    return data;
  }

  async addAcceptanceCriteria(data: {
    workItemId: number;
    title: string;
    description: string;
    order?: number;
  }): Promise<AcceptanceCriteria> {
    const { data: result } = await api.post<AcceptanceCriteria>(
      "/api/v1/acceptancecriteria",
      data
    );
    return result;
  }

  async updateAcceptanceCriteria(
    id: number,
    data: {
      title?: string;
      description?: string;
      isCompleted?: boolean;
      order?: number;
    }
  ): Promise<AcceptanceCriteria> {
    const { data: result } = await api.put<AcceptanceCriteria>(
      `/api/v1/acceptancecriteria/${id}`,
      data
    );
    return result;
  }

  async deleteAcceptanceCriteria(id: number): Promise<void> {
    await api.delete(`/api/v1/acceptancecriteria/${id}`);
  }

  // --------------------------
  // KANBAN BOARD
  // --------------------------
  async getKanbanBoard(projectId: number): Promise<{
    columns: { status: string; workItems: WorkItem[] }[];
  }> {
    const { data } = await api.get(`/api/v1/kanban/board/${projectId}`);
    return data;
  }

  async moveWorkItem(
    workItemId: number,
    data: { newStatus: string; position: number }
  ): Promise<WorkItem> {
    const { data: result } = await api.put<WorkItem>(
      `/api/v1/kanban/workitems/${workItemId}/move`,
      data
    );
    return result;
  }

  // --------------------------
  // ASSIGNMENTS
  // --------------------------
  async assignWorkItem(workItemId: number, assigneeId: string): Promise<WorkItem> {
    return this.updateWorkItem(workItemId, { assigneeId });
  }

  async unassignWorkItem(workItemId: number): Promise<WorkItem> {
    return this.updateWorkItem(workItemId, { assigneeId: undefined });
  }

  // --------------------------
  // COMMENTS / ACTIVITY
  // --------------------------
  async addComment(workItemId: number, comment: string): Promise<any> {
    const { data } = await api.post(`/api/v1/workitems/${workItemId}/comments`, {
      content: comment,
    });
    return data;
  }

  async getComments(workItemId: number): Promise<any[]> {
    const { data } = await api.get<any[]>(`/api/v1/workitems/${workItemId}/comments`);
    return data;
  }
}

export const workItemService = new WorkItemService();