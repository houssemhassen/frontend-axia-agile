import { Helmet } from "react-helmet-async";
import { Users, FolderOpen, Bell, Activity, Settings, Plus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuperAdminStats from "@/components/admin/SuperAdminStats";
import UserTable from "@/components/admin/UserTable";
import DataCard from "@/components/data-display/DataCard";

// This is just an example of how you would refactor the AdminDashboard
// Not meant to be used directly, just as a reference

const AdminDashboardExample = () => {
  const navigate = useNavigate();
  
  const stats = [
    {
      title: "Total Users",
      value: "42",
      icon: <Users className="h-5 w-5" />,
      change: "+5 this month",
      trend: "up" as const
    },
    {
      title: "Active Projects",
      value: "15",
      icon: <FolderOpen className="h-5 w-5" />,
      change: "+2 this week",
      trend: "up" as const
    },
    {
      title: "System Alerts",
      value: "3",
      icon: <Bell className="h-5 w-5" />,
      change: "-1 since yesterday",
      trend: "down" as const
    },
    {
      title: "Active Users",
      value: "28",
      icon: <Activity className="h-5 w-5" />,
      change: "+3 today",
      trend: "up" as const
    }
  ];

  const recentUsers = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Project Manager", status: "Active" },
    { id: 2, name: "Maria Garcia", email: "maria@example.com", role: "Developer", status: "Active" },
    { id: 3, name: "Robert Smith", email: "robert@example.com", role: "Scrum Master", status: "Inactive" },
    { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "QA Tester", status: "Active" },
    { id: 5, name: "James Brown", email: "james@example.com", role: "Developer", status: "Active" }
  ];

  const handleAddUser = () => {
    navigate('/role-management');
    toast.info("Navigating to user management");
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Axia Agile</title>
        <meta name="description" content="Axia Agile admin dashboard" />
      </Helmet>

      <DashboardLayout 
        role="superadmin"
        pageTitle="Admin Dashboard"
        pageDescription="System overview and administration"
      >
        <div className="space-y-8 animate-fade-in">
          {/* Page header actions */}
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate('/settings')}
            >
              <Settings size={16} />
              System Settings
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={handleAddUser}
            >
              <Plus size={16} />
              Add User
            </Button>
          </div>

          {/* Stats cards */}
          <SuperAdminStats stats={stats} />

          {/* Main content */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="system">System Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <UserTable 
                    users={recentUsers}
                    onAddUser={handleAddUser}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Other tabs would be refactored similarly */}
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminDashboardExample;
