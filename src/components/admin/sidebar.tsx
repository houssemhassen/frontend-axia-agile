
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, GitBranch
} from "lucide-react";
import NavSection, { NavItemType } from "../layout/navigation/NavSection";
import UserProfile from "../layout/navigation/UserProfile";


export type Role = "superadmin" | "billingAdmin" | "productOwner" | "scrumMaster" | "developer" | "tester";

interface SideNavProps {
  role?: Role;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const SidebarAdmin = ({ role = "productOwner", onCollapsedChange }: SideNavProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const allNavItems: NavItemType[] = [
    {
      name: "Dashboard",
      path: role === "superadmin" ? "/superadmin" :
        role === "billingAdmin" ? "/billing" :
          role === "scrumMaster" ? "/scrum-master" :
            role === "developer" ? "/developer" :
              role === "tester" ? "/qa-tester" :
                role === "productOwner" ? "/product-owner" :
                  "/dashboard",
      icon: <LayoutDashboard size={20} />,
      roles: ["superadmin", "billingAdmin", "ProductOwner", "scrumMaster", "developer", "tester"]
    },
    {
      name: "User Management",
      path: "/user-management",
      icon: <Users size={20} />,
      roles: ["superadmin", "productOwner", "scrumMaster"]
    },
    {
      name: "Projects",
      path: "/project-management",
      icon: <GitBranch size={20} />,
      roles: ["superadmin", "productOwner", "scrumMaster"]
    },
        {
      name: "Backlog",
      path: "/product-owner/backlog",
      icon: <GitBranch size={20} />,
      roles: ["superadmin", "productOwner", "scrumMaster"]
    },

    
  ];

  useEffect(() => {
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-40 bg-sidebar transition-all duration-300 ease-in-out pt-20 ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="overflow-y-auto">
          <nav className="px-3 py-4">
            <NavSection
              items={allNavItems}
              role={role as Role}
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>

        <UserProfile
          isCollapsed={isCollapsed}
          role={role}
          toggleCollapsed={toggleCollapsed}
        />
      </div>
    </aside>
  );
};

export default SidebarAdmin;
