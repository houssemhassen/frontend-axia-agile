
import { Plus, ListPlus } from "lucide-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import KanbanTaskCard from "./KanbanTaskCard";

interface KanbanItem {
  id: string;
  content: string;
  priority: "high" | "medium" | "low";
  assignee?: string;
  dueDate?: string;
}

interface KanbanColumnProps {
  id: string;
  title: string;
  items: KanbanItem[];
  onAddTask: (columnId: string) => void;
}

const KanbanColumn = ({ id, title, items, onAddTask }: KanbanColumnProps) => {
  return (
    <div className="kanban-column">
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center">
              {title}
              <Badge variant="outline" className="ml-2">
                {items.length}
              </Badge>
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onAddTask(id)}
            >
              <Plus size={14} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto px-4 pt-0 pb-4">
          <Droppable droppableId={id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[200px]"
              >
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[200px] border border-dashed border-gray-200 rounded-md">
                    <ListPlus className="text-muted-foreground h-8 w-8" />
                    <p className="text-sm text-muted-foreground mt-2">
                      No tasks
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => onAddTask(id)}
                    >
                      Add a task
                    </Button>
                  </div>
                ) : (
                  items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <KanbanTaskCard {...item} provided={provided} />
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardContent>
      </Card>
    </div>
  );
};

export default KanbanColumn;
