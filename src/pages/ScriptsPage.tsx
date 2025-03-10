import React from "react";
import CustomNodeFlow from "@/components/FlowEditor/CustomNodeFlow";

function ScriptsPage() {
  return (
    <div className="h-full w-full overflow-hidden md:overflow-auto">
      <div className="h-[calc(100vh-4rem)] md:h-full w-full">
        <CustomNodeFlow />
      </div>
    </div>
  );
}

export default ScriptsPage;
