
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Plus, Filter } from "lucide-react";
import { DragDropContext } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import KanbanColumn from "@/components/kanban/KanbanColumn";
import NewTaskDialog from "@/components/kanban/NewTaskDialog";

// Define types for kanban items
interface KanbanItem {
  id: string;
  content: string;
  priority: "high" | "medium" | "low";
  assignee?: string;
  dueDate?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
}

const KanbanBoard = () => {
  const location = useLocation();
  const [role, setRole] = useState<string>("scrumMaster");
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState<"high" | "medium" | "low">("medium");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBoard, setFilteredBoard] = useState<KanbanColumn[]>([]);

  // Initialize board state
  const [board, setBoard] = useState<KanbanColumn[]>([
    {
      id: "backlog",
      title: "Backlog",
      items: [
        { 
          id: "task-1", 
          content: "Research user authentication methods", 
          priority: "high",
          assignee: "Alex Johnson",
          dueDate: "2023-10-10"
        },
        { 
          id: "task-2", 
          content: "Create wireframes for dashboard", 
          priority: "medium",
          assignee: "Emma Thompson",
          dueDate: "2023-10-12"
        },
        { 
          id: "task-3", 
          content: "Set up CI/CD pipeline", 
          priority: "low",
          assignee: "Dave Chen",
          dueDate: "2023-10-15"
        },
      ]
    },
    {
      id: "inprogress",
      title: "In Progress",
      items: [
        { 
          id: "task-4", 
          content: "Implement user onboarding flow", 
          priority: "high",
          assignee: "Maria Rodriguez",
          dueDate: "2023-10-08"
        },
        { 
          id: "task-5", 
          content: "Refactor authentication service", 
          priority: "medium",
          assignee: "Dave Chen",
          dueDate: "2023-10-09"
        },
      ]
    },
    {
      id: "review",
      title: "In Review",
      items: [
        { 
          id: "task-6", 
          content: "Fix responsive design issues", 
          priority: "low",
          assignee: "Emma Thompson",
          dueDate: "2023-10-07"
        },
      ]
    },
    {
      id: "done",
      title: "Done",
      items: [
        { 
          id: "task-7", 
          content: "Create project documentation", 
          priority: "medium",
          assignee: "Sam Wilson",
          dueDate: "2023-10-05"
        },
        { 
          id: "task-8", 
          content: "Update dependencies", 
          priority: "low",
          assignee: "Dave Chen",
          dueDate: "2023-10-02"
        },
      ]
    }
  ]);

  // Effect to update role based on location state or localStorage
  useEffect(() => {
    const stateRole = location.state?.role;
    const storedRole = localStorage.getItem("userRole");
    
    if (stateRole) {
      setRole(stateRole);
    } else if (storedRole) {
      setRole(storedRole);
    }
    
    setFilteredBoard(board);
  }, [location]);

  // Effect to filter board based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBoard(board);
      return;
    }

    const filtered = board.map(column => {
      return {
        ...column,
        items: column.items.filter(item => 
          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.assignee && item.assignee.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      };
    });

    setFilteredBoard(filtered);
  }, [searchQuery, board]);

  // Handle drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    
    // Find source and destination columns
    const sourceColumn = board.find(col => col.id === source.droppableId);
    const destColumn = board.find(col => col.id === destination.droppableId);
    
    if (!sourceColumn || !destColumn) return;
    
    // Create new arrays to avoid direct state mutation
    const sourceItems = [...sourceColumn.items];
    const destItems = source.droppableId === destination.droppableId 
      ? sourceItems 
      : [...destColumn.items];
    
    // Remove from source
    const [removed] = sourceItems.splice(source.index, 1);
    
    // Insert into destination
    destItems.splice(destination.index, 0, removed);
    
    // Update board state
    const newBoard = board.map(col => {
      if (col.id === source.droppableId) {
        return {
          ...col,
          items: sourceItems
        };
      }
      
      if (col.id === destination.droppableId) {
        return {
          ...col,
          items: destItems
        };
      }
      
      return col;
    });
    
    setBoard(newBoard);
    
    toast.success(
      source.droppableId === destination.droppableId
        ? "Task reordered"
        : `Task moved to ${destColumn.title}`,
      {
        description: `Task "${removed.content}" updated`
      }
    );
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (!selectedColumn || !taskName.trim()) return;
    
    const newTask: KanbanItem = {
      id: `task-${Date.now()}`,
      content: taskName,
      priority: taskPriority,
      dueDate: new Date().toISOString().split('T')[0]
    };
    
    const newBoard = board.map(column => {
      if (column.id === selectedColumn) {
        return {
          ...column,
          items: [...column.items, newTask]
        };
      }
      return column;
    });
    
    setBoard(newBoard);
    
    // Reset form
    setTaskName("");
    setTaskDescription("");
    setTaskPriority("medium");
    setSelectedColumn(null);
    setShowNewTaskDialog(false);
    
    toast.success("Task added", {
      description: `"${taskName}" added to ${board.find(col => col.id === selectedColumn)?.title}`
    });
  };

  // Handle opening the new task dialog
  const handleOpenNewTaskDialog = (columnId: string) => {
    setSelectedColumn(columnId);
    setShowNewTaskDialog(true);
  };

  return (
    <>
      <Helmet>
        <title>Kanban Board | Axia Agile</title>
        <meta name="description" content="Axia Agile kanban board for agile project management" />
      </Helmet>

      <div className="space-y-8 animate-fade-in">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Kanban Board</h1>
            <p className="text-muted-foreground">
              Visualize and manage your tasks with this interactive kanban board
            </p>
          </div>
          <div className="mt-4 flex space-x-3 md:mt-0">
            <div className="relative">
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                  onClick={() => setSearchQuery("")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              )}
            </div>
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => toast.info("Filters coming soon!")}
            >
              <Filter size={16} />
              Filter
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={() => handleOpenNewTaskDialog("backlog")}
            >
              <Plus size={16} />
              Add Task
            </Button>
          </div>
        </div>

        {/* Kanban board */}
        <div className="kanban-board grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DragDropContext onDragEnd={onDragEnd}>
            {filteredBoard.map(column => (
              <KanbanColumn 
                key={column.id}
                id={column.id}
                title={column.title}
                items={column.items}
                onAddTask={handleOpenNewTaskDialog}
              />
            ))}
          </DragDropContext>
        </div>
      </div>

      {/* New Task Dialog */}
      <NewTaskDialog
        open={showNewTaskDialog}
        onOpenChange={setShowNewTaskDialog}
        onAddTask={handleAddTask}
        columnTitle={board.find(col => col.id === selectedColumn)?.title}
        taskName={taskName}
        setTaskName={setTaskName}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        taskPriority={taskPriority}
        setTaskPriority={setTaskPriority}
      />
    </>
  );
};

export default KanbanBoard;
