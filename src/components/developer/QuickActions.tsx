
import { Bug, Clock, GitBranch, Kanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();
  
  const handleViewKanban = () => {
    navigate('/kanban');
    toast.info("Viewing Kanban board");
  };

  const handleLogTime = () => {
    toast.info("Opening time logging dialog");
  };

  const handleCreatePR = () => {
    toast.info("Creating new pull request");
  };

  const handleReportBug = () => {
    toast.info("Reporting new bug");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            onClick={handleViewKanban}
          >
            <Kanban size={24} />
            <span>Kanban Board</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            onClick={handleCreatePR}
          >
            <GitBranch size={24} />
            <span>Create PR</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            onClick={handleLogTime}
          >
            <Clock size={24} />
            <span>Log Time</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            onClick={handleReportBug}
          >
            <Bug size={24} />
            <span>Report Bug</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
