import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  CalendarClock, 
  Plus, 
  ListTodo, 
  Layers, 
  CheckSquare, 
  ArrowUp, 
  ArrowDown,
  Clock,
  Users,
  X,
  Edit,
  Trash2,
  Sparkles,
  Clipboard,
  ArrowUpDown,
  Search
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BacklogItem {
  id: number;
  title: string;
  description: string;
  type: "feature" | "bug" | "task" | "epic";
  status: "todo" | "in-progress" | "review" | "done";
  priority: "high" | "medium" | "low";
  estimate: number;
  assignee?: string;
  tags: string[];
}

interface Sprint {
  id: number;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: "planning" | "active" | "completed";
  progress: number;
  items: BacklogItem[];
  team: string;
}

const SprintPlanning = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<"projectManager" | "scrumMaster" | "productOwner">("projectManager");
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [backlog, setBacklog] = useState<BacklogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewSprintDialog, setShowNewSprintDialog] = useState(false);
  const [showNewBacklogItemDialog, setShowNewBacklogItemDialog] = useState(false);
  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);
  const [editingBacklogItem, setEditingBacklogItem] = useState<BacklogItem | null>(null);
  const [selectedSprint, setSelectedSprint] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({
    type: "all",
    status: "all",
    priority: "all"
  });

  const [newSprint, setNewSprint] = useState<Partial<Sprint>>({
    name: "",
    goal: "",
    startDate: "",
    endDate: "",
    status: "planning",
    progress: 0,
    items: []
  });
  
  const [newBacklogItem, setNewBacklogItem] = useState<Partial<BacklogItem>>({
    title: "",
    description: "",
    type: "task",
    status: "todo",
    priority: "medium",
    estimate: 1,
    tags: []
  });

  useEffect(() => {
    const stateRole = location.state?.role;
    const storedRole = localStorage.getItem("userRole");
    
    if (stateRole) {
      setRole(stateRole as any);
      localStorage.setItem("userRole", stateRole);
    } else if (storedRole) {
      setRole(storedRole as any);
    }
    
    const mockSprints: Sprint[] = [
      {
        id: 1,
        name: "Sprint 1",
        goal: "Complete user authentication flow",
        startDate: "2023-10-01",
        endDate: "2023-10-14",
        status: "completed",
        progress: 100,
        team: "Frontend Team",
        items: [
          {
            id: 101,
            title: "Design login screen",
            description: "Create UI for login page including social logins",
            type: "task",
            status: "done",
            priority: "high",
            estimate: 3,
            assignee: "Emma T.",
            tags: ["design", "ui"]
          },
          {
            id: 102,
            title: "Implement authentication logic",
            description: "Create authentication services and security",
            type: "feature",
            status: "done",
            priority: "high",
            estimate: 5,
            assignee: "Dave C.",
            tags: ["security", "api"]
          }
        ]
      },
      {
        id: 2,
        name: "Sprint 2",
        goal: "Complete product catalog browsing",
        startDate: "2023-10-15",
        endDate: "2023-10-28",
        status: "active",
        progress: 60,
        team: "Product Team",
        items: [
          {
            id: 201,
            title: "Design product listing page",
            description: "Create responsive grid layout for products",
            type: "task",
            status: "done",
            priority: "medium",
            estimate: 3,
            assignee: "Emma T.",
            tags: ["design", "ui"]
          },
          {
            id: 202,
            title: "Implement filtering logic",
            description: "Create product filtering and sorting",
            type: "feature",
            status: "in-progress",
            priority: "high",
            estimate: 8,
            assignee: "Dave C.",
            tags: ["javascript", "api"]
          },
          {
            id: 203,
            title: "Fix product image ratio bug",
            description: "Images are stretched on certain screen sizes",
            type: "bug",
            status: "todo",
            priority: "medium",
            estimate: 2,
            assignee: "Lisa C.",
            tags: ["ui", "responsive"]
          }
        ]
      },
      {
        id: 3,
        name: "Sprint 3",
        goal: "Complete checkout flow",
        startDate: "2023-10-29",
        endDate: "2023-11-11",
        status: "planning",
        progress: 0,
        team: "Checkout Team",
        items: []
      }
    ];
    
    const mockBacklog: BacklogItem[] = [
      {
        id: 301,
        title: "Implement payment gateway",
        description: "Integrate with Stripe for payment processing",
        type: "feature",
        status: "todo",
        priority: "high",
        estimate: 13,
        tags: ["payment", "api", "security"]
      },
      {
        id: 302,
        title: "Design checkout flow",
        description: "Create wireframes for checkout process",
        type: "task",
        status: "todo",
        priority: "high",
        estimate: 5,
        tags: ["design", "ui"]
      },
      {
        id: 303,
        title: "Implement cart functionality",
        description: "Create shopping cart with add/remove products",
        type: "feature",
        status: "todo",
        priority: "medium",
        estimate: 8,
        tags: ["frontend", "state-management"]
      },
      {
        id: 304,
        title: "Customer profile pages",
        description: "Create user profile management screens",
        type: "feature",
        status: "todo",
        priority: "low",
        estimate: 8,
        tags: ["profile", "ui"]
      },
      {
        id: 305,
        title: "Order history functionality",
        description: "Create order history and details pages",
        type: "feature",
        status: "todo",
        priority: "medium",
        estimate: 5,
        tags: ["orders", "history"]
      }
    ];
    
    setSprints(mockSprints);
    setBacklog(mockBacklog);
    setLoading(false);
    setSelectedSprint(2);
  }, [location]);

  const handleCreateSprint = () => {
    setEditingSprint(null);
    setNewSprint({
      name: "",
      goal: "",
      startDate: "",
      endDate: "",
      status: "planning",
      progress: 0,
      items: []
    });
    setShowNewSprintDialog(true);
  };

  const handleEditSprint = (sprint: Sprint) => {
    setEditingSprint(sprint);
    setNewSprint({
      name: sprint.name,
      goal: sprint.goal,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      status: sprint.status,
      team: sprint.team
    });
    setShowNewSprintDialog(true);
  };

  const handleCreateBacklogItem = () => {
    setEditingBacklogItem(null);
    setNewBacklogItem({
      title: "",
      description: "",
      type: "task",
      status: "todo",
      priority: "medium",
      estimate: 1,
      tags: []
    });
    setShowNewBacklogItemDialog(true);
  };

  const handleEditBacklogItem = (item: BacklogItem) => {
    setEditingBacklogItem(item);
    setNewBacklogItem({
      title: item.title,
      description: item.description,
      type: item.type,
      status: item.status,
      priority: item.priority,
      estimate: item.estimate,
      assignee: item.assignee,
      tags: item.tags
    });
    setShowNewBacklogItemDialog(true);
  };

  const handleSprintFormChange = (field: string, value: string) => {
    setNewSprint(prev => ({ ...prev, [field]: value }));
  };

  const handleBacklogItemFormChange = (field: string, value: any) => {
    setNewBacklogItem(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSprint = () => {
    if (!newSprint.name || !newSprint.goal || !newSprint.startDate || !newSprint.endDate) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (editingSprint) {
      setSprints(prev => prev.map(s => 
        s.id === editingSprint.id 
          ? { ...s, ...newSprint as Sprint }
          : s
      ));
      toast.success("Sprint updated successfully");
    } else {
      const newSprintWithId = {
        ...newSprint,
        id: sprints.length > 0 ? Math.max(...sprints.map(s => s.id)) + 1 : 1,
        items: [],
        progress: 0
      } as Sprint;
      
      setSprints(prev => [...prev, newSprintWithId]);
      toast.success("Sprint created successfully");
    }
    
    setShowNewSprintDialog(false);
  };

  const handleSaveBacklogItem = () => {
    if (!newBacklogItem.title) {
      toast.error("Please provide a title");
      return;
    }
    
    if (editingBacklogItem) {
      if (selectedSprint) {
        setSprints(prev => prev.map(s => 
          s.id === selectedSprint 
            ? { 
                ...s, 
                items: s.items.map(i => 
                  i.id === editingBacklogItem.id 
                    ? { ...i, ...newBacklogItem as BacklogItem }
                    : i
                )
              }
            : s
        ));
      } else {
        setBacklog(prev => prev.map(i => 
          i.id === editingBacklogItem.id 
            ? { ...i, ...newBacklogItem as BacklogItem }
            : i
        ));
      }
      toast.success("Item updated successfully");
    } else {
      const newItemWithId = {
        ...newBacklogItem,
        id: Math.floor(Math.random() * 1000) + 400,
        tags: newBacklogItem.tags || []
      } as BacklogItem;
      
      if (selectedSprint) {
        setSprints(prev => prev.map(s => 
          s.id === selectedSprint 
            ? { ...s, items: [...s.items, newItemWithId] }
            : s
        ));
      } else {
        setBacklog(prev => [...prev, newItemWithId]);
      }
      toast.success("Item created successfully");
    }
    
    setShowNewBacklogItemDialog(false);
  };

  const handleMoveToSprint = (itemId: number, sprintId: number) => {
    const item = backlog.find(i => i.id === itemId);
    if (!item) return;
    
    setBacklog(prev => prev.filter(i => i.id !== itemId));
    
    setSprints(prev => prev.map(s => 
      s.id === sprintId 
        ? { ...s, items: [...s.items, item] }
        : s
    ));
    
    toast.success("Item moved to sprint", {
      description: `${item.title} moved to sprint`
    });
  };

  const handleRemoveFromSprint = (itemId: number, sprintId: number) => {
    const sprint = sprints.find(s => s.id === sprintId);
    if (!sprint) return;
    
    const item = sprint.items.find(i => i.id === itemId);
    if (!item) return;
    
    setSprints(prev => prev.map(s => 
      s.id === sprintId 
        ? { ...s, items: s.items.filter(i => i.id !== itemId) }
        : s
    ));
    
    setBacklog(prev => [...prev, item]);
    
    toast.success("Item moved to backlog", {
      description: `${item.title} moved to backlog`
    });
  };

  const handleDeleteBacklogItem = (itemId: number) => {
    setBacklog(prev => prev.filter(i => i.id !== itemId));
    toast.success("Item removed from backlog");
  };

  const handleDeleteSprintItem = (itemId: number, sprintId: number) => {
    setSprints(prev => prev.map(s => 
      s.id === sprintId 
        ? { ...s, items: s.items.filter(i => i.id !== itemId) }
        : s
    ));
    toast.success("Item removed from sprint");
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo": return "bg-slate-500";
      case "in-progress": return "bg-blue-500";
      case "review": return "bg-amber-500";
      case "done": return "bg-green-500";
      default: return "bg-slate-500";
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <ArrowUp className="h-4 w-4 text-red-500" />;
      case "medium": return <ArrowUpDown className="h-4 w-4 text-amber-500" />;
      case "low": return <ArrowDown className="h-4 w-4 text-green-500" />;
      default: return <ArrowUpDown className="h-4 w-4 text-amber-500" />;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature": return <Sparkles className="h-4 w-4 text-blue-500" />;
      case "bug": return <X className="h-4 w-4 text-red-500" />;
      case "task": return <CheckSquare className="h-4 w-4 text-green-500" />;
      case "epic": return <Layers className="h-4 w-4 text-purple-500" />;
      default: return <CheckSquare className="h-4 w-4" />;
    }
  };

  const getFilteredBacklog = () => {
    return backlog.filter(item => {
      const matchesSearch = searchQuery === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterCriteria.type === "" || filterCriteria.type === "all" || item.type === filterCriteria.type;
      
      const matchesStatus = filterCriteria.status === "" || filterCriteria.status === "all" || item.status === filterCriteria.status;
      
      const matchesPriority = filterCriteria.priority === "" || filterCriteria.priority === "all" || item.priority === filterCriteria.priority;
      
      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    });
  };
  
  const filteredBacklog = getFilteredBacklog();
  
  const selectedSprintData = sprints.find(s => s.id === selectedSprint) || null;

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
        <title>Sprint Planning & Backlog | Axia Agile</title>
        <meta name="description" content="Define sprints, set goals, assign tasks, and organize the backlog" />
      </Helmet>

      <DashboardLayout role={role as any}>
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sprint Planning & Backlog</h1>
              <p className="text-muted-foreground">
                Define sprints, set goals, assign tasks, and organize the backlog
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:mt-0">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleCreateBacklogItem}
              >
                <Plus size={16} />
                New Item
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={handleCreateSprint}
              >
                <CalendarClock size={16} />
                New Sprint
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarClock size={20} />
                    <span>Sprints</span>
                  </div>
                  <Badge variant="outline">{sprints.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {sprints.map(sprint => (
                    <li 
                      key={sprint.id}
                      className={`p-4 cursor-pointer transition-colors hover:bg-muted ${
                        selectedSprint === sprint.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedSprint(sprint.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{sprint.name}</h3>
                          <p className="text-xs text-muted-foreground">{sprint.goal}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditSprint(sprint);
                          }}
                        >
                          <Edit size={14} />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                        </span>
                        <Badge
                          className={
                            sprint.status === "active" ? "bg-blue-500" :
                            sprint.status === "completed" ? "bg-green-500" : 
                            "bg-slate-500"
                          }
                        >
                          {sprint.status.charAt(0).toUpperCase() + sprint.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{sprint.progress}% Complete</span>
                          <span>{sprint.items.length} items</span>
                        </div>
                        <Progress value={sprint.progress} className="h-1" />
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedSprint 
                    ? `${selectedSprintData?.name} Details` 
                    : "Product Backlog"}
                </CardTitle>
                {selectedSprint && (
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-sm text-muted-foreground">{selectedSprintData?.goal}</p>
                    <div className="flex items-center text-xs text-muted-foreground space-x-3">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>
                          {new Date(selectedSprintData?.startDate || "").toLocaleDateString()} - 
                          {new Date(selectedSprintData?.endDate || "").toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="mr-1" />
                        <span>{selectedSprintData?.team}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{selectedSprintData?.progress}% Complete</span>
                        <span>
                          {selectedSprintData?.items.filter(i => i.status === "done").length} of {selectedSprintData?.items.length} completed
                        </span>
                      </div>
                      <Progress value={selectedSprintData?.progress || 0} className="h-2" />
                    </div>
                  </div>
                )}
                {!selectedSprint && (
                  <div className="flex items-center mt-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        placeholder="Search backlog..."
                        className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="p-4">
                    {selectedSprint ? (
                      selectedSprintData?.items && selectedSprintData.items.length > 0 ? (
                        <div className="space-y-3">
                          {selectedSprintData.items.map(item => (
                            <div 
                              key={item.id} 
                              className="border rounded-lg p-4 bg-card shadow-sm"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                  <div className="mt-1">{getTypeIcon(item.type)}</div>
                                  <div>
                                    <h3 className="font-medium">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditBacklogItem(item)}
                                  >
                                    <Edit size={14} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveFromSprint(item.id, selectedSprintData.id)}
                                  >
                                    <ArrowDown size={14} />
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge className={getStatusColor(item.status)}>
                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    {getPriorityIcon(item.priority)}
                                    <span className="text-xs capitalize">{item.priority}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock size={12} />
                                    <span>{item.estimate} {item.estimate === 1 ? 'point' : 'points'}</span>
                                  </div>
                                </div>
                                {item.assignee && (
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs">
                                      {item.assignee.split(" ").map(n => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <ListTodo className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">No items in this sprint</h3>
                          <p className="text-muted-foreground mt-2 mb-4">
                            Add items from the backlog or create new items
                          </p>
                          <Button onClick={() => setSelectedSprint(null)}>
                            View Backlog
                          </Button>
                        </div>
                      )
                    ) : (
                      filteredBacklog.length > 0 ? (
                        <div className="space-y-3">
                          {filteredBacklog.map(item => (
                            <div 
                              key={item.id} 
                              className="border rounded-lg p-4 bg-card shadow-sm"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                  <div className="mt-1">{getTypeIcon(item.type)}</div>
                                  <div>
                                    <h3 className="font-medium">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditBacklogItem(item)}
                                  >
                                    <Edit size={14} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteBacklogItem(item.id)}
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge className={getStatusColor(item.status)}>
                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    {getPriorityIcon(item.priority)}
                                    <span className="text-xs capitalize">{item.priority}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock size={12} />
                                    <span>{item.estimate} {item.estimate === 1 ? 'point' : 'points'}</span>
                                  </div>
                                </div>
                                <Select 
                                  onValueChange={(value) => handleMoveToSprint(item.id, parseInt(value))} 
                                >
                                  <SelectTrigger className="h-8 w-[130px]">
                                    <SelectValue placeholder="Add to Sprint" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {sprints.map(sprint => (
                                      <SelectItem key={sprint.id} value={sprint.id.toString()}>
                                        {sprint.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              {item.tags && item.tags.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1">
                                  {item.tags.map((tag, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Clipboard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">No items in the backlog</h3>
                          <p className="text-muted-foreground mt-2 mb-4">
                            Create new backlog items to plan your work
                          </p>
                          <Button onClick={handleCreateBacklogItem}>
                            Create New Item
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              
              {!selectedSprint && filteredBacklog.length > 0 && (
                <CardFooter className="border-t p-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">
                      {filteredBacklog.length} items in backlog
                    </div>
                    <div className="flex items-center gap-2">
                      <Select 
                        value={filterCriteria.type}
                        onValueChange={(value) => setFilterCriteria({...filterCriteria, type: value})}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="feature">Feature</SelectItem>
                          <SelectItem value="bug">Bug</SelectItem>
                          <SelectItem value="task">Task</SelectItem>
                          <SelectItem value="epic">Epic</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select 
                        value={filterCriteria.priority}
                        onValueChange={(value) => setFilterCriteria({...filterCriteria, priority: value})}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priorities</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </DashboardLayout>
      
      <Dialog open={showNewSprintDialog} onOpenChange={setShowNewSprintDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingSprint ? "Edit Sprint" : "Create New Sprint"}</DialogTitle>
            <DialogDescription>
              {editingSprint 
                ? "Update the details of your sprint" 
                : "Define a new sprint with goals and timeframe"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Sprint Name</Label>
                <Input
                  id="name"
                  value={newSprint.name || ""}
                  onChange={(e) => handleSprintFormChange("name", e.target.value)}
                  placeholder="e.g. Sprint 5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">Sprint Goal</Label>
                <Textarea
                  id="goal"
                  value={newSprint.goal || ""}
                  onChange={(e) => handleSprintFormChange("goal", e.target.value)}
                  placeholder="What is the main objective of this sprint?"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newSprint.startDate || ""}
                    onChange={(e) => handleSprintFormChange("startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newSprint.endDate || ""}
                    onChange={(e) => handleSprintFormChange("endDate", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Input
                  id="team"
                  value={newSprint.team || ""}
                  onChange={(e) => handleSprintFormChange("team", e.target.value)}
                  placeholder="e.g. Frontend Team"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  defaultValue={newSprint.status} 
                  onValueChange={(value) => handleSprintFormChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewSprintDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSprint}>
              {editingSprint ? "Update Sprint" : "Create Sprint"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showNewBacklogItemDialog} onOpenChange={setShowNewBacklogItemDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingBacklogItem ? "Edit Item" : "Create New Item"}</DialogTitle>
            <DialogDescription>
              {editingBacklogItem 
                ? "Update the details of this item" 
                : "Add a new item to your backlog or sprint"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newBacklogItem.title || ""}
                  onChange={(e) => handleBacklogItemFormChange("title", e.target.value)}
                  placeholder="e.g. Implement login form"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newBacklogItem.description || ""}
                  onChange={(e) => handleBacklogItemFormChange("description", e.target.value)}
                  placeholder="Describe what needs to be done"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    defaultValue={newBacklogItem.type} 
                    onValueChange={(value) => handleBacklogItemFormChange("type", value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feature">Feature</SelectItem>
                      <SelectItem value="bug">Bug</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="epic">Epic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    defaultValue={newBacklogItem.priority} 
                    onValueChange={(value) => handleBacklogItemFormChange("priority", value)}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    defaultValue={newBacklogItem.status} 
                    onValueChange={(value) => handleBacklogItemFormChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">In Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimate">Estimate (points)</Label>
                  <Select 
                    defaultValue={newBacklogItem.estimate?.toString()} 
                    onValueChange={(value) => handleBacklogItemFormChange("estimate", parseInt(value))}
                  >
                    <SelectTrigger id="estimate">
                      <SelectValue placeholder="Select estimate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 point</SelectItem>
                      <SelectItem value="2">2 points</SelectItem>
                      <SelectItem value="3">3 points</SelectItem>
                      <SelectItem value="5">5 points</SelectItem>
                      <SelectItem value="8">8 points</SelectItem>
                      <SelectItem value="13">13 points</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignee">Assignee (optional)</Label>
                <Input
                  id="assignee"
                  value={newBacklogItem.assignee || ""}
                  onChange={(e) => handleBacklogItemFormChange("assignee", e.target.value)}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={(newBacklogItem.tags || []).join(", ")}
                  onChange={(e) => handleBacklogItemFormChange("tags", e.target.value.split(",").map(tag => tag.trim()))}
                  placeholder="e.g. frontend, ui, design"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewBacklogItemDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBacklogItem}>
              {editingBacklogItem ? "Update Item" : "Create Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SprintPlanning;
