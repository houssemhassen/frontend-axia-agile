import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { UseBacklogManagement } from "@/hooks/UseBacklogManagement";
import { CreateBacklogData } from "@/types/backlogs";

// Schema très simple - juste le nom
const backlogSchema = z.object({
  Nom: z.string().min(3, "Backlog name must be at least 3 characters"),
});

type BacklogFormValues = z.infer<typeof backlogSchema>;

interface AddBacklogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: number;
}

export const AddBacklogDialog = ({
  open,
  onOpenChange,
  projectId,
}: AddBacklogDialogProps) => {
  const { createBacklog, isCreating } = UseBacklogManagement();

  const form = useForm<BacklogFormValues>({
    resolver: zodResolver(backlogSchema),
    defaultValues: {
      Nom: "",
    },
  });

  const onSubmit = async (data: BacklogFormValues) => {
    try {
      const backlogData: CreateBacklogData = {
        Nom: data.Nom,
        ProjetId: projectId,
        UserStoryId: 0, // Valeur par défaut
      };

      await createBacklog(backlogData);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating backlog:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Backlog</DialogTitle>
          <DialogDescription>
            Create a new backlog for this project. Enter a name for the backlog.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="Nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Backlog Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Sprint 1 Backlog, Feature X Backlog" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Backlog
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};