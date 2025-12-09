
import React from 'react';
import { PlusCircle, Pencil, ArrowUp, ArrowDown, UserPlus, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BacklogItemType } from '@/types/backlog';

interface BacklogListViewProps {
  backlogItems: BacklogItemType[];
  priorityColors: Record<string, string>;
  statusColors: Record<string, string>;
  onEditItem: (id: string, e?: React.MouseEvent) => void;
  onChangePriority: (id: string, priority: BacklogItemType['priority']) => void;
  onAssign: (id: string, user: string) => void;
  onDelete: (id: string, e?: React.MouseEvent) => void;
}

const BacklogListView: React.FC<BacklogListViewProps> = ({
  backlogItems,
  priorityColors,
  statusColors,
  onEditItem,
  onChangePriority,
  onAssign,
  onDelete
}) => {
  // Helper function to determine next priority level
  const getNextPriority = (currentPriority: BacklogItemType['priority']): BacklogItemType['priority'] => {
    const priorityLevels: BacklogItemType['priority'][] = ["highest", "high", "medium", "low", "lowest"];
    const currentIndex = priorityLevels.indexOf(currentPriority);
    
    // Toggle between increasing and decreasing priority
    if (currentIndex <= 1) { // highest or high
      return priorityLevels[currentIndex + 1]; // decrease priority
    } else {
      return priorityLevels[Math.max(0, currentIndex - 1)]; // increase priority
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Story</TableHead>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead className="w-[100px] text-center">Business Value</TableHead>
              <TableHead className="w-[80px] text-center">Effort</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[120px]">Assignee</TableHead>
              <TableHead className="w-[150px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {backlogItems.map((item) => (
              <TableRow key={item.id} className="cursor-pointer hover:bg-muted" onClick={() => onEditItem(item.id)}>
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell className="font-medium">
                  <div>
                    <p>{item.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                      {item.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={priorityColors[item.priority]}>
                    {item.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{item.businessValue}</TableCell>
                <TableCell className="text-center">{item.effort}</TableCell>
                <TableCell>
                  <Badge className={statusColors[item.status]}>
                    {item.status.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{item.assignee || "—"}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={(e) => onEditItem(item.id, e)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => {
                      e.stopPropagation();
                      const newPriority = getNextPriority(item.priority);
                      onChangePriority(item.id, newPriority);
                    }}>
                      {item.priority === "highest" || item.priority === "high" ? (
                        <ArrowDown className="h-4 w-4" />
                      ) : (
                        <ArrowUp className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => {
                      e.stopPropagation();
                      onAssign(item.id, item.assignee ? "" : "Dave Chen");
                    }}>
                      <UserPlus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => onDelete(item.id, e)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Showing {backlogItems.length} of {backlogItems.length} backlog items. 
          {backlogItems.length > 10 && (
            <Button variant="link" className="p-0 h-auto ml-1">
              View all
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BacklogListView;
