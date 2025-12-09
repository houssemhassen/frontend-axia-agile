
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import TaskItem from "./TaskItem";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  due: string;
  project: string;
  progress: number;
}

interface MyTasksTabProps {
  tasks: Task[];
}

const MyTasksTab = ({ tasks }: MyTasksTabProps) => {
  const navigate = useNavigate();
  
  const handleViewKanban = () => {
    navigate('/kanban');
    toast.info("Viewing Kanban board");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Assigned Tasks</h3>
          <Button 
            variant="outline" 
            onClick={handleViewKanban}
          >
            View Kanban
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {tasks.map((task) => (
            <TaskItem key={task.id} {...task} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleViewKanban}>
          View All Tasks
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyTasksTab;
