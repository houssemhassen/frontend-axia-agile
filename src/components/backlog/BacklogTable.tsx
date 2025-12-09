
import React from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { 
  ListCheck, 
  AlertCircle, 
  Edit, 
  Trash2,
  UserPlus,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface BacklogItemType {
  id: string;
  title: string;
  description: string;
  type: "story" | "bug" | "task" | "epic";
  priority: "highest" | "high" | "medium" | "low" | "lowest";
  businessValue: number;
  effort: number;
  status: "unassigned" | "assigned" | "blocked" | "in-progress" | "done";
  assignee?: string;
  createdAt: string;
  tags: string[];
  order: number;
}

interface BacklogTableProps {
  filteredItems: BacklogItemType[];
  onDragEnd: (result: any) => void;
  onItemClick: (itemId: string) => void;
  totalItems: number;
  onEdit?: (id: string, e: React.MouseEvent) => void;
  onChangePriority?: (id: string, priority: BacklogItemType['priority'], e: React.MouseEvent) => void;
  onAssign?: (id: string, user: string, e: React.MouseEvent) => void;
  onDelete?: (id: string, e: React.MouseEvent) => void;
}

const BacklogTable: React.FC<BacklogTableProps> = ({ 
  filteredItems, 
  onDragEnd, 
  onItemClick,
  totalItems,
  onEdit,
  onChangePriority,
  onAssign,
  onDelete
}) => {
  const priorityColors: Record<string, string> = {
    highest: "bg-red-100 text-red-800 hover:bg-red-100",
    high: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    low: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    lowest: "bg-gray-100 text-gray-800 hover:bg-gray-100"
  };

  const typeIcons: Record<string, React.ReactNode> = {
    story: <ListCheck size={14} />,
    bug: <AlertCircle size={14} />,
    task: <ListCheck size={14} />,
    epic: <ListCheck size={14} />
  };

  const statusColors: Record<string, string> = {
    unassigned: "bg-gray-100 text-gray-800",
    assigned: "bg-blue-100 text-blue-800",
    blocked: "bg-red-100 text-red-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    done: "bg-green-100 text-green-800"
  };

  const handleEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(id, e);
    } else {
      onItemClick(id);
    }
  };

  const handleChangePriority = (id: string, priority: "highest" | "high" | "medium" | "low" | "lowest", e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChangePriority) {
      onChangePriority(id, priority, e);
    }
  };

  const handleAssign = (id: string, user: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAssign) {
      onAssign(id, user, e);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id, e);
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="backlog-items">
            {(provided) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead className="w-1/3">Title</TableHead>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead className="w-[100px]">Priority</TableHead>
                    <TableHead className="w-[100px] text-center">Business Value</TableHead>
                    <TableHead className="w-[80px] text-center">Effort</TableHead>
                    <TableHead className="w-[120px]">Status</TableHead>
                    <TableHead className="w-[120px]">Assignee</TableHead>
                    <TableHead className="w-[120px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => onItemClick(item.id)}
                          className="cursor-pointer"
                        >
                          <TableCell className="font-mono text-xs">{item.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                                {item.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {typeIcons[item.type]}
                              <span className="ml-1">{item.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={priorityColors[item.priority]}>
                              {item.priority}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{item.businessValue}</TableCell>
                          <TableCell className="text-center">{item.effort}</TableCell>
                          <TableCell>
                            <div className={statusColors[item.status]}>
                              {item.status.replace("-", " ")}
                            </div>
                          </TableCell>
                          <TableCell>{item.assignee || "—"}</TableCell>
                          <TableCell>
                            <div className="flex justify-end space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={(e) => handleEdit(item.id, e)}
                                className="h-8 w-8"
                              >
                                <Edit size={14} />
                              </Button>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ArrowUp size={14} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={(e) => handleChangePriority(item.id, "highest", e)}>
                                    Highest
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => handleChangePriority(item.id, "high", e)}>
                                    High
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => handleChangePriority(item.id, "medium", e)}>
                                    Medium
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => handleChangePriority(item.id, "low", e)}>
                                    Low
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => handleChangePriority(item.id, "lowest", e)}>
                                    Lowest
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <UserPlus size={14} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={(e) => handleAssign(item.id, "Dave Chen", e)}>
                                    Dave Chen
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => handleAssign(item.id, "Maria Garcia", e)}>
                                    Maria Garcia
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => handleAssign(item.id, "Alex Johnson", e)}>
                                    Alex Johnson
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={(e) => handleAssign(item.id, "unassigned", e)}>
                                    Unassign
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={(e) => handleDelete(item.id, e)}
                                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
      <CardFooter className="flex justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredItems.length} of {totalItems} items
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BacklogTable;
