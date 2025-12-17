
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Search, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProjectMember {
  id: number;
  name: string;
  avatar: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  progress: number;
  endDate: string;
  team: string;
  priority: string;
  members: ProjectMember[];
}

interface ProjectListProps {
  projects?: Project[];
  onProjectClick: (projectId: number) => void;
  getPriorityColor: (priority: string) => string;
  getStatusBadge: (status: string) => JSX.Element;
  truncateText: (text: string, length: number) => string;
}

const ProjectList = ({
  projects,
  onProjectClick,
  getPriorityColor,
  getStatusBadge,
  truncateText
}: ProjectListProps) => {
  console.log('Rendering ProjectList with projects:', projects);
  if (projects?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-3">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium mb-1">No projects found</h3>
        <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[460px] pr-4">
      <div className="space-y-4">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
            onClick={() => onProjectClick(project.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {truncateText(project.description, 80)}
                </p>
              </div>
              {getStatusBadge(project.status)}
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            <div className="flex flex-wrap mt-4 gap-y-3 justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(project.endDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span>{project.team}</span>
              </div>

              <div className="flex items-center gap-1">
                <Badge variant="outline" className={getPriorityColor(project.priority)}>
                  {project.priority}
                </Badge>
              </div>

              {/*  <div className="flex -space-x-2">
                {project.members.slice(0, 3).map((member) => (
                  <Avatar key={member.id} className="border-2 border-background h-7 w-7">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {project.members.length > 3 && (
                  <div className="flex items-center justify-center rounded-full bg-muted text-muted-foreground h-7 w-7 text-xs">
                    +{project.members.length - 3}
                  </div>
                )}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProjectList;
