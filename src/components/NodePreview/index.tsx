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
import QuestionNodePreview from "./QuestionPreview";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GeneralNodePreview from "./GeneralNodePreview";
import { NodePreviewDrawerProps } from "@/types/types";

const NodePreviewDrawer = ({
  isOpen,
  setIsOpen,
  node,
  onSave,
}: NodePreviewDrawerProps) => {
  const [editedNode, setEditedNode] = useState<any>(null);

  useEffect(() => {
    if (node) {
      setEditedNode({ ...node.originalData });
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
          {editedNode.type === "question" && (
            <QuestionNodePreview
              editedNode={editedNode}
              handleInputChange={handleInputChange}
              handleRemoveOption={handleRemoveOption}
              handleAddOption={handleAddOption}
            />
          )}

          {(editedNode.type === "greeting" ||
            editedNode.type === "information") && (
            <GeneralNodePreview
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
