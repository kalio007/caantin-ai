import React from "react";
import { NavigationBar } from "./NavigationBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar username="Njavwa" notificationCount={3} />
      <main className="h-[calc(100vh-64px)]">{children}</main>
    </div>
  );
};
