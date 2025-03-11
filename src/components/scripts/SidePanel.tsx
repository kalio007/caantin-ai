import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useSidePanelContext } from "@/layout";
import { NodePreview } from "../nodes/NodePreview";

interface SidePanelProps {
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
}

export const SidePanel = ({
  selectedNode,
  onUpdate,
  onAddOption,
  onRemoveOption,
}: SidePanelProps) => {
  const { isSidePanelOpen, setIsSidePanelOpen } = useSidePanelContext();

  if (!isSidePanelOpen || !selectedNode) {
    return null;
  }

  return (
    <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 border-l border-gray-200 bg-white shadow-lg transition-all duration-300 z-10">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Node Properties</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidePanelOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)]">
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
