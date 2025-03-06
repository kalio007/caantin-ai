import React from "react";
import { CreateNode } from "@/components/nodes/CreateNode";

export function AppSidebar() {
  return (
    <div className="p-4 w-full">
      <div className="text-lg font-semibold mb-4 text-center">
        Build a New Workflow
      </div>
      <div className="space-y-4">
        <CreateNode />
      </div>
    </div>
  );
}
