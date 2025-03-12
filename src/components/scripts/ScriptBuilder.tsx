import React, { useState, useEffect, useCallback } from "react";
import { NodesSidebar } from "./NodesSidebar";
import CustomNodeFlow from "../nodes/CustomNodeFlow";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { toast } from "sonner";
import { useSidebarContext } from "@/hooks/use-sidebar";
import { useSidePanelContext } from "@/layout";
import SidePanel from "../NodePreview/SidePanel";

export type SidebarFormType =
  | "greeting"
  | "question"
  | "information"
  | "knowledge"
  | "external"
  | "transfer";

export const ScriptBuilder = () => {
  const { createNodes, updateNode, deleteNode } = useSidebarContext();
  const { isSidePanelOpen, setIsSidePanelOpen } = useSidePanelContext();
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [editedNode, setEditedNode] = useState<any>(null);

  // Set editedNode whenever selectedNode changes
  useEffect(() => {
    if (selectedNode) {
      setEditedNode({ ...selectedNode });
    }
  }, [selectedNode]);
  const handleNodeSelect = (node: any) => {
    setSelectedNode(node);
    setIsSidePanelOpen(true);
  };

  const handleSaveNode = useCallback(
    (updatedNode) => {
      if (updateNode && selectedNode) {
        updateNode(updatedNode);

        // setIsDrawerOpen(false);
        setSelectedNode(null);
        setIsSidePanelOpen(false);

        toast.success("Node updated", {
          description: "Node properties have been",
        });
      }
    },
    [selectedNode, updateNode]
  );

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
  const handleClosePanel = () => {
    setIsSidePanelOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <NodesSidebar />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={isSidePanelOpen ? 60 : 80}>
            <div className="h-full bg-gray-200 p-3">
              <CustomNodeFlow onNodeSelect={handleNodeSelect} />
            </div>
          </ResizablePanel>

          {isSidePanelOpen && (
            <>
              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={20}>
                <div className="h-full border-l border-gray-200 bg-white">
                  <SidePanel
                    isOpen={isSidePanelOpen}
                    onClose={handleClosePanel}
                    node={selectedNode}
                    onSave={handleSaveNode}
                  />
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
