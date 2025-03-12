//src/components/FlowEditor/CustomNodeFlow.tsx
import React, { useState, useEffect, useCallback } from "react";
import type { Node, Edge, NodeMouseHandler } from "@xyflow/react";
import { ZoomSlider } from "@/components/FlowEditor/ZoomSlider";
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
import { CustomNode } from "@/components/nodes/CustomNode";
import SidePanel from "../NodePreview/SidePanel";
// import ColorSelectorNode from "@/components/FlowEditor/ColorSelectorNode";
// import NodePreviewDrawer from "@/components/NodePreview";
import { initBgColor, defaultViewport, snapGrid } from "../../constants";
import { useSidePanelContext } from "@/layout";

interface CustomNodeFlowProps {
  onNodeSelect?: (node: Node) => void;
}

const nodeTypes = {
  default: CustomNode,
  input: CustomNode,
  greeting: CustomNode,
  question: CustomNode,
  information: CustomNode,
};

const CustomNodeFlow = ({ onNodeSelect }: CustomNodeFlowProps) => {
  // from the sidebar context
  const { createNodes, updateNode, deleteNode } = useSidebarContext();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  // Get layout context for side panel
  const { setIsSidePanelOpen } = useSidePanelContext();

  // State for side panel content
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Update the layout context whenever our local state changes
  useEffect(() => {
    setIsSidePanelOpen(sidePanelOpen);
  }, [sidePanelOpen, setIsSidePanelOpen]);

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

    // setEdges(
    //   createNodes.slice(0, -1).map((node, index) => ({
    //     id: `e${node.id}-${createNodes[index + 1].id}`,
    //     source: node.id,
    //     target: createNodes[index + 1].id,
    //     animated: true,
    //   }))
    // );
  }, [createNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (event, node) => {
      console.log("Node clicked:", node);

      const target = event.target as HTMLElement;
      if (
        target.classList.contains("node-delete-button") ||
        target.closest(".node-delete-button")
      ) {
        return;
      }

      const originalNode = createNodes.find((n) => n.id === node.id);
      if (originalNode) {
        const nodeData = { ...node, originalData: originalNode } as Node;
        console.log("Selected Node:", nodeData);
        setSelectedNode(nodeData);
        setSidePanelOpen(true);

        // Call the onNodeSelect callback if provided
        if (onNodeSelect) {
          onNodeSelect(nodeData);
        }
      }
    },
    [createNodes, onNodeSelect]
  );
  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      deleteNode(nodeId);

      if (selectedNode && selectedNode.id === nodeId) {
        setSidePanelOpen(false);
        setSelectedNode(null);
      }
    },
    [deleteNode, selectedNode]
  );

  const handleSaveNode = useCallback(
    (updatedNode) => {
      if (updateNode && selectedNode) {
        updateNode(updatedNode);

        setSidePanelOpen(false);
        setSelectedNode(null);
      }
    },
    [selectedNode, updateNode]
  );

  const handleCloseSidePanel = () => {
    setSidePanelOpen(false);
    setSelectedNode(null);
  };

  return (
    <div className="w-full h-full relative">
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

      <SidePanel
        isOpen={sidePanelOpen}
        onClose={handleCloseSidePanel}
        // title={
        //   "Hello"
        //   // selectedNode?.originalData?.type
        //   //   ? `${
        //   //       selectedNode.originalData.type.charAt(0).toUpperCase() +
        //   //       selectedNode.originalData.type.slice(1)
        //   //     } Properties`
        //   //   : "Node Properties"
        // }
        node={selectedNode}
        onSave={handleSaveNode}
      />
    </div>
  );
};

export default CustomNodeFlow;
