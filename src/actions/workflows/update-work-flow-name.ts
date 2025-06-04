"use server";
import {
  createWorkflowSchemaType,
  createWorkflowSchema,
} from "@/formSchema/workflow";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
export async function UpdateWorkflowName(
  form: createWorkflowSchemaType,
  id: string
) {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const result = prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
  if (!result) {
    throw new Error("Failed to create workflow");
  }
  redirect(`/workflows`);
}
