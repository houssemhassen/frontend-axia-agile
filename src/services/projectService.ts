/**
 * Project Management Service
 * Handles all project-related API calls
 */

import { ProjectFormValues } from "@/components/projects/types/form-schema";

import {
  Project,
  Workspace,
  ProjectStatistics,
  PaginatedResponse,
  PaginationParams,
} from "@/types/api";

import api from "./api";

export class ProjectService {
  // --------------------------
  // WORKSPACES
  // --------------------------

  async getWorkspaces(): Promise<Workspace[]> {
    const { data } = await api.get<Workspace[]>("/api/v1/workspaces");
    return data;
  }

  static async createWorkspace(payload: ProjectFormValues): Promise<Workspace> {
    const { data } = await api.post<Workspace>("/api/v1/workspaces", payload);
    return data;
  }

  async updateWorkspace(
    id: number,
    updates: { name: string; description?: string }
  ): Promise<Workspace> {
    const { data } = await api.put<Workspace>(
      `/api/v1/workspaces/${id}`,
      updates
    );
    return data;
  }

  async deleteWorkspace(id: number): Promise<void> {
    await api.delete(`/api/v1/workspaces/${id}`);
  }

  // --------------------------
  // PROJECTS
  // --------------------------

  async getProjects(
    params?: { workspaceId?: number } & PaginationParams
  ): Promise<PaginatedResponse<Project>> {
    const { data } = await api.get<PaginatedResponse<Project>>(
      "/api/v1/projects",
      { params }
    );
    return data;
  }

  async getProject(id: number): Promise<Project> {
    const { data } = await api.get<Project>(`/api/v1/projects/${id}`);
    return data;
  }

  static async createProject(payload: {
    workspaceId: number;
    name: string;
    description: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Project> {
    const { data } = await api.post<Project>("/api/v1/projects", payload);
    return data;
  }

  async updateProject(
    id: number,
    updates: {
      name?: string;
      description?: string;
      status?: "Active" | "Inactive" | "Completed" | "OnHold";
      startDate?: string;
      endDate?: string;
    }
  ): Promise<Project> {
    const { data } = await api.put<Project>(
      `/api/v1/projects/${id}`,
      updates
    );
    return data;
  }

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/api/v1/projects/${id}`);
  }

  async getProjectStatistics(id: number): Promise<ProjectStatistics> {
    const { data } = await api.get<ProjectStatistics>(
      `/api/v1/projects/${id}/statistics`
    );
    return data;
  }

  // --------------------------
  // TEAM MANAGEMENT
  // --------------------------

  async getProjectTeams(projectId: number): Promise<any[]> {
    const { data } = await api.get<any[]>(
      `/api/v1/projects/${projectId}/teams`
    );
    return data;
  }

  async assignTeamToProject(
    projectId: number,
    teamId: string
  ): Promise<void> {
    await api.post(`/api/v1/projects/${projectId}/teams`, { teamId });
  }

  async removeTeamFromProject(
    projectId: number,
    teamId: string
  ): Promise<void> {
    await api.delete(
      `/api/v1/projects/${projectId}/teams/${teamId}`
    );
  }
}

export const projectService = new ProjectService();
