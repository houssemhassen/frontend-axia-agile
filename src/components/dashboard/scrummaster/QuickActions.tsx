
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, Users, MessageSquare, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickActionsProps {
  onStartSprint: () => void;
  onScheduleRetrospective: () => void;
  onViewBlockers: () => void;
}

const QuickActions = ({ 
  onStartSprint, 
  onScheduleRetrospective, 
  onViewBlockers 
}: QuickActionsProps) => {
  const navigate = useNavigate();

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
            onClick={onStartSprint}
          >
            <CalendarClock size={24} />
            <span>Sprint Planning</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            onClick={() => navigate('/standups')}
          >
            <Users size={24} />
            <span>Daily Stand-up</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            onClick={onScheduleRetrospective}
          >
            <MessageSquare size={24} />
            <span>Retrospective</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            onClick={onViewBlockers}
          >
            <AlertCircle size={24} />
            <span>View Blockers</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
