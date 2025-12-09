
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProjectCreationForm from "./ProjectCreationForm";

interface CreateProjectModalProps {
  triggerClassName?: string;
}

const CreateProjectModal = ({ triggerClassName }: CreateProjectModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`flex items-center gap-2 ${triggerClassName}`}>
          <Plus size={16} />
          Create New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new agile project for your team.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <ProjectCreationForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
