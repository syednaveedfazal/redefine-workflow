"use client";
import React from "react";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import { NodeComponent } from "./nodes/node-component";

const nodeTypes = {
  Node: NodeComponent,
};
export const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER, { x: 80, y: 90 }),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 2 }}
      >
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Lines} gap={8} />
      </ReactFlow>
    </main>
  );
};
