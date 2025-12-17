
import { Calendar, Clock, Users } from "lucide-react";

interface Project {
  id: number;
  status: string;
}

interface ProjectStatsProps {
  projectsData?: Project[];
}

const ProjectStats = ({ projectsData }: ProjectStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col">
        <span className="text-xl font-bold">{projectsData.length}</span>
        <span className="text-xs text-muted-foreground">Total Projects</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold">
          {projectsData.filter(p => p.status === "In Progress").length}
        </span>
        <span className="text-xs text-muted-foreground">Active Projects</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold">
          {projectsData.filter(p => p.status === "Completed").length}
        </span>
        <span className="text-xs text-muted-foreground">Completed</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold">
          {projectsData.filter(p => p.status === "Planning").length}
        </span>
        <span className="text-xs text-muted-foreground">Planning</span>
      </div>
    </div>
  );
};

export default ProjectStats;
