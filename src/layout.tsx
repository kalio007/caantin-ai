import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AppSidebar } from "./components/app-sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check screen size on mount and on resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="h-screen w-full"
      >
        <ResizablePanel
          defaultSize={isMobile ? 30 : 20}
          className={isMobile ? "max-h-[40vh]" : ""}
        >
          <AppSidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={isMobile ? 70 : 80} className="h-full">
          <div className="h-full w-full p-1">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ThemeProvider>
  );
};
