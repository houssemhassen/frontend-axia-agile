
import { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  BarChart3, 
  Download, 
  Filter, 
  Calendar, 
  ArrowRight, 
  Check, 
  Clock,
  CircleDashed,
  CheckCircle,
  AlertCircle,
  PieChart,
  LineChart,
  Users,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import {
  BarChart,
  PieChart as PieChartComponent,
  LineChart as LineChartComponent,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  Cell,
  Line,
  ResponsiveContainer
} from "recharts";

const Reports = () => {
  const [role, setRole] = useState<"productOwner">("productOwner");
  const [timeRange, setTimeRange] = useState("month");

  // Sample data for charts
  const projectCompletionData = [
    { name: "Mobile App", completed: 65, total: 100 },
    { name: "E-commerce", completed: 45, total: 100 },
    { name: "Analytics", completed: 90, total: 100 },
    { name: "CRM", completed: 25, total: 100 },
    { name: "API Mod", completed: 55, total: 100 }
  ];

  const taskStatusData = [
    { name: "Completed", value: 48, color: "#4ade80" },
    { name: "In Progress", value: 32, color: "#3b82f6" },
    { name: "Backlog", value: 20, color: "#94a3b8" },
    { name: "Blocked", value: 8, color: "#ef4444" }
  ];

  const teamPerformanceData = [
    { name: "Design", completed: 42, goal: 40 },
    { name: "Dev", completed: 38, goal: 35 },
    { name: "QA", completed: 30, goal: 30 },
    { name: "DevOps", completed: 25, goal: 20 },
    { name: "Data", completed: 18, goal: 25 }
  ];

  const velocityTrendData = [
    { sprint: "Sprint 20", velocity: 42 },
    { sprint: "Sprint 21", velocity: 48 },
    { sprint: "Sprint 22", velocity: 45 },
    { sprint: "Sprint 23", velocity: 52 },
    { sprint: "Sprint 24", velocity: 58 }
  ];

  const recentReports = [
    {
      id: 1,
      name: "Sprint 23 Performance Report",
      date: "Sep 14, 2023",
      author: "Jane Cooper",
      type: "Sprint"
    },
    {
      id: 2,
      name: "Mobile App Project Status",
      date: "Sep 10, 2023",
      author: "Marcus Johnson",
      type: "Project"
    },
    {
      id: 3,
      name: "Q3 Team Performance Metrics",
      date: "Aug 30, 2023",
      author: "Sarah Parker",
      type: "Team"
    },
    {
      id: 4,
      name: "API Modernization Risk Assessment",
      date: "Aug 25, 2023",
      author: "David Kim",
      type: "Risk"
    }
  ];

  // Project status summary
  const projectStatus = [
    { id: 1, name: "Mobile App Redesign", status: "On Track", progress: 65, risk: "Low" },
    { id: 2, name: "E-commerce Platform", status: "At Risk", progress: 45, risk: "High" },
    { id: 3, name: "Analytics Dashboard", status: "On Track", progress: 90, risk: "Low" },
    { id: 4, name: "CRM Implementation", status: "Delayed", progress: 25, risk: "Medium" },
    { id: 5, name: "API Modernization", status: "On Track", progress: 55, risk: "Low" }
  ];

  return (
    <>
      <Helmet>
        <title>Reports | Axia Agile</title>
        <meta name="description" content="Axia Agile reporting and analytics dashboard" />
      </Helmet>

      <DashboardLayout role={role}>
        <div className="space-y-8 animate-fade-in">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-muted-foreground">
                View and generate reports across projects and teams
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:mt-0">
              <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                Filter
              </Button>
              <Button className="flex items-center gap-2">
                <Download size={16} />
                Export
              </Button>
            </div>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="animate-scale-in">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <div className="flex mt-1 items-center text-xs text-muted-foreground">
                      <div className="flex items-center gap-1 text-green-500">
                        <Check size={12} />
                        <span>5 on track</span>
                      </div>
                      <span className="mx-2">•</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <AlertCircle size={12} />
                        <span>2 at risk</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="animate-scale-in">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">108</div>
                    <div className="flex mt-1 items-center text-xs text-muted-foreground">
                      <div className="flex items-center gap-1 text-green-500">
                        <CheckCircle size={12} />
                        <span>48 completed</span>
                      </div>
                      <span className="mx-2">•</span>
                      <div className="flex items-center gap-1 text-blue-500">
                        <CircleDashed size={12} />
                        <span>60 in progress</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="animate-scale-in">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Sprint Velocity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">58</div>
                    <div className="flex mt-1 items-center text-xs text-green-500">
                      <ArrowRight size={12} className="rotate-45" />
                      <span>+6 from last sprint</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="animate-scale-in">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <div className="flex mt-1 items-center text-xs text-amber-500">
                      <Clock size={12} />
                      <span>5% over capacity</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Charts Row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Project Completion Chart */}
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle>Project Progress</CardTitle>
                    <CardDescription>Overall completion percentage by project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={projectCompletionData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis type="category" dataKey="name" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="completed" fill="#3b82f6" name="Completed %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Task Status Distribution */}
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle>Task Status Distribution</CardTitle>
                    <CardDescription>Current status of all tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChartComponent>
                          <Pie
                            data={taskStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {taskStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChartComponent>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Reports */}
              <Card className="animate-scale-in">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Reports</CardTitle>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      View All <ArrowRight size={14} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {recentReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-3">
                            {report.type === "Sprint" ? <Calendar size={20} /> : 
                             report.type === "Project" ? <BarChart3 size={20} /> :
                             report.type === "Team" ? <Users size={20} /> :
                             <AlertCircle size={20} />}
                          </div>
                          <div>
                            <div className="font-medium">{report.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {report.date} • By {report.author}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              {/* Project Status Summary */}
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle>Project Status Summary</CardTitle>
                  <CardDescription>Current status of all active projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projectStatus.map((project) => (
                      <div key={project.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">{project.name}</div>
                            <div className="flex items-center gap-3 text-sm">
                              <Badge 
                                className={
                                  project.status === "On Track" ? "bg-green-500" : 
                                  project.status === "At Risk" ? "bg-red-500" : "bg-amber-500"
                                }
                              >
                                {project.status}
                              </Badge>
                              <span className="text-muted-foreground">Risk: 
                                <span 
                                  className={
                                    project.risk === "Low" ? " text-green-500" : 
                                    project.risk === "High" ? " text-red-500" : " text-amber-500"
                                  }
                                > {project.risk}</span>
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Details</Button>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Velocity Trend Chart */}
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle>Sprint Velocity Trend</CardTitle>
                  <CardDescription>Velocity across recent sprints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChartComponent data={velocityTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sprint" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="velocity" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                          name="Story Points"
                        />
                      </LineChartComponent>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Teams Tab */}
            <TabsContent value="teams" className="space-y-6">
              {/* Team Performance Chart */}
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>Completed story points vs. goal by team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={teamPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                        <Bar dataKey="goal" fill="#94a3b8" name="Goal" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Generate Custom Reports */}
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle>Generate Custom Report</CardTitle>
                  <CardDescription>Create a tailored report for specific metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors duration-300 flex items-center justify-center">
                      <Button variant="ghost" className="h-full w-full py-8 flex flex-col items-center">
                        <BarChart3 size={24} className="mb-2" />
                        <span>Project Health</span>
                      </Button>
                    </Card>
                    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors duration-300 flex items-center justify-center">
                      <Button variant="ghost" className="h-full w-full py-8 flex flex-col items-center">
                        <LineChart size={24} className="mb-2" />
                        <span>Velocity Metrics</span>
                      </Button>
                    </Card>
                    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors duration-300 flex items-center justify-center">
                      <Button variant="ghost" className="h-full w-full py-8 flex flex-col items-center">
                        <PieChart size={24} className="mb-2" />
                        <span>Resource Allocation</span>
                      </Button>
                    </Card>
                    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors duration-300 flex items-center justify-center">
                      <Button variant="ghost" className="h-full w-full py-8 flex flex-col items-center">
                        <Users size={24} className="mb-2" />
                        <span>Team Performance</span>
                      </Button>
                    </Card>
                    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors duration-300 flex items-center justify-center">
                      <Button variant="ghost" className="h-full w-full py-8 flex flex-col items-center">
                        <Clock size={24} className="mb-2" />
                        <span>Time Tracking</span>
                      </Button>
                    </Card>
                    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors duration-300 flex items-center justify-center">
                      <Button variant="ghost" className="h-full w-full py-8 flex flex-col items-center">
                        <Plus size={24} className="mb-2" />
                        <span>Custom Report</span>
                      </Button>
                    </Card>
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

export default Reports;
