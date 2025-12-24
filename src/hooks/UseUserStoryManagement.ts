import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserStory as createUserStoryAPI,
  fetchUserStoriesByBacklog,
  fetchUserStoryById,
  updateUserStory as updateUserStoryAPI,
  deleteUserStory as deleteUserStoryAPI,
} from "@/services/userStoryService";
import { toast } from "sonner";
import { CreateUserStoryData } from "@/types/userStories";

export const UseUserStoryManagement = () => {
  const queryClient = useQueryClient();

  // Fetch user stories by backlog ID
  const useUserStoriesByBacklog = (backlogId: number | null) => {
    return useQuery({
      queryKey: ["userStories", backlogId],
      queryFn: async () => {
        if (!backlogId) throw new Error("Backlog ID is required");
        const response = await fetchUserStoriesByBacklog(backlogId);
        console.log("Fetched user stories:", response.data);
        return response.data;
      },
      enabled: !!backlogId,
    });
  };

  // Fetch user story by ID
  const useUserStoryById = (userStoryId: number | null) => {
    return useQuery({
      queryKey: ["userStory", userStoryId],
      queryFn: async () => {
        if (!userStoryId) throw new Error("User Story ID is required");
        const response = await fetchUserStoryById(userStoryId);
        console.log("Fetched user story by ID:", response.data);
        return response.data;
      },
      enabled: !!userStoryId,
    });
  };

  // Create user story mutation
  const {
    mutateAsync: createUserStoryMutation,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
  } = useMutation({
    mutationFn: async ({
      projectId,
      backlogId,
      data,
    }: {
      projectId: number;
      backlogId: number;
      data: CreateUserStoryData;
    }) => {
      console.log("Creating user story with:", { projectId, backlogId, data });
      const response = await createUserStoryAPI(projectId, backlogId, data);
      console.log("Create response:", response);
      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log("User story created successfully:", data);
      // Invalidate user stories list for this backlog
      queryClient.invalidateQueries({ queryKey: ["userStories", variables.backlogId] });
      // Invalidate backlog to update user stories count
      queryClient.invalidateQueries({ queryKey: ["backlog", variables.backlogId] });
      queryClient.invalidateQueries({ queryKey: ["backlogs", variables.projectId] });
      toast.success("User story created successfully!");
    },
    onError: (error: any) => {
      console.error("Create user story error:", error);
      toast.error("Failed to create user story", {
        description: error?.response?.data?.message || error?.message || "Please try again",
      });
    },
  });

  // Update user story mutation
  const {
    mutateAsync: updateUserStoryMutation,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: async ({
      userStoryId,
      data,
    }: {
      userStoryId: number;
      data: Partial<CreateUserStoryData>;
    }) => {
      console.log("Updating user story:", userStoryId, data);
      const response = await updateUserStoryAPI(userStoryId, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("User story updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["userStories"] });
      queryClient.invalidateQueries({ queryKey: ["userStory", data.Id] });
      queryClient.invalidateQueries({ queryKey: ["backlog"] });
      toast.success("User story updated successfully!");
    },
    onError: (error: any) => {
      console.error("Update user story error:", error);
      toast.error("Failed to update user story", {
        description: error?.response?.data?.message || error?.message || "Please try again",
      });
    },
  });

  // Delete user story mutation
  const {
    mutateAsync: deleteUserStoryMutation,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: async (userStoryId: number) => {
      console.log("Deleting user story:", userStoryId);
      const response = await deleteUserStoryAPI(userStoryId);
      return response.data;
    },
    onSuccess: () => {
      console.log("User story deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["userStories"] });
      queryClient.invalidateQueries({ queryKey: ["backlog"] });
      toast.success("User story deleted successfully!");
    },
    onError: (error: any) => {
      console.error("Delete user story error:", error);
      toast.error("Failed to delete user story", {
        description: error?.response?.data?.message || error?.message || "Please try again",
      });
    },
  });

  return {
    // Queries
    useUserStoriesByBacklog,
    useUserStoryById,

    // Mutations
    createUserStory: createUserStoryMutation,
    isCreating,
    isCreateError,
    createError,

    updateUserStory: updateUserStoryMutation,
    isUpdating,

    deleteUserStory: deleteUserStoryMutation,
    isDeleting,
  };
};