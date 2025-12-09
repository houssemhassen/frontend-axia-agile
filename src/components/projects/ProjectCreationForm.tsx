import { useState } from "react";
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

import { ProjectService } from "../../services/projectService";

const ProjectCreationForm = () => {
  const navigate = useNavigate();
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<TeamMember[]>([]);
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      methodology: "scrum",
      team: "",
      startDate: "",
      endDate: "",
      status: "Planning",
      priority: "Medium",
    },
  });

  const [availableTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "Jane Cooper", role: "Developer", avatar: "JC" },
    { id: 2, name: "Michael Brown", role: "Designer", avatar: "MB" },
    { id: 3, name: "Alex Johnson", role: "QA Engineer", avatar: "AJ" },
    { id: 4, name: "Emily Williams", role: "Product Owner", avatar: "EW" },
    { id: 5, name: "Chris Lee", role: "Developer", avatar: "CL" },
    { id: 6, name: "Sarah Miller", role: "UI/UX Designer", avatar: "SM" },
    { id: 7, name: "David Garcia", role: "Backend Developer", avatar: "DG" },
    { id: 8, name: "Lisa Chen", role: "Frontend Developer", avatar: "LC" }
  ]);

  const handleAddTeamMember = (memberId: number) => {
    const memberToAdd = availableTeamMembers.find(m => m.id === memberId);
    if (!memberToAdd) return;
    
    if (!selectedTeamMembers.some(m => m.id === memberId)) {
      setSelectedTeamMembers(prev => [...prev, memberToAdd]);
    }
  };

  const handleRemoveTeamMember = (memberId: number) => {
    setSelectedTeamMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const onSubmit = async (data: ProjectFormValues) => {
    console.log("Project data:", data);
    console.log("Team members:", selectedTeamMembers);

  const resWorkspace=   await ProjectService.createWorkspace(data);

    await ProjectService.createProject({workspaceId:resWorkspace.id,name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate}); 
      
    toast.success("Project created successfully", {
      description: `${data.name} has been created with ${data.methodology} methodology`
    });
   // navigate("/dashboard/projects");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoSection form={form} />
          <MethodologySection form={form} />
          <TeamMembersSection
            selectedTeamMembers={selectedTeamMembers}
            availableTeamMembers={availableTeamMembers}
            onAddMember={handleAddTeamMember}
            onRemoveMember={handleRemoveTeamMember}
          />
          
          <div className="flex items-center justify-end gap-4">
            <Button type="submit" className="flex items-center gap-2">
              <Save size={16} />
              Create Project
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectCreationForm;
