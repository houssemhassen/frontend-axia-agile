import { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  CircleDashed,
  X,
  BarChart3,
  Users
} from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NewSprintForm } from "@/components/sprints/NewSprintForm";
import { SprintDetailsDialog } from "@/components/sprints/SprintDetailsDialog";

const Sprints = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [role] = useState<"scrumMaster">("scrumMaster");
  const [isNewSprintFormOpen, setIsNewSprintFormOpen] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState<any>(null);
  const [isSprintDetailsOpen, setIsSprintDetailsOpen] = useState(false);

  const activeSprints = [
    {
      id: 1,
      name: "Sprint 24",
      project: "Mobile App Redesign",
      startDate: "Sep 15, 2023",
      endDate: "Sep 29, 2023",
      progress: 65,
      status: "Active",
      tasksCompleted: 18,
      totalTasks: 28,
      teamMembers: 8,
    },
    {
      id: 2,
      name: "Sprint 12",
      project: "E-commerce Platform",
      startDate: "Sep 10, 2023",
      endDate: "Sep 24, 2023",
      progress: 75,
      status: "Active",
      tasksCompleted: 24,
      totalTasks: 32,
      teamMembers: 12,
    },
    {
      id: 3,
      name: "Sprint 6",
      project: "Analytics Dashboard",
      startDate: "Sep 20, 2023",
      endDate: "Oct 4, 2023",
      progress: 30,
      status: "Active",
      tasksCompleted: 12,
      totalTasks: 40,
      teamMembers: 5,
    }
  ];

  const upcomingSprints = [
    {
      id: 4,
      name: "Sprint 25",
      project: "Mobile App Redesign",
      startDate: "Sep 30, 2023",
      endDate: "Oct 14, 2023",
      status: "Planning",
      teamMembers: 8,
    },
    {
      id: 5,
      name: "Sprint 13",
      project: "E-commerce Platform",
      startDate: "Sep 25, 2023",
      endDate: "Oct 9, 2023",
      status: "Planning",
      teamMembers: 12,
    }
  ];

  const pastSprints = [
    {
      id: 6,
      name: "Sprint 23",
      project: "Mobile App Redesign",
      startDate: "Sep 1, 2023",
      endDate: "Sep 14, 2023",
      progress: 100,
      status: "Completed",
      tasksCompleted: 30,
      totalTasks: 30,
      teamMembers: 8,
      velocity: 52
    },
    {
      id: 7,
      name: "Sprint 11",
      project: "E-commerce Platform",
      startDate: "Aug 27, 2023",
      endDate: "Sep 9, 2023",
      progress: 95,
      status: "Completed",
      tasksCompleted: 38,
      totalTasks: 40,
      teamMembers: 12,
      velocity: 76
    }
  ];

  const handleViewDetails = (sprint: any) => {
    setSelectedSprint(sprint);
    setIsSprintDetailsOpen(true);
  };

  const handleCreateNewSprint = () => {
    setIsNewSprintFormOpen(true);
  };

  const handleFilter = () => {
    toast.info("Filtering sprints", {
      description: "This would open a filter panel in a real application"
    });
  };

  const handlePlanSprint = (sprintId: number) => {
    toast.info("Opening sprint planning", {
      description: `Planning started for Sprint #${sprintId}`
    });
  };

  const handleAddSprint = () => {
    setIsNewSprintFormOpen(true);
  };

  const handleSprintBoard = () => {
    toast.info("Opening sprint board", {
      description: "Navigating to the sprint board"
    });
  };

  const handleViewReport = (sprintId: number) => {
    toast.info("Opening sprint report", {
      description: `Viewing report for Sprint #${sprintId}`
    });
  };

  return (
    <>
      <Helmet>
        <title>Sprints | Axia Agile</title>
        <meta name="description" content="Axia Agile sprint management dashboard" />
      </Helmet>

      <DashboardLayout role={role}>
        <div className="space-y-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sprint Management</h1>
              <p className="text-muted-foreground">
                Plan, track, and analyze sprint cycles
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:mt-0">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleFilter}
              >
                <Filter size={16} />
                Filter
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={handleCreateNewSprint}
              >
                <Plus size={16} />
                New Sprint
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search sprints..."
                className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Active Sprints</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeSprints.map((sprint) => (
                <Card key={sprint.id} className="animate-scale-in overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{sprint.name}</CardTitle>
                        <CardDescription className="mt-1">{sprint.project}</CardDescription>
                      </div>
                      <Badge className="bg-green-500">{sprint.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Start Date</p>
                        <p>{sprint.startDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-muted-foreground">End Date</p>
                        <p>{sprint.endDate}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Sprint Progress</p>
                        <p className="text-sm">{sprint.progress}%</p>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${sprint.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>{sprint.tasksCompleted} Completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleDashed size={16} className="text-amber-500" />
                        <span>{sprint.totalTasks - sprint.tasksCompleted} Remaining</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleViewDetails(sprint)}
                      >
                        <span>View Details</span>
                        <ArrowRight size={14} />
                      </Button>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users size={16} className="mr-1" />
                        <span>{sprint.teamMembers}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Sprints</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingSprints.map((sprint) => (
                <Card key={sprint.id} className="animate-scale-in overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{sprint.name}</CardTitle>
                        <CardDescription className="mt-1">{sprint.project}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-blue-500 border-blue-500">
                        {sprint.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Start Date</p>
                        <p>{sprint.startDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-muted-foreground">End Date</p>
                        <p>{sprint.endDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center py-4">
                      <Calendar size={32} className="text-muted-foreground" />
                      <p className="ml-2 text-muted-foreground">Sprint planning in progress</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handlePlanSprint(sprint.id)}
                      >
                        <span>Plan Sprint</span>
                        <ArrowRight size={14} />
                      </Button>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users size={16} className="mr-1" />
                        <span>{sprint.teamMembers}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="border-dashed border-2 hover:border-primary/50 transition-colors duration-300 flex items-center justify-center animate-scale-in">
                <Button 
                  variant="ghost" 
                  className="h-full w-full py-12 flex flex-col items-center"
                  onClick={handleAddSprint}
                >
                  <Plus size={24} className="mb-2" />
                  <span>Add New Sprint</span>
                </Button>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Past Sprints</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastSprints.map((sprint) => (
                <Card key={sprint.id} className="animate-scale-in overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{sprint.name}</CardTitle>
                        <CardDescription className="mt-1">{sprint.project}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-gray-500 border-gray-500">
                        {sprint.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Start Date</p>
                        <p>{sprint.startDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-muted-foreground">End Date</p>
                        <p>{sprint.endDate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Completion</p>
                        <p className="text-green-500">{sprint.progress}%</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Velocity</p>
                        <p>{sprint.velocity} points</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>{sprint.tasksCompleted} Completed</span>
                      </div>
                      <div 
                        className="flex items-center gap-2 cursor-pointer text-blue-500"
                        onClick={() => handleViewReport(sprint.id)}
                      >
                        <BarChart3 size={16} />
                        <span>View Metrics</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleViewReport(sprint.id)}
                      >
                        <span>View Report</span>
                        <ArrowRight size={14} />
                      </Button>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users size={16} className="mr-1" />
                        <span>{sprint.teamMembers}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <NewSprintForm 
          isOpen={isNewSprintFormOpen} 
          onClose={() => setIsNewSprintFormOpen(false)} 
        />
        
        <SprintDetailsDialog 
          isOpen={isSprintDetailsOpen}
          onClose={() => setIsSprintDetailsOpen(false)}
          sprint={selectedSprint}
        />
      </DashboardLayout>
    </>
  );
};

export default Sprints;
