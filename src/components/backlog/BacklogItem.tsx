
import React from 'react';
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface BacklogItemProps {
  id: string;
  title: string;
  description: string;
  type: "story" | "bug" | "task" | "epic";
  priority: "highest" | "high" | "medium" | "low" | "lowest";
  businessValue: number;
  effort: number;
  status: "unassigned" | "assigned" | "blocked" | "in-progress" | "done";
  assignee?: string;
  isDragging: boolean;
  onClick: () => void;
  priorityColors: Record<string, string>;
  typeIcons: Record<string, React.ReactNode>;
  statusColors: Record<string, string>;
}

const BacklogItem: React.FC<BacklogItemProps> = ({
  id, 
  title, 
  description, 
  type, 
  priority, 
  businessValue, 
  effort, 
  status, 
  assignee, 
  isDragging,
  onClick,
  priorityColors,
  typeIcons,
  statusColors
}) => {
  return (
    <TableRow 
      className={`${isDragging ? "bg-muted opacity-70" : ""}`}
      onClick={onClick}
    >
      <TableCell className="font-mono text-xs">{id}</TableCell>
      <TableCell>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
            {description}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="flex items-center gap-1">
          {typeIcons[type]}
          <span>{type}</span>
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className={priorityColors[priority]}>
          {priority}
        </Badge>
      </TableCell>
      <TableCell>{businessValue}</TableCell>
      <TableCell>{effort}</TableCell>
      <TableCell>
        <Badge className={statusColors[status]}>
          {status.replace("-", " ")}
        </Badge>
      </TableCell>
      <TableCell>{assignee || "—"}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon">
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Change Priority</DropdownMenuItem>
            <DropdownMenuItem>Assign</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default BacklogItem;
