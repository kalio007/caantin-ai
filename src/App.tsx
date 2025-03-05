import React from "react";
import { Layout } from "./layout";
import CustomNodeFlow from "./CustomNodeFlow";
import { SidebarProvider } from "./hooks/use-sidebar";

function App() {
  return (
    <SidebarProvider>
      <Layout>
        <div className="w-full h-full">
          <CustomNodeFlow />
        </div>
      </Layout>
    </SidebarProvider>
  );
}

export default App;
