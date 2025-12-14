import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Users, Search, Plus, Loader2, Pencil, CheckCircle2, Ban } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types/users";
import { useUserManagement } from "@/hooks/useUserManagement";
import { useUserFilters } from "@/hooks/useUserFilters";
import { getRoleColorByName } from "@/constants/userManagement";
import { UserFormDialog } from "@/components/shared/User/UserFormDialog";
import { ToggleUserStatusDialog } from "@/components/shared/User/ToggleUserStatusDialog";

const UserManagement = () => {
  const {
    users,
    roles,
    loadingUsers,
    loadingRoles,
    addUser,
    editUser,
    toggleActiveStatus,
    isEmailExists,
  } = useUserManagement();

  const {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    filteredUsers,
  } = useUserFilters(users);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [toggleDialogOpen, setToggleDialogOpen] = useState(false); // ✅ CORRIGER

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [togglingUser, setTogglingUser] = useState<User | null>(null); // ✅ CORRIGER

  const handleEditClick = useCallback((user: User) => {
    setEditingUser(user);
    setEditDialogOpen(true);
  }, []);

  const handleAddUser = useCallback(async (formData: any) => {
    await addUser(formData);
  }, [addUser]);

  const handleUpdateUser = useCallback(async (formData: any) => {
    if (editingUser) {
      await editUser(editingUser.id, formData);
      setEditingUser(null);
    }
  }, [editUser, editingUser]);

  const handleToggleClick = useCallback((user: User) => {
    setTogglingUser(user);
    setToggleDialogOpen(true);
  }, []);

  const handleToggleStatus = useCallback(async () => {
    if (togglingUser) {
      await toggleActiveStatus(togglingUser.id);
      setTogglingUser(null);
    }
  }, [toggleActiveStatus, togglingUser]);

  return (
    <>
      <Helmet>
        <title>User Management | Axia Agile</title>
      </Helmet>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage user accounts</p>
          </div>

          <Button onClick={() => setAddDialogOpen(true)} className="mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search users"
            />
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter by role">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">All Roles</SelectItem>
              <SelectItem key="unassigned" value="unassigned">Unassigned</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.name}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loadingUsers ? (
          <div className="flex justify-center items-center p-12" role="status" aria-live="polite">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="sr-only">Loading users...</span>
          </div>
        ) : (
          <div className="rounded-md border">
            {filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" aria-hidden="true" />
                <h3 className="text-lg font-medium">No users found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || roleFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Add your first user to get started"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className={!user.isActive ? "opacity-60" : ""}
                    >
                      <TableCell className="font-medium">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.roleName ? (
                          <Badge variant="outline" className={getRoleColorByName(user.roleName)}>
                            {user.roleName}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            Unassigned
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.isActive ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Active
                            </span>
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            <span className="flex items-center gap-1">
                              <Ban className="h-3 w-3" />
                              Inactive
                            </span>
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditClick(user)}
                            disabled={!user.isActive}
                            aria-label={`Edit ${user.firstName} ${user.lastName}`}
                          >
                            <span className="flex items-center gap-1">
                              <Pencil className="h-4 w-4" />
                              Edit
                            </span>
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className={user.isActive
                              ? "text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              : "text-green-600 hover:bg-green-600 hover:text-white"
                            }
                            onClick={() => handleToggleClick(user)}
                            aria-label={user.isActive ? `Deactivate ${user.firstName} ${user.lastName}` : `Activate ${user.firstName} ${user.lastName}`}
                          >
                            {user.isActive ? (
                              <span className="flex items-center gap-1">
                                <Ban className="h-4 w-4" />
                                Deactivate
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" />
                                Activate
                              </span>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        )}
      </div>

      <UserFormDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleAddUser}
        roles={roles}
        loadingRoles={loadingRoles}
        isEmailExists={isEmailExists}
      />

      <UserFormDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleUpdateUser}
        roles={roles}
        loadingRoles={loadingRoles}
        editingUser={editingUser}
        isEmailExists={isEmailExists}
      />

      <ToggleUserStatusDialog
        open={toggleDialogOpen}
        onOpenChange={setToggleDialogOpen}
        onConfirm={handleToggleStatus}
        user={togglingUser}
      />
    </>
  );
};

export default UserManagement;