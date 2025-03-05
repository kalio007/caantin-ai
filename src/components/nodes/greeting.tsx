import React, { useState, useEffect } from "react";
import { useSidebarContext } from "@/hooks/use-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const GreetingForm: React.FC<{}> = () => {
  const { greetingNodes, setGreetingNodes } = useSidebarContext();
  const [message, setMessage] = useState("");

  const handleSave = () => {
    if (message.trim()) {
      // Save the message to the context, in an event we want mulitple question nodes array 
      //   setGreetingNodes([...greetingNodes, message]);

      //for single array 
      setGreetingNodes([message]);
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
        <Button onClick={handleSave} className="mt-2">
          Save
        </Button>
      </CardContent>
    </Card>
  );
};
