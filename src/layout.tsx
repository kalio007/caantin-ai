import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationBar } from "@/components/layout/NavigationBar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-full flex flex-col overflow-hidden">
        <NavigationBar username="Njavwa" notificationCount={3} />
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </ThemeProvider>
  );
};
