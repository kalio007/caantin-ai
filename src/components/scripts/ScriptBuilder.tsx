import React, { useState } from "react";
import { ScriptHeader } from "./ScriptHeader";
import { NodesSidebar } from "./NodesSidebar";
import CustomNodeFlow from "../nodes/CustomNodeFlow";
import { SidePanel } from "./SidePanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { toast } from "sonner";
import { useSidebarContext } from "@/hooks/use-sidebar";

export type SidebarFormType =
  | "greeting"
  | "question"
  | "information"
  | "knowledge"
  | "external"
  | "transfer";

export const ScriptBuilder = () => {
  const { setActiveForm } = useSidebarContext();
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const handleNodeSelect = (node: any) => {
    setSelectedNode(node);
  };

  const handleNodeUpdate = (nodeId: string, data: any) => {
    // Update node data logic here
  };

  const handleAddOption = (nodeId: string) => {
    // Add option logic here
  };

  const handleRemoveOption = (nodeId: string, index: number) => {
    // Remove option logic here
  };

  const handleTest = () => {
    toast.success("Test mode activated", {
      description: "Your script is now in test mode.",
    });
  };

  const handleShare = () => {
    toast("Share script", {
      description: "Sharing functionality coming soon.",
    });
  };

  const handleSave = () => {
    toast.success("Script saved", {
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* <ScriptHeader
        scriptName={scriptName}
        version={version}
        onTest={handleTest}
        onShare={handleShare}
        onSave={handleSave}
      /> */}

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <NodesSidebar />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={80}>
            <div className="h-full bg-gray-50">
              <CustomNodeFlow onNodeSelect={handleNodeSelect} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* The SidePanel component is rendered outside the ResizablePanelGroup */}
      <SidePanel
        selectedNode={selectedNode}
        onUpdate={handleNodeUpdate}
        onAddOption={handleAddOption}
        onRemoveOption={handleRemoveOption}
      />
    </div>
  );
};
