import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseUserStoryManagement } from "@/hooks/UseUserStoryManagement";

interface AddUserStoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: number;
  backlogId: number;
  onSuccess: () => void;
}

export function AddUserStoryDialog({
  isOpen,
  onOpenChange,
  projectId,
  backlogId,
  onSuccess,
}: AddUserStoryDialogProps) {
  const { createUserStory, isCreating } = UseUserStoryManagement();
  const [newUserStory, setNewUserStory] = useState({
    title: "",
    description: "",
    acceptanceCriteria: "",
    status: "Pending",
    priority: "Medium",
  });

  const handleAddUserStory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUserStory({
        projectId,
        backlogId,
        data: {
          Title: newUserStory.title,
          Description: newUserStory.description,
          AcceptanceCriteria: newUserStory.acceptanceCriteria,
          Status: newUserStory.status,
          Priority: newUserStory.priority,
        },
      });

      // Reset form
      setNewUserStory({
        title: "",
        description: "",
        acceptanceCriteria: "",
        status: "Pending",
        priority: "Medium",
      });

      onOpenChange(false);
      onSuccess();
    } catch (error) {
      // Error is handled by the hook
      console.error("Error in form submission:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New User Story</DialogTitle>
          <DialogDescription>
            Fill in the necessary information to create a new User Story for backlog #{backlogId}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddUserStory} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Création d'un compte client"
              value={newUserStory.title}
              onChange={(e) => setNewUserStory({ ...newUserStory, title: e.target.value })}
              required
            />
            <p className="text-sm text-muted-foreground">
              A concise title that describes the purpose of the User Story.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="En tant que nouveau client,&#10;Je veux créer un compte personnel avec mon email et un mot de passe,&#10;Afin de suivre mes commandes et recevoir des offres personnalisées."
              value={newUserStory.description}
              onChange={(e) => setNewUserStory({ ...newUserStory, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={newUserStory.priority}
              onValueChange={(value) => setNewUserStory({ ...newUserStory, priority: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={newUserStory.status}
              onValueChange={(value) => setNewUserStory({ ...newUserStory, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="InProgress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Select the current status of the User Story.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="acceptanceCriteria">Acceptance Criteria</Label>
            <Textarea
              id="acceptanceCriteria"
              name="acceptanceCriteria"
              placeholder="Le formulaire demande un nom, prénom, email, mot de passe., Le mot de passe doit être validé (8 caractères min., 1 chiffre, 1 majuscule)., Un mail de validation est envoyé à l'adresse indiquée."
              value={newUserStory.acceptanceCriteria}
              onChange={(e) => setNewUserStory({ ...newUserStory, acceptanceCriteria: e.target.value })}
              rows={3}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create User Story"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}