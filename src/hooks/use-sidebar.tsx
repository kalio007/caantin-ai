import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the types for our context
type SidebarFormType = "greeting" | "question" | "information" | null;

interface SidebarContextType {
  activeForm: SidebarFormType;
  setActiveForm: (form: SidebarFormType) => void;
  greetingNodes: string[];
  setGreetingNodes: (nodes: string[]) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  activeForm: null,
  setActiveForm: () => {},
  greetingNodes: [],
  setGreetingNodes: () => {},
});

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeForm, setActiveForm] = useState<SidebarFormType>(null);
  const [greetingNodes, setGreetingNodes] = useState<string[]>([]);

  return (
    <SidebarContext.Provider
      value={{
        activeForm,
        setActiveForm,
        greetingNodes,
        setGreetingNodes,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
