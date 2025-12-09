
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  CalendarRange, 
  Milestone, 
  ListCheck, 
  ArrowRight, 
  Calendar,
  ChevronDown,
  Flag,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatusIndicator from "@/components/data-display/StatusIndicator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Interfaces for Release Planning
interface Release {
  id: string;
  name: string;
  version: string;
  releaseDate: string;
  status: "planning" | "in-progress" | "ready" | "released";
  progress: number;
  features: number;
  completedFeatures: number;
}

interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  capacity: number;
  committed: number;
  status: "planning" | "active" | "completed";
  features: Feature[];
}

interface Feature {
  id: string;
  name: string;
  priority: "high" | "medium" | "low";
  status: "not-started" | "in-progress" | "completed";
  assignedSprint?: string;
}

interface Milestone {
  id: string;
  name: string;
  date: string;
  progress: number;
  status: "on-track" | "at-risk" | "behind";
  description: string;
}

const ReleasePlanning = () => {
  const [selectedProject, setSelectedProject] = useState("ecommerce");

  // Sample data for releases
  const releases: Release[] = [
    {
      id: "rel-101",
      name: "Spring Release",
      version: "2.0",
      releaseDate: "2025-06-30",
      status: "in-progress",
      progress: 45,
      features: 24,
      completedFeatures: 11
    },
    {
      id: "rel-102",
      name: "Summer Update",
      version: "2.1",
      releaseDate: "2025-08-15",
      status: "planning",
      progress: 15,
      features: 18,
      completedFeatures: 3
    },
    {
      id: "rel-103",
      name: "Fall Release",
      version: "2.2",
      releaseDate: "2025-10-30",
      status: "planning",
      progress: 5,
      features: 20,
      completedFeatures: 1
    }
  ];

  // Sample data for sprints
  const sprints: Sprint[] = [
    {
      id: "sprint-201",
      name: "Sprint 8",
      startDate: "2025-05-01",
      endDate: "2025-05-14",
      capacity: 50,
      committed: 45,
      status: "active",
      features: [
        { id: "feat-301", name: "User Authentication", priority: "high", status: "in-progress" },
        { id: "feat-302", name: "Product Search", priority: "high", status: "in-progress" },
        { id: "feat-303", name: "Shopping Cart", priority: "medium", status: "not-started" }
      ]
    },
    {
      id: "sprint-202",
      name: "Sprint 9",
      startDate: "2025-05-15",
      endDate: "2025-05-28",
      capacity: 50,
      committed: 0,
      status: "planning",
      features: [
        { id: "feat-304", name: "Checkout Process", priority: "high", status: "not-started" },
        { id: "feat-305", name: "Payment Integration", priority: "high", status: "not-started" },
        { id: "feat-306", name: "Order Confirmation", priority: "medium", status: "not-started" }
      ]
    },
    {
      id: "sprint-203",
      name: "Sprint 10",
      startDate: "2025-05-29",
      endDate: "2025-06-11",
      capacity: 50,
      committed: 0,
      status: "planning",
      features: [
        { id: "feat-307", name: "User Profiles", priority: "medium", status: "not-started" },
        { id: "feat-308", name: "Order History", priority: "medium", status: "not-started" },
        { id: "feat-309", name: "Product Reviews", priority: "low", status: "not-started" }
      ]
    }
  ];

  // Sample data for milestones
  const milestones: Milestone[] = [
    {
      id: "mile-401",
      name: "MVP Release",
      date: "2025-06-15",
      progress: 70,
      status: "on-track",
      description: "Initial release with core functionality"
    },
    {
      id: "mile-402",
      name: "Beta Launch",
      date: "2025-07-01",
      progress: 45,
      status: "at-risk",
      description: "Public beta with limited users"
    },
    {
      id: "mile-403",
      name: "Full Launch",
      date: "2025-08-15",
      progress: 25,
      status: "on-track",
      description: "Public release with all features"
    },
    {
      id: "mile-404",
      name: "International Expansion",
      date: "2025-10-01",
      progress: 10,
      status: "behind",
      description: "Localization and international payment methods"
    }
  ];

  // Sample data for unassigned features
  const unassignedFeatures: Feature[] = [
    { id: "feat-310", name: "Wishlist Functionality", priority: "medium", status: "not-started" },
    { id: "feat-311", name: "Product Recommendations", priority: "high", status: "not-started" },
    { id: "feat-312", name: "Social Sharing", priority: "low", status: "not-started" },
    { id: "feat-313", name: "Email Notifications", priority: "medium", status: "not-started" },
    { id: "feat-314", name: "Analytics Dashboard", priority: "medium", status: "not-started" }
  ];

  const getStatusColor = (status: "on-track" | "at-risk" | "behind"): "success" | "warning" | "error" => {
    switch (status) {
      case "on-track": return "success";
      case "at-risk": return "warning";
      case "behind": return "error";
      default: return "success";
    }
  };

  const getReleaseStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-100 text-blue-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "ready": return "bg-green-100 text-green-800";
      case "released": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-blue-100 text-blue-800"
  };
  
  const statusColors = {
    "not-started": "bg-gray-100 text-gray-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800"
  };

  const handleCreateMilestone = () => {
    toast.success("Create milestone dialog will open");
  };

  const handlePlanRelease = () => {
    toast.success("Plan release dialog will open");
  };

  const handleAssignFeature = (featureId: string) => {
    toast.info(`Assign feature ${featureId} dialog will open`);
  };

  return (
    <>
      <Helmet>
        <title>Release Planning | Axia Agile</title>
        <meta name="description" content="Plan and manage software releases" />
      </Helmet>

      <DashboardLayout 
        role="productOwner"
        pageTitle="Release Planning"
        pageDescription="Plan releases, track milestones and manage delivery timelines"
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecommerce">E-Commerce Platform</SelectItem>
                <SelectItem value="banking">Mobile Banking App</SelectItem>
                <SelectItem value="portal">Customer Portal</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCreateMilestone}>
                <Milestone className="mr-2 h-4 w-4" />
                Add Milestone
              </Button>
              <Button onClick={handlePlanRelease}>
                <CalendarRange className="mr-2 h-4 w-4" />
                Plan Release
              </Button>
            </div>
          </div>

          <Tabs defaultValue="timeline" className="w-full">
            <TabsList>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="releases">Releases</TabsTrigger>
              <TabsTrigger value="sprints">Sprint Planning</TabsTrigger>
              <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
            </TabsList>
            
            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Release Roadmap</CardTitle>
                </CardHeader>
                <CardContent className="h-96 flex items-center justify-center">
                  <CalendarRange size={120} className="text-muted-foreground/50" />
                  <p className="ml-4 text-muted-foreground">Release timeline will render here</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {milestones.map((milestone) => (
                        <div key={milestone.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{milestone.name}</h3>
                              <p className="text-sm text-muted-foreground mb-1">
                                {new Date(milestone.date).toLocaleDateString()}
                                <span className="mx-2">•</span>
                                {milestone.description}
                              </p>
                            </div>
                            <StatusIndicator 
                              status={getStatusColor(milestone.status)} 
                              label={milestone.status.replace("-", " ")}
                            />
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{milestone.progress}%</span>
                            </div>
                            <Progress value={milestone.progress} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Releases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {releases.map((release) => (
                        <div key={release.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">
                                {release.name} <span className="text-sm font-normal ml-1">v{release.version}</span>
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Target: {new Date(release.releaseDate).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge className={getReleaseStatusColor(release.status)}>
                              {release.status.replace("-", " ")}
                            </Badge>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{release.progress}%</span>
                            </div>
                            <Progress value={release.progress} className="h-2" />
                          </div>
                          
                          <div className="mt-3 text-sm text-muted-foreground">
                            {release.completedFeatures} of {release.features} features completed
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Releases Tab */}
            <TabsContent value="releases" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Release Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Release</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Target Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Features</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {releases.map((release) => (
                        <TableRow key={release.id}>
                          <TableCell className="font-medium">{release.name}</TableCell>
                          <TableCell>{release.version}</TableCell>
                          <TableCell>{new Date(release.releaseDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge className={getReleaseStatusColor(release.status)}>
                              {release.status.replace("-", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>{release.completedFeatures}/{release.features}</TableCell>
                          <TableCell>
                            <div className="w-40">
                              <div className="flex justify-between text-xs mb-1">
                                <span>{release.progress}%</span>
                              </div>
                              <Progress value={release.progress} className="h-2" />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Features by Release</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <BarChart3 size={80} className="text-muted-foreground/50" />
                    <p className="ml-4 text-muted-foreground">Features by release chart will render here</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Release Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <BarChart3 size={80} className="text-muted-foreground/50" />
                    <p className="ml-4 text-muted-foreground">Release status chart will render here</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Sprints Tab */}
            <TabsContent value="sprints" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sprint Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {sprints.map((sprint) => (
                      <div key={sprint.id} className="border rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                          <div>
                            <h3 className="font-medium text-lg">{sprint.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge className={
                              sprint.status === "active" ? "bg-green-100 text-green-800" : 
                              sprint.status === "completed" ? "bg-blue-100 text-blue-800" : 
                              "bg-yellow-100 text-yellow-800"
                            }>
                              {sprint.status.charAt(0).toUpperCase() + sprint.status.slice(1)}
                            </Badge>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Capacity:</span> 
                              <span className="ml-1 font-medium">{sprint.committed}/{sprint.capacity} pts</span>
                            </div>
                          </div>
                        </div>

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Feature</TableHead>
                              <TableHead>Priority</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sprint.features.map((feature) => (
                              <TableRow key={feature.id}>
                                <TableCell className="font-medium">{feature.name}</TableCell>
                                <TableCell>
                                  <Badge className={priorityColors[feature.priority]}>
                                    {feature.priority}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge className={statusColors[feature.status]}>
                                    {feature.status.replace("-", " ")}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        {sprint.status === "planning" && sprint.features.length < 5 && (
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm">
                              <ListCheck className="mr-2 h-4 w-4" />
                              Add Features
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Unassigned Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Feature</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {unassignedFeatures.map((feature) => (
                        <TableRow key={feature.id}>
                          <TableCell className="font-medium">{feature.name}</TableCell>
                          <TableCell>
                            <Badge className={priorityColors[feature.priority]}>
                              {feature.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[feature.status]}>
                              {feature.status.replace("-", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleAssignFeature(feature.id)}
                            >
                              Assign to Sprint
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Capacity Planning Tab */}
            <TabsContent value="capacity" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Capacity Forecast</CardTitle>
                </CardHeader>
                <CardContent className="h-96 flex items-center justify-center">
                  <BarChart3 size={120} className="text-muted-foreground/50" />
                  <p className="ml-4 text-muted-foreground">Team capacity forecast chart will render here</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Release Capacity Allocation</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <BarChart3 size={80} className="text-muted-foreground/50" />
                    <p className="ml-4 text-muted-foreground">Release capacity allocation chart will render here</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Allocation by Team</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <BarChart3 size={80} className="text-muted-foreground/50" />
                    <p className="ml-4 text-muted-foreground">Feature allocation chart will render here</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Capacity Planning Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                      <h3 className="font-medium text-green-800 mb-1">Balanced Sprint Loads</h3>
                      <p className="text-sm text-green-700">
                        Current sprint planning shows balanced team capacity utilization across upcoming sprints.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                      <h3 className="font-medium text-yellow-800 mb-1">Sprint 10 Risk</h3>
                      <p className="text-sm text-yellow-700">
                        Sprint 10 has 3 high-priority features but limited capacity. Consider redistributing work or adjusting scope.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                      <h3 className="font-medium text-blue-800 mb-1">Summer Release Capacity</h3>
                      <p className="text-sm text-blue-700">
                        Additional capacity may be needed for Summer Release. Consider adjusting team allocation or timeline.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                      <h3 className="font-medium text-purple-800 mb-1">Advanced Planning Needed</h3>
                      <p className="text-sm text-purple-700">
                        Fall Release has significant feature requirements. Begin capacity planning now to ensure adequate resources.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ReleasePlanning;
