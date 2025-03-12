import React from "react";
import { Layout } from "./layout";
import CustomNodeFlow from "./components/FlowEditor/CustomNodeFlow";
import { SidebarProvider } from "./hooks/use-sidebar";
import { ModeToggle } from "./components/Theme/ModeToggle";
// import { PageBreadcrumb } from "@/components/Navigation/PageBreadcrumb";
import { ScriptsPage } from "@/pages/ScriptsPage";
import DashboardPage from "@/pages/DashboardPage";
import CallQueuePage from "@/pages/CallQueuePage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Layout>
          <div className="w-full h-full relative">
            {/* <div className="absolute top-4 right-4 z-10">
              <ModeToggle />
            </div> */}
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/call-queue" element={<CallQueuePage />} />
              <Route path="/scripts" element={<ScriptsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/" element={<Navigate to="/scripts" replace />} />
              <Route path="*" element={<Navigate to="/scripts" replace />} />
            </Routes>
          </div>
        </Layout>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
