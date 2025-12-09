
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface TaskItemProps {
  id: number;
  title: string;
  priority: string;
  status: string;
  due: string;
  project: string;
  progress: number;
}

const TaskItem = ({ id, title, priority, status, due, project, progress }: TaskItemProps) => {
  return (
    <div key={id} className="space-y-2 border border-border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-muted-foreground mt-1 flex items-center flex-wrap gap-2">
            <Badge variant={priority === "High" ? "destructive" : "outline"}>
              {priority}
            </Badge>
            <span className="text-muted-foreground">Due: {due}</span>
            <span className="text-muted-foreground">Project: {project}</span>
          </div>
        </div>
        <Badge variant={
          status === "In Progress" ? "secondary" : 
          status === "Done" ? "default" : 
          "outline"
        }>
          {status}
        </Badge>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-sm">Progress</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      <div className="flex justify-end space-x-2 pt-2">
        <Button size="sm" variant="ghost">Details</Button>
        <Button size="sm" variant="outline">Update Status</Button>
      </div>
    </div>
  );
};

export default TaskItem;
