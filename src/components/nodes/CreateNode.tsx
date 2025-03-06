import React, { useState } from "react";
import { useSidebarContext, type SidebarFormType } from "@/hooks/use-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const CreateNode: React.FC<{}> = () => {
  const { createNodes, setCreateNodes } = useSidebarContext();
  const [nodeType, setNodeType] = useState<SidebarFormType | "none">("none");
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSave = () => {
    if (
      (nodeType === "greeting" && !message.trim()) ||
      (nodeType === "information" && !message.trim()) ||
      (nodeType === "question" && (!question.trim() || !selectedOption.trim()))
    ) {
      return;
    }

    const newNode = {
      id: `${createNodes.length + 1}`,
      type: nodeType as SidebarFormType,
      data:
        nodeType === "question"
          ? { question, options: [selectedOption] }
          : { message },
    };

    setCreateNodes([...createNodes, newNode]);
    setMessage("");
    setQuestion("");
    setSelectedOption("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Node</CardTitle>
      </CardHeader>
      <CardContent>
        {(nodeType === "greeting" || nodeType === "information") && (
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Enter ${nodeType} message...`}
          />
        )}

        {/* Question Input */}
        {nodeType === "question" && (
          <>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question..."
            />
            <div className="mt-2">
              <strong>Select an Option:</strong>
              <Select value={selectedOption} onValueChange={setSelectedOption}>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Not sure">Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Dropdown to select node type */}
        <Select
          value={nodeType === null ? undefined : nodeType}
          onValueChange={(val) => setNodeType(val as SidebarFormType | "none")}
        >
          <SelectTrigger className="mt-2 w-full">
            <SelectValue placeholder="Select node type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="greeting">Greeting</SelectItem>
            <SelectItem value="question">Question</SelectItem>
            <SelectItem value="information">Information</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSave} className="mt-4 w-full">
          Save
        </Button>
      </CardContent>
    </Card>
  );
};
