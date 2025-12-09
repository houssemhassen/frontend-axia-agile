/**
 * Work Item Management Service
 * Handles tasks, user stories, bugs, etc.
 */

import { apiClient } from './api';
import { 
  WorkItem, 
  AcceptanceCriteria,
  WorkItemFilters,
  PaginatedResponse,
  PaginationParams 
} from '@/types/api';

export class WorkItemService {
  // Work Item CRUD operations
  async getWorkItems(filters?: WorkItemFilters & PaginationParams): Promise<PaginatedResponse<WorkItem>> {
    return apiClient.get<PaginatedResponse<WorkItem>>('/api/v1/workitems', filters);
  }

  async getWorkItem(id: number): Promise<WorkItem> {
    return apiClient.get<WorkItem>(`/api/v1/workitems/${id}`);
  }

  async createWorkItem(data: {
    projectId: number;
    title: string;
    description: string;
    type: 'Epic' | 'UserStory' | 'Task' | 'Bug' | 'Spike';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    storyPoints?: number;
    assigneeId?: string;
    sprintId?: number;
    parentId?: number;
    tags?: string[];
    dueDate?: string;
  }): Promise<WorkItem> {
    return apiClient.post<WorkItem>('/api/v1/workitems', data);
  }

  async updateWorkItem(id: number, data: {
    title?: string;
    description?: string;
    status?: 'New' | 'InProgress' | 'Testing' | 'Done' | 'Blocked';
    priority?: 'Low' | 'Medium' | 'High' | 'Critical';
    assigneeId?: string;
    storyPoints?: number;
    sprintId?: number;
    tags?: string[];
    dueDate?: string;
  }): Promise<WorkItem> {
    return apiClient.put<WorkItem>(`/api/v1/workitems/${id}`, data);
  }

  async deleteWorkItem(id: number): Promise<void> {
    return apiClient.delete<void>(`/api/v1/workitems/${id}`);
  }

  // Acceptance Criteria management
  async getAcceptanceCriteria(workItemId: number): Promise<AcceptanceCriteria[]> {
    return apiClient.get<AcceptanceCriteria[]>(`/api/v1/workitems/${workItemId}/acceptance-criteria`);
  }

  async addAcceptanceCriteria(data: {
    workItemId: number;
    title: string;
    description: string;
    order?: number;
  }): Promise<AcceptanceCriteria> {
    return apiClient.post<AcceptanceCriteria>('/api/v1/acceptancecriteria', data);
  }

  async updateAcceptanceCriteria(id: number, data: {
    title?: string;
    description?: string;
    isCompleted?: boolean;
    order?: number;
  }): Promise<AcceptanceCriteria> {
    return apiClient.put<AcceptanceCriteria>(`/api/v1/acceptancecriteria/${id}`, data);
  }

  async deleteAcceptanceCriteria(id: number): Promise<void> {
    return apiClient.delete<void>(`/api/v1/acceptancecriteria/${id}`);
  }

  // Kanban board operations
  async getKanbanBoard(projectId: number): Promise<{
    columns: { status: string; workItems: WorkItem[] }[];
  }> {
    return apiClient.get<any>(`/api/v1/kanban/board/${projectId}`);
  }

  async moveWorkItem(workItemId: number, data: {
    newStatus: string;
    position: number;
  }): Promise<WorkItem> {
    return apiClient.put<WorkItem>(`/api/v1/kanban/workitems/${workItemId}/move`, data);
  }

  // Work item assignments
  async assignWorkItem(workItemId: number, assigneeId: string): Promise<WorkItem> {
    return this.updateWorkItem(workItemId, { assigneeId });
  }

  async unassignWorkItem(workItemId: number): Promise<WorkItem> {
    return this.updateWorkItem(workItemId, { assigneeId: undefined });
  }

  // Work item comments/activity (if supported by backend)
  async addComment(workItemId: number, comment: string): Promise<any> {
    return apiClient.post<any>(`/api/v1/workitems/${workItemId}/comments`, { content: comment });
  }

  async getComments(workItemId: number): Promise<any[]> {
    return apiClient.get<any[]>(`/api/v1/workitems/${workItemId}/comments`);
  }
}

export const workItemService = new WorkItemService();