import React, { useState } from "react";
import { useSidebarContext } from "@/hooks/use-sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState("");
  const { activeForm } = useSidebarContext();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Question Form</CardTitle>
        <CardDescription>Submit your question</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question..."
            />
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              // Add your save/submit logic here
              console.log("Question saved:", question);
            }}
          >
            Save Question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
