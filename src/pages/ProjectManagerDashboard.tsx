/**
 * Project Manager Dashboard
 * Comprehensive dashboard for project managers with cross-team coordination
 */

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Calendar, 
  Users, 
  Target, 
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import WidgetGrid from "@/components/widgets/WidgetGrid";
import { useRoleWidgets } from "@/hooks/useRoleWidgets";

const ProjectManagerDashboard = () => {
  const [selectedProject, setSelectedProject] = useState("project-1");
  const widgets = useRoleWidgets("projectManager");

  // Mock data for project manager metrics
  const projectStats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 this month",
      trend: "up",
      icon: <Target className="h-5 w-5" />
    },
    {
      title: "Team Members",
      value: "48",
      change: "+6 this quarter", 
      trend: "up",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Resource Utilization",
      value: "87%",
      change: "+5% vs target",
      trend: "up", 
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "On-Time Delivery",
      value: "94%",
      change: "Above benchmark",
      trend: "up",
      icon: <CheckCircle2 className="h-5 w-5" />
    }
  ];

  const projects = [
    {
      id: "project-1",
      name: "Mobile App Redesign",
      status: "In Progress",
      progress: 68,
      teamSize: 8,
      deadline: "2024-03-15",
      health: "good",
      budget: "$125k",
      spent: "$89k"
    },
    {
      id: "project-2", 
      name: "API Integration Platform",
      status: "Planning",
      progress: 15,
      teamSize: 6,
      deadline: "2024-04-30",
      health: "excellent",
      budget: "$200k",
      spent: "$25k"
    },
    {
      id: "project-3",
      name: "Data Analytics Dashboard",
      status: "At Risk",
      progress: 45,
      teamSize: 5,
      deadline: "2024-02-28",
      health: "at-risk",
      budget: "$150k", 
      spent: "$110k"
    }
  ];

  const upcomingMilestones = [
    {
      id: 1,
      title: "Mobile App Beta Release",
      project: "Mobile App Redesign",
      dueDate: "2024-02-15",
      status: "on-track"
    },
    {
      id: 2,
      title: "API Documentation Complete",
      project: "API Integration Platform", 
      dueDate: "2024-02-20",
      status: "ahead"
    },
    {
      id: 3,
      title: "Data Migration Phase 1",
      project: "Data Analytics Dashboard",
      dueDate: "2024-02-10",
      status: "at-risk"
    }
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent": return "text-green-600 bg-green-100";
      case "good": return "text-blue-600 bg-blue-100";
      case "at-risk": return "text-orange-600 bg-orange-100";
      case "critical": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "text-green-600 bg-green-100";
      case "ahead": return "text-blue-600 bg-blue-100";
      case "at-risk": return "text-orange-600 bg-orange-100";
      case "delayed": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <>
      <Helmet>
        <title>Project Manager Dashboard | Axia Agile</title>
        <meta name="description" content="Comprehensive project management dashboard with cross-team coordination tools" />
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Manager Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Cross-team coordination and resource management
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar size={16} />
              Schedule Review
            </Button>
            <Button className="flex items-center gap-2">
              <BarChart3 size={16} />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Project Manager Widgets */}
        <WidgetGrid widgets={widgets} columns={4} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Project Portfolio</TabsTrigger>
            <TabsTrigger value="resources">Resource Management</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="metrics">Cross-Team Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-foreground">{project.name}</h3>
                          <Badge className={getHealthColor(project.health)}>
                            {project.health}
                          </Badge>
                        </div>
                        <Badge variant="outline">{project.status}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Progress</span>
                          <div className="mt-1">
                            <Progress value={project.progress} className="h-2" />
                            <span className="text-xs text-muted-foreground">{project.progress}%</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Team Size</span>
                          <p className="font-medium">{project.teamSize} members</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Budget</span>
                          <p className="font-medium">{project.spent} / {project.budget}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Deadline</span>
                          <p className="font-medium">{project.deadline}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Resource management tools will be available here</p>
                    <p className="text-sm">Track team allocation, workload, and capacity planning</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone) => (
                    <div key={milestone.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground">{milestone.project}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{milestone.dueDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cross-Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Cross-team metrics and analytics will be displayed here</p>
                    <p className="text-sm">View team performance, velocity, and collaboration metrics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProjectManagerDashboard;