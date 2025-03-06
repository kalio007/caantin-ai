import React, { useState, useEffect, useCallback } from "react";
import type { Node, Edge } from "@xyflow/react";
import { ZoomSlider } from "@/components/zoom-slider";
// import InformationBaseNode from "./components/nodes/information-node";
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
import { ModeToggle } from "./components/mode-toggle";

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

  // useEffect(() => {
  //   console.log("Greeting Nodes from Context:", greetingNodes);

  //   // const lastMessage = greetingNodes[greetingNodes.length - 1].data?.message;
  //   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setNodes((nds) =>
  //       nds.map((node) => {
  //         if (node.id !== "2") {
  //           return node;
  //         }

  //         const color = event.target.value;

  //         setBgColor(color);

  //         return {
  //           ...node,
  //           data: {
  //             ...node.data,
  //             color,
  //           },
  //         };
  //       })
  //     );
  //   };
  //   // Dynamically create nodes based on questionNodes
  //   const greetingNodeElements = greetingNodes.map((qNode, index) => ({
  //     id: qNode.id, // Use the unique id from the question node
  //     type: qNode.type, // Set type from the question node (could be different types)
  //     data: { label: qNode.data?.message }, // Use the message from question node as label
  //     position: { x: 0, y: 50 * (index + 1) }, // Adjust positioning dynamically
  //     sourcePosition: Position.Right,
  //   }));

  //   setNodes([
  //     ...greetingNodeElements,
  //     // {
  //     //   id: "1",
  //     //   type: "input",
  //     //   data: {
  //     //     label:
  //     //       greetingNodes.length > 0
  //     //         ? greetingNodes[greetingNodes.length - 1]?.data?.message
  //     //         : "An input node",
  //     //   },
  //     //   position: { x: 0, y: 50 },
  //     //   sourcePosition: Position.Right,
  //     // },
  //     {
  //       id: "2",
  //       type: "selectorNode",
  //       data: { onChange: onChange, color: initBgColor },
  //       position: { x: 300, y: 50 },
  //     },
  //     {
  //       id: "3",
  //       type: "output",
  //       data: { label: "Output A" },
  //       position: { x: 650, y: 25 },
  //       targetPosition: Position.Left,
  //     },
  //     {
  //       id: "4",
  //       type: "output",
  //       data: { label: "Output B" },
  //       position: { x: 650, y: 100 },
  //       targetPosition: Position.Left,
  //     },
  //   ]);

  //   setEdges([
  //     {
  //       id: "e1-2",
  //       source: "1",
  //       target: "2",
  //       animated: true,
  //     },
  //     {
  //       id: "e2a-3",
  //       source: "2",
  //       target: "3",
  //       sourceHandle: "a",
  //       animated: true,
  //     },
  //     {
  //       id: "e2b-4",
  //       source: "2",
  //       target: "4",
  //       sourceHandle: "b",
  //       animated: true,
  //     },
  //   ]);
  // }, [greetingNodes]);

  // useEffect(() => {
  //   setNodes(
  //     greetingNodes.map((node, index) => ({
  //       id: node.id,
  //       type: node.type === "question" ? "questionNode" : "input",
  //       data:
  //         node.type === "question"
  //           ? { label: node.data?.question, options: node.data?.options }
  //           : { label: node.data?.message },
  //       position: { x: index * 250, y: 50 },
  //       sourcePosition:
  //         node.type === "question"
  //           ? Position.Bottom
  //           : node.type === "information"
  //           ? Position.Left
  //           : Position.Right,
  //     }))
  //   );
  //   setEdges([
  //     {
  //       id: "e1-2",
  //       source: "1",
  //       target: "2",
  //       animated: true,
  //     },
  //     {
  //       id: "e2a-3",
  //       source: "2",
  //       target: "3",
  //       sourceHandle: "b",
  //       animated: true,
  //     },
  //     {
  //       id: "e2b-4",
  //       source: "2",
  //       target: "4",
  //       sourceHandle: "a",
  //       animated: true,
  //     },
  //   ]);
  //   // setEdges((eds) =>
  //   //   eds.map((edge) => {
  //   //     if (edge.id === "e1-2") {
  //   //       return {
  //   //         ...edge,
  //   //       };
  //   //     }

  //   //     return edge;
  //   //   })
  //   // );
  // }, [greetingNodes]);
  useEffect(() => {
    setNodes(
      createNodes.map((node, index) => ({
        id: node.id,
        type: node.type || "input", // Ensure type is never null
        data:
          node.type === "question"
            ? { label: node.data?.question, options: node.data?.options }
            : { label: node.data?.message },
        position: { x: index * 250, y: 50 },
        sourcePosition:
          node.type === "greeting"
            ? Position.Right
            : node.type === "question"
            ? Position.Left
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
