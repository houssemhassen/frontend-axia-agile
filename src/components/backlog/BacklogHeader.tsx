
import React, { useState } from 'react';
import { Search, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BacklogHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  onAddItem: () => void;
  quickAddMode: boolean;
  setQuickAddMode: (mode: boolean) => void;
  quickAddInput: string;
  setQuickAddInput: (input: string) => void;
  handleQuickAdd: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const BacklogHeader: React.FC<BacklogHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  onAddItem,
  quickAddMode,
  setQuickAddMode,
  quickAddInput,
  setQuickAddInput,
  handleQuickAdd
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div className="flex flex-col sm:flex-row gap-2 flex-1">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search backlog items..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="highest">Highest</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="lowest">Lowest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        {quickAddMode ? (
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter story title and press Enter"
              value={quickAddInput}
              onChange={(e) => setQuickAddInput(e.target.value)}
              onKeyDown={handleQuickAdd}
              autoFocus
              className="w-64"
            />
            <Button variant="ghost" size="sm" onClick={() => setQuickAddMode(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <Button onClick={() => setQuickAddMode(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Quick Add
            </Button>
            <Button onClick={onAddItem}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default BacklogHeader;
