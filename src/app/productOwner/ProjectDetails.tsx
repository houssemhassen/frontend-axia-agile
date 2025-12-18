
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { UseProjectManagement } from "@/hooks/UseProjectManagement";
import { formatDate } from "@/lib/utils";
import { UseBacklogManagement } from "@/hooks/UseBacklogManagement";
import { AddBacklogDialog } from "@/components/product-owner/backlog/AddBacklogDialog";

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("projectManager");
  const [isAddBacklogOpen, setIsAddBacklogOpen] = useState(false);

  const { useProjectById } = UseProjectManagement();
  const { useBacklogsByProject } = UseBacklogManagement();

  // Utiliser le hook pour fetcher le projet
  const {
    data: project,
    isLoading: loading,
    isError,
    error
  } = useProjectById(projectId ? Number(projectId) : null);

  // Fetcher les backlogs pour ce projet
  const {
    data: backlogs = [],
    isLoading: isLoadingBacklogs,
  } = useBacklogsByProject(projectId ? Number(projectId) : null);

  useEffect(() => {
    const stateRole = location.state?.role;
    const storedRole = localStorage.getItem("userRole");

    if (stateRole) {
      setRole(stateRole);
    } else if (storedRole) {
      setRole(storedRole);
    }
  }, [location]);

  useEffect(() => {
    if (isError) {
      console.error("Error:", error);
      toast.error("Failed to load project");
    }
  }, [isError, error]);

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
                {project.members.length} members
              </div>

              {/* Afficher les noms des membres */}
              <div className="mt-2 flex flex-wrap gap-1">
                {project.members.slice(0, 3).map((member) => (
                  <span
                    key={member.id}
                    className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                  >
                    {member.firstName} {member.lastName}
                  </span>
                ))}
                {project.members.length > 3 && (
                  <span className="text-xs text-muted-foreground px-2 py-1">
                    +{project.members.length - 3} more
                  </span>
                )}
              </div>

            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Deadline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                {formatDate(project.endDate)}
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
            <TabsTrigger value="backlogs">Backlogs</TabsTrigger>
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
                    <p className="text-muted-foreground text-sm">Backlogs</p>
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
          <TabsContent value="backlogs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Project Backlogs</CardTitle>
                <Button size="sm" onClick={() => setIsAddBacklogOpen(true)}>
                  <FileEdit className="h-4 w-4 mr-1" />
                  Add Backlog
                </Button>
              </CardHeader>
              <CardContent>
                {isLoadingBacklogs ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : backlogs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                      <FileEdit className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      No backlogs yet. Click "Add Backlog" to create one.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddBacklogOpen(true)}
                    >
                      <FileEdit className="h-4 w-4 mr-2" />
                      Create Your First Backlog
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {backlogs.map((backlog: any) => (
                      <div
                        key={backlog.Id}
                        className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{backlog.Nom}</h4>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>
                                Created: {formatDate(backlog.DateCreation)}
                              </span>
                              <span>
                                User Stories: {backlog.UserStories?.length || 0}
                              </span>
                              {backlog.SprintId > 0 && (
                                <Badge variant="secondary">
                                  Sprint {backlog.SprintId}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                // TODO: Navigate to backlog details or edit
                                console.log('View backlog:', backlog.Id);
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

      <AddBacklogDialog
        open={isAddBacklogOpen}
        onOpenChange={setIsAddBacklogOpen}
        projectId={projectId ? Number(projectId) : 0}
      />
    </>
  );
};

export default ProjectDetails;
