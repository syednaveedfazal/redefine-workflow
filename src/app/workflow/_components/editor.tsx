import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { FlowEditor } from "./flow-editor";
import { TopBar } from "./topbar/top-bar";
import { TaskMenu } from "./task-menu";
export const Editor = ({ workflow }: { workflow: Workflow }) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <TopBar
          title={workflow.name}
          subtitle="Something interesting"
          workflowId={workflow.id}
        />
        <section className="flex h-full overflow-auto">
          <TaskMenu />
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};
