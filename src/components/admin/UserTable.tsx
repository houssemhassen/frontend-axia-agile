
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import StatusIndicator from '../data-display/StatusIndicator';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  onAddUser?: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onAddUser }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Users</h3>
        {onAddUser && (
          <Button onClick={onAddUser}>Add User</Button>
        )}
      </div>
      
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <StatusIndicator 
                  status={user.status === "Active" ? "success" : "default"}
                  label={user.status}
                />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="mt-4">
        <Button variant="outline" onClick={() => navigate('/role-management')} className="w-full">
          View All Users
        </Button>
      </div>
    </>
  );
};

export default UserTable;
