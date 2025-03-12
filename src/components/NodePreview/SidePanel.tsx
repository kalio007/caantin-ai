import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NodePreview } from "@/components/NodePreview/NodePreview";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  node: any;
  onSave: (updatedNode: any) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  node,
  onSave,
}) => {
  const [editedNode, setEditedNode] = React.useState<any>(null);

  React.useEffect(() => {
    if (node) {
      setEditedNode({ ...node.originalData });
    }
  }, [node]);

  if (!isOpen || !node || !editedNode) {
    return null;
  }

  const handleUpdate = (data: any) => {
    setEditedNode({
      ...editedNode,
      data: {
        ...editedNode.data,
        ...data,
      },
    });
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

  const handleRemoveOption = (index: number) => {
    if (editedNode?.type === "question" && editedNode.data) {
      const newOptions = [...editedNode.data.options];
      newOptions.splice(index, 1);

      setEditedNode({
        ...editedNode,
        data: {
          ...editedNode.data,
          options: newOptions,
        },
      });
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-2 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Properties</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {editedNode.type.charAt(0).toUpperCase() +
                  editedNode.type.slice(1)}{" "}
                Node Properties
              </h3>

              <div className="mb-2">
                <h2 className="font-medium text-sm text-gray-500 mb-1">
                  Preview
                </h2>
                <div className="border border-blue-200 rounded-lg p-2 bg-blue-50">
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
                      ? editedNode.data?.question || "No question text"
                      : editedNode.data?.message || "No message text"}
                  </div>
                  {editedNode.type === "question" &&
                    editedNode.data?.options && (
                      <div className="mt-2">
                        <div className="text-sm text-gray-500">Options:</div>
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
            <NodePreview
              type={editedNode.type}
              data={editedNode.data}
              onUpdate={handleUpdate}
              onAddOption={handleAddOption}
              onRemoveOption={handleRemoveOption}
            />
          </div>
        </ScrollArea>
        {/* ensure the save button is at the bottom of screen at all time  */}
        <div className="p-4 border-t sticky bottom-0">
          <div className="flex space-x-2">
            <Button
              className="flex-1  bg-blue-600"
              onClick={() => onSave(editedNode)}
            >
              Apply Changes
            </Button>
            {/* <Button variant="outline" onClick={onClose}>
              Cancel
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
