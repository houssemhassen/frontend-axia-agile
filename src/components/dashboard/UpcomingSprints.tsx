
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarClock, CalendarDays, Users } from "lucide-react";

const UpcomingSprints = () => {
  const sprints = [
    {
      id: 1,
      name: "Sprint 14",
      startDate: "Oct 10, 2023",
      endDate: "Oct 24, 2023",
      status: "active",
      progress: 35,
      project: "Mobile App Redesign",
      stories: 18,
      tasks: 47,
      team: "Mobile Team"
    },
    {
      id: 2,
      name: "Sprint 8",
      startDate: "Oct 15, 2023",
      endDate: "Oct 29, 2023",
      status: "planning",
      progress: 0,
      project: "E-commerce Platform",
      stories: 12,
      tasks: 32,
      team: "Web Team"
    },
    {
      id: 3,
      name: "Sprint 5",
      startDate: "Oct 20, 2023",
      endDate: "Nov 3, 2023",
      status: "planning",
      progress: 0,
      project: "Analytics Dashboard",
      stories: 8,
      tasks: 21,
      team: "Analytics Team"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'planning':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Planning</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-green-500 text-green-500">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {sprints.map((sprint) => (
        <div key={sprint.id} className="border border-border rounded-lg p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{sprint.name}</h3>
                {getStatusBadge(sprint.status)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {sprint.project}
              </p>
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>{sprint.startDate} - {sprint.endDate}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-medium">{sprint.stories}</span> User Stories, <span className="font-medium">{sprint.tasks}</span> Tasks
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{sprint.team}</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{sprint.progress}%</span>
              </div>
              <Progress value={sprint.progress} className="h-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingSprints;
