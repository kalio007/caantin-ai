import React, { useState } from "react";
import { ScriptHeader } from "./ScriptHeader";
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
import { NodePreview } from "../nodes/NodePreview";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export type SidebarFormType =
  | "greeting"
  | "question"
  | "information"
  | "knowledge"
  | "external"
  | "transfer";

export const ScriptBuilder = () => {
  const { setActiveForm } = useSidebarContext();
  const { isSidePanelOpen, setIsSidePanelOpen } = useSidePanelContext();
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [editedNode, setEditedNode] = useState<any>(null);
  const handleNodeSelect = (node: any) => {
    setSelectedNode(node);
    setIsSidePanelOpen(true);
  };

  const handleNodeUpdate = (nodeId: string, data: any) => {
    // Update node data logic here
  };

  const handleAddOption = () => {
    if (editedNode?.type === "question" && editedNode.data) {
      const options = editedNode.data.options || [];
      setEditedNode({
        ...editedNode,
        data: {
          ...editedNode.data,
          options: [...options, "New Option"],
        },
      });
    }
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

  const handleClosePanel = () => {
    setIsSidePanelOpen(false);
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

          <ResizablePanel defaultSize={isSidePanelOpen ? 60 : 80}>
            <div className="h-full bg-gray-50">
              <CustomNodeFlow onNodeSelect={handleNodeSelect} />
            </div>
          </ResizablePanel>

          {isSidePanelOpen && (
            <>
              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={20}>
                <div className="h-full border-l border-gray-200 bg-white">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Properties</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClosePanel}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {selectedNode && (
                    <ScrollArea className="h-[calc(100vh-8rem)]">
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-4">
                          {selectedNode.type.charAt(0).toUpperCase() +
                            selectedNode.type.slice(1)}{" "}
                          Node Properties
                        </h3>

                        <div className="mb-6">
                          <h4 className="text-md text-gray-500 mb-2">
                            Preview
                          </h4>
                          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-blue-500">
                                {selectedNode.type === "greeting" && "💬"}
                                {selectedNode.type === "question" && "❓"}
                                {selectedNode.type === "information" && "ℹ️"}
                              </div>
                              <div className="font-medium">
                                {selectedNode.type.charAt(0).toUpperCase() +
                                  selectedNode.type.slice(1)}
                              </div>
                            </div>
                            <div>
                              {selectedNode.type === "question"
                                ? selectedNode.data?.question ||
                                  "No question text"
                                : selectedNode.data?.message ||
                                  "No message text"}
                            </div>
                          </div>
                        </div>

                        <NodePreview
                          type={selectedNode.type}
                          data={selectedNode.data}
                          onUpdate={(data) =>
                            handleNodeUpdate(selectedNode.id, data)
                          }
                          onAddOption={() => handleAddOption(selectedNode.id)}
                          onRemoveOption={(index) =>
                            handleRemoveOption(selectedNode.id, index)
                          }
                        />
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
