
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SprintGoal {
  title: string;
  progress: number;
  status: string;
}

interface Meeting {
  title: string;
  time: string;
  participants: number;
}

interface SprintOverviewProps {
  sprintGoals: SprintGoal[];
  upcomingMeetings: Meeting[];
  onScheduleRetrospective: () => void;
}

const SprintOverview = ({ 
  sprintGoals, 
  upcomingMeetings, 
  onScheduleRetrospective 
}: SprintOverviewProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Sprint Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sprintGoals.map((goal, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{goal.title}</div>
                  <div className="text-sm font-medium">{goal.progress}%</div>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Status: {goal.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate('/sprint-planning')}
          >
            <PenLine size={16} className="mr-2" />
            Edit Sprint Goals
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-3">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="font-medium">{meeting.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {meeting.time} • {meeting.participants} participants
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full space-x-2">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={onScheduleRetrospective}
            >
              Schedule Retrospective
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => navigate('/standups')}
            >
              Schedule Stand-up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SprintOverview;
