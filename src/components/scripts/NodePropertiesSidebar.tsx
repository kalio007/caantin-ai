import React from "react";
import { NodePreview } from "../nodes/NodePreview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface NodePropertiesSidebarProps {
  selectedNode?: {
    id: string;
    type: string;
    data: {
      message?: string;
      question?: string;
      options?: string[];
    };
  };
  onUpdate: (nodeId: string, data: any) => void;
  onAddOption: (nodeId: string) => void;
  onRemoveOption: (nodeId: string, index: number) => void;
  onClose: () => void;
}

export const NodePropertiesSidebar = ({
  selectedNode,
  onUpdate,
  onAddOption,
  onRemoveOption,
  onClose,
}: NodePropertiesSidebarProps) => {
  if (!selectedNode) {
    return null;
  }

  return (
    <div className="w-80 border-l border-gray-200 bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Node Properties</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="p-4">
          <NodePreview
            type={selectedNode.type}
            data={selectedNode.data}
            onUpdate={(data) => onUpdate(selectedNode.id, data)}
            onAddOption={() => onAddOption(selectedNode.id)}
            onRemoveOption={(index) => onRemoveOption(selectedNode.id, index)}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
