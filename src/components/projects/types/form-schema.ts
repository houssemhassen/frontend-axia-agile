
import * as z from "zod";

export const projectSchema = z.object({
  name: z.string().min(3, { message: "Project name must be at least 3 characters" }),
  description: z.string().optional(),
  methodology: z.enum(["scrum", "kanban", "hybrid", "waterfall", "safe"]),
  team: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.string().default("Planning"),
  priority: z.string().default("Medium"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}
