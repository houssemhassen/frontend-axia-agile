import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, ListTodo, Users, BarChart3, Calendar,
  GitBranch, CheckCircle, Bug, FileCode, MessageSquare,
  Kanban, CreditCard, LineChart, History, Shield,
  FileCheck, Play, PlusCircle, Milestone, CalendarRange
} from "lucide-react";
import NavSection, { NavItemType } from "../layout/navigation/NavSection";
import UserProfile from "../layout/navigation/UserProfile";

export type Role = "productOwner";

interface SideNavProps {
  role?: Role;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const SidebarProductOwner = ({ role = "productOwner", onCollapsedChange }: SideNavProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const allNavItems: NavItemType[] = [
    {
      name: "Dashboard",
      path: "/product-owner",
      icon: <LayoutDashboard size={20} />,
      roles: ["productOwner"]
    },
    {
      name: "Projects",
      path: "/product-owner/projects", // ✅ Chemin complet
      icon: <GitBranch size={20} />,
      roles: ["productOwner"]
    },
    {
      name: "Backlog",
      path: "/product-owner/backlog", // ✅ Chemin complet
      icon: <ListTodo size={20} />,
      roles: ["productOwner"]
    },
    {
      name: "Release Planning",
      path: "/product-owner/release-planning", // ✅ Chemin complet
      icon: <CalendarRange size={20} />,
      roles: ["productOwner"]
    },
    {
      name: "Value Metrics",
      path: "/product-owner/value-metrics", // ✅ Chemin complet
      icon: <BarChart3 size={20} />,
      roles: ["productOwner"]
    }
  ];

  useEffect(() => {
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-40 bg-sidebar transition-all duration-300 ease-in-out pt-20 ${
        isCollapsed ? "w-20" : "w-64"
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

export default SidebarProductOwner;