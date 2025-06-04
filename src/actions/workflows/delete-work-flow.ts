"use server";

import { deleteWorkflowType } from "@/formSchema/workflow";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function DeleteWorkflow(form: deleteWorkflowType, id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const workflow = await prisma.workflow.findFirst({
    where: { id, userId },
  });

  if (!workflow) throw new Error("Workflow not found or access denied");

  await prisma.workflow.delete({
    where: { id },
  });

  redirect("/workflows");
}
