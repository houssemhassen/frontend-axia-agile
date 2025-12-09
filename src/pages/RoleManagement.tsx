import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  User, Users, Search, Filter, Clock, Check, X, AlertCircle, ChevronDown, Plus
} from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAllUsers } from "@/services/userService";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  role?: string;
  project?: string;
  createdAt: string;
}

const roleColors: Record<string, string> = {
  superadmin: "bg-purple-100 text-purple-800 border-purple-200",
  billingAdmin: "bg-orange-100 text-orange-800 border-orange-200",
  productOwner: "bg-blue-100 text-blue-800 border-blue-200",
  scrumMaster: "bg-green-100 text-green-800 border-green-200",
  developer: "bg-indigo-100 text-indigo-800 border-indigo-200"
};

const roleLabels: Record<string, string> = {
  superadmin: "Super Administrator",
  billingAdmin: "Billing Administrator",
  productOwner: "Product Owner",
  scrumMaster: "Scrum Master",
  developer: "Developer"
};

const RoleManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [confirmAction, setConfirmAction] = useState<{
    type: string;
    user: User | null;
    newRole?: string;
  }>({ type: "", user: null });
  const [activityLog, setActivityLog] = useState<Array<{
    action: string;
    user: string;
    by: string;
    timestamp: string;
  }>>([]);

  // Initialize sample data if none exists
  useEffect(() => {
    fetchAllUsers();


    const initializeData = () => {
      const storedUsers = localStorage.getItem("users");
      const storedLog = localStorage.getItem("activityLog");

      // Initialize with sample users if none exist
      if (!storedUsers) {
        const sampleUsers: User[] = [
          {
            id: "user-1",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            status: "pending",
            createdAt: new Date().toISOString()
          },
          {
            id: "user-2",
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            status: "pending",
            createdAt: new Date().toISOString()
          },
          {
            id: "user-3",
            firstName: "Robert",
            lastName: "Johnson",
            email: "robert.johnson@example.com",
            status: "approved",
            role: "developer",
            project: "Mobile App",
            createdAt: new Date().toISOString()
          },
          {
            id: "user-4",
            firstName: "Emily",
            lastName: "Davis",
            email: "emily.davis@example.com",
            status: "approved",
            role: "projectManager",
            project: "E-commerce Platform",
            createdAt: new Date().toISOString()
          }
        ];

        localStorage.setItem("users", JSON.stringify(sampleUsers));
        setUsers(sampleUsers);
        setFilteredUsers(sampleUsers);
      } else {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          setUsers(parsedUsers);
          setFilteredUsers(parsedUsers);
        } catch (e) {
          console.error("Error parsing users:", e);
          // Reset to empty array on error
          setUsers([]);
          setFilteredUsers([]);
        }
      }

      // Initialize activity log
      if (!storedLog) {
        localStorage.setItem("activityLog", JSON.stringify([]));
      } else {
        try {
          setActivityLog(JSON.parse(storedLog));
        } catch (e) {
          console.error("Error parsing activity log:", e);
          setActivityLog([]);
        }
      }
    };

    initializeData();
  }, []);

  // Filter users based on search term and filters
  useEffect(() => {
    let result = [...users];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter);
    }

    if (roleFilter !== "all") {
      if (roleFilter === "unassigned") {
        result = result.filter((user) => !user.role);
      } else {
        result = result.filter((user) => user.role === roleFilter);
      }
    }

    setFilteredUsers(result);
  }, [searchTerm, statusFilter, roleFilter, users]);

  const getPendingUsers = () => {
    return filteredUsers.filter((user) => user.status === "pending");
  };

  const getApprovedUsers = () => {
    return filteredUsers.filter((user) => user.status === "approved");
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    const userToUpdate = users.find((u) => u.id === userId);
    if (userToUpdate) {
      setConfirmAction({
        type: "changeRole",
        user: userToUpdate,
        newRole,
      });
      setConfirmDialogOpen(true);
    }
  };

  const handleApprove = (user: User) => {
    setConfirmAction({
      type: "approve",
      user,
    });
    setConfirmDialogOpen(true);
  };

  const handleReject = (user: User) => {
    setConfirmAction({
      type: "reject",
      user,
    });
    setConfirmDialogOpen(true);
  };

  const confirmActionHandler = () => {
    if (!confirmAction.user) return;

    // Create a copy of the users array
    const updatedUsers = [...users];
    const userIndex = updatedUsers.findIndex((u) => u.id === confirmAction.user?.id);

    if (userIndex === -1) return;

    const newLog = {
      action: "",
      user: `${confirmAction.user.firstName} ${confirmAction.user.lastName}`,
      by: "Admin User", // In a real app, this would be the current admin's name
      timestamp: new Date().toISOString(),
    };

    switch (confirmAction.type) {
      case "approve":
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          status: "approved",
        };
        newLog.action = "Approved user";
        toast.success("User approved successfully");
        break;

      case "reject":
        // Remove user from array
        updatedUsers.splice(userIndex, 1);
        newLog.action = "Rejected user";
        toast.success("User rejected successfully");
        break;

      case "changeRole":
        if (confirmAction.newRole) {
          updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            role: confirmAction.newRole,
            status: "approved", // Auto-approve when assigning role
          };
          newLog.action = `Changed role to ${roleLabels[confirmAction.newRole]}`;
          toast.success(`Role changed to ${roleLabels[confirmAction.newRole]}`);
        }
        break;
    }

    // Update users in state and localStorage
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update activity log
    const updatedLog = [newLog, ...activityLog];
    setActivityLog(updatedLog);
    localStorage.setItem("activityLog", JSON.stringify(updatedLog));

    setConfirmDialogOpen(false);
    setConfirmAction({ type: "", user: null });
  };

  const getSampleDataPrompt = () => {
    if (users.length === 0) {
      return (
        <div className="text-center p-4 bg-muted/30 rounded-lg border border-dashed mt-4 mb-2">
          <p className="text-sm text-muted-foreground">
            No user data found. Sample data will be loaded automatically.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>Role Management | Axia Agile</title>
      </Helmet>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Role Management</h1>
            <p className="text-muted-foreground">Manage user roles and access permissions</p>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={roleFilter}
            onValueChange={setRoleFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="superadmin">Super Admin</SelectItem>
              <SelectItem value="billingAdmin">Billing Admin</SelectItem>
              <SelectItem value="productOwner">Product Owner</SelectItem>
              <SelectItem value="scrumMaster">Scrum Master</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {getSampleDataPrompt()}

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Approval
              <Badge variant="outline" className="ml-1 bg-yellow-100 text-yellow-800">
                {getPendingUsers().length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Approved Users
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Activity Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="rounded-md border p-4">
            {getPendingUsers().length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No pending users</h3>
                <p className="text-sm text-muted-foreground">
                  All users have been reviewed
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Assign Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getPendingUsers().map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Select
                          onValueChange={(value) => handleRoleChange(user.id, value)}
                          value={user.role || ""}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Assign role..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="superadmin">Super Administrator</SelectItem>
                            <SelectItem value="billingAdmin">Billing Administrator</SelectItem>
                            <SelectItem value="productOwner">Product Owner</SelectItem>
                            <SelectItem value="scrumMaster">Scrum Master</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="mr-2 text-green-600"
                          onClick={() => handleApprove(user)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                          onClick={() => handleReject(user)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="approved" className="rounded-md border p-4">
            {getApprovedUsers().length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No approved users</h3>
                <p className="text-sm text-muted-foreground">
                  Approve users from the pending tab
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getApprovedUsers().map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role ? (
                          <Badge
                            variant="outline"
                            className={roleColors[user.role] || ""}
                          >
                            {roleLabels[user.role]}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100">
                            Unassigned
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.project || (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Change Role
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, "superadmin")}>
                              Super Administrator
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, "billingAdmin")}>
                              Billing Administrator
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, "productOwner")}>
                              Product Owner
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, "scrumMaster")}>
                              Scrum Master
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, "developer")}>
                              Developer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="activity" className="rounded-md border p-4">
            {activityLog.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No activity yet</h3>
                <p className="text-sm text-muted-foreground">
                  Role changes will appear here
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>By Admin</TableHead>
                    <TableHead>Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLog.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.by}</TableCell>
                      <TableCell>
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmAction.type === "approve"
                ? "Approve User"
                : confirmAction.type === "reject"
                  ? "Reject User"
                  : "Change User Role"}
            </DialogTitle>
            <DialogDescription>
              {confirmAction.type === "approve"
                ? "This will approve the user account. They will be able to access the system."
                : confirmAction.type === "reject"
                  ? "This will permanently delete the user's account."
                  : `This will change the user's role to ${confirmAction.newRole ? roleLabels[confirmAction.newRole] : ""
                  }.`}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center p-3 border rounded-md bg-muted/30">
            <User className="h-8 w-8 mr-3 text-muted-foreground" />
            <div>
              <p className="font-medium">
                {confirmAction.user?.firstName} {confirmAction.user?.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {confirmAction.user?.email}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={confirmAction.type === "reject" ? "destructive" : "default"}
              onClick={confirmActionHandler}
            >
              {confirmAction.type === "approve"
                ? "Approve"
                : confirmAction.type === "reject"
                  ? "Reject"
                  : "Change Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RoleManagement;
