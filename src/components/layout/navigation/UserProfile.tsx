
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserProfileProps {
  isCollapsed: boolean;
  role: string;
  toggleCollapsed: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isCollapsed, role, toggleCollapsed }) => {
  return (
    <div className="p-4 border-t border-sidebar-border flex justify-between items-center">
      {!isCollapsed && (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            {role.charAt(0).toUpperCase()}
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-sidebar-foreground opacity-70">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
          </div>
        </div>
      )}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleCollapsed}
        className="ml-auto"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </Button>
    </div>
  );
};

export default UserProfile;
