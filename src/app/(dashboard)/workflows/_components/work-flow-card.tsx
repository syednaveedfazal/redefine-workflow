"use client";
import { Workflow } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { WorkflowStatus } from "@/types/workflow-types";
import { FileTextIcon, PlayIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { EditDropdown } from "@/components/custom/edit-option";
const statusColors: Record<WorkflowStatus, string> = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-700",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
  [WorkflowStatus.ARCHIVED]: "bg-gray-400 text-gray-700",
};
export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card
      className="border border-separate shadow-sm rounded-lg overflow-hidden
        hover:shadow-md dark:shadow-primary/30"
    >
      <CardContent className="flex p-4 items-center gap-4 h-[70px]">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            statusColors[workflow.status as WorkflowStatus]
          )}
        >
          {isDraft ? (
            <FileTextIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="h-5 w-5 text-white" />
          )}
        </div>
        <div>
          <h3 className="text-base font-bold text-muted-foreground flex items-center">
            <Link
              href={`/workflow/editor/${workflow.id}`}
              className="hover:underline flex items-center gap-2"
            >
              {workflow.name}
            </Link>
            {isDraft ? (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                Draft
              </span>
            ) : (
              ""
            )}
          </h3>
          {workflow?.description && (
            <div>
              <span
                className={cn(
                  "text-xs text-foreground font-medium px-2 py-1 rounded-full"
                )}
              >
                {workflow.description}
              </span>
            </div>
          )}
        </div>
        <div className="flex ml-auto items-center gap-2">
          <EditDropdown workflowId={workflow.id} />
        </div>
      </CardContent>
    </Card>
  );
}
