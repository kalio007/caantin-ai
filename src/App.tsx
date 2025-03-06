import React from "react";
import { Layout } from "./layout";
import CustomNodeFlow from "./components/FlowEditor/CustomNodeFlow";
import { SidebarProvider } from "./hooks/use-sidebar";
import { ModeToggle } from "./components/Theme/ModeToggle";

function App() {
  return (
    <SidebarProvider>
      <Layout>
        <div className="w-full h-full relative">
          <div className="absolute top-4 right-4 z-10">
            <ModeToggle />
          </div>
          <CustomNodeFlow />
        </div>
      </Layout>
    </SidebarProvider>
  );
}

export default App;
