
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BacklogItemType } from '@/types/backlog';
import InputField from './form-fields/InputField';
import TextareaField from './form-fields/TextareaField';
import SelectField from './form-fields/SelectField';
import { getStatusColor, getPriorityColor } from '@/utils/badgeStyles';

interface EditBacklogItemDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  item: BacklogItemType | null;
  onSave: (updatedItem: BacklogItemType) => void;
}

const EditBacklogItemDialog: React.FC<EditBacklogItemDialogProps> = ({
  isOpen,
  onOpenChange,
  item,
  onSave
}) => {
  const [editedItem, setEditedItem] = React.useState<BacklogItemType | null>(item);

  React.useEffect(() => {
    setEditedItem(item);
  }, [item]);

  if (!editedItem) return <Dialog open={isOpen} onOpenChange={onOpenChange} />;

  const handleChange = (field: keyof BacklogItemType, value: any) => {
    setEditedItem({
      ...editedItem,
      [field]: value
    });
  };

  const handleSave = () => {
    if (editedItem) {
      onSave(editedItem);
      onOpenChange(false);
    }
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

  const statusOptions = [
    { value: "unassigned", label: "Unassigned" },
    { value: "assigned", label: "Assigned" },
    { value: "blocked", label: "Blocked" },
    { value: "in-progress", label: "In Progress" },
    { value: "done", label: "Done" }
  ];

  const assigneeOptions = [
    { value: "unassigned", label: "Unassigned" },
    { value: "Dave Chen", label: "Dave Chen" },
    { value: "Maria Garcia", label: "Maria Garcia" },
    { value: "Alex Johnson", label: "Alex Johnson" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-3">
            <span className="font-mono text-sm">{editedItem.id}</span>
            Edit Backlog Item
          </DialogTitle>
          <DialogDescription>
            Make changes to the backlog item details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <InputField 
            id="title"
            label="Title"
            value={editedItem.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
          
          <TextareaField 
            id="description"
            label="Description"
            value={editedItem.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <SelectField 
            label="Type"
            value={editedItem.type}
            onValueChange={(value) => handleChange('type', value as BacklogItemType['type'])}
            options={typeOptions}
          />

          <SelectField 
            label="Priority"
            value={editedItem.priority}
            onValueChange={(value) => handleChange('priority', value as BacklogItemType['priority'])}
            options={priorityOptions}
            badgeClassName={getPriorityColor}
          />

          <InputField 
            id="businessValue"
            label="Business Value"
            type="number"
            min="0"
            max="100"
            value={editedItem.businessValue}
            onChange={(e) => handleChange('businessValue', parseInt(e.target.value))}
          />

          <InputField 
            id="effort"
            label="Effort"
            type="number"
            min="1"
            max="10"
            value={editedItem.effort}
            onChange={(e) => handleChange('effort', parseInt(e.target.value))}
          />

          <SelectField 
            label="Status"
            value={editedItem.status}
            onValueChange={(value) => handleChange('status', value as BacklogItemType['status'])}
            options={statusOptions}
            badgeClassName={getStatusColor}
          />

          <SelectField 
            label="Assignee"
            value={editedItem.assignee || "unassigned"}
            onValueChange={(value) => {
              if (value === "unassigned") {
                handleChange('assignee', undefined);
              } else {
                handleChange('assignee', value);
              }
            }}
            options={assigneeOptions}
            placeholder="Unassigned"
          />

          <InputField 
            id="tags"
            label="Tags"
            value={editedItem.tags.join(", ")}
            onChange={(e) => handleChange('tags', e.target.value.split(",").map(tag => tag.trim()))}
            placeholder="Comma-separated tags"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBacklogItemDialog;
