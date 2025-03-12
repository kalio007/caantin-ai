import React from "react";
import { ScriptHeader } from "@/components/scripts/ScriptHeader";
import { NodesSidebar } from "@/components/scripts/NodesSidebar";
import CustomNodeFlow from "@/components/nodes/CustomNodeFlow";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSidebarContext } from "@/hooks/use-sidebar";
import { Toaster, toast } from "sonner";
import { ScriptBuilder } from "@/components/scripts/ScriptBuilder";

export const ScriptsPage = () => {
  const { setActiveForm } = useSidebarContext();

  const handleNodeAdd = (nodeType: string) => {
    setActiveForm(nodeType as any);
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
    <div className="h-full flex flex-col">
      <ScriptHeader
        scriptName="Bank Lead Qualification Flow"
        version="2.3"
        onTest={handleTest}
        onShare={handleShare}
        onSave={handleSave}
      />

      <div className="flex-1 overflow-hidden">
        <ScriptBuilder />
      </div>

      <Toaster richColors closeButton position="top-right" />
    </div>
  );
};
