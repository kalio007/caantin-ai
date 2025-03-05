import React, { createContext, useState, useContext, ReactNode } from "react";

// Define node types
type NodeType =
  | "input"
  | "output"
  | "selectorNode"
  | "greeting"
  | "question"
  | "information";

// Define the Node interface
interface Node {
  id: string;
  type: NodeType;
  data: any;
  position?: { x: number; y: number };
  sourcePosition?: string;
  targetPosition?: string;
}

// Define the types for our context
type SidebarFormType = "greeting" | "question" | "information" | null;

// Expand the context interface to include nodes
interface SidebarContextType {
  activeForm: SidebarFormType;
  setActiveForm: (form: SidebarFormType) => void;
  greetingNodes: Node[];
  questionNodes: Node[];
  informationNodes: Node[];
  addGreetingNode: (node: Partial<Node>) => void;
  addQuestionNode: (node: Partial<Node>) => void;
  addInformationNode: (node: Partial<Node>) => void;
  deleteNode: (nodeType: NodeType, nodeId: string) => void;
  updateNode: (
    nodeType: NodeType,
    nodeId: string,
    updates: Partial<Node>
  ) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  activeForm: null,
  setActiveForm: () => {},
  greetingNodes: [],
  questionNodes: [],
  informationNodes: [],
  addGreetingNode: () => {},
  addQuestionNode: () => {},
  addInformationNode: () => {},
  deleteNode: () => {},
  updateNode: () => {},
});

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeForm, setActiveForm] = useState<SidebarFormType>(null);
  const [greetingNodes, setGreetingNodes] = useState<Node[]>([]);
  const [questionNodes, setQuestionNodes] = useState<Node[]>([]);
  const [informationNodes, setInformationNodes] = useState<Node[]>([]);

  // Generic function to create a node with positioning
  const createNode = (
    nodeType: NodeType,
    nodeData: any,
    existingNodes: Node[]
  ): Node => ({
    id: `node-${existingNodes.length + 1}`,
    type: nodeType,
    data: nodeData,
    position: {
      x: existingNodes.length * 300,
      y: 50,
    },
    sourcePosition: "right",
    targetPosition: "left",
  });

  // Add Greeting Node
  const addGreetingNode = (node: Partial<Node>) => {
    const newNode = createNode("greeting", node.data || {}, greetingNodes);

    console.log("Adding Greeting Node:", newNode);
    setGreetingNodes((prev) => [...prev, newNode]);
  };

  // Add Question Node
  const addQuestionNode = (node: Partial<Node>) => {
    const newNode = createNode("question", node.data || {}, questionNodes);

    console.log("Adding Question Node:", newNode);
    setQuestionNodes((prev) => [...prev, newNode]);
  };

  // Add Information Node
  const addInformationNode = (node: Partial<Node>) => {
    const newNode = createNode(
      "information",
      node.data || {},
      informationNodes
    );

    console.log("Adding Information Node:", newNode);
    setInformationNodes((prev) => [...prev, newNode]);
  };

  // Delete Node
  const deleteNode = (nodeType: NodeType, nodeId: string) => {
    switch (nodeType) {
      case "greeting":
        setGreetingNodes((prev) => prev.filter((node) => node.id !== nodeId));
        break;
      case "question":
        setQuestionNodes((prev) => prev.filter((node) => node.id !== nodeId));
        break;
      case "information":
        setInformationNodes((prev) =>
          prev.filter((node) => node.id !== nodeId)
        );
        break;
    }
  };

  // Update Node
  const updateNode = (
    nodeType: NodeType,
    nodeId: string,
    updates: Partial<Node>
  ) => {
    switch (nodeType) {
      case "greeting":
        setGreetingNodes((prev) =>
          prev.map((node) =>
            node.id === nodeId ? { ...node, ...updates } : node
          )
        );
        break;
      case "question":
        setQuestionNodes((prev) =>
          prev.map((node) =>
            node.id === nodeId ? { ...node, ...updates } : node
          )
        );
        break;
      case "information":
        setInformationNodes((prev) =>
          prev.map((node) =>
            node.id === nodeId ? { ...node, ...updates } : node
          )
        );
        break;
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        activeForm,
        setActiveForm,
        greetingNodes,
        questionNodes,
        informationNodes,
        addGreetingNode,
        addQuestionNode,
        addInformationNode,
        deleteNode,
        updateNode,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
