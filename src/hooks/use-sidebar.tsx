import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the types for our context
type SidebarFormType = 'greeting' | 'question' | 'information' | null;

interface SidebarContextType {
  activeForm: SidebarFormType;
  setActiveForm: (form: SidebarFormType) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  activeForm: null,
  setActiveForm: () => {},
});

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeForm, setActiveForm] = useState<SidebarFormType>(null);

  return (
    <SidebarContext.Provider value={{ activeForm, setActiveForm }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);