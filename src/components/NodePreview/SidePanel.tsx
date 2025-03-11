import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NodePreview } from "@/components/nodes/NodePreview";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  node: any;
  onSave: (updatedNode: any) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  title,
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
    <div
      className={`fixed right-0 top-0 z-50 h-full w-80 bg-background border-l shadow-lg transform transition-all duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <Card className="mb-4 border-none shadow-none">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Node Information
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">ID</p>
                  <p className="text-sm font-medium truncate">
                    {editedNode.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm font-medium capitalize">
                    {editedNode.type || "default"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <NodePreview
            type={editedNode.type}
            data={editedNode.data}
            onUpdate={handleUpdate}
            onAddOption={handleAddOption}
            onRemoveOption={handleRemoveOption}
          />
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Button className="flex-1" onClick={() => onSave(editedNode)}>
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
