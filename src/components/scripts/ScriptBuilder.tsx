import React, { useState, useEffect, useCallback } from "react";
// import { ScriptHeader } from "./ScriptHeader";
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
// import NodePreview from "../nodes/NodePreview";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const handleInputChange = (field: string, value: string) => {
    if (!editedNode) return;

    if (field === "question" || field === "message") {
      setEditedNode({
        ...editedNode,
        data: {
          ...editedNode.data,
          [field]: value,
        },
      });
    } else if (field.startsWith("option_")) {
      // Handle option changes for question nodes
      const optionIndex = parseInt(field.split("_")[1]);
      const newOptions = [...editedNode.data.options];
      newOptions[optionIndex] = value;

      setEditedNode({
        ...editedNode,
        data: {
          ...editedNode.data,
          options: newOptions,
        },
      });
    } else {
      // Handle other fields
      setEditedNode({
        ...editedNode,
        [field]: value,
      });
    }
  };
  const handleNodeSelect = (node: any) => {
    setSelectedNode(node);
    setIsSidePanelOpen(true);
  };

  // const handleNodeUpdate = (nodeId: string, updatedData: any) => {
  //   // Create a new node object with updated data
  //   const updatedNode = {
  //     ...editedNode,
  //     data: {
  //       ...editedNode.data,
  //       ...updatedData,
  //     },
  //   };

  //   setEditedNode(updatedNode);

  //   toast.success("Node updated", {
  //     description: "Node properties have been updated.",
  //   });
  // };

  const handleSaveNode = useCallback(
    (updatedNode) => {
      if (updateNode && selectedNode) {
        updateNode(updatedNode);

        // setIsDrawerOpen(false);
        setSelectedNode(null);
      }
    },
    [selectedNode, updateNode]
  );

  // const handleSaveChanges = useCallback(() => {
  //   if (selectedNode && editedNode) {
  //     if (!updateNode) {
  //       console.error("updateNode function is not available.");
  //       toast.error("Error", { description: "Failed to update the node." });
  //       return;
  //     }

  //     updateNode(editedNode); // Update node properly

  //     // Instead of resetting selectedNode, update it with the saved state
  //     setSelectedNode(editedNode);

  //     toast.success("Changes saved", {
  //       description: "Node properties have been successfully updated.",
  //     });
  //   }
  // }, [selectedNode, editedNode, updateNode]);

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

                  {/* {selectedNode && editedNode && (
                    <ScrollArea className="h-[calc(100vh-8rem)]">
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-4">
                          {editedNode.type.charAt(0).toUpperCase() +
                            editedNode.type.slice(1)}{" "}
                          Node Properties
                        </h3>

                        <div className="mb-6">
                          <h4 className="text-md text-gray-500 mb-2">
                            Preview
                          </h4>
                          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-blue-500">
                                {editedNode.type === "greeting" && "💬"}
                                {editedNode.type === "question" && "❓"}
                                {editedNode.type === "information" && "ℹ️"}
                              </div>
                              <div className="font-medium">
                                {editedNode.type.charAt(0).toUpperCase() +
                                  editedNode.type.slice(1)}
                              </div>
                            </div>
                            <div>
                              {editedNode.type === "question"
                                ? editedNode.data?.question ||
                                  "No question text"
                                : editedNode.data?.message || "No message text"}
                            </div>
                            {editedNode.type === "question" &&
                              editedNode.data?.options && (
                                <div className="mt-2">
                                  <div className="text-sm text-gray-500">
                                    Options:
                                  </div>
                                  <ul className="list-disc ml-5">
                                    {editedNode.data.options.map(
                                      (option: string, i: number) => (
                                        <li key={i}>{option}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  )} */}
                  <SidePanel
                    isOpen={isSidePanelOpen}
                    onClose={handleClosePanel}
                    node={selectedNode}
                    onSave={handleSaveNode}
                  />
                </div>
                {/* <SidePanel/> */}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
