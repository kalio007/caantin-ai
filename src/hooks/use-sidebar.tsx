import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the types for our context
export type SidebarFormType = "greeting" | "question" | "information" | null;
export interface CreateNode {
  id: string;
  type: SidebarFormType;
  data: {
    message?: string;
    question?: string;
    options?: string[];
  };
}

interface NodeData {
  question?: string;
  message?: string;
  options?: string[];
}
interface Node {
  id: string;
  type: string;
  data?: NodeData;
}

interface SidebarContextType {
  activeForm: SidebarFormType;
  setActiveForm: (form: SidebarFormType) => void;
  createNodes: CreateNode[];
  setCreateNodes: (nodes: CreateNode[]) => void;
  updateNode: (updatedNode: CreateNode) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  activeForm: null,
  setActiveForm: () => {},
  createNodes: [],
  setCreateNodes: () => {},
  updateNode: () => {},
});

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeForm, setActiveForm] = useState<SidebarFormType>(null);
  const [createNodes, setCreateNodes] = useState<CreateNode[]>([]);

  // Function to update a specific node
  const updateNode = (updatedNode: CreateNode) => {
    setCreateNodes((prevNodes) =>
      prevNodes.map((node) => (node.id === updatedNode.id ? updatedNode : node))
    );
  };

  return (
    <SidebarContext.Provider
      value={{
        activeForm,
        setActiveForm,
        createNodes,
        setCreateNodes,
        updateNode,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
