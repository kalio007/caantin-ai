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

interface SidebarContextType {
  activeForm: SidebarFormType;
  setActiveForm: (form: SidebarFormType) => void;
  createNodes: CreateNode[];
  setCreateNodes: (nodes: CreateNode[]) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  activeForm: null,
  setActiveForm: () => {},
  createNodes: [],
  setCreateNodes: () => {},
});

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeForm, setActiveForm] = useState<SidebarFormType>(null);
  const [createNodes, setCreateNodes] = useState<CreateNode[]>([]);

  return (
    <SidebarContext.Provider
      value={{
        activeForm,
        setActiveForm,
        createNodes,
        setCreateNodes,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
