
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface NewTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: () => void;
  columnTitle?: string;
  taskName: string;
  setTaskName: (name: string) => void;
  taskDescription: string;
  setTaskDescription: (desc: string) => void;
  taskPriority: "high" | "medium" | "low";
  setTaskPriority: (priority: "high" | "medium" | "low") => void;
}

const NewTaskDialog = ({
  open,
  onOpenChange,
  onAddTask,
  columnTitle,
  taskName,
  setTaskName,
  taskDescription,
  setTaskDescription,
  taskPriority,
  setTaskPriority
}: NewTaskDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Add a new task to the {columnTitle} column.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="task-name">Task Name</Label>
            <Input
              id="task-name"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-description">Description (Optional)</Label>
            <Textarea
              id="task-description"
              placeholder="Enter task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-priority">Priority</Label>
            <select
              id="task-priority"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value as any)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onAddTask} disabled={!taskName.trim()}>
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
