"use client";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateWorkflowName } from "@/actions/workflows/update-work-flow-name";

// Wrap UpdateWorkflowName to accept a single object parameter
const updateWorkflowNameMutation = async ({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) => {
  return UpdateWorkflowName(id, definition);
};

export function SaveButton({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();
  const saveWorkflow = useMutation({
    mutationFn: updateWorkflowNameMutation,
    onSuccess: () => {
      toast.success("Workflow saved successfully");
    },
    onError: () => {
      toast.error("Failed to save workflow");
    },
  });
  return (
    <Button
      disabled={saveWorkflow.isPending}
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        saveWorkflow.mutate({ id: workflowId, definition: workflowDefinition });
      }}
    >
      <CheckIcon size={16} className="stroke-green-400">
        Save
      </CheckIcon>
    </Button>
  );
}
