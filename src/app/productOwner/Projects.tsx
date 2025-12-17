import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProjectFilters from "@/components/projects/filters/ProjectFilters";
import ProjectList from "@/components/projects/list/ProjectList";
import { UseProjectManagement } from "@/hooks/UseProjectManagement";

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [role, setRole] = useState<"ProductOwner">("ProductOwner");
  const [activeTab, setActiveTab] = useState("all");


  // Use the hook to fetch projects
  const {
    projects,
    isLoadingProjects,
    isErrorProjects,
    projectsError,
    refetchProjects,
    createProject,
    isCreating,
  } = UseProjectManagement();

  useEffect(() => {
    const stateRole = location.pathname;
    const storedRole = localStorage.getItem("userRole");

    if (stateRole) {
      setRole(stateRole as any);
      localStorage.setItem("userRole", stateRole);
    } else if (storedRole) {
      setRole(storedRole as any);
    }

    const newProject = location.state?.newProject;
    if (newProject) {
      toast.success(`Project ${newProject.name} created successfully`);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!projects) {
      setFilteredProjects([]);
      return;
    }

    if (searchQuery) {
      const filtered = projects.filter(
        project => project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchQuery, projects]);

  const filterByStatus = (status: string) => {
    if (status === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects?.filter(
        project => project.status.toLowerCase() === status.toLowerCase()
      );
      setFilteredProjects(filtered);
    }
    setActiveTab(status);
  };

  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/${projectId}`, { state: { role } });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-500 border-red-500';
      case 'critical':
        return 'text-red-600 border-red-600';
      case 'medium':
        return 'text-amber-500 border-amber-500';
      case 'low':
        return 'text-green-500 border-green-500';
      default:
        return 'text-blue-500 border-blue-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">In Progress</Badge>;
      case 'planning':
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Planning</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-green-500 text-green-500">Completed</Badge>;
      case 'on hold':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">On Hold</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Projects List</h1>
        </div>
      </div>

      {/* Projects List Section */}
      <Card>
        <CardHeader className="pb-2">
          <ProjectFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            onStatusFilter={filterByStatus}
          />
        </CardHeader>
        <CardContent>
          <ProjectList
            projects={filteredProjects}
            onProjectClick={handleProjectClick}
            getPriorityColor={getPriorityColor}
            getStatusBadge={getStatusBadge}
            truncateText={truncateText}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
