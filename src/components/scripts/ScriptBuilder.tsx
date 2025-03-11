//src/components/scripts/ScriptBuilder.tsx
import React, { useState } from "react";
import { ScriptHeader } from "./ScriptHeader";
import { NodesSidebar } from "./NodesSidebar";
import { NodePropertiesSidebar } from "./NodePropertiesSidebar";
import CustomNodeFlow from "../nodes/CustomNodeFlow";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { toast } from "sonner";
import { useSidebarContext } from "@/hooks/use-sidebar";
interface ScriptBuilderProps {
  scriptName: string;
  version: string;
}
export type SidebarFormType =
  | "greeting"
  | "question"
  | "information"
  | "knowledge"
  | "external"
  | "transfer";

export const ScriptBuilder = ({ scriptName, version }: ScriptBuilderProps) => {
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
    toast({
      title: "Test mode activated",
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
      <ScriptHeader
        scriptName={scriptName}
        version={version}
        onTest={handleTest}
        onShare={handleShare}
        onSave={handleSave}
      />

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <NodesSidebar />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={60}>
            <div className="h-full bg-gray-50">
              <CustomNodeFlow onNodeSelect={handleNodeSelect} />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={20}>
            <NodePropertiesSidebar
              selectedNode={selectedNode}
              onUpdate={handleNodeUpdate}
              onAddOption={handleAddOption}
              onRemoveOption={handleRemoveOption}
              onClose={() => setSelectedNode(null)}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
