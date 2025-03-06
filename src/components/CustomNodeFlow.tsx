import React, { useState, useEffect, useCallback } from "react";
import type { Node, Edge, NodeMouseHandler } from "@xyflow/react";
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
import CustomNode from "@/components/CustomNode";
import ColorSelectorNode from "@/components/ColorSelectorNode";
import NodePreviewDrawer from "@/components/NodePreview";
import { initBgColor, defaultViewport, snapGrid } from "./constants";


const nodeTypes = {
  selectorNode: ColorSelectorNode,
  default: CustomNode,
  input: CustomNode,
  greeting: CustomNode,
  question: CustomNode,
  information: CustomNode,
};


const CustomNodeFlow = () => {
  // from the sidebar context
  const { createNodes, updateNode, deleteNode } = useSidebarContext();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  // State for drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    setNodes(
      createNodes.map((node, index) => ({
        id: node.id,
        type: node.type || "input",
        data: {
          ...(node.type === "question"
            ? { label: node.data?.question, options: node.data?.options }
            : { label: node.data?.message }),
          onDelete: () => handleDeleteNode(node.id),
        },
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

  // Handler for node click
  const onNodeClick: NodeMouseHandler = useCallback(
    (event, node) => {
      // Check if the click is on the delete button
      const target = event.target as HTMLElement;
      if (
        target.classList.contains("node-delete-button") ||
        target.closest(".node-delete-button")
      ) {
        // If clicked on delete button, don't open the drawer
        return;
      }

      // Otherwise, find the original node data and open the drawer
      const originalNode = createNodes.find((n) => n.id === node.id);
      if (originalNode) {
        setSelectedNode({ ...node, originalData: originalNode });
        setIsDrawerOpen(true);
      }
    },
    [createNodes]
  );

  // Handler for deleting a node
  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      // Use the deleteNode function from context
      deleteNode(nodeId);

      // Close the drawer if the deleted node was selected
      if (selectedNode && selectedNode.id === nodeId) {
        setIsDrawerOpen(false);
        setSelectedNode(null);
      }
    },
    [deleteNode, selectedNode]
  );

  // Handler for saving edited node
  const handleSaveNode = useCallback(
    (updatedNode) => {
      if (updateNode && selectedNode) {
        // Update in the context
        updateNode(updatedNode);

        // Close the drawer
        setIsDrawerOpen(false);
        setSelectedNode(null);
      }
    },
    [selectedNode, updateNode]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
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

      {/* Node Preview Drawer */}
      <NodePreviewDrawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        node={selectedNode}
        onSave={handleSaveNode}
      />
    </div>
  );
};

export default CustomNodeFlow;
