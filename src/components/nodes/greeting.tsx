import React, { useState, useEffect } from "react";
import { useSidebarContext, type SidebarFormType } from "@/hooks/use-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const GreetingForm: React.FC<{}> = () => {
  const { greetingNodes, setGreetingNodes } = useSidebarContext();
  const [nodeType, setNodeType] = useState("none");
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["Yes", "No", "Not sure"]);

  const handleSave = () => {
    if (
      (nodeType === "greeting" && !message.trim()) ||
      (nodeType === "information" && !message.trim()) ||
      (nodeType === "question" && !question.trim())
    ) {
      return;
    }
    // Save the message to the context, in an event we want mulitple question nodes array
    //   setGreetingNodes([...greetingNodes, message]);

    //   const newNode = {
    //     id: `${greetingNodes.length + 1}`, // Auto-increment ID based on current length
    //     type: nodeType, // Use the selected type
    //     data: { message }, // Save the message in the node data
    //   };

    //for single array
    //   setGreetingNodes([message]);
    const newNode = {
      id: `${greetingNodes.length + 1}`,
      type: nodeType as SidebarFormType,
      data: nodeType === "question" ? { question, options } : { message },
    };

    setGreetingNodes([...greetingNodes, newNode]);
    setMessage("");
    setQuestion("");
  };
  //TODO: handle when selected and the message is passed back to the form

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Node</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Show message input for Greeting and Information nodes */}
        {(nodeType === "greeting" || nodeType === "information") && (
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Enter ${nodeType} message...`}
          />
        )}

        {/* Show question input for Question node */}
        {nodeType === "question" && (
          <>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question..."
            />
            <div className="mt-2">
              <strong>Options:</strong>
              <ul>
                {options.map((opt, index) => (
                  <li key={index}>{opt}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Dropdown to select node type */}
        <select
          value={nodeType}
          onChange={(e) => setNodeType(e.target.value)}
          className="mt-2 w-full"
          aria-label="Select node type"
        >
          <option value="none">None</option>
          <option value="greeting">Greeting</option>
          <option value="question">Question</option>
          <option value="information">Information</option>
        </select>

        <Button onClick={handleSave} className="mt-2">
          Save
        </Button>
      </CardContent>
    </Card>
  );
};
