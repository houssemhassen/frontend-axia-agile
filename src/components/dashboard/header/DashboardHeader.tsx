import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { UserMenu } from "./UserMenu";
import React from "react";

interface DashboardHeaderProps {
  userName: string;
  role: string;
  displayRole: string;
  notifications: number;
  setNotifications: React.Dispatch<React.SetStateAction<number>>;
}

export const DashboardHeader = ({
  userName,
  role,
  displayRole,
  notifications,
  setNotifications,
}: DashboardHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects, tasks..."
              className="pl-10 w-64"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications > 0 ? (
                <>
                  <DropdownMenuItem className="flex flex-col items-start p-4">
                    <div className="font-medium">New task assigned</div>
                    <div className="text-sm text-gray-500">
                      You have been assigned to "Update user interface"
                    </div>
                    <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start p-4">
                    <div className="font-medium">Sprint ending soon</div>
                    <div className="text-sm text-gray-500">
                      Current sprint ends in 2 days
                    </div>
                    <div className="text-xs text-gray-400 mt-1">1 day ago</div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setNotifications(0)}
                    className="cursor-pointer text-center w-full"
                  >
                    Mark all as read
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem className="text-center text-gray-500">
                  No new notifications
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <UserMenu 
            userName={userName} 
            role={displayRole}
          />
        </div>
      </div>
    </header>
  );
};