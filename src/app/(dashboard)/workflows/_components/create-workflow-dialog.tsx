"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layers2Icon } from "lucide-react";
import { CustomDialogHeader } from "@/components/custom/custom-dialog-header";
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
import { Textarea } from "@/components/ui/textarea";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/formSchema/workflow";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCallback } from "react";
import { CreateWorkflow } from "@/actions/workflows/create-work-flow";
import { useRouter } from "next/navigation";
export function CreateWorkflowDialog({
  triggerText,
}: {
  triggerText?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: (data: string) => {
      toast.success("Workflow created successfully", {
        id: "create-workflow-success",
      });
      router.push(data);
    },
    onError: () => {
      toast.error("Failed to create workflow", { id: "create-workflow-error" });
    },
  });
  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      toast.loading("creating workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create Workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create Workflow"
          subtitleClassName="Start Building Your Workflow"
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workflow Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="input" />
                    </FormControl>
                    <FormDescription>Name must be unique</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} className="resize-none" />
                    </FormControl>
                    <FormDescription>
                      A brief description of your workflow
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creating..." : "Proceed"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
