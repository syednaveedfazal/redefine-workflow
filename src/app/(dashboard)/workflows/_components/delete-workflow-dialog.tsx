"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  deleteWorkflowSchema,
  deleteWorkflowType,
} from "@/formSchema/workflow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCallback } from "react";
import { DeleteWorkflow } from "@/actions/workflows/delete-work-flow";
import { DialogTitle } from "@radix-ui/react-dialog";
export function DeleteWorkflowDialog({
  open,
  setOpen,
  workflowId,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  workflowId: string;
}) {
  const form = useForm<deleteWorkflowType>({
    resolver: zodResolver(deleteWorkflowSchema),
    defaultValues: {
      reason: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      values,
      workflowId,
    }: {
      values: deleteWorkflowType;
      workflowId: string;
    }) => DeleteWorkflow(values, workflowId),
    onSuccess: () => {
      toast.dismiss("create-workflow");
      toast.success("Workflow created successfully", {
        id: "create-workflow-success",
      });
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
    onError: () => {
      toast.dismiss("delete-workflow");
      toast.error("Failed to delete workflow", { id: "create-workflow-error" });
    },
  });
  const onSubmit = useCallback(
    (values: deleteWorkflowType) => {
      console.log("Submitting workflow", values);
      toast.loading("creating workflow...", { id: "create-workflow" });
      mutate({ values, workflowId });
    },
    [mutate, workflowId]
  );
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        form.reset();
      }}
    >
      <DialogTitle></DialogTitle>
      <DialogContent className="px-0">
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormDescription>
                Are you sure want to delete workflow?
              </FormDescription>
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Input {...field} className="input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-red-500"
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
