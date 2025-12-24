
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, ListTodo, Users, BarChart3, Calendar,
  GitBranch, CheckCircle, Bug, FileCode, MessageSquare,
  Kanban, CreditCard, LineChart, History, Shield,
  FileCheck, Play, PlusCircle, Milestone, CalendarRange
} from "lucide-react";
import NavSection from './navigation/NavSection';
import UserProfile from './navigation/UserProfile';
import { NavItemType } from './navigation/NavSection';

export type Role = "superadmin" | "billingAdmin" | "ProductOwner" | "scrumMaster" | "developer" | "tester";

interface SideNavProps {
  role?: Role;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const SideNav = ({ role = "ProductOwner", onCollapsedChange }: SideNavProps) => {
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
      roles: ["superadmin", "billingAdmin", "productOwner", "scrumMaster", "developer", "tester"]
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <GitBranch size={20} />,
      roles: ["superadmin", "productOwner", "scrumMaster"]
    },
    {
      name: "Backlog",
      path: "/product-owner/backlog",
      icon: <ListTodo size={20} />,
      roles: ["productOwner"]
    },
    {
      name: "Release Planning",
      path: "/release-planning",
      icon: <CalendarRange size={20} />,
      roles: ["productOwner"]
    },
    {
      name: "Value Metrics",
      path: "/value-metrics",
      icon: <BarChart3 size={20} />,
      roles: ["productOwner"]
    },
    {
      name: "Sprint Board",
      path: "/kanban",
      icon: <Kanban size={20} />,
      roles: ["scrumMaster"]
    },
    {
      name: "Team Capacity",
      path: "/teams",
      icon: <Users size={20} />,
      roles: ["scrumMaster"]
    },
    {
      name: "Burndown Chart",
      path: "/burndown-reports",
      icon: <LineChart size={20} />,
      roles: ["scrumMaster"]
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <BarChart3 size={20} />,
      roles: ["scrumMaster"]
    },
    {
      name: "Daily Standup",
      path: "/team-collaboration",
      icon: <Calendar size={20} />,
      roles: ["scrumMaster"]
    },
    {
      name: "Tasks",
      path: "/kanban",
      icon: <ListTodo size={20} />,
      roles: ["developer", "tester"]
    },
    {
      name: "Code",
      path: "/code",
      icon: <FileCode size={20} />,
      roles: ["developer"]
    },
    {
      name: "Pull Requests",
      path: "/pull-requests",
      icon: <GitBranch size={20} />,
      roles: ["developer"]
    },
    {
      name: "Report Bug",
      path: "/report-bug",
      icon: <Bug size={20} />,
      roles: ["developer"]
    },
    {
      name: "Bug Tracking",
      path: "/bugs",
      icon: <Bug size={20} />,
      roles: ["tester"]
    },
    {
      name: "Test Cases",
      path: "/test-cases",
      icon: <FileCheck size={20} />,
      roles: ["tester"]
    },
    {
      name: "Test Runs",
      path: "/test-runs",
      icon: <Play size={20} />,
      roles: ["tester"]
    },
    {
      name: "Coverage Reports",
      path: "/coverage",
      icon: <Shield size={20} />,
      roles: ["tester"]
    },
    {
      name: "User Management",
      path: "/role-management",
      icon: <Users size={20} />,
      roles: ["superadmin"]
    },
    {
      name: "Activity Logs",
      path: "/activity",
      icon: <History size={20} />,
      roles: ["superadmin"]
    },
    {
      name: "Billing",
      path: "/billing",
      icon: <CreditCard size={20} />,
      roles: ["billingAdmin"]
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

export default SideNav;
