import React from "react";
import { Layout } from "./layout";
import CustomNodeFlow from "./CustomNodeFlow";

function App() {
  return (
    <Layout>
      <div className="w-full h-full">
        <CustomNodeFlow />
      </div>
    </Layout>
  );
}

export default App;
