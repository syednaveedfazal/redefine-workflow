"use client";
import React, { useCallback, useEffect } from "react";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import { NodeComponent } from "./nodes/node-component";
import { AppNode } from "@/types/appNode";

const nodeTypes = {
  Node: NodeComponent,
};
export const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([
    // CreateFlowNode(TaskType.LAUNCH_BROWSER, { x: 80, y: 90 }),
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
    } catch (e) {
      console.error(e);
    }
  }, [workflow.definition, setEdges, setNodes]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    if (!taskType) return;
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    const newNode = CreateFlowNode(taskType as TaskType, position);
    setNodes((nds) => nds.concat(newNode));
  }, []);
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
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Lines} gap={8} />
      </ReactFlow>
    </main>
  );
};
