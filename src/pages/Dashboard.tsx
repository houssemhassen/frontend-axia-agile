import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  CalendarClock, 
  Users, 
  CheckCircle, 
  CircleDashed, 
  LineChart, 
  ArrowUpRight,
  Clock,
  Plus,
  AlertCircle,
  PenLine,
  FileDown
} from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SprintBurndownChart from "../components/dashboard/SprintBurndownChart";
import TeamProductivityChart from "../components/dashboard/TeamProductivityChart";
import IssuesList from "../components/dashboard/IssuesList";
import UpcomingSprints from "../components/dashboard/UpcomingSprints";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<"superadmin" | "billingAdmin" | "productOwner" | "scrumMaster" | "developer" | "tester">("productOwner");

  useEffect(() => {
    // Get role from location state or localStorage
    const stateRole = location.state?.role;
    const storedRole = localStorage.getItem("userRole");
    
    if (stateRole) {
      setRole(stateRole as any);
      localStorage.setItem("userRole", stateRole);
    } else if (storedRole) {
      setRole(storedRole as any);
    }
  }, [location]);

  const stats = [
    {
      title: "Active Projects",
      value: "4",
      icon: <CalendarClock className="h-5 w-5" />,
      change: "+1 this month",
      trend: "up"
    },
    {
      title: "Team Members",
      value: "18",
      icon: <Users className="h-5 w-5" />,
      change: "+3 since last month",
      trend: "up"
    },
    {
      title: "Completed Tasks",
      value: "72",
      icon: <CheckCircle className="h-5 w-5" />,
      change: "+15 this sprint",
      trend: "up"
    },
    {
      title: "Blocked Tasks",
      value: "8",
      icon: <AlertCircle className="h-5 w-5" />,
      change: "-2 since yesterday",
      trend: "down"
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: "Mobile App Redesign",
      progress: 75,
      status: "In Progress",
      deadline: "Oct 15, 2023",
      team: "Product Design Team"
    },
    {
      id: 2,
      name: "E-commerce Platform",
      progress: 45,
      status: "In Progress",
      deadline: "Nov 30, 2023",
      team: "Web Dev Team"
    },
    {
      id: 3,
      name: "Analytics Dashboard",
      progress: 90,
      status: "Review",
      deadline: "Oct 5, 2023",
      team: "Analytics Team"
    }
  ];

  const upcomingMeetings = [
    {
      title: "Daily Stand-up",
      time: "10:00 AM",
      participants: 8
    },
    {
      title: "Sprint Planning",
      time: "2:00 PM",
      participants: 12
    },
    {
      title: "Client Review",
      time: "4:30 PM",
      participants: 5
    }
  ];

  const handleViewActivity = () => {
    toast.info("Viewing activity history", {
      description: "Loading your recent activities..."
    });
    
    navigate(`/activity`, { state: { role } });
  };

  const handleGenerateReport = () => {
    toast.success("Report generation started", {
      description: "Your report will be ready in a few moments."
    });
    
    navigate(`/reports`, { state: { role } });
  };

  const handleViewAllProjects = () => {
    toast.info("Navigating to projects page");
    navigate(`/projects`, { state: { role } });
  };

  const handleScheduleMeeting = () => {
    toast.info("Opening meeting scheduler", {
      description: "Schedule a new meeting with your team"
    });
  };

  const handleCreateProject = () => {
    toast.info("Creating new project", {
      description: "Setting up new project configuration"
    });
    navigate(`/project-creation`, { state: { role } });
  };

  const handleSprintPlanning = () => {
    toast.info("Opening sprint planning", {
      description: "Plan your next sprint"
    });
    navigate(`/sprint-planning`, { state: { role } });
  };

  const handleViewProject = (projectId: number) => {
    navigate(`/projects/${projectId}`, { state: { role } });
  };

  const handleExportReport = (format: 'pdf' | 'csv') => {
    toast.success(`Exporting report as ${format.toUpperCase()}`, {
      description: "Your report is being generated and will download shortly."
    });
  };

  return (
    <>
      <Helmet>
        <title>Product Owner Dashboard | Axia Agile</title>
        <meta name="description" content="Axia Agile project management dashboard" />
      </Helmet>

      
        <div className="space-y-8 animate-fade-in">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, Jane</h1>
              <p className="text-muted-foreground">
                Here's what's happening with your projects today.
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:mt-0">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleViewActivity}
              >
                <Clock size={16} />
                View Activity
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={handleCreateProject}
              >
                <Plus size={16} />
                New Project
              </Button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card key={i} className="animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3 text-red-500 mr-1 rotate-180" />
                    )}
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sprints">Upcoming Sprints</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Recent Projects */}
                <Card className="animate-scale-in h-full" style={{ animationDelay: "0.3s" }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Projects</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleViewAllProjects}
                      >
                        View all
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recentProjects.map((project, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-medium cursor-pointer hover:text-primary" 
                                   onClick={() => handleViewProject(project.id)}>
                                {project.name}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center mt-1">
                                <span
                                  className={`h-2 w-2 rounded-full mr-1 ${
                                    project.status === "Review"
                                      ? "bg-yellow-400"
                                      : "bg-green-400"
                                  }`}
                                ></span>
                                {project.status} • Due {project.deadline}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">{project.team}</div>
                            </div>
                            <div className="text-sm font-medium">{project.progress}%</div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={handleCreateProject}
                    >
                      <Plus size={16} className="mr-2" />
                      Create New Project
                    </Button>
                  </CardFooter>
                </Card>

                {/* Upcoming Meetings */}
                <Card className="animate-scale-in h-full" style={{ animationDelay: "0.4s" }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Today's Meetings</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleScheduleMeeting}
                      >
                        Schedule
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {upcomingMeetings.map((meeting, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-3">
                              <CalendarClock size={20} />
                            </div>
                            <div>
                              <div className="font-medium">{meeting.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {meeting.time} • {meeting.participants} participants
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                          >
                            Join
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSprintPlanning}
                      className="w-full"
                    >
                      <PenLine size={16} className="mr-2" />
                      Sprint Planning
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                      onClick={handleCreateProject}
                    >
                      <Plus size={24} />
                      <span>Create New Project</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                      onClick={handleSprintPlanning}
                    >
                      <CalendarClock size={24} />
                      <span>Sprint Planning</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                      onClick={() => navigate('/teams', { state: { role } })}
                    >
                      <Users size={24} />
                      <span>Manage Teams</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                      onClick={() => navigate('/reports', { state: { role } })}
                    >
                      <LineChart size={24} />
                      <span>Generate Reports</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sprints" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Sprints</CardTitle>
                    <Button onClick={handleSprintPlanning}>Plan Sprint</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <UpcomingSprints />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => navigate('/sprints', { state: { role } })}>View All Sprints</Button>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => handleExportReport('pdf')}>
                      <FileDown className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button variant="outline" onClick={() => handleExportReport('csv')}>
                      <FileDown className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sprint Burndown</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <SprintBurndownChart />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Team Productivity</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <TeamProductivityChart />
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Open Issues & Blockers</CardTitle>
                    <Badge variant="destructive">{8} Active Issues</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <IssuesList />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/kanban', { state: { role } })}>
                    View All Issues
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </>
  );
};

export default Dashboard;
