import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchBacklogsByProject,
  fetchBacklogById as fetchBacklogByIdAPI,
  createBacklog as createBacklogAPI,
  updateBacklog as updateBacklogAPI,
  deleteBacklog as deleteBacklogAPI,
} from "@/services/backlogService";
import { toast } from "sonner";
import { CreateBacklogData } from "@/types/backlogs";

export const UseBacklogManagement = () => {
  const queryClient = useQueryClient();

  // Fetch backlogs by project ID
  const useBacklogsByProject = (projectId: number | null) => {
    return useQuery({
      queryKey: ["backlogs", projectId],
      queryFn: async () => {
        if (!projectId) throw new Error("Project ID is required");
        const response = await fetchBacklogsByProject(projectId);
        console.log('Fetched backlogs:', response.data);
        return response.data;
      },
      enabled: !!projectId,
    });
  };

  // Fetch backlog by ID
  const useBacklogById = (backlogId: number | null) => {
    return useQuery({
      queryKey: ["backlog", backlogId],
      queryFn: async () => {
        if (!backlogId) throw new Error("Backlog ID is required");
        const response = await fetchBacklogByIdAPI(backlogId);
        console.log('Fetched backlog by ID:', response.data);
        return response.data;
      },
      enabled: !!backlogId,
    });
  };

  // Create backlog mutation
  const {
    mutateAsync: createBacklogMutation,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
  } = useMutation({
    mutationFn: async (backlogData: CreateBacklogData) => {
      console.log('Creating backlog with:', backlogData);
      const response = await createBacklogAPI(backlogData);
      console.log('Create response:', response);
      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log('Backlog created successfully:', data);
      // Invalidate backlogs list for this project
      queryClient.invalidateQueries({ queryKey: ["backlogs", variables.projectId] });
      toast.success("Backlog created successfully!");
    },
    onError: (error: any) => {
      console.error("Create backlog error:", error);
      toast.error("Failed to create backlog", {
        description: error?.response?.data?.message || error?.message || "Please try again",
      });
    },
  });

  // Update backlog mutation
  const {
    mutateAsync: updateBacklogMutation,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: async ({ backlogId, data }: { backlogId: number; data: Partial<CreateBacklogData> }) => {
      console.log('Updating backlog:', backlogId, data);
      const response = await updateBacklogAPI(backlogId, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Backlog updated successfully:', data);
      queryClient.invalidateQueries({ queryKey: ["backlogs"] });
      queryClient.invalidateQueries({ queryKey: ["backlog", data.id] });
      toast.success("Backlog updated successfully!");
    },
    onError: (error: any) => {
      console.error("Update backlog error:", error);
      toast.error("Failed to update backlog", {
        description: error?.response?.data?.message || error?.message || "Please try again",
      });
    },
  });

  // Delete backlog mutation
  const {
    mutateAsync: deleteBacklogMutation,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: async (backlogId: number) => {
      console.log('Deleting backlog:', backlogId);
      const response = await deleteBacklogAPI(backlogId);
      return response.data;
    },
    onSuccess: () => {
      console.log('Backlog deleted successfully');
      queryClient.invalidateQueries({ queryKey: ["backlogs"] });
      toast.success("Backlog deleted successfully!");
    },
    onError: (error: any) => {
      console.error("Delete backlog error:", error);
      toast.error("Failed to delete backlog", {
        description: error?.response?.data?.message || error?.message || "Please try again",
      });
    },
  });

  return {
    // Queries
    useBacklogsByProject,
    useBacklogById,

    // Mutations
    createBacklog: createBacklogMutation,
    isCreating,
    isCreateError,
    createError,

    updateBacklog: updateBacklogMutation,
    isUpdating,

    deleteBacklog: deleteBacklogMutation,
    isDeleting,
  };
};