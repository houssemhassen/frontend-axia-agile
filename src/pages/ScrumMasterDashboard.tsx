import { useState } from "react";
import DashboardPageWrapper from "@/components/layout/DashboardPageWrapper";
import { MessageSquare, CalendarClock, LineChart, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WidgetGrid from "@/components/widgets/WidgetGrid";
import { useRoleWidgets } from "@/hooks/useRoleWidgets";
import ProjectSelector from "@/components/dashboard/scrummaster/ProjectSelector";
import SprintOverview from "@/components/dashboard/scrummaster/SprintOverview";
import QuickActions from "@/components/dashboard/scrummaster/QuickActions";

const ScrumMasterDashboard = () => {
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState("Mobile App v2.0");
  const widgets = useRoleWidgets("scrumMaster");

  // Mock data for demonstration  
  const stats = [
    {
      title: "Sprint Progress",
      value: "65%",
      icon: <CalendarClock className="h-5 w-5" />,
      change: "5 days remaining",
      trend: "up" as const
    },
    {
      title: "Team Velocity",
      value: "42",
      icon: <LineChart className="h-5 w-5" />,
      change: "+8 from last sprint",
      trend: "up" as const
    },
    {
      title: "Blocked Tasks",
      value: "7",
      icon: <AlertCircle className="h-5 w-5" />,
      change: "+2 since yesterday",
      trend: "up" as const
    },
    {
      title: "Completed Stories",
      value: "12",
      icon: <CheckCircle className="h-5 w-5" />,
      change: "4 remaining",
      trend: "up" as const
    }
  ];

  const sprintGoals = [
    {
      title: "Complete User Authentication",
      progress: 100,
      status: "Completed"
    },
    {
      title: "Implement Dashboard Analytics",
      progress: 80,
      status: "In Progress"
    },
    {
      title: "API Integration with Payment Gateway",
      progress: 60,
      status: "In Progress"
    },
    {
      title: "Fix Critical UI Bugs",
      progress: 30,
      status: "In Progress"
    }
  ];

  const upcomingMeetings = [
    {
      title: "Daily Stand-up",
      time: "10:00 AM",
      participants: 8
    },
    {
      title: "Backlog Refinement",
      time: "2:00 PM",
      participants: 6
    },
    {
      title: "Sprint Planning",
      time: "4:00 PM (Tomorrow)",
      participants: 10
    }
  ];

  const handleStartSprint = () => {
    navigate('/sprint-planning');
    toast.info("Starting sprint planning session");
  };

  const handleScheduleRetrospective = () => {
    toast.info("Scheduling sprint retrospective");
  };

  const handleViewBlockers = () => {
    navigate('/kanban');
    toast.info("Viewing blocked tasks");
  };

  return (
    <DashboardPageWrapper
      title="Scrum Master Dashboard | Axia Agile"
      description="Scrum master dashboard for agile project management"
    >
      <ProjectSelector activeProject={activeProject} />
      <WidgetGrid widgets={widgets} columns={4} />
      <SprintOverview 
        sprintGoals={sprintGoals}
        upcomingMeetings={upcomingMeetings}
        onScheduleRetrospective={handleScheduleRetrospective}
      />
      <QuickActions 
        onStartSprint={handleStartSprint}
        onScheduleRetrospective={handleScheduleRetrospective}
        onViewBlockers={handleViewBlockers}
      />
    </DashboardPageWrapper>
  );
};

export default ScrumMasterDashboard;