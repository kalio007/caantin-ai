import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AppSidebar } from "./components/SidePanel/AppSideBar";
import { Navbar } from "@/components/Navigation/NavBar";

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
      <div className="h-screen w-full flex flex-col">
        <Navbar />
        <ResizablePanelGroup
          direction={isMobile ? "vertical" : "horizontal"}
          className="flex-1"
        >
          <ResizablePanel
            defaultSize={isMobile ? 40 : 20}
            className={isMobile ? "max-h-[40vh]" : ""}
          >
            <AppSidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={isMobile ? 60 : 80} className="h-full">
            <div className="h-full w-full p-1">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ThemeProvider>
  );
};
