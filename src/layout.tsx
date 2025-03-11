// import React from "react";
// import { ThemeProvider } from "@/components/theme-provider";
// import { NavigationBar } from "@/components/layout/NavigationBar";

// interface LayoutProps {
//   children: React.ReactNode;
// }

// export const Layout = ({ children }: LayoutProps) => {
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <div className="h-screen w-full flex flex-col overflow-hidden">
//         <NavigationBar username="Njavwa" notificationCount={3} />
//         <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
//       </div>
//     </ThemeProvider>
//   );
// };
import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationBar } from "@/components/layout/NavigationBar";

// Create a context to track side panel state
const SidePanelContext = createContext({
  isSidePanelOpen: false,
  setIsSidePanelOpen: (isOpen: boolean) => {},
});

export const useSidePanelContext = () => useContext(SidePanelContext);

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  return (
    <SidePanelContext.Provider value={{ isSidePanelOpen, setIsSidePanelOpen }}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="h-screen w-full flex flex-col overflow-hidden">
          <NavigationBar username="Njavwa" notificationCount={3} />
          <main
            className={`flex-1 overflow-auto bg-gray-50 transition-all duration-300 ${
              isSidePanelOpen ? "pr-80" : "pr-0"
            }`}
          >
            {children}
          </main>
        </div>
      </ThemeProvider>
    </SidePanelContext.Provider>
  );
};
