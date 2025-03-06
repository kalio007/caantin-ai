import React, { useState, useEffect, useCallback } from "react";
import type { Node, Edge } from "@xyflow/react";
import { ZoomSlider } from "@/components/zoom-slider";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Position,
  Background,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useSidebarContext } from "@/hooks/use-sidebar";

import ColorSelectorNode from "@/components/ColorSelectorNode";
import { ModeToggle } from "./mode-toggle";

const initBgColor = "#c9f1dd";

const snapGrid: [number, number] = [20, 20];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
  // informationNode: InformationBaseNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const CustomNodeFlow = () => {
  //from the gettingnode
  const { createNodes } = useSidebarContext();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  useEffect(() => {
    setNodes(
      createNodes.map((node, index) => ({
        id: node.id,
        type: node.type || "input",
        data:
          node.type === "question"
            ? { label: node.data?.question, options: node.data?.options }
            : { label: node.data?.message },
        position: { x: index * 250, y: 50 },
        sourcePosition:
          node.type === "greeting"
            ? Position.Right
            : node.type === "question"
            ? Position.Left && Position.Right
            : undefined,
        targetPosition:
          node.type === "question"
            ? Position.Right
            : node.type === "information"
            ? Position.Left
            : undefined,
      }))
    );

    // Automatically create edges by linking each node to the next
    setEdges(
      createNodes.slice(0, -1).map((node, index) => ({
        id: `e${node.id}-${createNodes[index + 1].id}`,
        source: node.id,
        target: createNodes[index + 1].id,
        animated: true,
      }))
    );
  }, [createNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ background: bgColor }}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        fitView
        attributionPosition="bottom-left"
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.type === "input") return "#0041d0";
            if (n.type === "selectorNode") return bgColor;
            return "#ff0072";
          }}
          nodeColor={(n) => {
            if (n.type === "selectorNode") return bgColor;
            return "#fff";
          }}
        />
        <Controls />
        <Background />
        <ZoomSlider position="top-left" />
      </ReactFlow>
    </div>
  );
};

export default CustomNodeFlow;
