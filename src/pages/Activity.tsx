
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  User, 
  GitPullRequest, 
  MessageSquare, 
  FileText, 
  Check,
  Filter
} from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Activity = () => {
  const location = useLocation();
  const [role, setRole] = useState<string>(location.state?.role || localStorage.getItem("userRole") || "projectManager");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    tasks: true,
    comments: true,
    documents: true,
    sprints: true,
    pullRequests: true,
  });

  // Mock activity data
  const activityItems = [
    {
      id: 1,
      type: "task",
      action: "completed",
      title: "Implement login functionality",
      user: "David Chen",
      timestamp: "Today at 10:23 AM",
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
    {
      id: 2,
      type: "comment",
      action: "added",
      title: "Comment on 'User authentication flow'",
      user: "Jane Cooper",
      timestamp: "Today at 9:41 AM",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 3,
      type: "sprint",
      action: "started",
      title: "Sprint 24: Backend Improvements",
      user: "Sam Wilson",
      timestamp: "Yesterday at 2:30 PM",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
    },
    {
      id: 4,
      type: "pullRequest",
      action: "merged",
      title: "PR #42: Fix navigation menu responsiveness",
      user: "Emma Thompson",
      timestamp: "Yesterday at 11:15 AM",
      icon: <GitPullRequest className="h-5 w-5 text-indigo-500" />,
    },
    {
      id: 5,
      type: "document",
      action: "updated",
      title: "API Documentation v2.3",
      user: "Michael Brown",
      timestamp: "2 days ago",
      icon: <FileText className="h-5 w-5 text-amber-500" />,
    },
    {
      id: 6,
      type: "task",
      action: "assigned",
      title: "Implement data visualization dashboard",
      user: "Jane Cooper",
      timestamp: "2 days ago",
      icon: <User className="h-5 w-5 text-teal-500" />,
    },
    {
      id: 7,
      type: "comment",
      action: "added",
      title: "Comment on 'Design system components'",
      user: "David Chen",
      timestamp: "3 days ago",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 8,
      type: "document",
      action: "created",
      title: "Project Requirements Document",
      user: "Jane Cooper",
      timestamp: "4 days ago",
      icon: <FileText className="h-5 w-5 text-amber-500" />,
    },
    {
      id: 9,
      type: "pullRequest",
      action: "opened",
      title: "PR #38: Add new chart components",
      user: "David Chen",
      timestamp: "5 days ago",
      icon: <GitPullRequest className="h-5 w-5 text-indigo-500" />,
    },
    {
      id: 10,
      type: "sprint",
      action: "completed",
      title: "Sprint 23: Frontend Improvements",
      user: "Sam Wilson",
      timestamp: "1 week ago",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
    },
  ];
  
  const handleFilterChange = (filterType: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  // Filter activity items based on search query and type filters
  const filteredActivities = activityItems.filter(item => {
    // Check if the item type is enabled in filters
    if (!filters[item.type as keyof typeof filters]) {
      return false;
    }
    
    // Check if the search query matches title or user
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.user.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Activity History | Axia Agile</title>
        <meta name="description" content="View your activity history and team events" />
      </Helmet>
        <div className="space-y-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Activity History</h1>
              <p className="text-muted-foreground">
                Track your team's recent actions and project updates
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Activity Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="grid md:grid-cols-2 gap-4 flex-1">
                  <div>
                    <label className="text-sm font-medium mb-1 block">From</label>
                    <DatePicker date={startDate} setDate={setStartDate} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">To</label>
                    <DatePicker date={endDate} setDate={setEndDate} />
                  </div>
                </div>
                <div className="flex gap-2 flex-1">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Search</label>
                    <Input 
                      placeholder="Search activities..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="self-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <Filter size={16} />
                          <span>Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Activity Types</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={filters.tasks}
                          onCheckedChange={() => handleFilterChange('tasks')}
                        >
                          Tasks
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filters.comments}
                          onCheckedChange={() => handleFilterChange('comments')}
                        >
                          Comments
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filters.documents}
                          onCheckedChange={() => handleFilterChange('documents')}
                        >
                          Documents
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filters.sprints}
                          onCheckedChange={() => handleFilterChange('sprints')}
                        >
                          Sprints
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filters.pullRequests}
                          onCheckedChange={() => handleFilterChange('pullRequests')}
                        >
                          Pull Requests
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-medium">Recent Activity</h2>
            
            {filteredActivities.length > 0 ? (
              <div className="space-y-4">
                {filteredActivities.map((item) => (
                  <Card key={item.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-1">
                            <div className="font-medium truncate">{item.title}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.timestamp}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.user} {item.action} this {item.type}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-muted/40 rounded-lg border border-border">
                <h3 className="text-lg font-medium">No activities found</h3>
                <p className="text-muted-foreground mt-1">
                  Try changing your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
    </>
  );
};

export default Activity;
