"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow-types";
import { revalidatePath } from "next/cache";
export async function UpdateWorkflowName(
  // form: createWorkflowSchemaType,
  id: string,
  definition: string
) {
  // const { success, data } = createWorkflowSchema.safeParse(form);
  // if (!success) {
  //   throw new Error("Invalid form data");
  // }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const result = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!result) throw new Error("Workflow not found or access denied");
  if (result.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not in draft status");
  }
  const updatedFlow = await prisma.workflow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  });
  if (!updatedFlow) {
    throw new Error("Failed to create workflow");
  }
  // redirect(`/workflows`);
  revalidatePath(`/workflows`);
  return "done";
}
