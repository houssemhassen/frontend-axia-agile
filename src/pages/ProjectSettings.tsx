
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { 
  Save, 
  Users, 
  Settings as SettingsIcon, 
  CalendarClock, 
  ArrowLeft,
  ListTodo,
  GitBranch,
  Kanban
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface ProjectSettings {
  name: string;
  description: string;
  methodology: "scrum" | "kanban" | "hybrid";
  team: string;
  teamMembers: TeamMember[];
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
  tags: string[];
}

const ProjectSettings = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<"projectManager" | "productOwner">("projectManager");
  const [isNew, setIsNew] = useState(!projectId);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<ProjectSettings>({
    name: "",
    description: "",
    methodology: "scrum",
    team: "",
    teamMembers: [],
    startDate: "",
    endDate: "",
    status: "Planning",
    priority: "Medium",
    tags: []
  });
  
  const [availableTeamMembers, setAvailableTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "Jane Cooper", role: "Developer", avatar: "JC" },
    { id: 2, name: "Michael Brown", role: "Designer", avatar: "MB" },
    { id: 3, name: "Alex Johnson", role: "QA Engineer", avatar: "AJ" },
    { id: 4, name: "Emily Williams", role: "Product Owner", avatar: "EW" },
    { id: 5, name: "Chris Lee", role: "Developer", avatar: "CL" },
    { id: 6, name: "Sarah Miller", role: "UI/UX Designer", avatar: "SM" },
    { id: 7, name: "David Garcia", role: "Backend Developer", avatar: "DG" },
    { id: 8, name: "Lisa Chen", role: "Frontend Developer", avatar: "LC" }
  ]);

  useEffect(() => {
    const stateRole = location.state?.role;
    const storedRole = localStorage.getItem("userRole");
    
    if (stateRole) {
      setRole(stateRole as any);
      localStorage.setItem("userRole", stateRole);
    } else if (storedRole) {
      setRole(storedRole as any);
    }
    
    if (projectId) {
      // Mock fetch project data
      // In a real app, this would be an API call
      setTimeout(() => {
        const projects = [
          {
            id: 1,
            name: "Mobile App Redesign",
            description: "Redesign of client mobile application with focus on improved UX",
            methodology: "scrum",
            team: "Product Design Team",
            teamMembers: [
              { id: 1, name: "Jane Cooper", role: "Developer", avatar: "JC" },
              { id: 2, name: "Michael Brown", role: "Designer", avatar: "MB" },
              { id: 5, name: "Chris Lee", role: "Developer", avatar: "CL" },
            ],
            startDate: "2023-09-01",
            endDate: "2023-10-15",
            status: "In Progress",
            priority: "High",
            tags: ["mobile", "redesign", "client"]
          },
          {
            id: 2,
            name: "E-commerce Platform",
            description: "Building a new e-commerce solution for retail client",
            methodology: "hybrid",
            team: "Web Dev Team",
            teamMembers: [
              { id: 7, name: "David Garcia", role: "Backend Developer", avatar: "DG" },
              { id: 8, name: "Lisa Chen", role: "Frontend Developer", avatar: "LC" },
              { id: 3, name: "Alex Johnson", role: "QA Engineer", avatar: "AJ" },
            ],
            startDate: "2023-10-01",
            endDate: "2023-11-30",
            status: "In Progress",
            priority: "Medium",
            tags: ["web", "e-commerce", "retail"]
          }
        ];

        const id = parseInt(projectId || "0");
        const foundProject = projects.find(p => p.id === id);
        
        if (foundProject) {
          setSettings(foundProject as ProjectSettings);
        } else if (projectId !== "new") {
          toast.error("Project not found", {
            description: "Could not find the requested project settings"
          });
          navigate("/projects", { state: { role } });
        }
        
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [projectId, location, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleMethodologyChange = (value: "scrum" | "kanban" | "hybrid") => {
    setSettings(prev => ({ ...prev, methodology: value }));
  };

  const handleAddTeamMember = (memberId: number) => {
    const memberToAdd = availableTeamMembers.find(m => m.id === memberId);
    if (!memberToAdd) return;
    
    if (!settings.teamMembers.some(m => m.id === memberId)) {
      setSettings(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, memberToAdd]
      }));
    }
  };

  const handleRemoveTeamMember = (memberId: number) => {
    setSettings(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(m => m.id !== memberId)
    }));
  };

  const handleSaveSettings = () => {
    if (!settings.name) {
      toast.error("Project name is required");
      return;
    }

    // In a real app, this would be an API call
    toast.success(isNew ? "Project created successfully" : "Project settings updated", {
      description: isNew ? "Your new project has been created" : "Your changes have been saved"
    });
    
    // Navigate back to projects or project details
    if (isNew) {
      navigate("/projects", { state: { role } });
    } else {
      navigate(`/projects/${projectId}`, { state: { role } });
    }
  };

  const handleGoBack = () => {
    if (projectId) {
      navigate(`/projects/${projectId}`, { state: { role } });
    } else {
      navigate("/projects", { state: { role } });
    }
  };

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
        <title>{isNew ? "Create Project" : "Project Settings"} | Axia Agile</title>
        <meta name="description" content={isNew ? "Start a new project" : "Manage project settings"} />
      </Helmet>

      <DashboardLayout role={role as any}>
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleGoBack}>
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-2xl font-bold">{isNew ? "Create New Project" : "Project Settings"}</h1>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="methodology">Agile Methodology</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Project Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={settings.name} 
                        onChange={handleInputChange} 
                        placeholder="Enter project name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="team">Team Name</Label>
                      <Input 
                        id="team" 
                        name="team" 
                        value={settings.team} 
                        onChange={handleInputChange} 
                        placeholder="Enter team name"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Project Description</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        value={settings.description} 
                        onChange={handleInputChange} 
                        placeholder="Describe your project"
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input 
                        id="startDate" 
                        name="startDate" 
                        type="date" 
                        value={settings.startDate} 
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Target End Date</Label>
                      <Input 
                        id="endDate" 
                        name="endDate" 
                        type="date" 
                        value={settings.endDate} 
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={settings.status} 
                        onValueChange={(value) => handleSelectChange("status", value)}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planning">Planning</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Review">Review</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select 
                        value={settings.priority} 
                        onValueChange={(value) => handleSelectChange("priority", value)}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Project Team Members</h3>
                      <ScrollArea className="h-72 border rounded-md p-4">
                        {settings.teamMembers.length > 0 ? (
                          <div className="space-y-2">
                            {settings.teamMembers.map((member) => (
                              <div 
                                key={member.id} 
                                className="flex items-center justify-between p-2 border rounded hover:bg-muted"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                                    {member.avatar}
                                  </div>
                                  <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.role}</p>
                                  </div>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => handleRemoveTeamMember(member.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <p className="text-muted-foreground">No team members added yet</p>
                            </div>
                          </div>
                        )}
                      </ScrollArea>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Available Team Members</h3>
                      <ScrollArea className="h-72 border rounded-md p-4">
                        <div className="space-y-2">
                          {availableTeamMembers
                            .filter(m => !settings.teamMembers.some(tm => tm.id === m.id))
                            .map((member) => (
                              <div 
                                key={member.id} 
                                className="flex items-center justify-between p-2 border rounded hover:bg-muted"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-muted text-foreground flex items-center justify-center text-sm font-medium">
                                    {member.avatar}
                                  </div>
                                  <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.role}</p>
                                  </div>
                                </div>
                                <Button 
                                  size="sm"
                                  onClick={() => handleAddTeamMember(member.id)}
                                >
                                  Add
                                </Button>
                              </div>
                            ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="methodology">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Agile Methodology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base">Select Methodology</Label>
                      <RadioGroup 
                        value={settings.methodology} 
                        onValueChange={handleMethodologyChange as any}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
                      >
                        <div className="rounded-lg border p-4 hover:border-primary">
                          <RadioGroupItem value="scrum" id="scrum" className="mb-2" />
                          <Label htmlFor="scrum" className="font-semibold block mb-1">Scrum</Label>
                          <div className="flex items-center mb-3">
                            <CalendarClock className="h-5 w-5 mr-2" />
                            <span className="text-sm text-muted-foreground">Sprint-based approach</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Iterative development with defined sprint cycles, backlog refinement, and regular ceremonies.
                          </p>
                        </div>
                        
                        <div className="rounded-lg border p-4 hover:border-primary">
                          <RadioGroupItem value="kanban" id="kanban" className="mb-2" />
                          <Label htmlFor="kanban" className="font-semibold block mb-1">Kanban</Label>
                          <div className="flex items-center mb-3">
                            <Kanban className="h-5 w-5 mr-2" />
                            <span className="text-sm text-muted-foreground">Flow-based approach</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Continuous delivery with visual workflow, WIP limits, and pull-based task system.
                          </p>
                        </div>
                        
                        <div className="rounded-lg border p-4 hover:border-primary">
                          <RadioGroupItem value="hybrid" id="hybrid" className="mb-2" />
                          <Label htmlFor="hybrid" className="font-semibold block mb-1">Hybrid</Label>
                          <div className="flex items-center mb-3">
                            <ListTodo className="h-5 w-5 mr-2" />
                            <span className="text-sm text-muted-foreground">Combined approach</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Best of both worlds: sprints with Kanban visualization and flexible workflow management.
                          </p>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Methodology Settings</h3>
                      {settings.methodology === "scrum" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="sprintLength">Sprint Length (weeks)</Label>
                            <Select defaultValue="2">
                              <SelectTrigger id="sprintLength">
                                <SelectValue placeholder="Select length" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 Week</SelectItem>
                                <SelectItem value="2">2 Weeks</SelectItem>
                                <SelectItem value="3">3 Weeks</SelectItem>
                                <SelectItem value="4">4 Weeks</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="velocityMetric">Velocity Metric</Label>
                            <Select defaultValue="story-points">
                              <SelectTrigger id="velocityMetric">
                                <SelectValue placeholder="Select metric" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="story-points">Story Points</SelectItem>
                                <SelectItem value="task-count">Task Count</SelectItem>
                                <SelectItem value="hours">Hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                      
                      {settings.methodology === "kanban" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="wipLimit">WIP Limits</Label>
                            <Select defaultValue="custom">
                              <SelectTrigger id="wipLimit">
                                <SelectValue placeholder="Select WIP limit type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">No Limits</SelectItem>
                                <SelectItem value="column">Per Column</SelectItem>
                                <SelectItem value="person">Per Person</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="flowMetric">Flow Metric</Label>
                            <Select defaultValue="cycle-time">
                              <SelectTrigger id="flowMetric">
                                <SelectValue placeholder="Select metric" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cycle-time">Cycle Time</SelectItem>
                                <SelectItem value="lead-time">Lead Time</SelectItem>
                                <SelectItem value="throughput">Throughput</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                      
                      {settings.methodology === "hybrid" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="sprintLength">Sprint Length (weeks)</Label>
                            <Select defaultValue="2">
                              <SelectTrigger id="sprintLength">
                                <SelectValue placeholder="Select length" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 Week</SelectItem>
                                <SelectItem value="2">2 Weeks</SelectItem>
                                <SelectItem value="3">3 Weeks</SelectItem>
                                <SelectItem value="4">4 Weeks</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="wipLimit">WIP Limits</Label>
                            <Select defaultValue="column">
                              <SelectTrigger id="wipLimit">
                                <SelectValue placeholder="Select WIP limit type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">No Limits</SelectItem>
                                <SelectItem value="column">Per Column</SelectItem>
                                <SelectItem value="person">Per Person</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Integration settings will be available soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-end gap-4">
            <Button variant="outline" onClick={handleGoBack}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettings} className="flex items-center gap-2">
              <Save size={16} />
              {isNew ? "Create Project" : "Save Changes"}
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProjectSettings;
