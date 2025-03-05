import React, { useState } from "react";
import { useSidebarContext } from "@/hooks/use-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const GreetingForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const { addGreetingNode } = useSidebarContext();

  const handleSave = () => {
    // Create greeting node data
    const greetingNodeData = {
      message: message,
    };

    // Add the greeting node using the new context method
    addGreetingNode({ data: greetingNodeData });

    // Optionally log the node data
    console.log("Creating Greeting Node:", greetingNodeData);

    // Reset the message
    setMessage("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Greeting Node</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your greeting message..."
          />
          <Button onClick={handleSave} disabled={!message.trim()}>
            Create Greeting Node
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GreetingForm;
