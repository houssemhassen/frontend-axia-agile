
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  BarChart3, 
  LineChart, 
  Download, 
  Clock, 
  Calendar, 
  Filter,
  ChevronDown, 
  Layers, 
  TrendingUp, 
  PieChart, 
  Share2,
  FileCog,
  RefreshCw,
  Archive
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

interface SprintData {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  totalPoints: number;
  completedPoints: number;
  efficiency: number;
  status: 'completed' | 'active' | 'planned';
  team: string;
}

interface BurndownData {
  day: string;
  remaining: number;
  ideal: number;
  completed: number;
}

interface VelocityData {
  sprint: string;
  planned: number;
  completed: number;
}

interface TeamData {
  name: string;
  completed: number;
  inProgress: number;
  planned: number;
}

interface IssueData {
  category: string;
  value: number;
}

const BurndownReports = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<"projectManager" | "scrumMaster" | "productOwner">("projectManager");
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [selectedSprint, setSelectedSprint] = useState<string>("current");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("30");
  const [showFilters, setShowFilters] = useState(false);

  // Sample data for charts
  const [sprints, setSprints] = useState<SprintData[]>([]);
  const [burndownData, setBurndownData] = useState<BurndownData[]>([]);
  const [velocityData, setVelocityData] = useState<VelocityData[]>([]);
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [issueData, setIssueData] = useState<IssueData[]>([]);

  useEffect(() => {
    const stateRole = location.state?.role;
    const storedRole = localStorage.getItem("userRole");
    
    if (stateRole) {
      setRole(stateRole as any);
      localStorage.setItem("userRole", stateRole);
    } else if (storedRole) {
      setRole(storedRole as any);
    }
    
    // Mock data - would be fetched from API in a real app
    const mockSprints: SprintData[] = [
      {
        id: 1,
        name: "Sprint 1",
        startDate: "2023-09-01",
        endDate: "2023-09-14",
        totalPoints: 48,
        completedPoints: 45,
        efficiency: 94,
        status: 'completed',
        team: 'Frontend Team'
      },
      {
        id: 2,
        name: "Sprint 2",
        startDate: "2023-09-15",
        endDate: "2023-09-28",
        totalPoints: 52,
        completedPoints: 47,
        efficiency: 90,
        status: 'completed',
        team: 'Backend Team'
      },
      {
        id: 3,
        name: "Sprint 3",
        startDate: "2023-09-29",
        endDate: "2023-10-12",
        totalPoints: 56,
        completedPoints: 42,
        efficiency: 75,
        status: 'completed',
        team: 'Full Stack Team'
      },
      {
        id: 4,
        name: "Sprint 4",
        startDate: "2023-10-13",
        endDate: "2023-10-26",
        totalPoints: 58,
        completedPoints: 49,
        efficiency: 85,
        status: 'completed',
        team: 'Product Team'
      },
      {
        id: 5,
        name: "Sprint 5",
        startDate: "2023-10-27",
        endDate: "2023-11-09",
        totalPoints: 60,
        completedPoints: 36,
        efficiency: 60,
        status: 'active',
        team: 'Frontend Team'
      },
      {
        id: 6,
        name: "Sprint 6",
        startDate: "2023-11-10",
        endDate: "2023-11-23",
        totalPoints: 54,
        completedPoints: 0,
        efficiency: 0,
        status: 'planned',
        team: 'Backend Team'
      }
    ];
    
    const mockBurndownData: BurndownData[] = [
      { day: "Day 1", remaining: 60, ideal: 60, completed: 0 },
      { day: "Day 2", remaining: 57, ideal: 55.4, completed: 3 },
      { day: "Day 3", remaining: 52, ideal: 50.8, completed: 8 },
      { day: "Day 4", remaining: 52, ideal: 46.2, completed: 8 },
      { day: "Day 5", remaining: 46, ideal: 41.6, completed: 14 },
      { day: "Day 6", remaining: 40, ideal: 37, completed: 20 },
      { day: "Day 7", remaining: 38, ideal: 32.4, completed: 22 },
      { day: "Day 8", remaining: 34, ideal: 27.8, completed: 26 },
      { day: "Day 9", remaining: 30, ideal: 23.2, completed: 30 },
      { day: "Day 10", remaining: 24, ideal: 18.6, completed: 36 },
      { day: "Today", remaining: 24, ideal: 14, completed: 36 },
      { day: "Day 12", remaining: null, ideal: 9.4, completed: null },
      { day: "Day 13", remaining: null, ideal: 4.8, completed: null },
      { day: "Day 14", remaining: null, ideal: 0, completed: null }
    ];
    
    const mockVelocityData: VelocityData[] = [
      { sprint: "Sprint 1", planned: 48, completed: 45 },
      { sprint: "Sprint 2", planned: 52, completed: 47 },
      { sprint: "Sprint 3", planned: 56, completed: 42 },
      { sprint: "Sprint 4", planned: 58, completed: 49 },
      { sprint: "Sprint 5", planned: 60, completed: 36 },
    ];
    
    const mockTeamData: TeamData[] = [
      { name: "Frontend Team", completed: 87, inProgress: 24, planned: 12 },
      { name: "Backend Team", completed: 63, inProgress: 18, planned: 22 },
      { name: "QA Team", completed: 42, inProgress: 12, planned: 8 },
      { name: "Design Team", completed: 38, inProgress: 10, planned: 6 }
    ];
    
    const mockIssueData: IssueData[] = [
      { category: "Features", value: 63 },
      { category: "Bugs", value: 25 },
      { category: "Tasks", value: 12 }
    ];
    
    setSprints(mockSprints);
    setBurndownData(mockBurndownData);
    setVelocityData(mockVelocityData);
    setTeamData(mockTeamData);
    setIssueData(mockIssueData);
    setLoading(false);
  }, [location]);

  const handleGenerateReport = () => {
    toast.success("Report generated", {
      description: "Your report is ready to download"
    });
  };

  const handleDownloadReport = (format: string) => {
    toast.success(`Downloading ${format} report`, {
      description: "Report will be downloaded shortly"
    });
  };

  const handleShareReport = () => {
    toast.success("Share link generated", {
      description: "Report link copied to clipboard"
    });
  };

  const handleRefreshData = () => {
    setLoading(true);
    toast.info("Refreshing data", {
      description: "Fetching latest metrics and reports"
    });
    
    // Simulate data refresh
    setTimeout(() => {
      setLoading(false);
      toast.success("Data refreshed", {
        description: "Reports have been updated with latest data"
      });
    }, 1000);
  };

  // Calculate some stats for the dashboard
  const activeSprint = sprints.find(s => s.status === 'active');
  const averageVelocity = velocityData.reduce((acc, sprint) => acc + sprint.completed, 0) / velocityData.length;
  const totalCompletedPoints = sprints.reduce((acc, sprint) => acc + sprint.completedPoints, 0);
  const averageEfficiency = sprints
    .filter(s => s.status === 'completed')
    .reduce((acc, sprint) => acc + sprint.efficiency, 0) / sprints.filter(s => s.status === 'completed').length;

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  if (loading) {
    return (
      <DashboardLayout role={role as any}>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Burndown Charts & Reports | Axia Agile</title>
        <meta name="description" content="View sprint progress, generate reports, and analyze velocity trends" />
      </Helmet>

      <DashboardLayout role={role as any}>
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Burndown Charts & Reports</h1>
              <p className="text-muted-foreground">
                View sprint progress, generate reports, and analyze velocity trends
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:mt-0">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                Filters
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <FileCog size={16} />
                    Generate Report
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Report Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleGenerateReport}>
                    Sprint Burndown Report
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleGenerateReport}>
                    Velocity Trend Report
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleGenerateReport}>
                    Team Performance Report
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Download Format</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleDownloadReport("PDF")}>
                    <Download className="h-4 w-4 mr-2" />
                    PDF Format
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownloadReport("Excel")}>
                    <Download className="h-4 w-4 mr-2" />
                    Excel Format
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleShareReport}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" onClick={handleRefreshData}>
                <RefreshCw size={18} />
              </Button>
            </div>
          </div>

          {showFilters && (
            <Card className="animate-scale-in">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project</label>
                    <Select
                      value={selectedProject}
                      onValueChange={setSelectedProject}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        <SelectItem value="mobile-app">Mobile App Redesign</SelectItem>
                        <SelectItem value="e-commerce">E-commerce Platform</SelectItem>
                        <SelectItem value="analytics">Analytics Dashboard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sprint</label>
                    <Select
                      value={selectedSprint}
                      onValueChange={setSelectedSprint}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Sprint" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Sprint</SelectItem>
                        <SelectItem value="all">All Sprints</SelectItem>
                        <SelectItem value="sprint-5">Sprint 5</SelectItem>
                        <SelectItem value="sprint-4">Sprint 4</SelectItem>
                        <SelectItem value="sprint-3">Sprint 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <Select
                      value={selectedDateRange}
                      onValueChange={setSelectedDateRange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Date Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">Last 30 Days</SelectItem>
                        <SelectItem value="60">Last 60 Days</SelectItem>
                        <SelectItem value="90">Last 90 Days</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Velocity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <div className="text-2xl font-bold">
                    {averageVelocity.toFixed(1)}
                  </div>
                  <div className="ml-2 text-sm text-muted-foreground">points/sprint</div>
                </div>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">↑ 4%</span>
                  <span className="ml-1">vs previous 3 sprints</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Sprint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeSprint?.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {activeSprint ? (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(activeSprint.startDate).toLocaleDateString()} - {new Date(activeSprint.endDate).toLocaleDateString()}
                    </div>
                  ) : (
                    <span>No active sprint</span>
                  )}
                </div>
                {activeSprint && (
                  <div className="mt-2">
                    <Progress value={activeSprint.completedPoints / activeSprint.totalPoints * 100} className="h-1" />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>{activeSprint.completedPoints} of {activeSprint.totalPoints} points</span>
                      <span>{Math.round(activeSprint.completedPoints / activeSprint.totalPoints * 100)}% complete</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Points Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCompletedPoints}</div>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Badge className="mr-1 bg-green-500">
                    {sprints.filter(s => s.status === 'completed').length} sprints
                  </Badge>
                  <span>completed</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageEfficiency.toFixed(1)}%</div>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>completion rate</span>
                </div>
                <Progress value={averageEfficiency} className="mt-2 h-1" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="burndown" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="burndown" className="flex items-center gap-2">
                <LineChart size={16} />
                <span>Burndown Chart</span>
              </TabsTrigger>
              <TabsTrigger value="velocity" className="flex items-center gap-2">
                <BarChart3 size={16} />
                <span>Velocity Trend</span>
              </TabsTrigger>
              <TabsTrigger value="teams" className="flex items-center gap-2">
                <Layers size={16} />
                <span>Team Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="issues" className="flex items-center gap-2">
                <PieChart size={16} />
                <span>Issue Distribution</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="burndown">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <LineChart size={20} />
                      Sprint Burndown Chart
                    </CardTitle>
                    <Select defaultValue="sprint-5">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select sprint" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sprint-5">Sprint 5 (Current)</SelectItem>
                        <SelectItem value="sprint-4">Sprint 4</SelectItem>
                        <SelectItem value="sprint-3">Sprint 3</SelectItem>
                        <SelectItem value="sprint-2">Sprint 2</SelectItem>
                        <SelectItem value="sprint-1">Sprint 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Story points remaining over the sprint duration.
                  </p>
                </CardHeader>
                <CardContent className="h-[400px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={burndownData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="remaining"
                        name="Remaining Points"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        connectNulls
                      />
                      <Line
                        type="monotone"
                        dataKey="ideal"
                        name="Ideal Burndown"
                        stroke="#82ca9d"
                        strokeDasharray="5 5"
                        connectNulls
                      />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        name="Completed Points"
                        stroke="#ffc658"
                        connectNulls
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-between">
                  <div className="flex items-center text-sm">
                    <Badge variant="outline" className="mr-2">Sprint 5</Badge>
                    <span className="text-muted-foreground">
                      60% of points completed ({activeSprint?.completedPoints} of {activeSprint?.totalPoints})
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadReport("chart")}>
                    <Download className="mr-1 h-4 w-4" />
                    Export Chart
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="velocity">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 size={20} />
                      Sprint Velocity Trend
                    </CardTitle>
                    <Select defaultValue="last-5">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-5">Last 5 Sprints</SelectItem>
                        <SelectItem value="last-10">Last 10 Sprints</SelectItem>
                        <SelectItem value="all">All Sprints</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sprint velocity showing planned vs actual points completed over time.
                  </p>
                </CardHeader>
                <CardContent className="h-[400px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={velocityData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sprint" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="planned" name="Planned Points" fill="#8884d8" />
                      <Bar dataKey="completed" name="Completed Points" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-between">
                  <div className="flex items-center text-sm">
                    <Badge variant="outline" className="mr-2">Average</Badge>
                    <span className="text-muted-foreground">
                      {averageVelocity.toFixed(1)} points/sprint
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadReport("chart")}>
                    <Download className="mr-1 h-4 w-4" />
                    Export Chart
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="teams">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Layers size={20} />
                      Team Performance Analysis
                    </CardTitle>
                    <Select defaultValue="last-30">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-30">Last 30 Days</SelectItem>
                        <SelectItem value="last-90">Last 90 Days</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Points completed, in progress, and planned by each team.
                  </p>
                </CardHeader>
                <CardContent className="h-[400px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={teamData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" name="Completed" stackId="a" fill="#82ca9d" />
                      <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#8884d8" />
                      <Bar dataKey="planned" name="Planned" stackId="a" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-between">
                  <div className="flex items-center text-sm">
                    <Badge variant="outline" className="mr-2">Total</Badge>
                    <span className="text-muted-foreground">
                      {teamData.reduce((acc, team) => acc + team.completed, 0)} points completed
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadReport("chart")}>
                    <Download className="mr-1 h-4 w-4" />
                    Export Chart
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="issues">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart size={20} />
                      Issue Type Distribution
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Breakdown of issue types in the current project.
                    </p>
                  </CardHeader>
                  <CardContent className="h-[300px] pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={issueData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {issueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <div className="w-full flex justify-between">
                      {issueData.map((entry, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-1.5"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="text-xs">{entry.category}: {entry.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp size={20} />
                      Sprint Completion Trend
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Sprint efficiency over time.
                    </p>
                  </CardHeader>
                  <CardContent className="h-[300px] pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={sprints.map(sprint => ({
                          name: sprint.name,
                          efficiency: sprint.efficiency
                        }))}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="efficiency" 
                          name="Efficiency (%)"
                          stroke="#8884d8" 
                          fill="#8884d8" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <div className="w-full flex justify-between">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">Avg</Badge>
                        <span className="text-sm">{averageEfficiency.toFixed(1)}% completion rate</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last 5 sprints
                      </div>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Archive size={20} />
                      Sprint History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Sprint</th>
                            <th className="text-left py-3 px-4">Start Date</th>
                            <th className="text-left py-3 px-4">End Date</th>
                            <th className="text-left py-3 px-4">Team</th>
                            <th className="text-left py-3 px-4">Story Points</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Efficiency</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sprints.map(sprint => (
                            <tr key={sprint.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">{sprint.name}</td>
                              <td className="py-3 px-4">
                                {new Date(sprint.startDate).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                {new Date(sprint.endDate).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">{sprint.team}</td>
                              <td className="py-3 px-4">
                                {sprint.completedPoints} / {sprint.totalPoints}
                              </td>
                              <td className="py-3 px-4">
                                <Badge
                                  className={
                                    sprint.status === "active" ? "bg-blue-500" :
                                    sprint.status === "completed" ? "bg-green-500" : 
                                    "bg-slate-500"
                                  }
                                >
                                  {sprint.status.charAt(0).toUpperCase() + sprint.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <span>{sprint.efficiency}%</span>
                                  <Progress value={sprint.efficiency} className="h-1.5 w-16" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <div className="text-sm text-muted-foreground">
                      Showing {sprints.length} of {sprints.length} sprints
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default BurndownReports;
