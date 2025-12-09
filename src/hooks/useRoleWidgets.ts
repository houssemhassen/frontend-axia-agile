import { useMemo, createElement } from "react";
import { 
  User, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  Users,
  Target,
  BarChart3,
  DollarSign,
  Activity,
  Server,
  Globe,
  Shield,
  Zap,
  PieChart,
  FileText,
  MessageSquare
} from "lucide-react";
import { WidgetData } from "@/components/widgets/DashboardWidget";

type Role = "developer" | "scrumMaster" | "productOwner" | "projectManager" | "superadmin" | "billingAdmin";

export const useRoleWidgets = (role: Role): WidgetData[] => {
  return useMemo(() => {
    switch (role) {
      case "developer":
        return [
          {
            id: "personal-velocity",
            title: "Personal Velocity",
            value: "8.5",
            icon: createElement(TrendingUp, { className: "h-5 w-5" }),
            change: "+1.2 from last sprint",
            trend: "up",
            description: "Story points per sprint"
          },
          {
            id: "assigned-tasks", 
            title: "Assigned Tasks",
            value: "12",
            icon: createElement(CheckCircle, { className: "h-5 w-5" }),
            change: "4 in progress",
            trend: "neutral",
            description: "Current sprint tasks"
          },
          {
            id: "personal-burndown",
            title: "Personal Burndown",
            value: "75%",
            icon: createElement(BarChart3, { className: "h-5 w-5" }),
            change: "On track for sprint goal",
            trend: "up",
            description: "Sprint progress"
          },
          {
            id: "code-commits",
            title: "Code Commits", 
            value: "23",
            icon: createElement(Activity, { className: "h-5 w-5" }),
            change: "+5 this week",
            trend: "up",
            description: "Weekly commits"
          }
        ];

      case "scrumMaster":
        return [
          {
            id: "team-velocity",
            title: "Team Velocity",
            value: "42",
            icon: createElement(Users, { className: "h-5 w-5" }),
            change: "+8 from last sprint",
            trend: "up",
            description: "Story points completed"
          },
          {
            id: "sprint-burndown",
            title: "Sprint Burndown",
            value: "65%",
            icon: createElement(TrendingUp, { className: "h-5 w-5" }),
            change: "5 days remaining",
            trend: "up",
            description: "Sprint progress"
          },
          {
            id: "team-performance",
            title: "Team Performance",
            value: "92%",
            icon: createElement(Target, { className: "h-5 w-5" }),
            change: "+3% this sprint",
            trend: "up", 
            description: "Sprint goal achievement"
          },
          {
            id: "retrospective-metrics",
            title: "Action Items",
            value: "7",
            icon: createElement(MessageSquare, { className: "h-5 w-5" }),
            change: "3 completed this sprint",
            trend: "down",
            description: "From last retrospective"
          }
        ];

      case "productOwner":
        return [
          {
            id: "product-burndown",
            title: "Product Burndown",
            value: "68%",
            icon: createElement(BarChart3, { className: "h-5 w-5" }),
            change: "Release on track",
            trend: "up",
            description: "Features completed"
          },
          {
            id: "feature-progress", 
            title: "Feature Progress",
            value: "15/23",
            icon: createElement(CheckCircle, { className: "h-5 w-5" }),
            change: "8 features remaining",
            trend: "up",
            description: "Current release"
          },
          {
            id: "roi-metrics",
            title: "ROI Metrics",
            value: "145%",
            icon: createElement(DollarSign, { className: "h-5 w-5" }),
            change: "+12% vs target",
            trend: "up",
            description: "Return on investment"
          },
          {
            id: "stakeholder-reports",
            title: "Stakeholder Satisfaction",
            value: "4.2/5",
            icon: createElement(User, { className: "h-5 w-5" }),
            change: "+0.3 this quarter",
            trend: "up",
            description: "Average rating"
          }
        ];

      case "projectManager":
        return [
          {
            id: "project-health",
            title: "Project Health",
            value: "87%",
            icon: createElement(Activity, { className: "h-5 w-5" }),
            change: "12 projects active",
            trend: "up",
            description: "Overall portfolio status"
          },
          {
            id: "resource-utilization",
            title: "Resource Utilization", 
            value: "82%",
            icon: createElement(Users, { className: "h-5 w-5" }),
            change: "48 team members",
            trend: "up",
            description: "Team capacity usage"
          },
          {
            id: "cross-team-metrics",
            title: "Cross-Team Velocity",
            value: "156",
            icon: createElement(TrendingUp, { className: "h-5 w-5" }),
            change: "+18 this sprint",
            trend: "up",
            description: "Combined team output"
          },
          {
            id: "milestone-tracking",
            title: "Milestone Progress",
            value: "94%",
            icon: createElement(Target, { className: "h-5 w-5" }),
            change: "On-time delivery",
            trend: "up",
            description: "Project milestones"
          }
        ];

      case "superadmin":
        return [
          {
            id: "system-health",
            title: "System Health",
            value: "99.2%",
            icon: createElement(Server, { className: "h-5 w-5" }),
            change: "All services operational",
            trend: "up",
            description: "System uptime"
          },
          {
            id: "user-management",
            title: "Active Users",
            value: "1,247",
            icon: createElement(Users, { className: "h-5 w-5" }),
            change: "+89 this month",
            trend: "up",
            description: "Platform users"
          },
          {
            id: "global-metrics",
            title: "Global Projects",
            value: "156",
            icon: createElement(Globe, { className: "h-5 w-5" }),
            change: "+12 this week", 
            trend: "up",
            description: "Active projects"
          },
          {
            id: "service-status",
            title: "Service Status",
            value: "9/9",
            icon: createElement(Shield, { className: "h-5 w-5" }),
            change: "All microservices online",
            trend: "up",
            description: "Microservice health"
          }
        ];

      case "billingAdmin":
        return [
          {
            id: "revenue-metrics",
            title: "Monthly Revenue",
            value: "$47,250",
            icon: createElement(DollarSign, { className: "h-5 w-5" }),
            change: "+12% vs last month",
            trend: "up",
            description: "Subscription revenue"
          },
          {
            id: "subscription-status",
            title: "Active Subscriptions",
            value: "342",
            icon: createElement(Zap, { className: "h-5 w-5" }),
            change: "+23 new this month",
            trend: "up",
            description: "Paying customers"
          },
          {
            id: "payment-analytics", 
            title: "Payment Success Rate",
            value: "98.7%",
            icon: createElement(PieChart, { className: "h-5 w-5" }),
            change: "+1.2% improvement",
            trend: "up",
            description: "Transaction success"
          },
          {
            id: "usage-reports",
            title: "Platform Usage",
            value: "89%",
            icon: createElement(FileText, { className: "h-5 w-5" }),
            change: "Feature adoption rate",
            trend: "up",
            description: "User engagement"
          }
        ];

      default:
        return [];
    }
  }, [role]);
};