import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { UseBacklogManagement } from "@/hooks/UseBacklogManagement";
import { CreateBacklogData } from "@/types/backlogs";

const backlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  status: z.enum(["To Do", "In Progress", "Review", "Done"]),
  estimatedHours: z.string().optional(),
});

type BacklogFormValues = z.infer<typeof backlogSchema>;

interface AddBacklogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: number;
  members?: Array<{ id: string; firstName: string; lastName: string }>;
}

export const AddBacklogDialog = ({
  open,
  onOpenChange,
  projectId,
  members = [],
}: AddBacklogDialogProps) => {
  const { createBacklog, isCreating } = UseBacklogManagement();

  const form = useForm<BacklogFormValues>({
    resolver: zodResolver(backlogSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      status: "To Do",
      estimatedHours: "",
    },
  });

  const onSubmit = async (data: BacklogFormValues) => {
    try {
      const backlogData: CreateBacklogData = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        projectId: projectId,
        estimatedHours: data.estimatedHours ? parseFloat(data.estimatedHours) : undefined,
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Backlog Item</DialogTitle>
          <DialogDescription>
            Create a new backlog item for this project. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter backlog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Review">Review</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="estimatedHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Hours (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="e.g., 8"
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
                onClick={() => onOpenChange(false)}
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