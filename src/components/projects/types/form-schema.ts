import * as z from "zod";

export const projectSchema = z.object({
  name: z.string().min(3, { message: "Project name must be at least 3 characters" }),
  description: z.string().optional(),
  methodology: z.enum(["Scrum", "Kanban", "XP"]),
  team: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(["NotStarted", "InProgress", "Completed", "OnHold"]).default("NotStarted"),
  priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}