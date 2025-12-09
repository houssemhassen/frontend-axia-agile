
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Users, FolderOpen, FileText, Settings, Plus, Bell, BarChart3, ArrowUpRight, Activity } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(42);
  const [projectCount, setProjectCount] = useState(15);
  const [activeUserCount, setActiveUserCount] = useState(28);
  const [systemAlerts, setSystemAlerts] = useState(3);

  const stats = [
    {
      title: "Total Users",
      value: userCount.toString(),
      icon: <Users className="h-5 w-5" />,
      change: "+5 this month",
      trend: "up"
    },
    {
      title: "Active Projects",
      value: projectCount.toString(),
      icon: <FolderOpen className="h-5 w-5" />,
      change: "+2 this week",
      trend: "up"
    },
    {
      title: "System Alerts",
      value: systemAlerts.toString(),
      icon: <Bell className="h-5 w-5" />,
      change: "-1 since yesterday",
      trend: "down"
    },
    {
      title: "Active Users",
      value: activeUserCount.toString(),
      icon: <Activity className="h-5 w-5" />,
      change: "+3 today",
      trend: "up"
    }
  ];

  const recentUsers = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Project Manager", status: "Active" },
    { id: 2, name: "Maria Garcia", email: "maria@example.com", role: "Developer", status: "Active" },
    { id: 3, name: "Robert Smith", email: "robert@example.com", role: "Scrum Master", status: "Inactive" },
    { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "QA Tester", status: "Active" },
    { id: 5, name: "James Brown", email: "james@example.com", role: "Developer", status: "Active" }
  ];

  const recentProjects = [
    { id: 1, name: "E-Commerce Redesign", teams: 3, members: 12, status: "Active" },
    { id: 2, name: "Mobile App Development", teams: 2, members: 8, status: "Active" },
    { id: 3, name: "CRM Integration", teams: 1, members: 5, status: "On Hold" },
    { id: 4, name: "Data Migration", teams: 2, members: 7, status: "Active" }
  ];

  const systemLogs = [
    { id: 1, event: "User Login", user: "Alex Johnson", timestamp: "Today, 10:23 AM", severity: "Info" },
    { id: 2, event: "Project Created", user: "Maria Garcia", timestamp: "Today, 09:15 AM", severity: "Info" },
    { id: 3, event: "System Backup", user: "System", timestamp: "Today, 02:00 AM", severity: "Info" },
    { id: 4, event: "Failed Login Attempt", user: "Unknown", timestamp: "Yesterday, 11:52 PM", severity: "Warning" },
    { id: 5, event: "Database Error", user: "System", timestamp: "Yesterday, 10:30 PM", severity: "Error" }
  ];

  const handleAddUser = () => {
    navigate('/role-management');
    toast.info("Navigating to user management");
  };

  const handleViewSystemLogs = () => {
    toast.info("Viewing complete system logs");
  };

  const handleAddProject = () => {
    navigate('/project-creation');
    toast.info("Creating new project");
  };

  const handleSystemSettings = () => {
    navigate('/settings');
    toast.info("Accessing system settings");
  };

  return (
    <>
      <Helmet>
        <title>Super Admin Dashboard | Axia Agile</title>
        <meta name="description" content="Axia Agile super admin dashboard" />
      </Helmet>

      <div className="space-y-8 animate-fade-in">

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
          <Tabs defaultValue="users" className="w-full">
            <TabsList>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="system">System Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Users</CardTitle>
                    <Button onClick={handleAddUser}>Add User</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => navigate('/role-management')} className="w-full">
                    View All Users
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Projects Overview</CardTitle>
                    <Button onClick={handleAddProject}>New Project</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Teams</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.name}</TableCell>
                          <TableCell>{project.teams}</TableCell>
                          <TableCell>{project.members}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              project.status === "Active" ? "bg-green-100 text-green-800" : 
                              project.status === "On Hold" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                            }`}>
                              {project.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/projects/${project.id}`)}>View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => navigate('/projects')} className="w-full">
                    View All Projects
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="system" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>System Logs</CardTitle>
                    <Button variant="outline" onClick={handleViewSystemLogs}>View All Logs</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Severity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {systemLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.event}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              log.severity === "Info" ? "bg-blue-100 text-blue-800" : 
                              log.severity === "Warning" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                            }`}>
                              {log.severity}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button variant="outline" onClick={handleViewSystemLogs}>
                      Export Logs
                    </Button>
                    <Button variant="outline" onClick={() => setSystemAlerts(0)}>
                      Clear Alerts
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">CPU Usage</span>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Memory Usage</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Disk Usage</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleAddUser}>
                  <Users size={24} />
                  <span>Manage Users</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleAddProject}>
                  <FolderOpen size={24} />
                  <span>Create Project</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleViewSystemLogs}>
                  <FileText size={24} />
                  <span>View Logs</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={handleSystemSettings}>
                  <Settings size={24} />
                  <span>Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
    </>
  );
};

export default SuperAdminDashboard;
