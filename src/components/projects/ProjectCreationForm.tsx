import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { projectSchema, type ProjectFormValues, type TeamMember } from "./types/form-schema";
import BasicInfoSection from "./form-sections/BasicInfoSection";
import MethodologySection from "./form-sections/MethodologySection";
import TeamMembersSection from "./form-sections/TeamMembersSection";
import ProjectRolesSection from "./form-sections/ProjectRolesSection";

import { fetchAllUsers } from "@/services/userService";
import { User } from "@/types/users";
import { UseProjectManagement } from "@/hooks/UseProjectManagement";

const ProjectCreationForm = () => {
  const navigate = useNavigate();
  const { createProject, isCreating } = UseProjectManagement();
  
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<TeamMember[]>([]);
  const [productOwner, setProductOwner] = useState<TeamMember | null>(null);
  const [scrumMaster, setScrumMaster] = useState<TeamMember | null>(null);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      methodology: "Scrum",
      team: "",
      startDate: "",
      endDate: "",
      status: "NotStarted",
      priority: "Medium",
    },
  });

  const mapUserToTeamMember = (user: User): TeamMember => {
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      role: user.roleName || "No Role",
      avatar: `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    };
  };

  const [availableTeamMembers, setAvailableTeamMembers] = useState<TeamMember[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const handleAddTeamMember = (memberId: number) => {
    const memberToAdd = availableTeamMembers.find(m => m.id === memberId);
    if (!memberToAdd) return;

    if (!selectedTeamMembers.some(m => m.id === memberId)) {
      setSelectedTeamMembers(prev => [...prev, memberToAdd]);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await fetchAllUsers();

        // Filter only active users
        const activeUsers = response.data.filter((user: User) => user.isActive);

        // Map to TeamMember format
        const teamMembers = activeUsers.map(mapUserToTeamMember);

        setAvailableTeamMembers(teamMembers);
      } catch (error) {
        console.error("Error loading users:", error);
        toast.error("Failed to load team members");
        setAvailableTeamMembers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  const handleRemoveTeamMember = (memberId: number) => {
    setSelectedTeamMembers(prev => prev.filter(m => m.id !== memberId));
  };

  // Product Owner handlers
  const handleSelectProductOwner = (userId: number) => {
    const user = availableTeamMembers.find(m => m.id === userId);
    if (user) {
      setProductOwner(user);
    }
  };

  const handleRemoveProductOwner = () => {
    setProductOwner(null);
  };

  // Scrum Master handlers
  const handleSelectScrumMaster = (userId: number) => {
    const user = availableTeamMembers.find(m => m.id === userId);
    if (user) {
      setScrumMaster(user);
    }
  };

  const handleRemoveScrumMaster = () => {
    setScrumMaster(null);
  };

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      console.log('productOwner:', productOwner);
      console.log('scrumMaster:', scrumMaster);
      console.log('selectedTeamMembers:', selectedTeamMembers);
      // Validation
      if (!productOwner) {
        toast.error("Please select a Product Owner");
        return;
      }

      if (!scrumMaster) {
        toast.error("Please select a Scrum Master");
        return;
      }

      if (selectedTeamMembers.length === 0) {
        toast.error("Please add at least one team member");
        return;
      }

      // Convert dates to ISO format
      const startDate = new Date(data.startDate).toISOString();
      const endDate = new Date(data.endDate).toISOString();

      // Prepare project data matching API format
      const projectData = {
        name: data.name,
        description: data.description,
        startDate: startDate,
        endDate: endDate,
        status: data.status,
        priority: data.priority,
        productOwner: productOwner.id, // GUID string
        scrumMaster: scrumMaster.id,    // GUID string
        methodology: data.methodology,
        members: selectedTeamMembers.map(member => member.id) // Array of GUID strings
      };

      console.log("Creating project with data:", projectData);

      // Call the hook's createProject function
      await createProject(projectData);

      toast.success("Project created successfully", {
        description: `${data.name} has been created with ${data.methodology} methodology`
      });

      navigate("/dashboard/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project", {
        description: "Please try again or contact support"
      });
    }
  };

  if (loadingUsers) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoSection form={form} />
          <MethodologySection form={form} />
          
          <ProjectRolesSection
            productOwner={productOwner}
            scrumMaster={scrumMaster}
            availableUsers={availableTeamMembers}
            onSelectProductOwner={handleSelectProductOwner}
            onSelectScrumMaster={handleSelectScrumMaster}
            onRemoveProductOwner={handleRemoveProductOwner}
            onRemoveScrumMaster={handleRemoveScrumMaster}
          />

          <TeamMembersSection
            selectedTeamMembers={selectedTeamMembers}
            availableTeamMembers={availableTeamMembers}
            onAddMember={handleAddTeamMember}
            onRemoveMember={handleRemoveTeamMember}
          />

          <div className="flex items-center justify-end gap-4">
            <Button 
              type="submit" 
              className="flex items-center gap-2"
              disabled={isCreating || loadingUsers}
            >
              <Save size={16} />
              {isCreating ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectCreationForm;