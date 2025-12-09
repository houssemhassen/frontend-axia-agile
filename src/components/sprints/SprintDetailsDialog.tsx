
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, CircleDashed, Users, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SprintDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  sprint: {
    id: number;
    name: string;
    project: string;
    startDate: string;
    endDate: string;
    progress?: number;
    status: string;
    tasksCompleted?: number;
    totalTasks?: number;
    teamMembers: number;
    velocity?: number;
  } | null;
}

export function SprintDetailsDialog({ isOpen, onClose, sprint }: SprintDetailsProps) {
  const navigate = useNavigate();
  
  if (!sprint) return null;
  
  const handleOpenSprintBoard = () => {
    toast.success("Opening Sprint Board", {
      description: "Navigating to the sprint board..."
    });
    
    // In a real app, this would navigate to a detailed sprint board
    // For now, we redirect to the sprint board page with appropriate parameters
    const userRole = localStorage.getItem("userRole") || "scrumMaster";
    navigate(`/sprint-board?sprintId=${sprint.id}`, { state: { role: userRole } });
  };
  
  const handleEditSprint = () => {
    toast.info("Edit Sprint", {
      description: "Opening sprint edit form..."
    });
    // This would open a sprint edit form in a real app
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">{sprint.name}</DialogTitle>
            <Badge className={sprint.status === "Active" ? "bg-green-500" : sprint.status === "Planning" ? "border-blue-500 text-blue-500" : "border-gray-500 text-gray-500"}>
              {sprint.status}
            </Badge>
          </div>
          <DialogDescription>
            {sprint.project}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-muted-foreground">Duration</p>
                <p>{sprint.startDate} — {sprint.endDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-muted-foreground">Team Members</p>
                <p>{sprint.teamMembers} members</p>
              </div>
            </div>
          </div>
          
          {sprint.progress !== undefined && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium">Sprint Progress</p>
                    <p className="text-sm">{sprint.progress}%</p>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${sprint.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {sprint.tasksCompleted !== undefined && sprint.totalTasks !== undefined && (
                  <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>{sprint.tasksCompleted} Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleDashed size={16} className="text-amber-500" />
                      <span>{sprint.totalTasks - sprint.tasksCompleted} Remaining</span>
                    </div>
                  </div>
                )}
                
                {sprint.velocity !== undefined && (
                  <div className="flex items-center gap-2 text-sm mt-4">
                    <Clock size={16} className="text-blue-500" />
                    <span>Team Velocity: {sprint.velocity} points</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          <div className="bg-muted/40 p-4 rounded-md">
            <h4 className="text-sm font-medium mb-2">Sprint Goals</h4>
            <p className="text-sm text-muted-foreground">
              {sprint.status === "Planning"
                ? "This sprint is currently in the planning phase. No goals have been set yet."
                : "Complete the planned user stories and resolve technical debt while maintaining code quality standards."}
            </p>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Key Deliverables</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                <li>Feature implementation</li>
                <li>Bug fixes</li>
                <li>Documentation updates</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                <li>Daily Stand-ups</li>
                <li>Sprint Review</li>
                <li>Sprint Retrospective</li>
              </ul>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-4 flex justify-between">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <div className="space-x-2">
            {sprint.status !== "Completed" && (
              <Button variant="outline" onClick={handleEditSprint}>
                Edit Sprint
              </Button>
            )}
            {sprint.status === "Active" && (
              <Button onClick={handleOpenSprintBoard}>Sprint Board</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
