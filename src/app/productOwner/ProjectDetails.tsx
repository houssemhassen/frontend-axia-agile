
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Users,
  CalendarClock,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileEdit
} from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  progress: number;
  team: string;
  members: number;
  deadline: string;
  priority: string;
  isStarred: boolean;
}

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>("projectManager");

  useEffect(() => {
    const stateRole = location.state?.role;
    const storedRole = localStorage.getItem("userRole");

    if (stateRole) {
      setRole(stateRole);
    } else if (storedRole) {
      setRole(storedRole);
    }

    // Fetch project details - using mock data for now
    const fetchProject = () => {
      const projects = [
        {
          id: 1,
          name: "Mobile App Redesign",
          description: "Redesign of client mobile application with focus on improved UX",
          status: "In Progress",
          progress: 65,
          team: "Product Design Team",
          members: 8,
          deadline: "Oct 15, 2023",
          priority: "High",
          isStarred: true
        },
        {
          id: 2,
          name: "E-commerce Platform",
          description: "Building a new e-commerce solution for retail client",
          status: "In Progress",
          progress: 45,
          team: "Web Dev Team",
          members: 12,
          deadline: "Nov 30, 2023",
          priority: "Medium",
          isStarred: false
        },
        {
          id: 3,
          name: "Analytics Dashboard",
          description: "Internal analytics dashboard for marketing department",
          status: "Review",
          progress: 90,
          team: "Analytics Team",
          members: 5,
          deadline: "Oct 5, 2023",
          priority: "Medium",
          isStarred: true
        },
        {
          id: 4,
          name: "CRM Implementation",
          description: "Integration and rollout of new CRM system",
          status: "Planning",
          progress: 25,
          team: "CRM Team",
          members: 7,
          deadline: "Dec 20, 2023",
          priority: "High",
          isStarred: false
        },
        {
          id: 5,
          name: "API Modernization",
          description: "Updating legacy APIs to modern standards",
          status: "In Progress",
          progress: 55,
          team: "Backend Team",
          members: 6,
          deadline: "Nov 10, 2023",
          priority: "Low",
          isStarred: false
        }
      ];

      const id = parseInt(projectId || "0");
      const foundProject = projects.find(p => p.id === id);

      if (foundProject) {
        setProject(foundProject);
      } else {
        toast.error("Project not found", {
          description: "Could not find the requested project"
        });
        navigate("/projects");
      }

      setLoading(false);
    };

    fetchProject();
  }, [projectId, location, navigate]);

  const handleGoBack = () => {
    navigate("/projects", { state: { role } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-6">The requested project could not be found.</p>
        <Button onClick={handleGoBack}>Return to Projects</Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500";
      case "Review":
        return "bg-amber-500";
      case "Planning":
        return "bg-slate-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-slate-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "border-red-500 text-red-500";
      case "Medium":
        return "border-amber-500 text-amber-500";
      case "Low":
        return "border-green-500 text-green-500";
      default:
        return "border-slate-500 text-slate-500";
    }
  };

  return (
    <>
      <Helmet>
        <title>{project.name} | Axia Agile</title>
        <meta name="description" content={`Project details for ${project.name}`} />
      </Helmet>

      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleGoBack}>
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.progress}%</div>
              <Progress value={project.progress} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5" />
                {project.members} members
              </div>
              <p className="text-sm text-muted-foreground mt-1">{project.team}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Deadline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                {project.deadline}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className={getPriorityColor(project.priority)}>
                {project.priority}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{project.description}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Project Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2 p-4 border rounded-lg">
                    <p className="text-muted-foreground text-sm">Tasks</p>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold">24</div>
                      <div className="flex flex-col text-right">
                        <span className="text-green-600 text-sm">18 completed</span>
                        <span className="text-amber-500 text-sm">6 pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 p-4 border rounded-lg">
                    <p className="text-muted-foreground text-sm">Time Spent</p>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold">172 hrs</div>
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 p-4 border rounded-lg">
                    <p className="text-muted-foreground text-sm">Milestones</p>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold">3/5</div>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tasks">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Project Tasks</CardTitle>
                <Button size="sm">
                  <FileEdit className="h-4 w-4 mr-1" />
                  Add Task
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Task management view is under development.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Timeline view is under development.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="files">
            <Card>
              <CardHeader>
                <CardTitle>Project Files</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Files view is under development.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProjectDetails;
