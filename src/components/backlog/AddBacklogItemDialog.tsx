
import React from 'react';
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddBacklogItemDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newItemTitle: string;
  setNewItemTitle: (title: string) => void;
  newItemDescription: string;
  setNewItemDescription: (description: string) => void;
  newItemType: "story" | "bug" | "task" | "epic";
  setNewItemType: (type: "story" | "bug" | "task" | "epic") => void;
  newItemPriority: "highest" | "high" | "medium" | "low" | "lowest";
  setNewItemPriority: (priority: "highest" | "high" | "medium" | "low" | "lowest") => void;
  onAddNewItem: () => void;
}

const AddBacklogItemDialog: React.FC<AddBacklogItemDialogProps> = ({
  isOpen,
  onOpenChange,
  newItemTitle,
  setNewItemTitle,
  newItemDescription,
  setNewItemDescription,
  newItemType,
  setNewItemType,
  newItemPriority,
  setNewItemPriority,
  onAddNewItem
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Backlog Item</DialogTitle>
          <DialogDescription>
            Create a new item for your product backlog.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              placeholder="Enter item title"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              value={newItemDescription}
              onChange={(e) => setNewItemDescription(e.target.value)}
              placeholder="Enter item description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">Type</label>
              <Select value={newItemType} onValueChange={(value: any) => setNewItemType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="story">User Story</SelectItem>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">Priority</label>
              <Select value={newItemPriority} onValueChange={(value: any) => setNewItemPriority(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highest">Highest</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="lowest">Lowest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onAddNewItem}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBacklogItemDialog;
