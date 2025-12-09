
import React, { useState } from 'react';
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBacklogItems } from '@/hooks/useBacklogItems';
import InputField from '@/components/backlog/form-fields/InputField';
import TextareaField from '@/components/backlog/form-fields/TextareaField';
import SelectField from '@/components/backlog/form-fields/SelectField';
import { BacklogItemType } from '@/types/backlog';

interface AddBacklogItemFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddBacklogItemForm: React.FC<AddBacklogItemFormProps> = ({
  isOpen,
  onOpenChange
}) => {
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<BacklogItemType['type']>("story");
  const [priority, setPriority] = useState<BacklogItemType['priority']>("medium");
  const [businessValue, setBusinessValue] = useState(50);
  const [effort, setEffort] = useState(3);
  const [tags, setTags] = useState<string[]>([]);

  const { createItem } = useBacklogItems();

  const handleAddNewItem = async () => {
    if (!title.trim()) return;

    await createItem({
      title,
      description,
      type,
      priority,
      businessValue,
      effort,
      status: "unassigned", // Add the required status field
      tags
    });

    // Reset form
    setTitle('');
    setDescription('');
    setType('story');
    setPriority('medium');
    setBusinessValue(50);
    setEffort(3);
    setTags([]);
    
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const typeOptions = [
    { value: "story", label: "User Story" },
    { value: "bug", label: "Bug" },
    { value: "task", label: "Task" },
    { value: "epic", label: "Epic" }
  ];

  const priorityOptions = [
    { value: "highest", label: "Highest" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
    { value: "lowest", label: "Lowest" }
  ];

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
          <InputField
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter item title"
          />
          
          <TextareaField
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter item description"
            rows={3}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Type"
              value={type}
              onValueChange={(value) => setType(value as BacklogItemType['type'])}
              options={typeOptions}
            />
            
            <SelectField
              label="Priority"
              value={priority}
              onValueChange={(value) => setPriority(value as BacklogItemType['priority'])}
              options={priorityOptions}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="businessValue"
              label="Business Value"
              type="number"
              min="0"
              max="100"
              value={businessValue}
              onChange={(e) => setBusinessValue(parseInt(e.target.value))}
            />
            
            <InputField
              id="effort"
              label="Effort"
              type="number"
              min="1"
              max="10"
              value={effort}
              onChange={(e) => setEffort(parseInt(e.target.value))}
            />
          </div>

          <InputField
            id="tags"
            label="Tags"
            value={tags.join(", ")}
            onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
            placeholder="Comma-separated tags"
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleAddNewItem}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBacklogItemForm;
