// src/schema/UpdateTaskSchema.ts
import { z } from "zod";

export const UpdateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]),
  dueDate: z.date(),
  assignedEmails: z.array(z.string()).nullable(),
});

export type UpdateTaskSchemaType = z.infer<typeof UpdateTaskSchema>;
