"use server";
import {
  createWorkflowSchemaType,
  createWorkflowSchema,
} from "@/formSchema/workflow";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow-types";
export async function CreateWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const result = await prisma.workflow.create({
    data: {
      userId,
      definition: "Todo",
      status: WorkflowStatus.DRAFT,
      ...data,
    },
  });
  if (!result) {
    throw new Error("Failed to create workflow");
  }
  return `/workflows/editor/${result.id}`;
}
