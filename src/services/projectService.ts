/**
 * Project Management Service
 * Handles all project-related API calls
 */

import { ProjectFormValues } from '@/components/projects/types/form-schema';
import { apiClient } from './api';


import {
  Project,
  Workspace,
  ProjectStatistics,
  PaginatedResponse,
  PaginationParams
} from '@/types/api';

export class ProjectService {
  // Workspace methods
  async getWorkspaces(): Promise<Workspace[]> {
    return apiClient.get<Workspace[]>('/api/v1/workspaces');
  }

  static async createWorkspace(data: ProjectFormValues): Promise<Workspace> {
    return apiClient.post<Workspace>('/workspaces', data);
  }

  async updateWorkspace(id: number, data: { name: string; description?: string }): Promise<Workspace> {
    return apiClient.put<Workspace>(`/api/v1/workspaces/${id}`, data);
  }

  async deleteWorkspace(id: number): Promise<void> {
    return apiClient.delete<void>(`/api/v1/workspaces/${id}`);
  }

  // Project methods
  async getProjects(params?: { workspaceId?: number } & PaginationParams): Promise<PaginatedResponse<Project>> {
    return apiClient.get<PaginatedResponse<Project>>('/api/v1/projects', params);
  }

  async getProject(id: number): Promise<Project> {
    return apiClient.get<Project>(`/api/v1/projects/${id}`);
  }

 static async createProject(data: {
    workspaceId: number;
    name: string;
    description: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Project> {
    return apiClient.post<Project>('/api/v1/projects', data);
  }

  async updateProject(id: number, data: {
    name?: string;
    description?: string;
    status?: 'Active' | 'Inactive' | 'Completed' | 'OnHold';
    startDate?: string;
    endDate?: string;
  }): Promise<Project> {
    return apiClient.put<Project>(`/api/v1/projects/${id}`, data);
  }

  async deleteProject(id: number): Promise<void> {
    return apiClient.delete<void>(`/api/v1/projects/${id}`);
  }

  async getProjectStatistics(id: number): Promise<ProjectStatistics> {
    return apiClient.get<ProjectStatistics>(`/api/v1/projects/${id}/statistics`);
  }

  // Project team management
  async getProjectTeams(projectId: number): Promise<any[]> {
    return apiClient.get<any[]>(`/api/v1/projects/${projectId}/teams`);
  }

  async assignTeamToProject(projectId: number, teamId: string): Promise<void> {
    return apiClient.post<void>(`/api/v1/projects/${projectId}/teams`, { teamId });
  }

  async removeTeamFromProject(projectId: number, teamId: string): Promise<void> {
    return apiClient.delete<void>(`/api/v1/projects/${projectId}/teams/${teamId}`);
  }
}

export const projectService = new ProjectService();