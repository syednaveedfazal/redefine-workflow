"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
import { EditWorkflowDialog } from "@/app/(dashboard)/workflows/_components/edit-workflow-dialog";
import { useState } from "react";
import { DeleteWorkflowDialog } from "@/app/(dashboard)/workflows/_components/delete-workflow-dialog";

export function EditDropdown({ workflowId }: { workflowId: string }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Settings</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <PencilIcon className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditWorkflowDialog
        open={open}
        setOpen={setOpen}
        workflowId={workflowId}
      />
      <DeleteWorkflowDialog
        open={openDelete}
        setOpen={setOpenDelete}
        workflowId={workflowId}
      />
    </>
  );
}
