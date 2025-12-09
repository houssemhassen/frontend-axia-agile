import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import { BarChart2, Calendar, Users, Clock, X, Circle } from "lucide-react";
import { toast } from "sonner";
import DashboardPageWrapper from "@/components/layout/DashboardPageWrapper";
import PageHeader from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TeamProductivityChart from "@/components/charts/TeamProductivityChart";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import ProjectStats from "@/components/projects/stats/ProjectStats";
import ProjectFilters from "@/components/projects/filters/ProjectFilters";
import ProjectList from "@/components/projects/list/ProjectList";

const projectsData = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "Modern e-commerce solution with React and Node.js",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-03-15",
    progress: 75,
    teamSize: 8,
    budget: 125000,
    spent: 93750,
    members: [
      { id: 1, name: "John Doe", avatar: "/placeholder-avatar.jpg" },
      { id: 2, name: "Jane Smith", avatar: "/placeholder-avatar.jpg" },
      { id: 3, name: "Mike Johnson", avatar: "/placeholder-avatar.jpg" },
      { id: 4, name: "Sarah Wilson", avatar: "/placeholder-avatar.jpg" }
    ]
  },
  {
    id: 2,
    name: "Mobile Banking App",
    description: "Secure mobile banking application for iOS and Android",
    status: "Planning",
    priority: "Critical",
    dueDate: "2024-04-30",
    progress: 25,
    teamSize: 12,
    budget: 200000,
    spent: 50000,
    members: [
      { id: 5, name: "David Brown", avatar: "/placeholder-avatar.jpg" },
      { id: 6, name: "Emily Davis", avatar: "/placeholder-avatar.jpg" },
      { id: 7, name: "Tom Wilson", avatar: "/placeholder-avatar.jpg" }
    ]
  },
  {
    id: 3,
    name: "AI Analytics Dashboard",
    description: "Machine learning powered business analytics platform",
    status: "Completed",
    priority: "Medium",
    dueDate: "2024-02-20",
    progress: 100,
    teamSize: 6,
    budget: 80000,
    spent: 75000,
    members: [
      { id: 8, name: "Lisa Anderson", avatar: "/placeholder-avatar.jpg" },
      { id: 9, name: "Mark Taylor", avatar: "/placeholder-avatar.jpg" }
    ]
  }
];

const upcomingSprints = [
  {
    id: 1,
    name: "Sprint 3",
    projectName: "E-commerce Platform",
    startDate: "2024-02-15",
    endDate: "2024-02-29",
    tasks: 12,
    status: "Next"
  },
  {
    id: 2,
    name: "Sprint 1",
    projectName: "Mobile Banking App",
    startDate: "2024-02-20",
    endDate: "2024-03-05",
    tasks: 8,
    status: "Planned"
  }
];

const issuesData = [
  {
    id: 1,
    title: "Login form validation not working",
    project: "E-commerce Platform",
    priority: "High",
    assignedTo: "John Doe"
  },
  {
    id: 2,
    title: "Payment gateway integration",
    project: "E-commerce Platform",
    priority: "Critical",
    assignedTo: "Jane Smith"
  },
  {
    id: 3,
    title: "UI responsive design improvements",
    project: "Mobile Banking App",
    priority: "Medium",
    assignedTo: "Mike Johnson"
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [role, setRole] = useState<"productOwner">("productOwner");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const stateRole = location.state?.role;
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
    if (searchQuery) {
      const filtered = projectsData.filter(
        project => project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projectsData);
    }
  }, [searchQuery]);

  const filterByStatus = (status: string) => {
    if (status === "all") {
      setFilteredProjects(projectsData);
    } else {
      const filtered = projectsData.filter(
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
            <h1 className="text-2xl font-bold">Projects Dashboard</h1>
            <p className="text-muted-foreground">Manage and monitor all your agile projects</p>
          </div>
          <CreateProjectModal />
        </div>

        {/* Main 3-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left sidebar - 1 column */}
          <div className="lg:col-span-1 flex flex-col">
            {/* Project Overview Stats - Compact */}
            <Card className="flex-1 mb-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <ProjectStats projectsData={projectsData} />
              </CardContent>
            </Card>
            
            {/* Open Issues - Compact */}
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold">{issuesData.length}</span>
                    <span className="text-xs text-muted-foreground">Total</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-red-500">
                      {issuesData.filter(i => i.priority === "Critical" || i.priority === "High").length}
                    </span>
                    <span className="text-xs text-muted-foreground">High</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-amber-500">
                      {issuesData.filter(i => i.priority === "Medium").length}
                    </span>
                    <span className="text-xs text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-green-500">
                      {issuesData.filter(i => i.priority === "Low").length}
                    </span>
                    <span className="text-xs text-muted-foreground">Low</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right area - 2 columns */}
          <div className="lg:col-span-2">
            {/* Team Productivity Chart - Taller to match left sidebar */}
            <TeamProductivityChart 
              title="Team Productivity Trends"
              description="Weekly task completion vs. estimated capacity"
              height={400}
              className="h-full"
            />
          </div>
        </div>

        {/* Full-width 50/50 layout for Upcoming Sprints and Team Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Sprints */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Upcoming Sprints</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/sprints', { state: { role } })}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px]">
                <div className="space-y-3">
                  {upcomingSprints.map((sprint) => (
                    <div
                      key={sprint.id}
                      className="flex items-start p-2 rounded-md hover:bg-muted cursor-pointer" 
                      onClick={() => navigate('/sprints')}
                    >
                      <div className="mr-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <Clock className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{sprint.name} - {sprint.projectName}</p>
                        <div className="text-sm text-muted-foreground">
                          <p>{new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}</p>
                          <div className="flex items-center mt-1">
                            <span className="mr-2">{sprint.tasks} tasks</span>
                            {sprint.status === "Next" ? (
                              <Badge className="bg-blue-500 hover:bg-blue-600">Starting Soon</Badge>
                            ) : (
                              <Badge variant="outline">Planned</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Team Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Team Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-900">Development Team</p>
                        <p className="text-sm text-green-700">5 members active</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <BarChart2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-900">Sprint Progress</p>
                        <p className="text-sm text-blue-700">78% complete</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">On Track</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-amber-900">Code Reviews</p>
                        <p className="text-sm text-amber-700">3 pending</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <BarChart2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-purple-900">Velocity</p>
                        <p className="text-sm text-purple-700">42 points/sprint</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Good</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-red-900">Blockers</p>
                        <p className="text-sm text-red-700">2 issues blocking</p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Attention Needed</Badge>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
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

        {/* Quick Actions - Full width bottom section */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">Manage your projects and teams</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/sprint-planning', { state: { role } })}
              >
                <Calendar className="h-5 w-5" />
                <span>Sprint Planning</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/burndown-reports', { state: { role } })}
              >
                <BarChart2 className="h-5 w-5" />
                <span>Reports</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/teams', { state: { role } })}
              >
                <Users className="h-5 w-5" />
                <span>Team Management</span>
              </Button>

              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/backlog', { state: { role } })}
              >
                <Users className="h-5 w-5" />
                <span>Backlog</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default Projects;
