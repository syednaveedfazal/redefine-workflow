import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z.string().max(50).min(1, { message: "Name is required" }),
  description: z.string().max(80).optional(),
});

export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;

export const deleteWorkflowSchema = z.object({
  reason: z.string().min(5, { message: "reason required" }),
});
export type deleteWorkflowType = z.infer<typeof deleteWorkflowSchema>;
