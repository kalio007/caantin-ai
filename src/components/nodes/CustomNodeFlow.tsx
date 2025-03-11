import React, { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  NodeTypes,
} from "@xyflow/react";
import { CustomNode } from "./CustomNode";
import { useSidebarContext } from "@/hooks/use-sidebar";
import { v4 as uuidv4 } from "uuid";

type NodeData = {
  label: string;
  options?: string[];
  onDelete: () => void;
};

const nodeTypes = {
  greeting: CustomNode,
  question: CustomNode,
  knowledge: CustomNode,
  external: CustomNode,
  transfer: CustomNode,
} as const;

export const CustomNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { createNodes, setCreateNodes, deleteNode } = useSidebarContext();

  // Handle new node creation from sidebar
  React.useEffect(() => {
    if (createNodes.length > 0) {
      const newNode = createNodes[createNodes.length - 1];
      const nodePosition = { x: 100, y: nodes.length * 100 + 50 };

      const node: Node<NodeData> = {
        id: newNode.id,
        type: newNode.type || "default",
        position: nodePosition,
        data: {
          label: newNode.data.message || newNode.data.question || "New Node",
          options: newNode.data.options,
          onDelete: () => handleDeleteNode(newNode.id),
        },
      };

      setNodes((nds) => [...nds, node]);
      setCreateNodes([]);
    }
  }, [createNodes, setCreateNodes, nodes.length]);

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
      deleteNode(nodeId);
    },
    [setNodes, setEdges, deleteNode]
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-full w-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel
          position="top-right"
          className="bg-white p-2 rounded-lg shadow-lg"
        >
          <div className="text-sm text-gray-500">
            {nodes.length} nodes • {edges.length} connections
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};
