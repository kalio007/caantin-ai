import React, { useState, useEffect } from "react";
import { useSidebarContext } from "@/hooks/use-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const GreetingForm: React.FC<{}> = () => {
  const { greetingNodes, setGreetingNodes } = useSidebarContext();
  const [nodeType, setNodeType] = useState("none");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    if (message.trim()) {
      // Save the message to the context, in an event we want mulitple question nodes array
      //   setGreetingNodes([...greetingNodes, message]);
      const newNode = {
        id: `${greetingNodes.length + 1}`, // Auto-increment ID based on current length
        type: nodeType, // Use the selected type
        data: { message }, // Save the message in the node data
      };
      //for single array
      //   setGreetingNodes([message]);

      setGreetingNodes([...greetingNodes, newNode]);
      setMessage("");
    }
  };
  //TODO: handle when selected and the message is passed back to the form

  console.log("Message passed into getQuestionNode:", message);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Greeting Node</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter greeting message..."
        />

        {/* Dropdown for selecting node type */}
        <select
          value={nodeType}
          onChange={(e) => setNodeType(e.target.value)}
          className="mt-2 w-full"
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
