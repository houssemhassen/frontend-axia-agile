
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  name: string;
  path: string;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, name, path, isCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === path;

  return (
    <button
      onClick={() => navigate(path)}
      className={cn(
        "flex items-center w-full px-3 py-2.5 rounded-lg transition-colors hover:bg-sidebar-accent",
        isActive ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground"
      )}
    >
      <span className="mr-3">{icon}</span>
      {!isCollapsed && <span>{name}</span>}
    </button>
  );
};

export default NavItem;
