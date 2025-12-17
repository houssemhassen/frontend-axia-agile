import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllProjects, createProject as createProjectAPI } from "@/services/projectService";
import { toast } from "sonner";

interface CreateProjectData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
  productOwner: string;
  scrumMaster: string;
  methodology: string;
  members: string[];
}

export const UseProjectManagement = () => {
  const queryClient = useQueryClient();

  // Fetch all projects
  const {
    data: projects,
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
    error: projectsError,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetchAllProjects();
      console.log('Fetched projects:', response.data);
      return response.data;
    },
  });

  // Create project mutation
  const {
    mutateAsync: createProjectMutation,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
  } = useMutation({
    mutationFn: async (projectData: CreateProjectData) => {
      console.log('Mutation called with:', projectData);
      const response = await createProjectAPI(projectData);
      console.log('Mutation response:', response);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Mutation success:', data);
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully!");
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      console.error("Error response:", error.response?.data);
      toast.error("Failed to create project", {
        description: error?.response?.data?.message || error?.message || "Please try again",
      });
    },
  });

  return {
    // Projects data
    projects,
    isLoadingProjects,
    isErrorProjects,
    projectsError,
    refetchProjects,

    // Create project
    createProject: createProjectMutation,
    isCreating,
    isCreateError,
    createError,
  };
};