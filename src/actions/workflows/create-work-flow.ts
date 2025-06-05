"use server";
import {
  createWorkflowSchemaType,
  createWorkflowSchema,
} from "@/formSchema/workflow";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow-types";
import { AppNode } from "@/types/appNode";
import { Edge } from "@xyflow/react";
import { TaskType } from "@/types/task";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
export async function CreateWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };
  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));
  const result = await prisma.workflow.create({
    data: {
      userId,
      definition: JSON.stringify(initialFlow),
      status: WorkflowStatus.DRAFT,
      ...data,
    },
  });
  if (!result) {
    throw new Error("Failed to create workflow");
  }
  return `/workflow/editor/${result.id}`;
}
