import { CreateUserStoryData } from "@/types/userStories";
import api from "./api";

export const createUserStory = async (
  projectId: number,
  backlogId: number,
  data: CreateUserStoryData
) => {
  return await api.post(
    `/backlog/${projectId}/${backlogId}/userstory`,
    data
  );
};

export const fetchUserStoriesByBacklog = async (backlogId: number) => {
  return await api.get(`/Backlog/${backlogId}/UserStories`);
};

export const fetchUserStoryById = async (userStoryId: number) => {
  return await api.get(`/UserStory/${userStoryId}`);
};

export const updateUserStory = async (
  userStoryId: number,
  data: Partial<CreateUserStoryData>
) => {
  return await api.put(`/UserStory/${userStoryId}`, data);
};

export const deleteUserStory = async (userStoryId: number) => {
  return await api.delete(`/UserStory/${userStoryId}`);
};