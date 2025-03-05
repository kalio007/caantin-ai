import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AppSidebar } from "./components/app-sidebar";
import { GreetingForm } from "./components/nodes/greeting";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen">
      <ResizablePanel defaultSize={20}>
        <AppSidebar />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80} className="h-full">
        <div className="h-full w-full p-1">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
