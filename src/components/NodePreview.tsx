import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NodePreviewDrawerProps, NodeType } from "@/types/types";
import GreetingNodePreview from "@/components/NodePreview/gretting-preview";
import QuestionNodePreview from "@/components/NodePreview/question-preview";

const NodePreviewDrawer = ({
  isOpen,
  setIsOpen,
  node,
  onSave,
}: NodePreviewDrawerProps) => {
  const [editedNode, setEditedNode] = useState<NodeType | null>(null);

  useEffect(() => {
    if (node && node.originalData) {
      setEditedNode({
        id: node.originalData.id,
        type: node.originalData.type,
        data: node.originalData.data || {},
      });
    }
  }, [node]);

  // Handle form changes based on node type
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
      const newOptions = editedNode.data.options
        ? [...editedNode.data.options]
        : [];
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

  // Handle adding a new option to a question node
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

  // Handle removing an option
  const handleRemoveOption = (index: number) => {
    if (editedNode?.type === "question" && editedNode.data) {
      const newOptions = editedNode.data.options
        ? [...editedNode.data.options]
        : [];
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

  // If no node is selected, don't render anything
  if (!node || !editedNode) {
    return null;
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Edit {editedNode.type || "Node"}</DrawerTitle>
          <DrawerDescription>
            Make changes to the selected node. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 overflow-y-auto">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Node Properties</CardTitle>
              <CardDescription>Basic node information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="node-id">ID</Label>
                <Input id="node-id" value={editedNode.id} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="node-type">Type</Label>
                <Input
                  id="node-type"
                  value={editedNode.type || "default"}
                  disabled
                />
              </div>
            </CardContent>
          </Card>

          {/* Content based on node type */}
          {editedNode.type === "question" && (
            // <Card className="mb-4">
            //   <CardHeader>
            //     <CardTitle>Question Node</CardTitle>
            //   </CardHeader>
            //   <CardContent className="space-y-4">
            //     <div className="space-y-2">
            //       <Label htmlFor="question-text">Question</Label>
            //       <Textarea
            //         id="question-text"
            //         value={editedNode.data?.question || ""}
            //         onChange={(e) =>
            //           handleInputChange("question", e.target.value)
            //         }
            //         rows={3}
            //       />
            //     </div>

            //     <div className="space-y-2">
            //       <Label>Options</Label>
            //       {editedNode.data?.options?.map(
            //         (option: string, index: number) => (
            //           <div key={index} className="flex gap-2 mt-2">
            //             <Input
            //               value={option}
            //               onChange={(e) =>
            //                 handleInputChange(`option_${index}`, e.target.value)
            //               }
            //             />
            //             <Button
            //               variant="destructive"
            //               size="sm"
            //               onClick={() => handleRemoveOption(index)}
            //             >
            //               Remove
            //             </Button>
            //           </div>
            //         )
            //       )}
            //       <Button
            //         variant="outline"
            //         size="sm"
            //         onClick={handleAddOption}
            //         className="mt-2"
            //       >
            //         Add Option
            //       </Button>
            //     </div>
            //   </CardContent>
            // </Card>
            <QuestionNodePreview
              editedNode={editedNode}
              handleInputChange={handleInputChange}
              handleAddOption={handleAddOption}
              handleRemoveOption={handleRemoveOption}
            />
          )}

          {(editedNode.type === "greeting" ||
            editedNode.type === "information") && (
            <GreetingNodePreview
              editedNode={editedNode}
              handleInputChange={handleInputChange}
            />
          )}
        </div>

        <DrawerFooter>
          <Button onClick={() => onSave(editedNode)}>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NodePreviewDrawer;
