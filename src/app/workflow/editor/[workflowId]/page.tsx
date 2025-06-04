import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Editor } from "../../_components/editor";

export default async function EditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const { workflowId } = await params;
  const { userId } = await auth();
  if (!userId) {
    return <div>User not authenticated</div>;
  }
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });
  if (!workflow) {
    return <div>Workflow not found</div>;
  }
  return <Editor workflow={workflow} />;
}
