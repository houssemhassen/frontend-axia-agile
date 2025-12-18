import { CreateBacklogData, Backlog } from "@/types/backlogs";
import api from "./api";

// Fetch all backlogs for a project
export const fetchBacklogsByProject = async (projectId: number) => {
  try {
    const response = await api.get(`/backlog/project/${projectId}`);
    console.log('Backlogs response:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching backlogs:', error);
    throw error;
  }
};

// Fetch single backlog by ID
export const fetchBacklogById = async (backlogId: number) => {
  try {
    const response = await api.get(`/backlog/${backlogId}`);
    console.log('Backlog response:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching backlog:', error);
    throw error;
  }
};

// Create new backlog
export const createBacklog = async (backlogData: CreateBacklogData) => {
  try {
    const response = await api.post('/backlog', backlogData);
    console.log('Create backlog response:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating backlog:', error);
    throw error;
  }
};

// Update backlog
export const updateBacklog = async (backlogId: number, backlogData: Partial<CreateBacklogData>) => {
  try {
    const response = await api.put(`/backlog/${backlogId}`, backlogData);
    console.log('Update backlog response:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating backlog:', error);
    throw error;
  }
};

// Delete backlog
export const deleteBacklog = async (backlogId: number) => {
  try {
    const response = await api.delete(`/backlog/${backlogId}`);
    console.log('Delete backlog response:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting backlog:', error);
    throw error;
  }
};