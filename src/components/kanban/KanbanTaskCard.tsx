
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface KanbanTaskCardProps {
  id: string;
  content: string;
  priority: "high" | "medium" | "low";
  assignee?: string;
  dueDate?: string;
  provided: any;
}

const KanbanTaskCard = ({ id, content, priority, assignee, dueDate, provided }: KanbanTaskCardProps) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="mb-3 select-none"
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-3">
          <div className="flex justify-between items-start mb-2">
            <div className="w-full">
              <div className="flex justify-between items-start w-full">
                <p className="font-medium text-sm break-words flex-1">
                  {content}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-1 -mr-1 -mt-1"
                >
                  <MoreHorizontal size={14} />
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <Badge
                  className={
                    priority === "high"
                      ? "bg-red-500"
                      : priority === "medium"
                      ? "bg-amber-500"
                      : "bg-green-500"
                  }
                >
                  {priority}
                </Badge>
                {dueDate && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              {assignee && (
                <div className="mt-2 text-xs text-muted-foreground flex items-center">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-1 text-[10px] font-semibold">
                    {assignee.split(" ").map(name => name[0]).join("")}
                  </div>
                  {assignee}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KanbanTaskCard;
